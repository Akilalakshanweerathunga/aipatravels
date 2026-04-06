"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Box, Typography, Button, Stack, Paper, Divider } from "@mui/material";
import { IoIosArrowRoundForward } from "react-icons/io";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieBanner() {
  const { t } = useTranslation();
  const [show, setShow] = useState(false);

  useEffect(() => {
    const consent = Cookies.get("cookieConsent");
    if (!consent) {
      // Small delay for a smoother entry
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAction = (status: "accepted" | "declined") => {
    Cookies.set("cookieConsent", status, { expires: 365, path: "/" });
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <Box
          component={motion.div}
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 50, opacity: 0 }}
          sx={{
            position: "fixed",
            bottom: { xs: 16, md: 24 },
            right: { xs: 16, md: 24 },
            left: { xs: 16, md: "auto" },
            maxWidth: { md: 480 },
            zIndex: 5000,
          }}
        >
          <Paper
            elevation={24}
            sx={{
              p: 3,
              borderRadius: 4,
              bgcolor: "rgba(255, 255, 255, 0.95)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(0,0,0,0.08)",
              overflow: "hidden",
            }}
          >
            <Typography variant="h6" fontWeight={800} sx={{ color: "#1a1a1a", mb: 1 }}>
              {t("cookies.title", "Privacy Preference")}
            </Typography>

            {/* FIX: Use component="div" to avoid <ul> inside <p> error */}
            <Typography 
              variant="body2" 
              component="div" 
              sx={{ color: "#444", lineHeight: 1.6 }}
            >
              <p style={{ margin: "0 0 12px 0" }}>
                {t("cookies.intro", "We use cookies to personalize your experience. This includes:")}
              </p>
              
              <ul style={{ margin: "0 0 16px 0", paddingLeft: "20px", fontSize: "0.85rem" }}>
                <li>{t("cookies.point1", "Enhanced performance")}</li>
                <li>{t("cookies.point2", "Usage analytics")}</li>
                <li>{t("cookies.point3", "Personalized recommendations")}</li>
              </ul>
              
              <Divider sx={{ mb: 2 }} />
              
              <p style={{ fontSize: "0.75rem", color: "#666", marginBottom: "16px" }}>
                {t("cookies.footer", "By clicking \"Accept All\", you agree to our storage of cookies.")}
              </p>
            </Typography>

            <Stack direction="row" spacing={1.5} justifyContent="flex-end">
              <Button
                variant="text"
                size="small"
                onClick={() => handleAction("declined")}
                sx={{ color: "#666", fontWeight: 600, textTransform: "none" }}
              >
                {t("cookies.declineAll", "Essential Only")}
              </Button>
              <Button
                variant="contained"
                onClick={() => handleAction("accepted")}
                endIcon={<IoIosArrowRoundForward />}
                sx={{
                  bgcolor: "#657a42",
                  px: 3,
                  fontWeight: 600,
                  borderRadius: 2,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#4a5a31", boxShadow: "0 4px 12px rgba(101, 122, 66, 0.3)" },
                }}
              >
                {t("cookies.acceptAll", "Accept All")}
              </Button>
            </Stack>
          </Paper>
        </Box>
      )}
    </AnimatePresence>
  );
}