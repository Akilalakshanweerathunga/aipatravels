"use client";

import {
  Box, Typography, TextField, MenuItem, Button,
  Card, CardContent, Chip, CircularProgress, Stack,Collapse,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import SendIcon from '@mui/icons-material/Send';
import SyncIcon from '@mui/icons-material/Sync';
import { getDestinations, getActivity } from "@/lib/api";
import { Snackbar, Alert } from "@mui/material";

export default function TailorMadeMUI() {
  const { t, i18n } = useTranslation();
  const locale = i18n.language || 'en';
  const convertPrice = (price: number) => {
    return new Intl.NumberFormat(locale, { style: 'currency', currency: 'USD' }).format(price);
  };
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [dbData, setDbData] = useState({ destinations: [] as string[], activities: [] as string[] });

  const [formData, setFormData] = useState({
    contactName: "",
    email: "",
    phone: "",
    numAdults: "",
    ageAdults: "",
    numChildren: "",
    ageChildren: "",
    tripDepartureDate: "",
    tourLength: "7-10 days",
    firstTimeVisit: "Yes",
    dietaryPreference: "Non-Vegetarian",
    medicalIssues: "",
    vehicleType: "",
    placesToVisit: [] as string[],
    otherPlaces: "",
    activities: [] as string[],
    otherActivities: "",
    budget: "",
    observations: "",
    otherDietary: "",
  });

  useEffect(() => {
    async function fetchData() {
      try {
        const [destRes, actRes] = await Promise.all([getDestinations(), getActivity()]);
        setDbData({
          destinations: [...new Set(destRes.map((d: any) => d.label))],
          activities: [...new Set(actRes.map((a: any) => a.category))], 
        });
      } catch (err) {
        console.error("Failed to fetch form data", err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const toggle = (field: "placesToVisit" | "activities", value: string) => {
    const arr = formData[field];
    handleChange(field, arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value]);
  };

  const vehicleTypes = ["Luxury Cars", "Luxury SUVs", "Luxury Vans", "Luxury Jeeps", "Mini Coaches", "Limousines"];
  
  const budgetSteps = [600, 1000, 1500, 2500, 3500];
  const budgetOptions = [
    `Less than ${convertPrice(600)}`,
    `${convertPrice(601)} - ${convertPrice(1000)}`,
    `${convertPrice(1001)} - ${convertPrice(1500)}`,
    `${convertPrice(1501)} - ${convertPrice(2500)}`,
    `${convertPrice(2501)} - ${convertPrice(3500)}`,
    `More than ${convertPrice(3501)}`,
  ];

  const handleSubmit = async (e: any) => {
  e.preventDefault();
  setIsSubmitting(true);

  const requiredFields = [
    { key: "contactName", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phone", label: "Phone Number" },
    { key: "numAdults", label: "Number of Adults" },
    { key: "tripDepartureDate", label: "Departure Date" },
    { key: "tourLength", label: "Tour Length" },
    { key: "budget", label: "Budget" },
  ];
  for (const field of requiredFields) {
    if (!formData[field.key as keyof typeof formData]) {
      setSnackbar({
        open: true,
        message: `Please fill in the ${field.label} field.`,
        severity: "warning",
      });
      return;
    }
  }

  if (formData.placesToVisit.length === 0) {
    setSnackbar({ open: true, message: "Please select at least one Destination.", severity: "warning" });
    return;
  }

  if (!formData.budget) {
    setSnackbar({ open: true, message: "Please select a Budget range.", severity: "warning" });
    return;
  }
  try {
    await fetch("/api/save-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    await fetch("/api/send-mail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    setSnackbar({
      open: true,
      message: t("tailorMade.form.successMessage") || "Thank you for your submission! Our team will review your preferences and get back to you within 24 hours with a personalized itinerary and quote.",
      severity: "success",
    });

  } catch (err) {
    setSnackbar({ open: true, message: t("tailorMade.form.errorMessage") || "Submission failed. Please try again later.", severity: "error" });
  } finally {
    setIsSubmitting(false);
  }
};

  if (loading) return <Box display="flex" justifyContent="center" py={10}><CircularProgress /></Box>;

  return (
    <Box sx={{ bgcolor: "#f8fafc", py: 6 }}>
      <Box maxWidth="lg" mx="auto" px={2}>
        <Typography variant="h4" fontWeight={700} mb={1}>{t("tailorMade.form.title")}</Typography>
        <Typography color="#64748b" mb={4}>{t("tailorMade.form.subtitle")}</Typography>
        <Typography 
          variant="body2" 
          sx={{ 
            color: "#d32f2f",
            mb: 4, 
            fontWeight: 500,
            display: 'flex',
            alignItems: 'center',
            gap: 1
          }}
        >
          {t("tailorMade.conditions")} *
        </Typography>
        <Card sx={card}>
          <CardContent>
            <form onSubmit={handleSubmit}>
              
              <Section title={t("tailorMade.form.contact.section")}>
                <Row>
                  <Input 
                    label={t("tailorMade.form.contact.name")} 
                    value={formData.contactName}
                    onChange={(e:any)=>handleChange("contactName", e.target.value)} 
                    required
                  />
                  <Input 
                    label={t("tailorMade.form.contact.email")} 
                    value={formData.email}
                    onChange={(e:any)=>handleChange("email", e.target.value)} 
                    required
                  />
                  <Input 
                    label={t("tailorMade.form.contact.phone")} 
                    value={formData.phone}
                    onChange={(e:any)=>handleChange("phone", e.target.value)} 
                    required
                  />
                </Row>
              </Section>

              <Section title={t("tailorMade.form.group.section")}>
                <Row>
                  <Box flex="1 1 250px">
                    <Typography mb={1}>{t("tailorMade.form.group.adults")} *</Typography>
                    <Input placeholder="e.g. 2, 3, 4" onChange={(e:any)=>handleChange("numAdults",e.target.value)} required/>
                  </Box>
                  <Box flex="1 1 250px">
                    <Typography mb={1}>{t("tailorMade.form.group.adultAges")} *</Typography>
                    <Input placeholder="e.g. 25-30, 30-35" onChange={(e:any)=>handleChange("ageAdults", e.target.value)} required/>
                  </Box>
                </Row>
                <Box mt={3}>
                  <Row>
                    <Box flex="1 1 250px">
                      <Typography mb={1}>{t("tailorMade.form.group.children")} *</Typography>
                      <Input placeholder="e.g. 1, 2, 3" onChange={(e:any)=>handleChange("numChildren",e.target.value)} required />
                    </Box>
                    <Box flex="1 1 250px">
                      <Typography mb={1}>{t("tailorMade.form.group.childAges")} *</Typography>
                      <Input  placeholder="e.g. 5-10, 10-15" onChange={(e:any)=>handleChange("ageChildren", e.target.value)} required/>
                    </Box>
                  </Row>
                </Box>
              </Section>

              <Section title={t("tailorMade.form.trip.section")}>
                <Row>
                  <Box flex="1 1 250px">
                    <Typography mb={1}>{t("tailorMade.form.trip.departure")} *</Typography>
                    <Input type="date" value={formData.tripDepartureDate} onChange={(e:any)=>handleChange("tripDepartureDate", e.target.value)} required/>
                  </Box>
                  <Box flex="1 1 250px">
                    <Typography mb={1}>{t("tailorMade.form.trip.duration")} *</Typography>
                    <Select options={["3-5 days","7-10 days","14+ days"]} value={formData.tourLength} onChange={(e:any)=>handleChange("tourLength",e.target.value)} required/>
                  </Box>
                </Row>
                <Row>
                  <Box mt={3} flex="1 1 250px">
                    <Typography mb={2}>{t("tailorMade.form.trip.firstTime")}</Typography>
                    <Chips options={[t("tailorMade.form.common.yes"), t("tailorMade.form.common.no")]} value={formData.firstTimeVisit} onChange={(v:any)=>handleChange("firstTimeVisit",v)} />
                  </Box>
                  <Box mt={3} flex="1 1 250px">
                    <Typography mb={2}>{t("tailorMade.form.extra.dietary")} *</Typography>
                    <Select 
                      options={["Non-Vegetarian", "Vegetarian", "Vegan", "Other"]} 
                      value={formData.dietaryPreference} 
                      onChange={(e: any) => handleChange("dietaryPreference", e.target.value)} 
                      required
                    />
                  </Box>
                </Row>
                  <Collapse in={formData.dietaryPreference === "Other"}>
                    <Box mt={3}>
                      <Typography mb={2}>{t("tailorMade.form.extra.dietaryOtherLabel") || "Please specify your preference"} *</Typography>
                      <Input 
                        placeholder={t("tailorMade.form.extra.dietaryPlaceholder")} 
                        value={formData.otherDietary || ""}
                        onChange={(e: any) => handleChange("otherDietary", e.target.value)}
                        required={formData.dietaryPreference === "Other"}
                      />
                    </Box>
                  </Collapse>
                <Box mt={3}>
                  <Typography mb={2}>{t("tailorMade.form.trip.medical")} *</Typography>
                  <Input placeholder={t("tailorMade.form.trip.medicalPlaceholder")} value={formData.medicalIssues} onChange={(e:any)=>handleChange("medicalIssues", e.target.value)} required />
                </Box>
              </Section>
              <Section title={t("tailorMade.form.extra.vehicle")}>
                <Chips options={vehicleTypes} value={formData.vehicleType} onChange={(v:any)=>handleChange("vehicleType",v)} />
              </Section>

              <Section title={t("tailorMade.form.extra.places")}>
                <Chips multi options={dbData.destinations} value={formData.placesToVisit} onChange={(v:any)=>toggle("placesToVisit",v)} />
                <Typography mt={2} color="#64748b">{t("tailorMade.form.extra.otherPlaces")}</Typography>
                <Input placeholder={t("tailorMade.form.extra.placesPlaceholder")} sx={{ mt: 1 }} value={formData.otherPlaces} onChange={(e:any)=>handleChange("otherPlaces", e.target.value)} />
              </Section>

              <Section title={t("tailorMade.form.extra.activities")}>
                <Chips multi options={dbData.activities} value={formData.activities} onChange={(v:any)=>toggle("activities",v)} />
                <Typography mt={2} color="#64748b">{t("tailorMade.form.extra.otherActivities")}</Typography>
                <Input placeholder={t("tailorMade.form.extra.activitiesPlaceholder")} sx={{ mt: 1 }} value={formData.otherActivities} onChange={(e:any)=>handleChange("otherActivities", e.target.value)} />
              </Section>

              <Section title={t("tailorMade.form.extra.budget")}>
                <Chips cols={3} options={budgetOptions} value={formData.budget} onChange={(v:any)=>handleChange("budget",v)} required />
              </Section>

              <Section title={t("tailorMade.form.extra.observations")}>
                <TextField fullWidth multiline rows={4} placeholder={t("tailorMade.form.extra.observationsPlaceholder")} InputProps={{ sx: input }} value={formData.observations} onChange={(e:any)=>handleChange("observations", e.target.value)} />
              </Section>

              <Button fullWidth type="submit" sx={btn} disabled={isSubmitting} endIcon={isSubmitting ? <SyncIcon className="animate-spin" /> : <SendIcon />}>
                {isSubmitting ? t("tailorMade.form.submitting") : t("tailorMade.form.submit")}
              </Button>
            </form>
            <Typography sx={{textAlign: "center"}} mt={3} color="#64748b" fontSize="0.9rem">{t("tailorMade.form.note")}</Typography>
          </CardContent>
        </Card>
      </Box>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity as any}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}

function Section({ title, children }: any) {
  return (
    <Box mb={5}>
      <Typography variant="h6" fontWeight={600} mb={3} className="text-2xl font-bold text-black mb-6 pb-3 border-b-4 bg-gray-100 p-4 rounded-lg" sx={{borderColor: "#657b43"}} >
        {title}
      </Typography>
      {children}
    </Box>
  );
}

function Row({ children }: any) {
  return <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>{children}</Stack>;
}

function Input(props: any) {
  return (
    <TextField 
      fullWidth 
      {...props} 
      variant="outlined" 
      required={props.required} 
      InputProps={{ sx: input }} 
    />
  );
}

function Select({ options, required, ...rest }: any) {
  return (
    <TextField 
      select 
      fullWidth 
      required={required} 
      {...rest} 
      InputProps={{ sx: input }}
    >
      {options.map((o: any) => (
        <MenuItem key={o} value={o}>{o}</MenuItem>
      ))}
    </TextField>
  );
}
function Chips({ options, value, onChange, multi, cols = 4 }: any) {
  return (
    <Box display="grid" gridTemplateColumns={{ xs: "repeat(2, 1fr)", sm: `repeat(${cols}, 1fr)` }} gap={1.5}>
      {options.map((o: any) => {
        const active = multi ? value.includes(o) : value === o;
        return (
          <Chip
            key={o}
            label={o}
            onClick={() => onChange(o)}
            sx={{
              bgcolor: active ? "#657b43" : "#fff",
              color: active ? "#fff" : "#334155",
              borderRadius: "6px",
              py: 2.5,
              fontWeight: 500,
              border: active ? "none" : "1px solid #e2e8f0",
              transition: "all 0.2s ease",
              cursor: "pointer",
              "&:hover": {
                bgcolor: active ? "#657b43" : "#f8fafc",
                transform: "translateY(-2px)",
                boxShadow: "0 6px 14px rgba(0,0,0,0.08)"
              }
            }}
          />
        );
      })}
    </Box>
  );
}

const card = {
  borderRadius: 5,
  border: "1px solid #e2e8f0",
  boxShadow: "0 20px 60px rgba(0,0,0,0.08)",
  backdropFilter: "blur(10px)",
};

const input = {
  borderRadius: "14px",
  background: "#ffffff",
  "& fieldset": { borderColor: "#e2e8f0" },
  "&:hover fieldset": { borderColor: "#cbd5e1" },
  "&.Mui-focused fieldset": { borderColor: "#657b43" },
};

const btn = {
  mt: 3,
  py: 2,
  borderRadius: "999px",
  background: "linear-gradient(135deg, #657b43, #7d9150)",
  color: "#fff",
  fontSize: "1.1rem",
  fontWeight: 600,
  letterSpacing: "0.5px",
  transition: "all 0.3s ease",
  "&:hover": {
    background: "linear-gradient(135deg, #546638, #6e8248)",
    transform: "translateY(-2px)",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
  }
};
