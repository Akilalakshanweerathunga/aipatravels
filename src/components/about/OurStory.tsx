'use client';

import { Box, Container, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function OurStory() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        px: 2,
        backgroundColor: '#ffffff',
      }}
    >
      <Container maxWidth="md">
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          sx={{
            textAlign: 'center',
          }}
        >
          {/* CHIP */}
          <Chip
            label={t('about.story.chip')} // "Our Story"
            sx={{
              bgcolor: "#e7f2fa",
              color: "#1b4695",
              fontWeight: 500,
              fontSize: { xs: '0.75rem', sm: '0.9rem', md: '1rem' },
              height: { xs: 28, sm: 32, md: 36 },
              px: { xs: 1, sm: 1.5 },
              mb: 2,
            }}
          />

          {/* TITLE */}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              mb: 2,
              fontSize: {
                xs: '1.5rem',
                sm: '2rem',
                md: '2.5rem',
              },
            }}
          >
            {t('about.story.title')}
          </Typography>

          {/* DESCRIPTION */}
          <Typography
            sx={{
              color: 'text.secondary',
              fontSize: {
                xs: '0.95rem',
                sm: '1rem',
                md: '1.1rem',
              },
              lineHeight: 1.7,
              maxWidth: 700,
              mx: 'auto',
            }}
          >
            {t('about.story.description')}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}