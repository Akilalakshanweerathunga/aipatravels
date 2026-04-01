'use client';

import { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Skeleton,
  Chip
} from '@mui/material';
import { useTranslation } from 'react-i18next';

import { getItineraries } from '@/lib/api';
import { images } from '@/data/images';

import ItineraryCard from '@/components/itinerary/partials/ItineraryCard';
import ItineraryDialog from '@/components/itinerary/partials/ItineraryDialog';
import CustomButton from '@/components/partials/RoundButton';
import { motion, useInView, useAnimation } from "framer-motion";

import { ItineraryType } from '@/types/itinerary';

export default function ItinerarySection() {
  const { t } = useTranslation();

  const [itineraries, setItineraries] = useState<ItineraryType[]>([]);
  const [filtered, setFiltered] = useState<ItineraryType[]>([]);
  const [categories, setCategories] = useState<{ key: string; label: string }[]>([]);
  const [itineraryImageMap, setItineraryImageMap] = useState<Record<string, string>>({});

  const [selected, setSelected] = useState<ItineraryType | null>(null);
  const [loading, setLoading] = useState(true);

  const [visibleCount, setVisibleCount] = useState(6);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const currency = 'USD';
  const rate = 1;

  const containerRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(containerRef, { once: true });
  
  useEffect(() => {
      if (isInView) controls.start("visible");
    }, [controls, isInView]);
    const typingVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.05,
      },
    }),
  };
  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const itineraryData = await getItineraries();

      const mapped = itineraryData.map((i: any) => ({
        ...i,
        itinerary_days: i.itinerary_days || [],
      }));

      setItineraries(mapped);
      setFiltered(mapped);

      const uniqueCategories = Array.from(new Set(mapped.map((i) => i.category_key)))
        .map((key) => ({
          key,
          label: key.replace(/_/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()),
        }));
      setCategories([{ key: 'all', label: 'All' }, ...uniqueCategories]);

      const imageMap: Record<string, string> = {};
      mapped.forEach((i) => {
        if (i.category_key && i.images) {
          imageMap[i.category_key] = i.images;
        }
      });
      setItineraryImageMap(imageMap);

      setLoading(false);
    }

    fetchData();
  }, []);

  const handleFilter = (key: string) => {
    setActiveFilter(key);
    setVisibleCount(6);

    if (key === 'all') {
      setFiltered(itineraries);
    } else {
      setFiltered(itineraries.filter((i) => i.category_key === key));
    }
  };

  const convertPrice = (price: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
    }).format(price * rate);

  const getItineraryImage = (category_key: string) => {
    const key = itineraryImageMap[category_key] as keyof typeof images.itineraries;
    return key ? images.itineraries[key].src : '/images/placeholder.jpg';
  };

  const getItineraryAlt = (category_key: string) => {
    const key = itineraryImageMap[category_key] as keyof typeof images.itineraries;
    return key ? images.itineraries[key].alt : 'Itinerary Image';
  };

  return (
    <>
      <Box py={{ xs: 4, md: 6 }}>
        <Box
          sx={{
            width: '100%',
            maxWidth: (theme) => theme.breakpoints.values.lg,
            mx: 'auto',
            px: { xs: 2, sm: 3, md: 4 }, 
          }}
        >
        <Box ref={containerRef} sx={{ position: "relative" }}>

          
        <Box
          sx={{
            textAlign: 'center',
            mb: { xs: 4, sm: 5, md: 6 },
            px: { xs: 1.5, sm: 2, md: 0 },
          }}
        >
          <Chip
            label={t('itineraries.chipText')}
            sx={{
              bgcolor: "#e7f2fa",
              color: "#1b4695",
              backdropFilter: "blur(8px)",
              fontWeight: 500,
              fontSize: { xs: '0.75rem', sm: '0.9rem', md: '1rem' },
              height: { xs: 28, sm: 32, md: 36 },
              px: { xs: 1, sm: 1.5 },
            }}
          />

          <Typography
            sx={{
              fontWeight: 700,
              mt: 2,
              fontSize: {
                xs: '1.6rem',
                sm: '2.2rem',
                md: '3rem',
                lg: '3.5rem',
              },
              lineHeight: 1.25,
              letterSpacing: "-0.5px",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {Array.from(t('itineraries.animeText')).map((char, index) => (
              <motion.span
                key={index}
                custom={index}
                initial="hidden"
                animate={controls}
                variants={typingVariants}
              >
                {char}
              </motion.span>
            ))}
          </Typography>
        </Box>
            <Box
              mb={4}
              display="flex"
              gap={1}
              flexWrap="wrap"
              sx={{ overflowX: { xs: 'auto', md: 'visible' } }}
            >
              {categories.map((cat) => (
                <Chip
                  key={cat.key}
                  label={t(`categories.${cat.label}`)} 
                  onClick={() => handleFilter(cat.key)}
                  sx={{
                    flexShrink: 0,
                    cursor: 'pointer',
                    bgcolor: activeFilter === cat.key ? '#657b43' : '#eee',
                    color: activeFilter === cat.key ? '#fff' : '#000',
                  }}
                />
              ))}
            </Box>

            <Box
              display="grid"
              gridTemplateColumns={{
                xs: '1fr',
                sm: '1fr 1fr',
                md: '1fr 1fr 1fr'
              }}
              gap={{ xs: 2, md: 3 }}
            >
              {loading &&
                Array.from({ length: 6 }).map((_, i) => (
                  <Box key={i}>
                    <Skeleton variant="rectangular" height={200} />
                    <Skeleton height={30} sx={{ mt: 1 }} />
                    <Skeleton height={20} />
                  </Box>
                ))}

              {!loading &&
                filtered.slice(0, visibleCount).map((item) => (
                  <ItineraryCard
                    key={item.id}
                    item={item}
                    onClick={(item) => setSelected(item)}
                    t={t}
                    convertPrice={convertPrice}
                    getImage={getItineraryImage}
                    getAlt={getItineraryAlt}
                  />
                ))}
            </Box>


            {!loading && visibleCount < filtered.length && (
              <Box textAlign="center" mt={5}>
                <CustomButton
                  variant="outlined"
                  sx={{ borderColor: '#657b43', color: '#657b43' }}
                  onClick={() => setVisibleCount((prev) => prev + 6)}
                >
                  {t('Show More')}
                </CustomButton>
              </Box>
            )}

            {!loading && !filtered.length && (
              <Typography textAlign="center" mt={4}>
                No itineraries found.
              </Typography>
            )}
          </Box>
        </Box>
      </Box>

      <ItineraryDialog
        selected={selected}
        onClose={() => setSelected(null)}
        t={t}
        convertPrice={convertPrice}
        getImage={getItineraryImage}
        getAlt={getItineraryAlt}
      />
    </>
  );
}