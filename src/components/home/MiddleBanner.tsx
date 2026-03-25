'use client';

import React from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Image from 'next/image';

import { images } from '@/data/images';

const MotionBox = motion.create(Box);

export default function MiddleBanner() {
  const theme = useTheme();
  const { t } = useTranslation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const bannerImage = isMobile
    ? images.whoWeAre.homeBannerMobile
    : images.whoWeAre.homeBanner;

  return (
    <MotionBox
      sx={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
      }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
    >
      <Box sx={{ position: 'relative', width: '100%', height: { xs: 400, md: 500 } }}>
        <Image
          src={bannerImage.src}
          alt={t(bannerImage.alt, 'AIPA Banner')}
          fill
          style={{ objectFit: 'cover' }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0,0,0,0.45)',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: { xs: '100%', md: '60%' },
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'left',
            textAlign: 'left',
            px: { xs: 3, md: 8 },
            color: 'common.white',
          }}
        >
          <Typography
            variant={isMobile ? 'h5' : 'h3'}
            component="h2"
            gutterBottom
            sx={{ fontWeight: 700 }}
          >
            {t('homePage.middleBannerTitle')}
          </Typography>
          <Typography variant={isMobile ? 'body1' : 'h6'}>
            {t('homePage.middleBannerDescription')}
          </Typography>
        </Box>
      </Box>
    </MotionBox>
  );
}