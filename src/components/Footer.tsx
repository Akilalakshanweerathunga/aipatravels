"use client";

import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
} from "@mui/material";
import {
  Facebook,
  Instagram,
  YouTube,
  WhatsApp,
} from "@mui/icons-material";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { company } from "@/data/company";
import { navLinks } from '@/data/links';
import { usePathname } from 'next/navigation';

interface NavbarProps {
  locale?: string;
}

export default function Footer({ locale }: NavbarProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState(locale || 'en');
  return (
    <Box sx={{ bgcolor: "#1b1b1b", color: "#ccc", px: 8, py: 8 }}>
      
      <Box display="flex" flexWrap="wrap" justifyContent="space-between" gap={5}>
        
        <Box maxWidth={320}>
          <Typography variant="h5" sx={{ fontWeight: 800, color: "#9bb96d" }}>
            {company.name}
          </Typography>

          <Typography sx={{ fontSize: 14, opacity: 0.7, my: 2 }}>
            {t("footer.description")}
          </Typography>

          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <WhatsApp sx={{ color: "#9bb96d" }} />
            <Typography fontSize={14}>{company.phone}</Typography>
          </Box>

          <Typography fontSize={13} sx={{ opacity: 0.7, mb: 2 }}>
            {company.email}
          </Typography>

          <Box>
            {[Facebook, Instagram, YouTube].map((Icon, i) => (
              <IconButton
                key={i}
                sx={{
                  border: "1px solid #444",
                  color: "#aaa",
                  mr: 1,
                  "&:hover": {
                    color: "#9bb96d",
                    borderColor: "#9bb96d",
                  },
                }}
              >
                <Icon fontSize="small" />
              </IconButton>
            ))}
          </Box>
        </Box>

        <Box display="flex" flexWrap="wrap" gap={6}>
          
          <Box>
            <Typography sx={{ color: "#9bb96d", mb: 2 }}>
              {t("footer.links")}
            </Typography>
          {navLinks.map((link) => {
              const fullPath = `/${currentLocale}${link.path}`;
              const isActive = pathname === fullPath;
              return (
                <Button
                  key={link.name}
                  component={Link}
                  href={fullPath}
                   sx={btnStyle}
                >
                  {t(link.name)}
                </Button>
              );
            })}
          </Box>

          <Box>
            <Typography sx={{ color: "#9bb96d", mb: 2 }}>
              {t("footer.itineraries")}
            </Typography>

            {["culturalTriangleItinerary", "teaHighlandItinerary", "wildlifeSafariItinerary", "coastalParadiseItinerary", "grandIslandItinerary", "wellnessRetreatItinerary"].map((key) => (
              <Button key={key} sx={btnStyle}>
                {t(`itineraries.${key}.title`)}
              </Button>
            ))}
          </Box>

          <Box>
            <Typography sx={{ color: "#9bb96d", mb: 2 }}>
              {t("footer.company")}
            </Typography>

            {["about", "blog", "contact"].map((key) => (
              <Button key={key} sx={btnStyle}>
                {t(`footer.${key}`)}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>

      <Divider sx={{ borderColor: "#333", my: 5 }} />

      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
        <Typography fontSize={13} sx={{ opacity: 0.6 }}>
          © {new Date().getFullYear()} {company.name}
        </Typography>

        <Box>
          {["terms", "imprint", "privacy"].map((key) => (
            <Button key={key} sx={{ color: "#777", fontSize: 12 }}>
              {t(`footer.${key}`)}
            </Button>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

const btnStyle = {
  display: "block",
  justifyContent: "flex-start",
  color: "#aaa",
  textTransform: "none",
  fontSize: 13,
  px: 0,
  py: 0.5,
  minWidth: "auto",
  "&:hover": {
    color: "#fff",
    background: "transparent",
    transform: "translateX(4px)",
  },
};