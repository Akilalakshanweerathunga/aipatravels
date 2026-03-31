'use client';

import { Box, Typography, Button } from '@mui/material';
import { useTranslation } from 'react-i18next';

export default function CustomJourney() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        py: { xs: 6, md: 12 },
        background: 'linear-gradient(135deg, #f5f7fa 0%, #e4e9f0 100%)',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: (theme) => theme.breakpoints.values.sm,
          mx: 'auto',
          px: { xs: 2, sm: 3 },
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h3"
          fontWeight={700}
          gutterBottom
          sx={{
            color: '#1e1e1e',
            mb: 3,
            fontSize: { xs: '2rem', md: '3rem' },
            lineHeight: 1.2,
          }}
        >
          {t('customJourney.heading')}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: '#555',
            mb: 5,
            fontSize: { xs: '1rem', md: '1.2rem' },
          }}
        >
          {t('customJourney.description')}
        </Typography>

        <Button
          variant="contained"
          size="large"
          sx={{
            borderRadius: '50px',
            px: 6,
            py: 1.8,
            fontWeight: 600,
            background: 'linear-gradient(90deg, #657b43 0%, #a0c35a 100%)',
            boxShadow: '0px 6px 15px rgba(101, 123, 67, 0.4)',
            textTransform: 'none',
            transition: 'all 0.3s ease',
            '&:hover': {
              background: 'linear-gradient(90deg, #4a5d32 0%, #8abf3f 100%)',
              boxShadow: '0px 8px 20px rgba(74, 93, 50, 0.5)',
            },
          }}
        >
          {t('customJourney.button')}
        </Button>
      </Box>
    </Box>
  );
}