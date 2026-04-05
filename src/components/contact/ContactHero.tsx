'use client';

import { Box, Typography, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

export default function contactHero() {
  const { t } = useTranslation();

  // simple typing animation
  const typingVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.03,
      },
    }),
  };

  return (
    <Box
      sx={{
        pt: { xs: 12, sm: 14, md: 16 },
        pb: { xs: 6, sm: 8, md: 10 },
        px: 2,
        textAlign: 'center',
        background: 'linear-gradient(to bottom, #f9fbfd, #ffffff)',
      }}
    >
      {/* CONTENT */}
      <Box
        sx={{
          maxWidth: 900,
          mx: 'auto',
        }}
      >
        {/* CHIP */}
        <Chip
          label={t('contact.chip')} 
          sx={{
            bgcolor: "#e7f2fa",
            color: "#1b4695",
            fontWeight: 500,
            fontSize: { xs: '0.75rem', sm: '0.9rem', md: '1rem' },
            height: { xs: 28, sm: 32, md: 36 },
            px: { xs: 1, sm: 1.5 },
          }}
        />

        {/* TITLE (Animated like yours) */}
        <Typography
          sx={{
            fontWeight: 700,
            mt: 2,
            fontSize: {
              xs: '1.6rem',
              sm: '2.2rem',
              md: '4rem',
              lg: '5rem',
            },
            lineHeight: 1.25,
            letterSpacing: "-0.5px",
            whiteSpace: { xs: 'normal', md: 'wrap' }, // FIX for mobile
            overflow: 'hidden',
          }}
        >
          {Array.from(t('contact.title')).map((char, index) => (
            <motion.span
              key={index}
              custom={index}
              initial="hidden"
              animate="visible"
              variants={typingVariants}
            >
              {char}
            </motion.span>
          ))}
        </Typography>

        {/* SUBTITLE */}
        <Typography
          sx={{
            mt: 2,
            color: 'text.secondary',
            fontSize: {
              xs: '0.9rem',
              sm: '1rem',
              md: '1.1rem',
            },
            maxWidth: 600,
            mx: 'auto',
            lineHeight: 1.6,
          }}
        >
          {t('contact.description')}
        </Typography>
      </Box>
    </Box>
  );
}