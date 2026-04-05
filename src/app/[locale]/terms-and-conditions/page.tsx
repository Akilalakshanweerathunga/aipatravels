'use client';

import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Divider,
  Stack,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import GavelIcon from '@mui/icons-material/Gavel';
import { company } from '@/data/company';
import { useTranslation } from 'react-i18next';

export default function TermsPage() {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const sections = [
    'acceptance',
    'description',
    'responsibilities',
    'intellectualProperty',
    'payments',
    'termination',
    'governingLaw',
  ];

  return (
    <Box
      sx={{
        px: { xs: 3, md: 10 },
        py: { xs: 6, md: 10 },
        maxWidth: '1400px',
        mx: 'auto',
      }}
    >
      {/* Layout Container */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          gap: { xs: 4, md: 8 },
          alignItems: 'stretch',
        }}
      >
        {/* LEFT SIDE */}
        <Box
          sx={{
            width: { xs: '100%', md: '460px' },
            position: { md: 'sticky' },
            top: { md: '120px' },
            height: 'fit-content',
          }}
        >
          <Chip
            icon={<GavelIcon />}
            label={t('Terms.chipLabel')}
            sx={{
              fontSize: '14px',
              px: 1,
              py: 2.5,
              borderRadius: '999px',
            }}
          />
          <Divider sx={{ my: 5 }} />
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              {t('Terms.title', { company: company.name })}
            </Typography>

            <Typography variant="body1" color="text.secondary">
              {t('Terms.intro')}
            </Typography>

            <Typography sx={{ fontSize: 13, color: '#888', mt: 2 }}>
              {t('Terms.lastUpdated')}
            </Typography>
          </Box>
        </Box>

        {/* RIGHT SIDE */}
        <Box sx={{ flex: 1, maxWidth: '900px' }}>
          <Stack spacing={4}>
            {sections.map((section, index) => (
              <Box key={section}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {`${index + 1}. ${t(`Terms.${section}.title`)}`}
                </Typography>
                <Typography color="text.secondary">
                  {t(`Terms.${section}.description`, { company: company.name })}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}