'use client';

import { Box, Typography } from '@mui/material';
import { useState } from 'react';
import GalleryModal from '../partials/GalleryModal';
import { getGalleryImages, getImagePath } from '@/utils/gallery';

export default function DestinationGallery({
  destination,
  activities = [],
}: {
  destination: any;
  activities: any[];
}) {
  const [open, setOpen] = useState(false);

  const images = getGalleryImages(destination, activities);

  if (!images.length) return null;

  const preview = images.slice(0, 5);
  const remaining = images.length - 5;

  return (
    <>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            md: '2fr 1fr',
          },
          gap: 1,
          borderRadius: 4,
          overflow: 'hidden',
          height: { xs: 300, md: 420 },
          cursor: 'pointer',
          px: { xs: 2, md: 4 },
          py: { xs: 4, md: 6 },
        }}
      >
        {/* BIG IMAGE */}
        <Box
          component="img"
          src={getImagePath(preview[0])}
          onClick={() => setOpen(true)}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />

        {/* RIGHT GRID */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: 1,
          }}
        >
          {preview.slice(1, 5).map((img, i) => {
            const isLast = i === 3;

            return (
              <Box key={i} onClick={() => setOpen(true)} sx={{ position: 'relative' }}>
                <Box
                  component="img"
                  src={getImagePath(img)}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />

                {isLast && remaining > 0 && (
                  <Box
                    sx={{
                      position: 'absolute',
                      inset: 0,
                      bgcolor: 'rgba(0,0,0,0.5)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography sx={{ color: '#fff', fontWeight: 700 }}>
                      +{remaining} more
                    </Typography>
                  </Box>
                )}
              </Box>
            );
          })}
        </Box>
      </Box>

      {open && (
        <GalleryModal images={images} onClose={() => setOpen(false)} />
      )}
    </>
  );
}