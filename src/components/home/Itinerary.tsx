'use client';

import { useState, useEffect } from 'react';
import {
  Box,
  Typography,
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
import CustomButton from '@/components/partials/RoundButton';
import { ItineraryType } from '@/types/itinerary';

import ItineraryCard from '@/components/partials/ItineraryCard';
import ItineraryDialog from '@/components/partials/ItineraryDialog';


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
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(price * rate);

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
            <ItineraryCard
              item={item}
              onClick={setSelected}
              t={t}
              convertPrice={convertPrice}
              getImage={getItineraryImage}
              getAlt={getItineraryAlt}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <Box textAlign="center" mt={4}>
        <CustomButton
          variant="outlined"
          sx={{ borderColor: '#657b43', color: '#657b43' }}
        >
          Show More
        </CustomButton>
      </Box>

      <Box
        display="flex"
        justifyContent="center"
        gap={20}
        sx={{ position: 'relative', zIndex: 1000, top: -35 }}
      >
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

      {/* ✅ REUSABLE DIALOG */}
      <ItineraryDialog
        selected={selected}
        onClose={() => setSelected(null)}
        t={t}
        convertPrice={convertPrice}
        getImage={getItineraryImage}
        getAlt={getItineraryAlt}
      />

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