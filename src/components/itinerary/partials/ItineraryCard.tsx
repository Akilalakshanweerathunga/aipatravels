'use client';

import {
  Box,
  Card,
  CardMedia,
  Typography,
  Chip,
  Divider
} from '@mui/material';
import CustomButton from '@/components/partials/RoundButton';

import { ItineraryType } from '@/types/itinerary';

type Props = {
  item: ItineraryType;
  onClick: (item: ItineraryType) => void;
  t: any;
  convertPrice: (price: number) => string;
  getImage: (key: string) => string;
  getAlt: (key: string) => string;
};

export default function ItineraryCard({
  item,
  onClick,
  t,
  convertPrice,
  getImage,
  getAlt
}: Props) {
  return (
    <Card
      sx={{
        borderRadius: 3,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 450,
        marginBottom: 5
      }}
    >
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
          bgcolor="rgba(0,0,0,0.7)"
          color="white"
          px={1.5}
          py={0.5}
          borderRadius={2}
          fontSize={12}
        >
          {item.day_num} {t(`other.Days`)} / {item.nights} {t(`other.Nights`)}
        </Box>
      </Box>

      <Box
        p={2}
        flexGrow={1}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        sx={{ minHeight: '250px' }}
      >
        <Box>
          <Typography fontWeight={600} fontSize={16}>
            {t(`itineraries.${item.locale_tag}.title`)}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              mt: 1,
            }}
          >
            {t(`itineraries.${item.locale_tag}.overview`)}
          </Typography>

          <Box mt={3} display="flex" gap={1} flexWrap="wrap">
            {item.highlights?.slice(0, 4).map((h, i) => (
              <Chip key={i} size="small" sx={{textTransform: 'capitalize'}} label={t(h.highlight_key)} />
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography fontWeight={600}>
            {convertPrice(item.base_price)}
          </Typography>
          <CustomButton
            variant="contained"
            sx={{ bgcolor: '#657b43' }}
            size="small"
            onClick={() => onClick(item)}
          >
            {t('view more')}
          </CustomButton>
        </Box>
      </Box>
    </Card>
  );
}