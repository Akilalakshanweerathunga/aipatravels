'use client';

import React from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { images } from '@/data/images';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import SpaceDashboardIcon from '@mui/icons-material/SpaceDashboard';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import { motion, Variants } from 'framer-motion';

const MotionBox = motion.create(Box);
const MotionCard = motion.create(Card);

const container: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const fadeUp: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: 'easeOut',
    },
  },
};

const imageAnimation: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.9,
      ease: 'easeOut',
    },
  },
};

export const WhoWeAre: React.FC = () => {
  const { t } = useTranslation();

  const services = [
    { text: t('aboutUs.services.0'), icon: <LocalCafeIcon sx={{ fontSize: 40, color: '#657b43' }} /> },
    { text: t('aboutUs.services.1'), icon: <EmojiEventsIcon sx={{ fontSize: 40, color: '#657b43' }} /> },
    { text: t('aboutUs.services.2'), icon: <StarIcon sx={{ fontSize: 40, color: '#657b43' }} /> },
  ];

  return (
    <Box
      component={motion.section}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      sx={{ py: { xs: 8, md: 16 }, px: { xs: 2, md: 4 } }}
      
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          gap: 3,
        }}
      >
        {/* LEFT */}
        <MotionBox variants={fadeUp} sx={{ flex: 1, textAlign: 'center', display: { xs: 'none', md: 'block' }, }}>
          <MotionBox variants={imageAnimation}>
            <Image
              src={images.whoWeAre.left.src}
              alt={images.whoWeAre.left.alt}
              width={300}
              height={400}
              style={{ width: '100%', borderRadius: '12px' }}
            />
          </MotionBox>

          <MotionCard
            variants={fadeUp}
            whileHover={{ y: -2, scale: 1.03 }}
            transition={{ duration: 0.3 }}
            sx={{ mt: 2, textAlign: 'center', py: 0, minHeight: '130px' }}
          >
            <CardContent
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}
            >
              <SpaceDashboardIcon sx={{ fontSize: 40, color: '#657b43' }} />
              <Typography variant="body2">
                {t('aboutUs.leftService')}
              </Typography>
            </CardContent>
          </MotionCard>
        </MotionBox>

        {/* CENTER */}
        <MotionBox variants={fadeUp} sx={{ flex: 2, textAlign: 'center' }}>
          <Typography variant="subtitle1" gutterBottom color="#657b43">
            {t('other.whoWeAre')}
          </Typography>

          <Typography
            variant="body1"
            sx={{ mb: 4, color: 'text.secondary', whiteSpace: 'pre-line' }}
          >
            {t('aboutUs.shortDescription')}
          </Typography>

          {/* SERVICES */}
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              justifyContent: 'center',
              gap: 2,
              mb: 4,
            }}
          >
            {services.map((service, index) => (
              <MotionCard
                key={index}
                variants={fadeUp}
                whileHover={{
                  y: -8,
                  scale: 1.05,
                  boxShadow: '0px 20px 40px rgba(0,0,0,0.12)',
                }}
                transition={{ duration: 0.3 }}
                sx={{ flex: 1, textAlign: 'center', py: 0 }}
              >
                <CardContent
                  sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}
                >
                  {service.icon}
                  <Typography variant="body2">{service.text}</Typography>
                </CardContent>
              </MotionCard>
            ))}
          </Box>

          {/* CENTER IMAGE */}
          <MotionBox
            variants={imageAnimation}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.4 }}
            sx={{display: { xs: 'none', md: 'flex' },}}
          >
            <Image
              src={images.whoWeAre.center.src}
              alt={images.whoWeAre.center.alt}
              width={600}
              height={300}
              style={{
                width: '100%',
                borderRadius: '12px',
                objectFit: 'cover',
                height: 'auto',
              }}
            />
          </MotionBox>
        </MotionBox>

        {/* RIGHT */}
        <MotionBox variants={fadeUp} sx={{ flex: 1, textAlign: 'center' }}>
          <MotionBox variants={imageAnimation} >
            <Image
              src={images.whoWeAre.right.src}
              alt={images.whoWeAre.right.alt}
              width={300}
              height={400}
              style={{ width: '100%', borderRadius: '12px' }}
            />
          </MotionBox>

          <MotionCard
            variants={fadeUp}
            whileHover={{ y: -2, scale: 1.03 }}
            transition={{ duration: 0.3 }}
            sx={{ mt: 2, textAlign: 'center', py: 0, minHeight: '130px', display: { xs: 'none', md: 'flex' }, }}
          >
            <CardContent
              sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1 }}
            >
              <AssignmentTurnedInIcon sx={{ fontSize: 40, color: '#657b43' }} />
              <Typography variant="body2">
                {t('aboutUs.rightService')}
              </Typography>
            </CardContent>
          </MotionCard>
        </MotionBox>
      </Box>
    </Box>
  );
};

export default WhoWeAre;