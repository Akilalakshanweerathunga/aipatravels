'use client';

import { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Snackbar, 
  Alert
} from '@mui/material';
import {
  Email,
  Phone,
  WhatsApp,
  Send,
} from '@mui/icons-material';
import LocationPinIcon from '@mui/icons-material/LocationPin';
import { motion } from 'framer-motion';
import { company } from '@/data/company';
import { useTranslation } from 'react-i18next';

export default function ContactForm() {
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<any>({});
    const openWhatsAppDirect = () => {
        const text = t('contact.form.whatsappDefault');
        window.open(
            `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`,
            '_blank'
        );
    };
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
        severity: 'success' as 'success' | 'error',
    });
    const validate = () => {
        let temp: any = {};

        if (!form.firstName.trim()) temp.firstName = t('contact.form.required');
        if (!form.lastName.trim()) temp.lastName = t('contact.form.required');

        if (!form.email.trim()) {
            temp.email = t('contact.form.required');
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            temp.email = t('contact.form.invalidEmail');
        }

        if (!form.phone.trim()) temp.phone = t('contact.form.required');
        if (!form.message.trim()) temp.message = t('contact.form.required');

        setErrors(temp);

        // ✅ show snackbar when invalid
        if (Object.keys(temp).length > 0) {
            setSnackbar({
            open: true,
            message: t('contact.form.fillRequired'),
            severity: 'error',
            });
        }

        return Object.keys(temp).length === 0;
    };
    const [form, setForm] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        message: '',
    });

    const handleChange = (e: any) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

  const handleSubmit = async (e: any) => {
  e.preventDefault();

  if (!validate()) return;

  setLoading(true);

  try {
    const res = await fetch('/api/contact-mail', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (data.success) {
        setSnackbar({
            open: true,
            message: t('contact.form.successMessage'),
            severity: 'success',
        });
        setForm({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            message: '',
        });
        setErrors({});
    }
  } catch (err) {
    setSnackbar({
        open: true,
        message: t('contact.form.errorMessage'),
        severity: 'error',
    });
  }

  setLoading(false);
};

  const handleWhatsApp = () => {
  if (!validate()) return; 

    const text = `Greetings,
    My name is ${form.firstName} ${form.lastName}

    Email: ${form.email}
    Phone: ${form.phone}

    Message:
    ${form.message}`;

    window.open(
        `https://wa.me/${company.whatsapp}?text=${encodeURIComponent(text)}`,
        '_blank'
    );
    };

  return (
    <Box sx={{ py: 12, px: 2, background: '#f5f3ef' }}>
      
      <Box
        sx={{
          maxWidth: 1100,
          mx: 'auto',
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: '1fr 1.1fr' },
          gap: 6,
        }}
      >
        
        {/* LEFT SIDE */}
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <Typography
            sx={{
              fontFamily: 'serif',
              fontSize: 34,
              color: '#2f2f2f',
              letterSpacing: 1,
            }}
          >
            {t('contact.title')}
          </Typography>

          <Typography sx={{ mt: 2, color: '#6b6b6b', maxWidth: 400 }}>
            {t('contact.description')}
          </Typography>
          

          <Box sx={{ mt: 5 }}>
            <Typography
                component="a"
                href={`mailto:${company.email}`}
                sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
                '&:hover': { color: '#657b43' },
                }}
            >
                <Email fontSize="small" />
                {company.email}
            </Typography>

            {/* PHONE */}
            <Typography
                component="a"
                href={`tel:${company.phone}`}
                sx={{
                mt: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
                '&:hover': { color: '#657b43' },
                }}
            >
                <Phone fontSize="small" />
                {company.phone}
            </Typography>

            {/* WHATSAPP */}
            <Typography
                onClick={openWhatsAppDirect}
                sx={{
                mt: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                cursor: 'pointer',
                '&:hover': { color: '#25D366' },
                }}
            >
                <WhatsApp fontSize="small" />
                {company.whatsapp}
            </Typography>

            {/* ADDRESS (Google Maps) */}
            <Typography
                component="a"
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(company.address)}`}
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                mt: 2,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                textDecoration: 'none',
                color: 'inherit',
                cursor: 'pointer',
                '&:hover': { color: '#657b43' },
                }}
            >
                <LocationPinIcon fontSize="small" />
                {company.address}
            </Typography>

            </Box>
        </motion.div>

        {/* FORM */}
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{
              p: { xs: 3, md: 5 },
              background: '#fff',
              borderRadius: 2,
              border: '1px solid #e5e0d8',
              boxShadow: '0 10px 40px rgba(0,0,0,0.05)',
              position: 'relative',
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
              gap: 3,
            }}
          >
            
            {/* subtle gold border */}
            <Box
              sx={{
                position: 'absolute',
                inset: 10,
                border: '1px solid #d6c7a1',
                borderRadius: 2,
                pointerEvents: 'none',
              }}
            />

            {/* First */}
            <TextField
                label={t('contact.form.firstName')}
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                fullWidth
                variant="standard"
                required
                error={!!errors.firstName}
                helperText={errors.firstName}
            />

            {/* Last */}
            <TextField
                label={t('contact.form.lastName')}
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                fullWidth
                variant="standard"
                required
                error={!!errors.lastName}
                helperText={errors.lastName}
            />

            {/* Email */}
            <Box sx={{ gridColumn: '1 / -1' }}>
              <TextField
                label={t('contact.form.email')}
                name="email"
                value={form.email}
                onChange={handleChange}
                fullWidth
                variant="standard"
                required
                error={!!errors.email}
                helperText={errors.email}
              />
            </Box>

            {/* Phone */}
            <Box sx={{ gridColumn: '1 / -1' }}>
              <TextField
                label={t('contact.form.phone')}
                name="phone"
                value={form.phone}
                onChange={handleChange}
                fullWidth
                variant="standard"
                required
                error={!!errors.phone}
                helperText={errors.phone}
              />
            </Box>

            {/* Message */}
            <Box sx={{ gridColumn: '1 / -1' }}>
              <TextField
                label={t('contact.form.message')}
                name="message"
                value={form.message}
                onChange={handleChange}
                multiline
                rows={4}
                fullWidth
                variant="standard"
                required
                error={!!errors.message}
                helperText={errors.message}
              />
            </Box>

            {/* BUTTONS */}
            <Box
              sx={{
                gridColumn: '1 / -1',
                display: 'flex',
                gap: 2,
                flexDirection: { xs: 'column', sm: 'row' },
                mt: 2,
              }}
            >
              <Button
                type="submit"
                fullWidth
                disabled={loading}
                startIcon={<Send />}
                sx={{
                  background: '#657b43',
                  color: '#fff',
                  py: 1.5,
                  letterSpacing: 1,
                  '&:hover': { background: '#4f6133' },
                }}
              >
                {loading ? t('contact.form.sending') : t('contact.form.submit')}
              </Button>

              <Button
                onClick={handleWhatsApp}
                fullWidth
                startIcon={<WhatsApp />}
                sx={{
                  border: '1px solid #657b43',
                  color: '#657b43',
                  py: 1.5,
                  '&:hover': {
                    background: '#657b43',
                    color: '#fff',
                  },
                }}
              >
                {t('contact.form.whatsapp')}
              </Button>
            </Box>
          </Box>
        </motion.div>
      </Box>
        <Snackbar
            open={snackbar.open}
            autoHideDuration={4000}
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        >
            <Alert
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                severity={snackbar.severity}
                sx={{ width: '100%' }}
            >
                {snackbar.message}
            </Alert>
        </Snackbar>
    </Box>
  );
}