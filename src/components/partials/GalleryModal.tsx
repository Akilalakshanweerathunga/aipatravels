'use client';

import { Dialog, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { getImagePath } from '@/utils/gallery';

export default function GalleryModal({
  images,
  onClose,
}: {
  images: string[];
  onClose: () => void;
}) {
  return (
    <Dialog open fullScreen onClose={onClose}>
      {/* CLOSE BUTTON */}
      <IconButton
        onClick={onClose}
        sx={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 10,
          color: '#fff',
          bgcolor: 'rgba(0,0,0,0.5)',
        }}
      >
        <CloseIcon />
      </IconButton>

      {/* GRID */}
      <Box
        sx={{
          p: { xs: 2, md: 4 },
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: 'repeat(3, 1fr)',
          },
          gap: 2,
          bgcolor: '#000',
          minHeight: '100vh',
        }}
      >
        {images.map((img, i) => (
          <Box
            key={i}
            component="img"
            src={getImagePath(img)}
            sx={{
              width: '100%',
              borderRadius: 2,
              objectFit: 'cover',
              transition: '0.3s',
              '&:hover': {
                transform: 'scale(1.03)',
              },
            }}
          />
        ))}
      </Box>
    </Dialog>
  );
}