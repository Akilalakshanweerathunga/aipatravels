'use client';

import { useEffect, useState } from 'react';
import { Box, Typography, Container, Skeleton, Chip } from '@mui/material';
import { useTranslation } from 'react-i18next';

import { getDestinations } from '@/lib/api';
import { images } from '@/data/images';

import DestinationCard from './partials/DestinationCard';
import DestinationDialog from './partials/DestinationDialog';
import CustomButton from '@/components/partials/RoundButton';

/* ✅ TYPE SAFE IMAGE KEY */
type DestinationImageKey = keyof typeof images.destinations;

/* ✅ OPTIONAL: better typing for destination */
type DestinationType = {
  id: string;
  category_key: string;
  base_price: number;
  nights: number;
  locale_tag: string;
  highlights?: { highlight_key: string }[];
};

export default function DestinationSection() {
  const { t } = useTranslation();

  const [destinations, setDestinations] = useState<DestinationType[]>([]);
  const [filtered, setFiltered] = useState<DestinationType[]>([]);
  const [categories, setCategories] = useState<{ key: string; label: string }[]>([]);
  const [selected, setSelected] = useState<DestinationType | null>(null);
  const [loading, setLoading] = useState(true);

  const [visibleCount, setVisibleCount] = useState(6);
  const [activeFilter, setActiveFilter] = useState('all');

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const data: DestinationType[] = await getDestinations();

      setDestinations(data);
      setFiltered(data);

      const uniqueCategories = Array.from(
        new Set(data.map((d) => d.category_key))
      ).map((key) => ({
        key,
        label: key,
      }));

      setCategories([{ key: 'all', label: 'all' }, ...uniqueCategories]);

      setLoading(false);
    }

    fetchData();
  }, []);

  const handleFilter = (key: string) => {
    setActiveFilter(key);
    setVisibleCount(6);

    if (key === 'all') {
      setFiltered(destinations);
    } else {
      setFiltered(destinations.filter((d) => d.category_key === key));
    }
  };

  /* ✅ FIXED: TYPE-SAFE IMAGE ACCESS */
  const getImage = (key: string) => {
    const typedKey = key as DestinationImageKey;

    return (
      images.destinations[typedKey]?.src || '/images/placeholder.jpg'
    );
  };

  const getAlt = (key: string) => {
    const typedKey = key as DestinationImageKey;

    return (
      images.destinations[typedKey]?.alt || 'Destination Image'
    );
  };

  return (
    <>
      <Box py={{ xs: 4, md: 6 }}>
        <Container maxWidth="lg">

          {/* FILTER */}
          <Box mb={4} display="flex" gap={1} flexWrap="wrap">
            {categories.map((cat) => (
              <Chip
                key={cat.key}
                label={t(`categories.${cat.key}`)}
                onClick={() => handleFilter(cat.key)}
                sx={{
                  cursor: 'pointer',
                  bgcolor:
                    activeFilter === cat.key ? 'primary.main' : 'grey.100',
                  color: activeFilter === cat.key ? '#fff' : '#000',
                }}
              />
            ))}
          </Box>

          {/* GRID */}
          <Box
            display="grid"
            gridTemplateColumns={{
              xs: '1fr',
              sm: '1fr 1fr',
              md: '1fr 1fr 1fr',
            }}
            gap={3}
          >
            {loading &&
              Array.from({ length: 6 }).map((_, i) => (
                <Box key={i}>
                  <Skeleton variant="rectangular" height={200} />
                  <Skeleton height={30} sx={{ mt: 1 }} />
                </Box>
              ))}

            {!loading &&
              filtered.slice(0, visibleCount).map((item) => (
                <DestinationCard
                  key={item.id}
                  item={item}
                  onClick={setSelected}
                  t={t}
                  getImage={getImage}
                  getAlt={getAlt}
                />
              ))}
          </Box>

          {/* LOAD MORE */}
          {!loading && visibleCount < filtered.length && (
            <Box textAlign="center" mt={5}>
              <CustomButton onClick={() => setVisibleCount((p) => p + 6)}>
                {t('Show More')}
              </CustomButton>
            </Box>
          )}

          {!loading && !filtered.length && (
            <Typography textAlign="center" mt={4}>
              No destinations found.
            </Typography>
          )}
        </Container>
      </Box>

      <DestinationDialog
        selected={selected}
        onClose={() => setSelected(null)}
        t={t}
        getImage={getImage}
        getAlt={getAlt}
      />
    </>
  );
}