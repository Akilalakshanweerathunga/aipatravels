'use client';

import { Box, Container, Typography, Chip } from '@mui/material';
import FlightIcon from '@mui/icons-material/Flight';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PsychologyIcon from '@mui/icons-material/Psychology';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const items = [
  { icon: <LocationOnIcon />, key: 'item1' },
  { icon: <FlightIcon />, key: 'item2' },
  { icon: <PsychologyIcon />, key: 'item3' },
];

export default function AboutFeatures() {
  const { t } = useTranslation();

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, px: 2 }}>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            gap: 6,
          }}
        >
          {/* LEFT IMAGE */}
          <Box
            component="img"
            src="/images/about-features.jpg"
            alt="travel"
            sx={{
              width: { xs: '100%', md: '50%' },
              borderRadius: 3,
            }}
          />

          {/* RIGHT CONTENT */}
          <Box sx={{ flex: 1 }}>
            {/* CHIP */}
            <Chip
              label={t('about.features.chip')}
              sx={{
                bgcolor: "#e7f2fa",
                color: "#1b4695",
                mb: 2,
              }}
            />

            {/* TITLE */}
            <Typography
              fontWeight="bold"
              sx={{
                fontSize: {
                  xs: '1.6rem',
                  sm: '2.2rem',
                  md: '2.8rem',
                },
                mb: 3,
              }}
            >
              {t('about.features.title')}
            </Typography>

            {/* ITEMS */}
            <Box display="flex" flexDirection="column" gap={3}>
              {items.map((item, index) => (
                <Box
                  key={index}
                  component={motion.div}
                  initial={{ opacity: 0, x: 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2 }}
                  viewport={{ once: true }}
                  sx={{
                    display: 'flex',
                    gap: 2,
                    alignItems: 'flex-start',
                  }}
                >
                  {/* ICON */}
                  <Box
                    sx={{
                      bgcolor: '#657a42',
                      color: 'white',
                      borderRadius: '50%',
                      p: 1.2,
                      display: 'flex',
                    }}
                  >
                    {item.icon}
                  </Box>

                  {/* TEXT */}
                  <Box>
                    <Typography fontWeight="bold">
                      {t(`about.features.${item.key}.title`)}
                    </Typography>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {t(`about.features.${item.key}.desc`)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}