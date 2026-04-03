'use client';

import {
  Box,
  Card,
  CardMedia,
  Typography,
  Chip,
  Divider
} from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';

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
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        minHeight: 460,
        p: 2
      }}
    >
      {/* Image */}
      <Box mb={2}>
        <CardMedia
          component="img"
          height="200"
          image={getImage(item.category_key)}
          alt={getAlt(item.category_key)}
          sx={{
            borderRadius: 3
          }}
        />
      </Box>

      {/* Content */}
      <Box display="flex" flexDirection="column" flexGrow={1}>
        {/* Title */}
        <Typography fontWeight={600} fontSize={16}>
          {t(`itineraries.${item.locale_tag}.title`)}
        </Typography>

        {/* Overview */}
        <Typography
          variant="body2"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mt: 1
          }}
        >
          {t(`itineraries.${item.locale_tag}.overview`)}
        </Typography>

        {/* Highlights */}
        <Box mt={2} display="flex" gap={1} flexWrap="wrap" sx={{minHeight: "60px"}}>
          {item.highlights?.slice(0, 3).map((h, i) => (
            <Chip
              key={i}
              size="small"
              sx={{ textTransform: 'capitalize' }}
              label={t(h.highlight_key)}
            />
          ))}
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Info Row */}
        <Box display="block" justifyContent="space-between" alignItems="center">
          {/* Days / Nights */}
          <Box display="flex" mb={1} alignItems="center" gap={1}>
            <CalendarTodayIcon fontSize="small" />
            <Typography variant="body2">
              {item.day_num} {t('other.Days')} / {item.nights} {t('other.Nights')}
            </Typography>
          </Box>

          {/* Price */}
          <Box display="flex" alignItems="center" gap={1}>
            <AccountBalanceWalletIcon fontSize="small" />
            <Typography variant="body2" fontWeight={500}>
              {t('other.starting_from')} {convertPrice(item.base_price)}
            </Typography>
          </Box>
        </Box>

        {/* Spacer */}
        <Box flexGrow={1} />

        {/* Button */}
        <CustomButton
          fullWidth
          variant="outlined"
          onClick={() => onClick(item)}
          sx={{
            mt: 2,
            borderColor: '#657b43',
            color: '#657b43',
            '&:hover': {
              bgcolor: '#657b43',
              color: '#fff',
              borderColor: '#657b43'
            }
          }}
        >
          {t('other.view more')}
        </CustomButton>
      </Box>
    </Card>
  );
}