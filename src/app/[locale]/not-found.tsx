"use client";

import { Box, Typography, Button } from "@mui/material";
import Lottie from "lottie-react";
import notFoundAnimation from "../../../public/404.json";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f9fafb, #eef2f7)",
        textAlign: "center",
        px: 2,
      }}
    >
      {/* Animation */}
      <Box
        sx={{ width: { xs: 260, md: 420 }, mb: 3 }}
        component={motion.div}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <Lottie animationData={notFoundAnimation} loop />
      </Box>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 2,
            background: "linear-gradient(90deg, #0ea5e9, #22c55e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {t("notFound.title")}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            fontSize: 17,
            color: "#555",
            mb: 4,
            maxWidth: 500,
            mx: "auto",
            lineHeight: 1.7,
          }}
        >
          {t("notFound.description")}
        </Typography>
      </motion.div>

      {/* Button */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="contained"
          href="/"
          sx={{
            px: 5,
            py: 1.5,
            fontWeight: 600,
            borderRadius: "999px",
            background: "linear-gradient(90deg, #0ea5e9, #22c55e)",
            boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
            "&:hover": {
              opacity: 0.9,
            },
          }}
        >
          {t("notFound.button")}
        </Button>
      </motion.div>
    </Box>
  );
}