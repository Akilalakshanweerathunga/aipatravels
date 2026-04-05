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
import PolicyIcon from '@mui/icons-material/Policy';
import { company } from '@/data/company';
import { useTranslation } from 'react-i18next';

interface PrivacyPolicyPageProps {
  params: { locale: string };
}

export default function PrivacyPolicyPage({ params }: PrivacyPolicyPageProps) {
  const { t } = useTranslation(); 
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

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
          position: 'relative',
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
            icon={<PolicyIcon />}
            label={t('PrivacyPolicy.chipLabel')}
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
              {t('PrivacyPolicy.title')} {company.name}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {t('PrivacyPolicy.intro')}
            </Typography>
          </Box>
        </Box>

        {/* RIGHT SIDE */}
        <Box sx={{ flex: 1, maxWidth: '900px' }}>
          <Stack spacing={4}>
            {[
              'informationCollection',
              'marketingCommunications',
              'dataSharing',
              'internationalTransfers',
              'dataRetention',
              'externalLinks',
              'yourRights',
              'cookies',
              'consent',
            ].map((section) => (
              <Box key={section}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {t(`PrivacyPolicy.${section}.title`)}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {t(`PrivacyPolicy.${section}.description`)}
                </Typography>
              </Box>
            ))}
            <Divider />
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}