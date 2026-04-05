"use client";

import {
Box, Typography, TextField, MenuItem, Button,
Card, CardContent, CircularProgress, Stack,
Checkbox, FormControlLabel, Snackbar, Alert,
FormHelperText
} from "@mui/material";
import { useState, useEffect } from "react";
import { useTranslation } from 'react-i18next';
import SendIcon from '@mui/icons-material/Send';
import SyncIcon from '@mui/icons-material/Sync';
import VideoCameraBackIcon from '@mui/icons-material/VideoCameraBack';

// --- Constants (Database Values) ---
const TITLES = ["Mr", "Mrs", "Ms", "Miss", "Dr", "Prof", "Sir", "Dame"];
const YES_NO = ["Yes", "No"];
const TRAVEL_TIMING_OPTIONS = ["Within 3 months", "3-6 months", "Over 6 months"];

interface InquiryFormProps {
itineraryTag: string;
itinerarySlug: string;
}

export default function ItineraryInquiryForm({ itineraryTag, itinerarySlug }: InquiryFormProps) {
const { t, i18n } = useTranslation();
const [isSubmitting, setIsSubmitting] = useState(false);
const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
const [agreedError, setAgreedError] = useState(false);

const [formData, setFormData] = useState({
    itineraryDetails: "",
    title: "Mr", // Default English Value
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    travelTiming: "" as string,
    arrangeVideoCall: false,
    numAdults: "",
    ageAdults: "",
    numChildren: "",
    ageChildren: "",
    tripDepartureDate: "",
    tourLength: "",
    firstTimeVisit: "Yes",
    dietaryPreference: "",
    medicalIssues: "",
    observations: "",
    agreeToShareDetails: false,
});

const handleChange = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
    if (key === "agreeToShareDetails" && value === true) setAgreedError(false);
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (!formData.agreeToShareDetails) {
    setAgreedError(true);
    return;
  }

  setIsSubmitting(true);

  try {
    // 1. Save to Supabase
    const saveRes = await fetch("/api/itinerary-save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    // 2. Send Emails
    const mailRes = await fetch("/api/itinerary-mail", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (saveRes.ok && mailRes.ok) {
      setSnackbar({ open: true, message: t('commonForms.successMessage'), severity: "success" });
    } else {
      throw new Error("Failed to process request");
    }
  } catch (err) {
    setSnackbar({ open: true, message: t('commonForms.errorMessage'), severity: "error" });
  } finally {
    setIsSubmitting(false);
  }
};

useEffect(() => {
  if (itineraryTag) {
    const englishTitle = i18n.getResourceBundle('en', 'translation')
      ?.itineraries?.[itineraryTag]?.title || itineraryTag;

    setFormData(prev => ({
      ...prev,
      itineraryDetails: englishTitle
    }));
  }
}, [itineraryTag, i18n]);

return (
    <Box sx={{ bgcolor: "#f8fafc", py: 6 }}>
    <Box maxWidth="xl" mx="auto" px={2}>
        <Card sx={card}>
        <CardContent sx={{ p: 4 }}>
            <form onSubmit={handleSubmit}>
            <Box mb={4}>
                <Typography variant="h5" sx={titleHeading}>
                {t("tailorMade.conditions")} *
                </Typography>
                <Typography mb={1}>
                {t('commonForms.interestedInItinerary')}
                </Typography>
                <TextField
                fullWidth
                value={formData.itineraryDetails}
                InputProps={{ readOnly: true, sx: { ...input, bgcolor: '#f1f5f9' } }}
                />
            </Box>

            <Typography variant="caption" display="block" mb={4} color="text.secondary">
                {t('commonForms.privacyPolicy')}
            </Typography>

            <Section title={t('commonForms.personalDetails')}>
                <Row>
                <Box flex={1}>
                    <Typography mb={1}>{t('commonForms.titleLabel')} *</Typography>
                    <Select
                    options={TITLES}
                    getLabel={(val: string) => t(`commonForms.titles.${val}`)}
                    value={formData.title}
                    onChange={(e: any) => handleChange("title", e.target.value)}
                    required
                    />
                </Box>
                <Box flex={2}>
                    <Typography mb={1}>{t('commonForms.firstName')} *</Typography>
                    <Input placeholder={t('commonForms.firstNamePlaceholder')} value={formData.firstName} onChange={(e: any) => handleChange("firstName", e.target.value)} required />
                </Box>
                <Box flex={2}>
                    <Typography mb={1}>{t('commonForms.lastName')} *</Typography>
                    <Input placeholder={t('commonForms.lastNamePlaceholder')} value={formData.lastName} onChange={(e: any) => handleChange("lastName", e.target.value)} required />
                </Box>
                </Row>

                <Row>
                <Box flex={1} mt={2}>
                    <Typography mb={1}>{t('commonForms.email')} *</Typography>
                    <Input placeholder={t('commonForms.emailPlaceholder')} type="email" value={formData.email} onChange={(e: any) => handleChange("email", e.target.value)} required />
                </Box>
                <Box flex={1} mt={2}>
                    <Typography mb={1}>{t('commonForms.phone')} *</Typography>
                    <Input placeholder={t('commonForms.phonePlaceholder')} value={formData.phone} onChange={(e: any) => handleChange("phone", e.target.value)} required />
                </Box>
                </Row>
            </Section>

            {/* Travel Timing */}
            <Section title={t('commonForms.whenTraveling')}>
                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} gap={1}>
                {TRAVEL_TIMING_OPTIONS.map((time) => (
                    <FormControlLabel
                    key={time}
                    control={
                        <Checkbox
                        checked={formData.travelTiming === time}
                        onChange={() => handleChange("travelTiming", time)}
                        sx={{ color: '#657b43', '&.Mui-checked': { color: '#657b43' } }}
                        />
                    }
                    label={t(`commonForms.timing.${time}`)}
                    />
                ))}
                </Box>
            </Section>

            {/* Group Details */}
            <Section title={t('commonForms.groupDetails')}>
                <Row>
                <Box flex={1}>
                    <Typography mb={1}>{t('commonForms.numberOfAdults')} *</Typography>
                    <Input placeholder={t('commonForms.numberOfAdultsPlaceholder')} type="number" value={formData.numAdults} onChange={(e: any) => handleChange("numAdults", e.target.value)} required />
                </Box>
                <Box flex={1}>
                    <Typography mb={1}>{t('commonForms.agesOfAdults')} *</Typography>
                    <Input placeholder={t('commonForms.agesOfAdultsPlaceholder')} value={formData.ageAdults} onChange={(e: any) => handleChange("ageAdults", e.target.value)} required />
                </Box>
                </Row>
                <Box mt={3}>
                <Row>
                    <Box flex={1}>
                    <Typography mb={1}>{t('commonForms.numberOfChildren')} *</Typography>
                    <Input placeholder={t('commonForms.numberOfChildrenPlaceholder')} type="number" value={formData.numChildren} onChange={(e: any) => handleChange("numChildren", e.target.value)} required />
                    </Box>
                    <Box flex={1}>
                    <Typography mb={1}>{t('commonForms.agesOfChildren')} *</Typography>
                    <Input placeholder={t('commonForms.agesOfChildrenPlaceholder')} value={formData.ageChildren} onChange={(e: any) => handleChange("ageChildren", e.target.value)} required />
                    </Box>
                </Row>
                </Box>
            </Section>

            {/* Trip Info */}
            <Section title={t('commonForms.generalTripInfo')}>
                <Row>
                <Box flex={1}>
                    <Typography mb={1}>{t('commonForms.departureDate')} *</Typography>
                    <Input placeholder={t('commonForms.departureDatePlaceholder')} type="date" value={formData.tripDepartureDate} onChange={(e: any) => handleChange("tripDepartureDate", e.target.value)} required />
                </Box>
                <Box flex={1}>
                    <Typography mb={1}>{t('commonForms.tripDuration')} *</Typography>
                    <Input placeholder={t('commonForms.tripDurationPlaceholder')} value={formData.tourLength} onChange={(e: any) => handleChange("tourLength", e.target.value)} required />
                </Box>
                </Row>
                <Box mt={3}>
                <Typography mb={1}>{t('commonForms.firstTimeInSriLanka')} *</Typography>
                <Select
                    options={YES_NO}
                    getLabel={(val: string) => t(`commonForms.${val.toLowerCase()}`)}
                    value={formData.firstTimeVisit}
                    onChange={(e: any) => handleChange("firstTimeVisit", e.target.value)}
                    required
                />
                </Box>
                <Box mt={3}>
                <Typography mb={1}>{t('commonForms.dietaryPreference')} *</Typography>
                <Input placeholder={t('commonForms.dietaryPreferencePlaceholder')} value={formData.dietaryPreference} onChange={(e: any) => handleChange("dietaryPreference", e.target.value)} required />
                </Box>
                <Box mt={3}>
                <Typography mb={1}>{t('commonForms.medicalConditions')} *</Typography>
                <TextField placeholder={t('commonForms.medicalConditionsPlaceholder')} fullWidth multiline rows={2} value={formData.medicalIssues} onChange={(e: any) => handleChange("medicalIssues", e.target.value)} InputProps={{ sx: input }} required />
                </Box>
                <Box mt={3}>
                <Typography mb={1}>{t('commonForms.observations')}</Typography>
                <TextField placeholder={t('commonForms.observationsPlaceholder')} fullWidth multiline rows={4} value={formData.observations} onChange={(e: any) => handleChange("observations", e.target.value)} InputProps={{ sx: input }} />
                </Box>
            </Section>
                {/* Video Call */}
            <Section title={t('commonForms.travelPlansSection')}>
                <Box sx={{ bgcolor: formData.arrangeVideoCall ? '#f0f4e8' : '#fff', p: 2, borderRadius: 2, border: '1px solid #e2e8f0', transition: '0.3s' }}>
                <Stack direction="row" alignItems="center">
                    <VideoCameraBackIcon sx={{ color: '#657b43', mr: 2 }} />
                    <FormControlLabel
                    control={
                        <Checkbox
                        checked={formData.arrangeVideoCall}
                        onChange={(e) => handleChange("arrangeVideoCall", e.target.checked)}
                        sx={{ color: '#657b43', '&.Mui-checked': { color: '#657b43' } }}
                        />
                    }
                    label={<Typography fontWeight={500}>{t('commonForms.arrangeVideoCall')}</Typography>}
                    />
                </Stack>
                <Typography variant="body2" color="text.secondary" ml={5}>
                    {t('commonForms.videoCallDescription')}
                </Typography>
                </Box>
            </Section>
            <Box sx={{ mt: 4, p: 2, borderRadius: 2, border: agreedError ? '1px solid #d32f2f' : '1px solid #e2e8f0', bgcolor: agreedError ? '#fff8f8' : 'transparent' }}>
                <FormControlLabel
                    control={
                    <Checkbox
                        checked={formData.agreeToShareDetails}
                        onChange={(e) => handleChange("agreeToShareDetails", e.target.checked)}
                        sx={{ 
                        color: agreedError ? '#d32f2f' : '#657b43', 
                        '&.Mui-checked': { color: '#657b43' } 
                        }}
                    />
                    }
                    label={
                    <Typography variant="body2" fontWeight={500}>
                        {t('commonForms.agreeDetailsShare')} *
                    </Typography>
                    }
                />
                {agreedError && (
                    <FormHelperText error sx={{ ml: 4 }}>
                    {t('commonForms.agreementRequired')}
                    </FormHelperText>
                )}
            </Box>
            <Button fullWidth type="submit" sx={btn} disabled={isSubmitting} endIcon={isSubmitting ? <SyncIcon className="animate-spin" /> : <SendIcon />}>
                {isSubmitting ? t('commonForms.submitting') : t('commonForms.submitInquiry')}
            </Button>
            </form>
        </CardContent>
        </Card>
    </Box>

    <Snackbar open={snackbar.open} autoHideDuration={4000} onClose={() => setSnackbar({ ...snackbar, open: false })}>
        <Alert severity={snackbar.severity as any} sx={{ width: "100%" }}>{snackbar.message}</Alert>
    </Snackbar>
    </Box>
);
}

// --- Internal Helper Components ---

function Section({ title, children }: any) {
return (
    <Box mb={5}>
    <Typography variant="h6" fontWeight={700} mb={3} sx={{ pb: 1, borderBottom: '2px solid #657b43', display: 'inline-block' }}>
        {title}
    </Typography>
    <Box mt={2}>{children}</Box>
    </Box>
);
}

function Row({ children }: any) {
return <Stack direction={{ xs: 'column', sm: 'row' }} gap={2}>{children}</Stack>;
}

function Input(props: any) {
return <TextField fullWidth {...props} variant="outlined" InputProps={{ sx: input }} />;
}

function Select({ options, getLabel, ...rest }: any) {
return (
    <TextField select fullWidth {...rest} InputProps={{ sx: input }}>
    {options.map((o: string) => (
        <MenuItem key={o} value={o}>
        {getLabel ? getLabel(o) : o}
        </MenuItem>
    ))}
    </TextField>
);
}

// --- Styles ---
const card = { borderRadius: 4, boxShadow: "0 10px 30px rgba(0,0,0,0.05)", border: "1px solid #e2e8f0" };
const input = { borderRadius: "10px", background: "#ffffff", "&.Mui-focused fieldset": { borderColor: "#657b43" } };
const btn = { mt: 4, py: 1.8, borderRadius: "50px", background: "#657b43", color: "#fff", fontWeight: 600, "&:hover": { background: "#546638" } };
const titleHeading = { color: "#d32f2f", mb: 4, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 1 };