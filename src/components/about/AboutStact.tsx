'use client';

import { Box, Container, Typography } from '@mui/material';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';


export default function AboutStats() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });
  const { t } = useTranslation();
  const stats = [
    { value: 98, suffix: '%', label: t('other.stats.satisfaction') },
    { value: 1500, suffix: '+', label: t('other.stats.reviews') },
    { value: 15, suffix: '+', label: t('other.stats.experience') },
    { value: 800, suffix: '+', label: t('other.stats.tours') },
  ];

  return (
    <Box
      ref={ref}
      sx={{
        py: { xs: 6, md: 8 },
        background: 'linear-gradient(to right, #657a42, #4e5f30)',
        color: 'white',
      }}
    >
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 4,
            textAlign: 'center',
          }}
        >
          {stats.map((stat, index) => (
            <Box
              key={index}
              sx={{
                flex: '1 1 200px',
              }}
              component={motion.div}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: index * 0.2,
              }}
            >
              {/* NUMBER */}
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: {
                    xs: '2rem',
                    sm: '2.5rem',
                    md: '3rem',
                  },
                }}
              >
                {inView && (
                  <CountUp
                    end={stat.value}
                    duration={2}
                  />
                )}
                {stat.suffix}
              </Typography>

              {/* LABEL */}
              <Typography
                sx={{
                  mt: 1,
                  fontSize: {
                    xs: '0.9rem',
                    md: '1rem',
                  },
                  opacity: 0.9,
                }}
              >
                {stat.label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
}