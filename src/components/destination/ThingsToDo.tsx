'use client';

import {
  Box,
  Typography,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';

export default function ThingsToDo({ items }: { items: any[] }) {
  if (!items || items.length === 0) {
    return (
      <Box sx={{ p: 5 }}>
        <Typography>No activities found</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        py: { xs: 6, md: 10 },
        px: { xs: 2, md: 0 },
        maxWidth: 1200,
        mx: 'auto',
      }}
    >
      <Box mb={6}>
        <Typography
          sx={{
            fontSize: { xs: '1.8rem', md: '2.4rem' },
            fontWeight: 800,
            letterSpacing: '-0.5px',
          }}
        >
          Things to Do
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: 'text.secondary',
            maxWidth: 600,
          }}
        >
          Explore unforgettable activities and experiences curated for this destination.
        </Typography>
      </Box>

      <Stack spacing={4}>
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: { xs: 'column', md: 'row' },
                gap: 3,
                cursor: 'pointer',
                group: 'item',

                '&:hover .image': {
                  transform: 'scale(1.05)',
                },
              }}
            >
              <Box
                sx={{
                  width: { xs: '100%', md: 260 },
                  height: { xs: 180, md: 170 },
                  borderRadius: 3,
                  overflow: 'hidden',
                  flexShrink: 0,
                }}
              >
                <Box
                  component="img"
                  src={`/images/activities/${item.banner_image}`}
                  alt={item.name}
                  className="image"
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: '0.5s ease',
                  }}
                />
              </Box>

              <Box flex={1}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Box>
                    <Chip
                      label={item.category}
                      size="small"
                      sx={{
                        mb: 1,
                        fontSize: '0.7rem',
                      }}
                    />

                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: '1.1rem',
                      }}
                    >
                      {item.name}
                    </Typography>
                  </Box>
                </Stack>

                <Stack
                  direction="row"
                  spacing={1}
                  sx={{
                    mt: 0.5,
                    fontSize: '0.8rem',
                    color: 'text.secondary',
                  }}
                >
                  <span>⏱ {item.duration}</span>
                  <span>•</span>
                  <span>🌤 {item.best_time_to_visit}</span>
                </Stack>

                <Typography
                  sx={{
                    mt: 1.5,
                    fontSize: '0.9rem',
                    color: 'text.secondary',
                    lineHeight: 1.6,
                  }}
                >
                  {item.overview}
                </Typography>
              </Box>
            </Box>

            {index !== items.length - 1 && (
              <Divider sx={{ mt: 4 }} />
            )}
          </motion.div>
        ))}
      </Stack>
    </Box>
  );
}