'use client';

import { Dialog, Box, Typography, CardMedia } from '@mui/material';

export default function DestinationDialog({ selected, onClose, t, getImage, getAlt }: any) {
  if (!selected) return null;

  return (
    <Dialog open={!!selected} onClose={onClose} maxWidth="md" fullWidth>
      <Box>
        <CardMedia
          component="img"
          height="300"
          image={getImage(selected.category_key)}
          alt={getAlt(selected.category_key)}
        />

        <Box p={3}>
          <Typography variant="h5" fontWeight={600}>
            {t(`destinations.${selected.locale_tag}.title`)}
          </Typography>

          <Typography mt={2}>
            {t(`destinations.${selected.locale_tag}.overview`)}
          </Typography>

          <Typography mt={3} fontWeight={600}>
            ${selected.base_price}
          </Typography>
        </Box>
      </Box>
    </Dialog>
  );
}