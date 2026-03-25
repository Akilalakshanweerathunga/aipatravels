'use client';

import React from 'react';
import { Box, Typography, Stack, Link } from '@mui/material';
import LanguageIcon from '@mui/icons-material/Language';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { useTranslation } from 'react-i18next';

import { company } from '@/data/company';

const actions = [
  {
    key: 'book_online',
    icon: <LanguageIcon />,
    link: '/',
  },
  {
    key: 'call',
    icon: <PhoneIphoneIcon />,
    link: `tel:${company.phone}`,
    value: company.phone,
  },
  {
    key: 'email',
    icon: <EmailIcon />,
    link: `mailto:${company.email}`,
    value: company.email,
  },
  {
    key: 'whatsapp',
    icon: <WhatsAppIcon />,
    link: `https://wa.me/${company.whatsapp}`,
  },
];

export default function BookingCTA() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        py: 6,
        px: 2,
        textAlign: 'center',
        color: '#fff',
        background: 'linear-gradient(90deg, #2bb673, #2a7bbf)',
      }}
    >
      {/* Title */}
      <Typography
        variant="h5"
        sx={{
          letterSpacing: 2,
          fontWeight: 500,
          mb: 4,
        }}
      >
        {t('cta.title')}
      </Typography>

      {/* Actions */}
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 3, sm: 6 }}
        justifyContent="center"
        alignItems="center"
      >
        {actions.map((item, i) => (
          <Link
            key={i}
            href={item.link}
            underline="none"
            color="inherit"
            target="_blank"
          >
            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              sx={{
                opacity: 0.9,
                transition: '0.3s',
                '&:hover': {
                  opacity: 1,
                  transform: 'translateY(-2px)',
                },
              }}
            >
              {item.icon}
              <Typography sx={{ letterSpacing: 1 }}>
                {t(`cta.${item.key}`)}{' '}
                {item.value ? item.value : ''}
              </Typography>
            </Stack>
          </Link>
        ))}
      </Stack>
    </Box>
  );
}