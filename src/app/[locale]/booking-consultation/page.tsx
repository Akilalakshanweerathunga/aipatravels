"use client";

import React, { useState, useEffect } from "react";
import { 
  Box, Stepper, Step, StepLabel, Button, Typography, TextField, 
  Paper, MenuItem, Alert, CircularProgress, Fade
} from "@mui/material";
import { createClient } from "@supabase/supabase-js";
import { useTranslation } from "react-i18next";
import { CalendarMonth, AccessTime, Person, CheckCircleOutline } from '@mui/icons-material';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);


export default function AIPABookingSystem() {
    const { t } = useTranslation();
    const [activeStep, setActiveStep] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isDayFull, setIsDayFull] = useState(false);
    
    const steps = [t("booking.Date"), t("booking.Details"), t("booking.Confirm")];

  const [formData, setFormData] = useState({
    booking_date: "",
    booking_time: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    async function checkAvailability() {
      if (!formData.booking_date) return;
      const { count, error } = await supabase
        .from('bookings')
        .select('*', { count: 'exact', head: true })
        .eq('booking_date', formData.booking_date);
      if (!error && count !== null) setIsDayFull(count >= 3);
    }
    checkAvailability();
  }, [formData.booking_date]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const { error: dbError } = await supabase.from('bookings').insert([{ 
          booking_date: formData.booking_date,
          booking_time: formData.booking_time,
          first_name: formData.firstName,
          last_name: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message
      }]);
      if (dbError) throw dbError;

      await fetch("/api/booking-mail", {
        method: "POST",
        body: JSON.stringify(formData),
      });
      setActiveStep(3);
    } catch (err) {
      console.error(err);
      alert("Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      borderRadius: '12px',
      backgroundColor: '#fcfcfc',
      '& fieldset': { borderColor: '#e0e0e0' },
      '&:hover fieldset': { borderColor: '#657b43' },
    }
  };

  return (
    <Box sx={{ 
      minHeight: '80vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'radial-gradient(circle at top right, #fdfbfb 0%, #ebedee 100%)',
      p: 2 
    }}>
      <Paper elevation={0} sx={{ 
        maxWidth: 550, 
        width: '100%', 
        p: { xs: 3, md: 5 }, 
        borderRadius: '32px',
        border: '1px solid rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 24px 48px rgba(0,0,0,0.06)'
      }}>
        
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1a1a1a', letterSpacing: '-0.5px' }}>
            AIPA <Box component="span" sx={{ color: '#657b43' }}>Travel</Box>
          </Typography>
          <Typography variant="body2" color="textSecondary">{t("booking.Premium Consultation Booking")}</Typography>
        </Box>

        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 5 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel sx={{ '& .MuiStepLabel-label': { fontSize: '0.75rem', fontWeight: 600 } }}>{t(label)}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ minHeight: '300px' }}>
          {activeStep === 0 && (
            <Fade in={true}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <CalendarMonth sx={{ color: '#657b43' }} />
                  <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{t("booking.Choose your date")}</Typography>
                </Box>
                <TextField
                  fullWidth
                  type="date"
                  variant="outlined"
                  sx={inputStyles}
                  InputLabelProps={{ shrink: true }}
                  onChange={(e) => setFormData({...formData, booking_date: e.target.value})}
                />
                <TextField
                  fullWidth
                  select
                  label={t("booking.Preferred Time")}
                  value={formData.booking_time}
                  disabled={isDayFull || !formData.booking_date}
                  sx={inputStyles}
                  onChange={(e) => setFormData({...formData, booking_time: e.target.value})}
                >
                  <MenuItem value="09:00">09:00 AM - Morning Slot</MenuItem>
                  <MenuItem value="12:00">12:00 PM - Afternoon Slot</MenuItem>
                  <MenuItem value="15:00">03:00 PM - Evening Slot</MenuItem>
                </TextField>
                {isDayFull && <Alert severity="error" variant="outlined" sx={{ borderRadius: '12px' }}>This date is fully booked.</Alert>}
              </Box>
            </Fade>
          )}

          {activeStep === 1 && (
            <Fade in={true}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                   <TextField fullWidth label={t("booking.First Name")} sx={inputStyles} onChange={(e) => setFormData({...formData, firstName: e.target.value})} />
                   <TextField fullWidth label={t("booking.Last Name")} sx={inputStyles} onChange={(e) => setFormData({...formData, lastName: e.target.value})} />
                </Box>
                <TextField fullWidth type="email" label={t("booking.Email Address")} sx={inputStyles} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                <TextField fullWidth label={t("booking.Phone Number")} sx={inputStyles} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                <TextField fullWidth multiline rows={3} label={t("booking.How can we help you?")} sx={inputStyles} onChange={(e) => setFormData({...formData, message: e.target.value})} />
              </Box>
            </Fade>
          )}

          {activeStep === 2 && (
            <Fade in={true}>
              <Box sx={{ p: 3, bgcolor: '#f9fbf7', borderRadius: '20px', border: '1px solid #eef2e8' }}>
                <Typography variant="overline" color="textSecondary">{t("booking.Booking Summary")}</Typography>
                <Typography variant="h6" sx={{ color: '#657b43', mb: 2 }}>{formData.booking_date} @ {formData.booking_time}</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Typography variant="body2"><strong>{t("booking.Client")}:</strong> {formData.firstName} {formData.lastName}</Typography>
                  <Typography variant="body2"><strong>{t("booking.Email")}:</strong> {formData.email}</Typography>
                  <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'gray', mt: 1 }}>"{formData.message}"</Typography>
                </Box>
              </Box>
            </Fade>
          )}

          {activeStep === 3 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <CheckCircleOutline sx={{ fontSize: 60, color: '#657b43', mb: 2 }} />
              <Typography variant="h5" sx={{ fontWeight: 700 }}>{t("booking.Booking Confirmed!")}</Typography>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>{t("booking.We've sent a confirmation to")} {formData.email}</Typography>
              <Button sx={{ mt: 4, color: '#657b43' }} onClick={() => window.location.reload()}>{t("booking.Book another")}</Button>
            </Box>
          )}
        </Box>

        {activeStep < 3 && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 6 }}>
            <Button 
              onClick={() => setActiveStep(activeStep - 1)} 
              disabled={activeStep === 0}
              sx={{ color: '#666', textTransform: 'none', fontWeight: 600 }}
            >
                {t("booking.Back")}
            </Button>
            <Button 
              variant="contained" 
              disableElevation
              onClick={activeStep === 2 ? handleSubmit : () => setActiveStep(activeStep + 1)}
              disabled={activeStep === 0 && (!formData.booking_time || isDayFull)}
              sx={{ 
                bgcolor: '#657b43', 
                borderRadius: '12px', 
                px: 4, 
                py: 1.5,
                textTransform: 'none',
                fontWeight: 700,
                '&:hover': { bgcolor: '#4a5a31' } 
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : (activeStep === 2 ? t("booking.Confirm Booking") : t("booking.Continue"))}
            </Button>
          </Box>
        )}
      </Paper>
    </Box>
  );
}