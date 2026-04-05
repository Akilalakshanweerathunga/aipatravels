'use client';

import { Box, CardMedia, Typography, Divider } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import AssistantNavigationIcon from '@mui/icons-material/AssistantNavigation';
import { ItineraryType } from '@/types/itinerary';

type Props = {
  selected: ItineraryType;
  onClose: () => void;
  t: any;
  convertPrice: (price: number) => string;
  getImage: (key: string) => string;
  getAlt: (key: string) => string;
  isPageView?: boolean;
};

export default function ItineraryDetails({
  selected,
  t,
  convertPrice,
  getImage,
  getAlt,
  isPageView = false
}: Props) {
  return (
    <Box>
      <Box position="relative">
        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
          }}
        />
      </Box>

      <Box p={isPageView ? 5 : 3}>
        
        <Typography variant="h6" fontWeight={700} mb={2}>{t('other.Highlights')}</Typography>
        <Box 
          sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 2, 
            mb: 4 
          }}
        >
          {selected.highlights?.map((h, i) => (
            <Box 
              key={i} 
              sx={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                gap: 1.5,
                width: { xs: '100%', sm: '45%' } // Simulates 2-column feel
              }}
            >
              <AssistantNavigationIcon sx={{ color: '#657b43', mt: 0.3 }} />
              <Typography variant="body2" fontWeight={500}>{t(h.highlight_key)}</Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Day by Day */}
        <Typography variant="h6" fontWeight={700} mb={4}>{t('other.Day by Day Itinerary')}</Typography>
        <Box>
          {selected.itinerary_days?.map((d) => (
            <Box 
              key={d.day_number} 
              sx={{ 
                pl: 4, pb: 4, 
                borderLeft: '2px solid #657b4320', 
                position: 'relative',
                '&:last-child': { borderLeft: 'none', pb: 0 } 
              }}
            >
              <Box 
                sx={{ 
                  position: 'absolute', left: -9, top: 0, 
                  width: 16, height: 16, borderRadius: '50%', 
                  bgcolor: '#657b43', border: '3px solid #fff' 
                }} 
              />
              <Typography variant="overline" color="#657b43" fontWeight={700} sx={{ display: 'block' }}>
                {t('other.Days')} {d.day_number}
              </Typography>
              <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                {t(`itineraries.${selected.locale_tag}.days.day${d.day_number}_title`)}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {t(`itineraries.${selected.locale_tag}.days.day${d.day_number}_desc`)}
              </Typography>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 4 }} />

        {/* Inclusions - Flexbox wrap instead of Grid */}
        <Typography variant="h6" fontWeight={700} mb={2}>{t('other.whatsIncluded')}</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
          {selected.inclusions?.map((inc, i) => (
            <Box 
              key={i} 
              sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1,
                width: { xs: '100%', sm: '48%' } 
              }}
            >
              <CheckIcon sx={{ color: '#657b43', fontSize: 20 }} />
              <Typography variant="body2">{t(`itineraries.${selected.locale_tag}.inclusions.${inc.inclusion_key}`)}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}