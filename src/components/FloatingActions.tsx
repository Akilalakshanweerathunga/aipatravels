"use client";

import { useEffect, useState } from "react";
import { Fab, Zoom, Box, Tooltip } from "@mui/material";
import { KeyboardArrowUp, WhatsApp } from "@mui/icons-material";
import { motion, AnimatePresence } from "framer-motion";
import { company } from "@/data/company";

export default function FloatingActions() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${company.whatsapp}`, "_blank");
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 24,
        right: 24,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        zIndex: 2000,
      }}
    >
      <Tooltip title="Chat with us" placement="left">
        <Fab
          color="success"
          size="medium"
          onClick={openWhatsApp}
          component={motion.button}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          sx={{
            bgcolor: "#25D366", 
            "&:hover": { bgcolor: "#128C7E" },
          }}
        >
          <WhatsApp />
        </Fab>
      </Tooltip>

      <AnimatePresence>
        {isVisible && (
          <Tooltip title="Scroll to Top" placement="left">
            <Fab
              color="primary"
              size="medium"
              onClick={scrollToTop}
              component={motion.button}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              whileHover={{ scale: 1.1 }}
              sx={{
                bgcolor: "#657a42",
                "&:hover": { bgcolor: "#4a5a31" },
              }}
            >
              <KeyboardArrowUp />
            </Fab>
          </Tooltip>
        )}
      </AnimatePresence>
    </Box>
  );
}