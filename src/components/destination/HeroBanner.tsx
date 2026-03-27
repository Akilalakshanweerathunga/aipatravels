'use client';

import { Box, Typography, Container } from '@mui/material';

type Props = {
  headTitle : String;
  title: string;
  subtitle?: string;
  image: string;
};

export default function HeroBanner({ headTitle, title, subtitle, image }: Props) {
  return (
    <Box
      sx={{
        position: 'relative',
        height: { xs: '100vh', sm: 420, md: 580 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        top: -60
      }}
    >
      <Box
        component="img"
        src={image}
        alt={title}
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6))',
        }}
      />

      <Container maxWidth="lg">
        <Box
          sx={{
            position: 'relative',
            color: '#fff',
            textAlign: 'center',
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontSize: { xs: '1.8rem', sm: '1.5rem', md: '2rem' },
              color: "#c7a96a"
            }}
          >
            {headTitle}
          </Typography>
          <Typography
            variant="h3"
            fontWeight={700}
            sx={{
              fontSize: { xs: '4rem', sm: '2.4rem', md: '6rem' },
            }}
          >
            {title}
          </Typography>

          {subtitle && (
            <Typography
              mt={2}
              sx={{
                opacity: 0.9,
                fontSize: { xs: '0.95rem', sm: '1.1rem' },
              }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Container>
    </Box>
  );
}