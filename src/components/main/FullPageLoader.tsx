"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Lottie from "lottie-react";
import travelerAnimation from "@/loading/Traveler.json";
import { useTranslation } from "react-i18next";
import { company } from "@/data/company";
export default function FullPageLoader() {
  const [isClient, setIsClient] = useState(false);
  const { t } = useTranslation();


  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        zIndex: 9999,
        px: 2,
      }}
    >
      {/* Lottie Animation */}
      <Box sx={{ width: { xs: 180, sm: 300 }, mb: 3 }}>
        <Lottie animationData={travelerAnimation} loop={true} />
      </Box>

      {/* Brand Name */}
      <Typography
        variant="h4"
        sx={{
          color: "#333",
          fontWeight: 700,
          textAlign: "center",
          mb: 1,
        }}
      >
        {company.name}
      </Typography>

      {/* Loading text */}
      <Typography
        variant="subtitle1"
        sx={{
          color: "#666",
          textAlign: "center",
        }}
      >
        {t('other.loading')}
      </Typography>
    </Box>
  );
}