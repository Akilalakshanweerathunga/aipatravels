'use client';

import {
  Box,
  Typography,
  Card,
  CardMedia,
  Chip,
} from '@mui/material';
import { motion } from 'framer-motion';

type LineupItem = {
  id: string;
  place_name: string;
  banner_image: string;
  specialty: string;
  best_time_to_visit: string;
  overview: string;
};

type Props = {
  items: LineupItem[];
};

export default function DestinationLineup({ items }: Props) {
  return (
    <Box
      sx={{
        pb: { xs: 10, md: 14 },
        px: 2,
        background:
          'linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)',
      }}
    >
      {/* HEADER */}
      <Box textAlign="center" mb={10}>
        <Typography
          sx={{
            fontWeight: 800,
            fontSize: { xs: '2.2rem', md: '3.2rem' },
            letterSpacing: '-1px',
          }}
        >
          Destination Highlights
        </Typography>

        <Typography
          sx={{
            mt: 2,
            color: 'text.secondary',
            maxWidth: 600,
            mx: 'auto',
            fontSize: '1rem',
          }}
        >
          Curated luxury experiences crafted for unforgettable journeys.
        </Typography>
      </Box>

      {/* GRID */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr',
          },
          gap: 5,
        }}
      >
        {items?.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.7,
              delay: index * 0.12,
              ease: 'easeOut',
            }}
            viewport={{ once: true }}
          >
            <Card
              sx={{
                borderRadius: 6,
                overflow: 'hidden',
                position: 'relative',
                height: 360,
                cursor: 'pointer',

                background:
                  'linear-gradient(145deg, rgba(255,255,255,0.6), rgba(255,255,255,0.1))',
                backdropFilter: 'blur(10px)',

                boxShadow:
                  '0 15px 40px rgba(0,0,0,0.08), inset 0 1px rgba(255,255,255,0.3)',

                transition: 'all 0.5s ease',

                '&:hover': {
                  transform: 'translateY(-12px) scale(1.02)',
                  boxShadow:
                    '0 30px 80px rgba(0,0,0,0.18)',
                },

                '&:hover .image': {
                  transform: 'scale(1.2)',
                },

                '&:hover .overlay': {
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.85), rgba(0,0,0,0.15))',
                },

                '&:hover .content': {
                  transform: 'translateY(0)',
                  opacity: 1,
                },
              }}
            >
              {/* IMAGE */}
              <CardMedia
                component="img"
                image={`/images/destinations/${item.banner_image}`}
                alt={item.place_name}
                className="image"
                sx={{
                  height: '100%',
                  width: '100%',
                  objectFit: 'cover',
                  transition: '0.8s ease',
                }}
              />

              {/* GLOW BORDER */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: 6,
                  pointerEvents: 'none',
                  background:
                    'linear-gradient(120deg, rgba(255,255,255,0.3), transparent)',
                  opacity: 0.4,
                }}
              />

              {/* OVERLAY */}
              <Box
                className="overlay"
                sx={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  p: 3,
                  color: '#fff',

                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.65), rgba(0,0,0,0.05))',

                  transition: '0.5s ease',
                }}
              >
                {/* CHIP */}
                <Chip
                  label={item.specialty}
                  size="small"
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.15)',
                    color: '#fff',
                    mb: 1.2,
                    fontWeight: 500,
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255,255,255,0.25)',
                  }}
                />

                {/* TITLE */}
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: '1.4rem',
                    letterSpacing: '0.2px',
                  }}
                >
                  {item.place_name}
                </Typography>

                {/* HOVER CONTENT */}
                <Box
                  className="content"
                  sx={{
                    mt: 1.5,
                    opacity: 0,
                    transform: 'translateY(20px)',
                    transition: '0.5s ease',
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: '0.9rem',
                      opacity: 0.9,
                      lineHeight: 1.6,
                    }}
                  >
                    {item.overview}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: '0.75rem',
                      mt: 1.2,
                      opacity: 0.75,
                      letterSpacing: '0.3px',
                    }}
                  >
                    ✨ Best time: {item.best_time_to_visit}
                  </Typography>
                </Box>
              </Box>
            </Card>
          </motion.div>
        ))}
      </Box>
    </Box>
  );
}