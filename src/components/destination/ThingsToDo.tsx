'use client';

import {
  Box,
  Typography,
  Chip,
  Stack,
  Divider,
} from '@mui/material';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

type ActivityItem = {
  slug: string;
  name: string;
  description?: string;
  overview?: string;
  category?: string;
  duration?: string;
  best_time_to_visit?: string;
};

type ImageItem = {
  id?: string;
  slug?: string;
  banner_image?: string;
};

type Props = {
  items: ActivityItem[];
  images: ImageItem[];
};

export default function ThingsToDo({ items = [], images = [] }: Props) {
  const { t } = useTranslation();

  if (!items.length) {
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
      {/* HEADER */}
      <Box mb={6}>
        <Typography
          sx={{
            fontSize: { xs: '1.8rem', md: '2.4rem' },
            fontWeight: 800,
          }}
        >
          {t('other.things_to_do.title')}
        </Typography>

        <Typography
          sx={{
            mt: 1,
            color: 'text.secondary',
            maxWidth: 600,
          }}
        >
          {t('other.things_to_do.subtitle')}
        </Typography>
      </Box>

      {/* LIST */}
      <Stack spacing={4}>
        {items.map((item, index) => {
          // ✅ Match image by slug (best) or fallback to index
          const image =
            images.find((img) => img.slug === item.slug) ||
            images[index];

          return (
            <motion.div
              key={item.slug || index}
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

                  '&:hover .image': {
                    transform: 'scale(1.05)',
                  },
                }}
              >
                {/* IMAGE */}
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
                    src={`/images/activities/${image?.banner_image || 'placeholder.jpg'}`}
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

                {/* CONTENT */}
                <Box flex={1}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                  >
                    <Box>
                      <Chip
                        label={item.category || 'Activity'}
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
                    <span>⏱ {item.duration || '-'}</span>
                    <span>•</span>
                    <span>🌤 {item.best_time_to_visit || '-'}</span>
                  </Stack>

                  <Typography
                    sx={{
                      mt: 1.5,
                      fontSize: '0.9rem',
                      color: 'text.secondary',
                      lineHeight: 1.6,
                    }}
                  >
                    {item.overview || item.description || ''}
                  </Typography>
                </Box>
              </Box>

              {index !== items.length - 1 && (
                <Divider sx={{ mt: 4 }} />
              )}
            </motion.div>
          );
        })}
      </Stack>
    </Box>
  );
}