'use client';

import { Box, Typography, Chip } from '@mui/material';
import { motion } from 'framer-motion';

type Props = {
  title?: string;
  subtitle?: string;
  description?: string;
};

export default function AboutSection({
  title = '',
  subtitle = '',
  description = '',
}: Props) {
  const typingVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.02,
      },
    }),
  };

  return (
    <Box
      sx={{
        px: { xs: 8, md: 4 },
        pb: { xs: 6, md: 10 },
        textAlign: 'center',
      }}
    >
      <Chip label={title}
        sx={{
            bgcolor: "#e7f2fa",
            color: "#1b4695",
            fontWeight: 500,
            fontSize: { xs: '0.75rem', sm: '0.9rem', md: '1rem' },
            height: { xs: 28, sm: 32, md: 36 },
            px: { xs: 1, sm: 1.5 },
        }} 
      />

      <Typography
          sx={{
            fontWeight: 700,
            mt: 2,
            fontSize: {
              xs: '1rem',
              sm: '2rem',
              md: '3rem',
            },
            lineHeight: 1.25,
            letterSpacing: "-0.5px",
            whiteSpace: { xs: 'normal', md: 'wrap' },
            overflow: 'hidden',
          }}
        >
        {Array.from(subtitle || '').map((char, index) => (
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

      <Typography sx={{ 
            mt: 2, 
          fontSize: {
              xs: '0.85rem',
              sm: '1rem',
              md: '1.25rem',
            },
            lineHeight: 1.25,
            letterSpacing: "-0.5px",
            whiteSpace: { xs: 'normal', md: 'wrap' },
            overflow: 'hidden',
      }}>{description}</Typography>
    </Box>
  );
}