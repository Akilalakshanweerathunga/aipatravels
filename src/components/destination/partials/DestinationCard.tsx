'use client';

import { Box, Card, CardMedia, Typography, Chip } from '@mui/material';
import CustomButton from '@/components/partials/RoundButton';

export default function DestinationCard({ item, onClick, t, getImage, getAlt }: any) {
  return (
    <Card sx={{ borderRadius: 3, overflow: 'hidden', minHeight: 420 }}>
      <Box position="relative">
        <CardMedia
          component="img"
          height="200"
          image={getImage(item.category_key)}
          alt={getAlt(item.category_key)}
        />

        <Box
          position="absolute"
          top={10}
          right={10}
          bgcolor="rgba(0,0,0,0.6)"
          color="white"
          px={1}
          borderRadius={2}
        >
          {item.nights} {t('other.Nights')}
        </Box>
      </Box>

      <Box p={2}>
        <Typography fontWeight={600}>
          {t(`destinations.${item.locale_tag}.title`)}
        </Typography>

        <Typography mt={1} variant="body2">
          {t(`destinations.${item.locale_tag}.overview`)}
        </Typography>

        <Box mt={2} display="flex" gap={1} flexWrap="wrap">
          {item.highlights?.map((h: any, i: number) => (
            <Chip key={i} label={t(h.highlight_key)} size="small" />
          ))}
        </Box>

        <Box mt={2} display="flex" justifyContent="space-between">
          <Typography fontWeight={600}>
            ${item.base_price}
          </Typography>

          <CustomButton size="small" onClick={() => onClick(item)}>
            {t('view more')}
          </CustomButton>
        </Box>
      </Box>
    </Card>
  );
}