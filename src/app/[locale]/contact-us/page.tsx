'use client';

import { Box } from '@mui/material';
import ContactHero from '@/components/contact/ContactHero';
import ContactForm from '@/components/contact/ContactForm';

export default function ContactClient() {

  return (
    <Box sx={{ display: 'block', position: 'relative', width: '100%' }}>
      <ContactHero />
      <ContactForm />
    </Box>
  );
}