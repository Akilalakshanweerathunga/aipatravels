'use client'

import Image from 'next/image';
import { Box, Button, Typography, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { images } from '@/data/images';
import Link from 'next/link';

export default function AdventuresSection() {
  const { t } = useTranslation();
  
  return (
    <Box
      component="section"
      py={4}
      px={2}
      sx={{
        position: 'relative',
        backgroundImage: `url('${images.home.adventuresbg.src}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(101, 123, 67, 0.85)', 
          backdropFilter: 'blur(2px)',
          zIndex: 0,
        }}
      />

      <Box
        position="relative"
        zIndex={1}
        maxWidth="1200px"
        mx="auto"
        display="flex"
        flexDirection={{ xs: 'column', md: 'row' }}
        alignItems="center"
        gap={6}
      >
        <Box
          position="relative"
          width={{ xs: '100%', md: '50%' }}
          height={{ xs: 300, md: 400 }}
          sx={{
            filter: 'drop-shadow(0 0 40px rgba(144,238,144,0.5))',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '100%',
              overflow: 'hidden',

              WebkitMaskImage:
                'radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
              maskImage:
                'radial-gradient(circle at center, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)',
            }}
          >
            <Image
              src={images.home.adventures.src}
              alt={images.home.adventures.alt}
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              priority
              style={{
                objectFit: 'cover',
              }}
            />
          </Box>
        </Box>

        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          color="white"
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            mb={2}
            sx={{ letterSpacing: '1px' }}
          >
            {t('homePage.adventuresTitle')}
          </Typography>

          <Typography
            variant="body1"
            sx={{ color: 'rgba(255,255,255,0.85)', mb: 4 }}
          >
            {t('homePage.adventuresDescription')}
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button variant="contained" color="success" size="large">
              {t('other.Explore Now')}
            </Button>

            <Button
              component={Link}
              href="/en/booking-consultation"
              variant="outlined"
              size="large"
              sx={{
                borderColor: 'white',
                color: 'white',
                '&:hover': {
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  borderColor: 'white', 
                },
              }}
            >
              {t('other.Get Free Consultation')}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
}