'use client';

import {
  Box,
  CardMedia,
  Typography,
  Chip,
  Dialog,
  DialogContent,
  Divider,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';
import CheckIcon from '@mui/icons-material/Check';
import AssistantNavigationIcon from '@mui/icons-material/AssistantNavigation';
import CustomButton from '@/components/partials/RoundButton';
import { ItineraryType } from '@/types/itinerary';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

type Props = {
  selected: ItineraryType | null;
  onClose: () => void;
  t: any;
  convertPrice: (price: number) => string;
  getImage: (key: string) => string;
  getAlt: (key: string) => string;
};

export default function ItineraryDialog({
  selected,
  onClose,
  t,
  convertPrice,
  getImage,
  getAlt
}: Props) {

  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  return (
    <Dialog
      open={!!selected}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      TransitionComponent={Fade}
      transitionDuration={300}
    >
      {selected && (
        <DialogContent sx={{ p: 0 }}>
          <Box position="relative">
            <CardMedia
              component="img"
              height="260"
              image={getImage(selected.category_key)}
              alt={getAlt(selected.category_key)}
              sx={{
                objectFit: 'cover',
                width: '100%',
              }}
            />

            <IconButton
              onClick={onClose}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                zIndex: 3,
                backdropFilter: 'blur(8px)',
                background: 'rgba(255,255,255,0.25)',
                border: '1px solid rgba(255,255,255,0.3)',
                color: '#fff',
                borderRadius: '50%',
                '&:hover': {
                  background: 'rgba(255,255,255,0.4)',
                },
              }}
            >
              <CloseIcon />
            </IconButton>

            <Box
              sx={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(rgba(0,0,0,0.2), rgba(0,0,0,0.6))',
              }}
            />

            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                left: 16,
                color: '#fff',
              }}
            >
              <Typography variant="h5" fontWeight={700}>
                {t(`itineraries.${selected.locale_tag}.title`)}
              </Typography>

              <Box mt={1}>
                <Chip
                  label={`${selected.day_num} ${t(`other.Days`)} / ${selected.nights} ${t(`other.Nights`)}`}
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.2)',
                    color: '#fff',
                    fontWeight: 500,
                  }}
                />
              </Box>
            </Box>
          </Box>

          <Box p={3}>
            <Box
              display="grid"
              gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}
              gap={1.5}
            >
              <Box>
                <Typography>{t('other.Start From')}</Typography>
                <Typography fontWeight={600} fontSize={25} sx={{ color: '#657b43' }}>
                  {convertPrice(selected.base_price)}
                </Typography>
              </Box>

              <Box
                display="grid"
                gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}
                gap={1.5}
              >
                <Link href={`/${currentLocale}/itineraries/inquiry/${selected.slug}`} passHref>
                  <CustomButton variant="contained" sx={{ bgcolor: '#657b43', width: '100%' }} >
                    {t('other.Book Now')}
                  </CustomButton>
                </Link>

                <Link href={`/${currentLocale}/tailor-made`} passHref>
                  <CustomButton variant="outlined" sx={{ borderColor: '#657b43', color: '#657b43', width: '100%' }} >
                    {t('other.Customize')}
                  </CustomButton>
                </Link>

              </Box>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography mb={3}>{t('other.overview')}</Typography>
            <Typography mb={3}>
              {t(`itineraries.${selected.locale_tag}.overview`)}
            </Typography>

            <Divider sx={{ my: 3 }} />

            <Typography>{t('other.Highlights')}</Typography>
            <Box
              mt={3}
              display="grid"
              gridTemplateColumns="repeat(2, 1fr)"
              gap={1}
            >
              {selected.highlights?.slice(0, 4).map((h, i) => (
                <Box key={i} display="flex" alignItems="center" gap={1}>
                  <AssistantNavigationIcon sx={{ color: '#657b43', fontSize: 20 }} />
                  <Typography sx={{ textTransform: 'capitalize' }}>
                    {t(h.highlight_key)}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography mb={3}>{t('other.Day by Day Itinerary')}</Typography>

            {/* ✅ ORIGINAL TIMELINE DESIGN (UNCHANGED) */}
            <Box sx={{ position: 'relative', pl: 3 }}>
              {selected.itinerary_days?.map((d) => (
                <Box
                  key={d.day_number}
                  sx={{
                    position: 'relative',
                    pl: 6,
                    pb: 4,
                    borderLeft: '1px solid rgba(0,0,0,0.12)',
                  }}
                >
                  <Box
                    sx={{
                      position: 'absolute',
                      left: -5,
                      top: 6,
                      width: 10,
                      height: 10,
                      borderRadius: '50%',
                      bgcolor: '#657b43',
                      border: '2px solid #fff',
                    }}
                  />

                  <Box>
                    <Typography
                      sx={{
                        fontSize: '0.75rem',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: '#657b43',
                        mb: 0.5,
                      }}
                    >
                      {t('other.day')} {d.day_number}
                    </Typography>

                    <Typography
                      sx={{
                        fontWeight: 600,
                        fontSize: '1.05rem',
                        color: '#1A1A1A',
                        mb: 0.5,
                      }}
                    >
                      {t(`itineraries.${selected.locale_tag}.days.day${d.day_number}_title`)}
                    </Typography>

                    <Box
                      sx={{
                        width: 30,
                        height: '1px',
                        bgcolor: '#657b43',
                        mb: 1,
                      }}
                    />

                    <Typography
                      sx={{
                        fontSize: '0.9rem',
                        lineHeight: 1.7,
                        color: '#555',
                      }}
                    >
                      {t(`itineraries.${selected.locale_tag}.days.day${d.day_number}_desc`)}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography fontWeight={600} mb={2}>
              {t('other.whatsIncluded')}
            </Typography>

            <Box
              display="grid"
              gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}
              gap={1.5}
            >
              {selected.inclusions?.map((inc, i) => (
                <Box key={i} display="flex" alignItems="center">
                  <CheckIcon
                    sx={{
                      color: '#657b43',
                      fontSize: 18,
                      mr: 1
                    }}
                  />
                  <Typography sx={{ textTransform: 'capitalize' }}>
                    {t(`itineraries.${selected.locale_tag}.inclusions.${inc.inclusion_key}`)}
                  </Typography>
                </Box>
              ))}
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box
              display="grid"
              gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }}
              gap={1.5}
            >
              <Link href={`/${currentLocale}/itineraries/inquiry/${selected.slug}`} passHref>
                <CustomButton variant="contained" sx={{ bgcolor: '#657b43', py: 2, width: '100%' }} >
                  {t('other.Enquire Now')}
                </CustomButton>
              </Link>
              <Link href={`/${currentLocale}/tailor-made`} passHref>
                <CustomButton variant="outlined" sx={{ borderColor: '#657b43', color: '#657b43', py: 2, width: '100%'  }}>
                  {t('other.Plan your trip')}
                </CustomButton>
              </Link>
            </Box>
          </Box>
        </DialogContent>
      )}
    </Dialog>
  );
}