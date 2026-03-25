'use client';

import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import StarIcon from '@mui/icons-material/Star';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { useTranslation } from 'react-i18next';

const features = [
  {
    key: 'best_price',
    icon: <AttachMoneyIcon />,
  },
  {
    key: 'hand_picked',
    icon: <StarIcon />,
  },
  {
    key: 'customer_care',
    icon: <AccessTimeIcon />,
  },
];

export default function WhyBookSection() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        py: 10,
        px: 2,
        textAlign: 'center',
        backgroundImage: 'url(/images/others/beach.jpg)', 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(255,255,255,0.7)',
          backdropFilter: 'blur(4px)',
        }}
      />

      <Box position="relative" zIndex={2}>
   
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ color: '#2e7d32', mb: 1 }}
        >
          {t('why_book.title')}
        </Typography>

        <Box
          sx={{
            width: 80,
            height: 4,
            bgcolor: '#cddc39',
            mx: 'auto',
            mb: 6,
            borderRadius: 2,
          }}
        />

        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="center"
          gap={4}
        >
          {features.map((item, i) => (
            <Box key={i} position="relative">
           
              <Box
                sx={{
                  position: 'absolute',
                  top: -25,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: 50,
                  height: 50,
                  borderRadius: '50%',
                  bgcolor: '#e8f5e9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#2e7d32',
                  boxShadow: 2,
                  zIndex: 2,
                }}
              >
                {item.icon}
              </Box>

              <Card
                sx={{
                  width: 300,
                  pt: 4,
                  pb: 3,
                  px: 2,
                  textAlign: 'center',
                  borderRadius: 2,
                  boxShadow: 3,
                  background: 'rgba(255,255,255,0.85)',
                  minHeight: 220
                }}
              >
                <CardContent>
                  <Typography fontWeight={600} mb={1}>
                    {t(`why_book.${item.key}.title`)}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {t(`why_book.${item.key}.desc`)}
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}