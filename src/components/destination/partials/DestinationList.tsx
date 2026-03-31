'use client';

import { useState, useEffect, useRef } from "react";
import { Box, Typography, Chip, Button, Stack } from "@mui/material";
import DestinationCard from "./DestinationCard";
import { Destination } from '@/types/destination';
import { motion, useInView, useAnimation } from "framer-motion";
import { useTranslation } from 'react-i18next';

type Props = {
  data: Destination[];
  locale: string;
};

export default function DestinationList({ data, locale }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); // default desktop
  const containerRef = useRef(null);
  const { t } = useTranslation();

  // Responsive items per page
  useEffect(() => {
    const updateItems = () => {
      const width = window.innerWidth;
      if (width < 900) setItemsPerPage(4); // mobile/tablet
      else setItemsPerPage(8); // desktop
      setCurrentPage(1); // reset page when resizing
    };
    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Scroll-triggered animation for header
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

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: (theme) => theme.breakpoints.values.xl,
        mx: 'auto',
        px: { xs: 2, sm: 3, md: 4 },
        py: { xs: 4, sm: 5, md: 6 },
      }}
    >
      <Box ref={containerRef} sx={{ position: "relative" }}>
      {/* Header Section */}
      <Box
        sx={{
          textAlign: 'center',
          mb: { xs: 4, sm: 5, md: 6 },
          px: { xs: 1.5, sm: 2, md: 0 },
        }}
      >
        <Chip
          label={t('other.Most visited locations')}
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
          {Array.from(t('other.Your next favorite place awaits')).map((char, index) => (
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

      {/* Grid Section */}
      <Box
        sx={{
          display: "grid",
          gap: { xs: 2, sm: 3, md: 4 },
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
        }}
      >
        {paginatedData.map(dest => (
          <DestinationCard key={dest.id} destination={dest} locale={locale} />
        ))}
      </Box>

      {/* Pagination Buttons */}
      {totalPages > 1 && (
        <Stack
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 4 }}
        >
          <Button
            variant="outlined"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
          >
            Prev
          </Button>
          <Typography sx={{ display: "flex", alignItems: "center" }}>
            Page {currentPage} of {totalPages}
          </Typography>
          <Button
            variant="outlined"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(prev => prev + 1)}
          >
            Next
          </Button>
        </Stack>
      )}
      </Box>
    </Box>
  );
}