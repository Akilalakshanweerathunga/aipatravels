'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardMedia,
  Typography,
  Chip,
  Button,
  Dialog,
  DialogContent,
  Divider,
  IconButton
} from '@mui/material';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useTranslation } from 'react-i18next';
import { getItineraries } from '@/lib/api';
import { images } from '@/data/images';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CheckIcon from '@mui/icons-material/Check';
import AssistantNavigationIcon from '@mui/icons-material/AssistantNavigation';
import CustomButton from '@/components/partials/RoundButton';
import CloseIcon from '@mui/icons-material/Close';
import Fade from '@mui/material/Fade';

type ItineraryType = {
  id: string;
  category_key: string;
  base_price: number;
  currency: string;
  nights: number;
  day_num: number;
  locale_tag: string;
  itinerary_days: { day_number: number; title_key: string; description_key: string }[];
  highlights: { highlight_key: string }[];
  inclusions: { inclusion_key: string }[];
};

type Props = {
  currency: string;
  rate: number;
};

const itineraryImageMap: Record<string, keyof typeof images.itineraries> = {
  tea_highland: 'teaHighland',
  cultural_triangle: 'culturalTriangle',
  wildlife_safari: 'wildlifeSafari',
  coastal_paradise: 'coastalParadise',
  grand_island: 'grandIsland',
  wellness_retreat: 'wellnessRetreat',
};

export default function Itinerary({ currency, rate }: Props) {
  const { t } = useTranslation();
  const [itineraries, setItineraries] = useState<ItineraryType[]>([]);
  const [selected, setSelected] = useState<ItineraryType | null>(null);
  const [swiperInstance, setSwiperInstance] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const data = await getItineraries();
      const mapped = data.map((i: any) => ({
        ...i,
        itinerary_days: i.itinerary_days || [],
      }));
      setItineraries(mapped);
    }
    fetchData();
  }, []);

  const convertPrice = (price: number) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(price * rate);

  const getItineraryImage = (category_key: string) => {
    const key = itineraryImageMap[category_key];
    return key ? images.itineraries[key].src : '/images/placeholder.jpg';
  };

  const getItineraryAlt = (category_key: string) => {
    const key = itineraryImageMap[category_key];
    return key ? images.itineraries[key].alt : 'Itinerary Image';
  };

  if (!itineraries.length) return <Typography>No itineraries found.</Typography>;

  return (
    <Box px={{ xs: 2, sm: 4 }} py={6}>
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={20}
        slidesPerView={1}
        loop
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        breakpoints={{
          600: { slidesPerView: 1 },
          900: { slidesPerView: 2 },
          1200: { slidesPerView: 3 },
        }}
        onSwiper={(swiper) => setSwiperInstance(swiper)}
      >
        {itineraries.map((item) => (
          <SwiperSlide key={item.id}>
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
                  image={getItineraryImage(item.category_key)}
                  alt={getItineraryAlt(item.category_key)}
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
                  {item.day_num} Days / {item.nights} Nights
                </Box>
              </Box>

              <Box p={2} flexGrow={1} display="flex" flexDirection="column" justifyContent="space-between" sx={{ minHeight: '250px' }}>
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
                      <Chip key={i} size="small" label={t(h.highlight_key)} />
                    ))}
                  </Box>
                </Box>

                <Divider sx={{ my: 2 }} />

                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography fontWeight={600}>{convertPrice(item.base_price)}</Typography>
                  <CustomButton variant="contained" sx={{bgcolor: '#657b43'}} size="small" onClick={() => setSelected(item)}>
                    {t('view more')}
                  </CustomButton>
                </Box>
              </Box>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      <Box textAlign="center" mt={4}>
        <CustomButton variant="outlined" sx={{borderColor: '#657b43', color: '#657b43'}}>Show More</CustomButton>
      </Box>
      <Box display="flex" justifyContent="center" gap={20} sx={{position: 'relative', zIndex: 1000, top: -35}}>
        <IconButton
          onClick={() => swiperInstance?.slidePrev()}
          sx={{ bgcolor: 'grey.200', '&:hover': { bgcolor: 'grey.300' } }}
        >
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton
          onClick={() => swiperInstance?.slideNext()}
          sx={{ bgcolor: 'grey.200', '&:hover': { bgcolor: 'grey.300' } }}
        >
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>


      <Dialog
        open={!!selected}
        onClose={() => setSelected(null)}
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
                image={getItineraryImage(selected.category_key)}
                alt={getItineraryAlt(selected.category_key)}
                  sx={{
                    objectFit: 'cover',
                    width: '100%',
                  }}
              />
              <IconButton
                onClick={() => setSelected(null)}
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
                    label={`${selected.day_num} Days / ${selected.nights} Nights`}
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
                gap={1.5}>
                  <Box>
                    <Typography>
                      Start From
                    </Typography>
                    <Typography fontWeight={600} fontSize={25} sx={{color: '#c7a96a'}}>
                      {convertPrice(selected.base_price)}
                    </Typography>
                  </Box>
                <Box 
                display="grid"
                gridTemplateColumns={{ xs: '1fr', sm: '1fr 1fr' }} 
                gap={1.5}
                >
                  <CustomButton variant="contained" sx={{bgcolor: '#c7a96a'}} size="small" >
                    {t('other.Book Now')}
                  </CustomButton>
                    <CustomButton variant="outlined" sx={{borderColor: '#c7a96a', color: '#c7a96a'}} size="small" >
                    {t('other.Customize')}
                  </CustomButton>
                </Box>
                </Box>
              <Divider sx={{ my: 3 }} />
              <Typography mb={3} >{t('overview')}</Typography>
              <Typography mb={3}>
                {t(`itineraries.${selected.locale_tag}.overview`)}
              </Typography>
              <Divider sx={{ my: 3 }} />
                <Typography >{t('other.Highlights')}</Typography>
                <Box
                  mt={3}
                  display="grid"
                  gridTemplateColumns="repeat(2, 1fr)"
                  gap={1}
                >
                  {selected.highlights?.slice(0, 4).map((h, i) => (
                    <Box key={i} display="flex" alignItems="center" gap={1}>
                      <AssistantNavigationIcon sx={{ color: '#C6A96B', fontSize: 20 }} />
                      <Typography sx={{ textTransform: 'capitalize' }}>
                        {t(h.highlight_key)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                <Divider sx={{ my: 3 }} />
              <Typography mb={3}>{t('Day by Day Itinerary')}</Typography>
              <Box sx={{ position: 'relative', pl: 3 }}>
                {selected.itinerary_days?.map((d, index) => (
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
                        bgcolor: '#C6A96B', 
                        border: '2px solid #fff',
                      }}
                    />

                    <Box>
                      <Typography
                        sx={{
                          fontSize: '0.75rem',
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: '#8C7A4F', 
                          mb: 0.5,
                        }}
                      >
                        Day {d.day_number}
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
                          bgcolor: '#C6A96B',
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
                What's Included
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
                        color: '#C6A96B',
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
                gap={1.5}>
                <CustomButton variant="contained" sx={{bgcolor: '#c7a96a', py: 2}} size="small" >
                  {t('other.Enquire Now')}
                </CustomButton>
                  <CustomButton variant="outlined" sx={{borderColor: '#c7a96a', color: '#c7a96a', py: 1}} size="large"  >
                  {t('other.Plan your trip')}
                </CustomButton>
              </Box>
            </Box>
          </DialogContent>
        )}
      </Dialog>

      <style jsx global>{`
        .swiper-pagination {
          margin-top: 20px !important;
          display: flex;
          justify-content: center;
        }
        .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #ccc;
          margin: 0 6px;
          border-radius: 50%;
          opacity: 1;
          transition: all 0.3s;
        }
        .swiper-pagination-bullet-active {
          background: #333;
        }
      `}</style>
    </Box>
  );
}