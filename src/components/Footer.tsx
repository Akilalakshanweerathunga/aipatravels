"use client";

import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  YouTube,
  WhatsApp,
  ExpandMore,
  Email,
  Phone,
  LocationOn,
} from "@mui/icons-material";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { company } from "@/data/company";
import { navLinks } from '@/data/links';
import { usePathname } from 'next/navigation';


interface NavbarProps {
  locale?: string;
}
type SocialKey = keyof typeof company.social;

export default function Footer({ locale }: NavbarProps) {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState(locale || 'en');

  const itinerarySlugMap: Record<string, string> = {
    culturalTriangleItinerary: "cultural-triangle",
    teaHighlandItinerary: "tea-highland",
    wildlifeSafariItinerary: "wildlife-safari",
    coastalParadiseItinerary: "coastal-paradise",
    grandIslandItinerary: "grand-island",
    wellnessRetreatItinerary: "wellness-retreat",
  };
  const socials: { Icon: any; key: SocialKey }[] = [
    { Icon: Facebook, key: "facebook" },
    { Icon: Instagram, key: "instagram" },
    { Icon: YouTube, key: "youtube" },
  ];

  const footerLinksMap: Record<string, string> = {
    terms: "terms-and-conditions",
    privacy: "privacy-policy",
  };

  return (
    <Box sx={{ bgcolor: "#1b1b1b", color: "#ccc", px: { xs: 3, md: 8 }, py: 8 }}>
      
      {/* Desktop Layout */}
      <Box 
        display={{ xs: 'none', md: 'flex' }} 
        flexWrap="wrap" 
        justifyContent="space-between" 
        gap={5}
      >
        <Box maxWidth={320}>
          <Image src={company.logo} alt={company.name} width={150} height={50} />

          <Typography sx={{ fontSize: 14, opacity: 0.7, my: 2 }}>
            {t("footer.description")}
          </Typography>
        
            <Box>
              {socials.map(({ Icon, key }, i) => (
                <IconButton
                  key={i}
                  component="a"
                  href={company.social[key]}
                  target="_blank"
                  rel="noopener noreferrer"
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
        <Box flexWrap="wrap" gap={6}>
          <Typography sx={{ color: "#9bb96d", mb: 2 }}>
            {t("footer.contact")}
          </Typography>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <WhatsApp sx={{ color: "#9bb96d" }} />
            <Typography fontSize={14}>{company.phone}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Email sx={{ color: "#9bb96d" }} />
            <Typography fontSize={14}>
              {company.email}
            </Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Phone sx={{ color: "#9bb96d" }} />
            <Typography fontSize={14}>
              {company.phone}
            </Typography>
          </Box>
          {/* <Box display="flex" alignItems="center" gap={1} mb={2}>
            <LocationOn sx={{ color: "#9bb96d" }} />
            <Typography fontSize={14}>
              {company.address}
            </Typography>
          </Box> */}
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

            {[
              "culturalTriangleItinerary",
              "teaHighlandItinerary",
              "wildlifeSafariItinerary",
              "coastalParadiseItinerary",
              "grandIslandItinerary",
              "wellnessRetreatItinerary"
            ].map((key) => (
              <Button
                key={key}
                sx={btnStyle}
                href={`/${currentLocale}/itineraries/inquiry/${itinerarySlugMap[key]}`}
                component={Link}
              >
                {t(`itineraries.${key}.title`)}
              </Button>
            ))}
          </Box>

          <Box>
            <Typography sx={{ color: "#9bb96d", mb: 2 }}>
              {t("footer.company")}
            </Typography>
            {["about-us", "blog", "contact-us"].map((key) => (
              <Button key={key} sx={btnStyle} href={`/${currentLocale}/${key}`} component={Link}>
                {t(`footer.${key}`)}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Mobile Layout with Accordion */}
      <Box display={{ xs: 'block', md: 'none' }}>
        <Box sx={{ px: 2 }}>
         <Image src={company.logo} alt={company.name} width={150} height={50} />

            <Typography sx={{ fontSize: 14, opacity: 0.7, my: 2 }}>
              {t("footer.description")}
            </Typography>
        </Box>
        <Box sx={{ px: 2, mb:2 }}>
          {socials.map(({ Icon, key }, i) => (
            <IconButton
              key={i}
              component="a"
              href={company.social[key]}
              target="_blank"
              rel="noopener noreferrer"
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
        <Accordion sx={{ bgcolor: 'transparent', color: '#ccc', boxShadow: 'none' }}>
          <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#9bb96d' }} />}>
            <Typography sx={{ color: "#9bb96d", fontWeight: 600 }}>{t("footer.links")}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 2 }}>
            {navLinks.map((link) => {
              const fullPath = `/${currentLocale}${link.path}`;
              return (
                <Button
                  key={link.name}
                  component={Link}
                  href={fullPath}
                  sx={mobBtnStyle}
                  fullWidth
                >
                  {t(link.name)}
                </Button>
              );
            })}
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ bgcolor: 'transparent', color: '#ccc', boxShadow: 'none' }}>
          <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#9bb96d' }} />}>
            <Typography sx={{ color: "#9bb96d", fontWeight: 600 }}>{t("footer.itineraries")}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 2 }}>
            {["culturalTriangleItinerary", "teaHighlandItinerary", "wildlifeSafariItinerary", "coastalParadiseItinerary", "grandIslandItinerary", "wellnessRetreatItinerary"].map((key) => (
              <Button key={key} sx={mobBtnStyle} fullWidth>
                {t(`itineraries.${key}.title`)}
              </Button>
            ))}
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ bgcolor: 'transparent', color: '#ccc', boxShadow: 'none' }}>
          <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#9bb96d' }} />}>
            <Typography sx={{ color: "#9bb96d", fontWeight: 600 }}>{t("footer.company")}</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 2 }}>
            {["about", "blog", "contact"].map((key) => (
              <Button key={key} sx={mobBtnStyle} fullWidth>
                {t(`footer.${key}`)}
              </Button>
            ))}
          </AccordionDetails>
        </Accordion>
        <Accordion sx={{ bgcolor: 'transparent', color: '#ccc', boxShadow: 'none' }}>
          <AccordionSummary expandIcon={<ExpandMore sx={{ color: '#9bb96d' }} />}>
            <Typography sx={{ color: "#9bb96d", fontWeight: 600 }}>{t("footer.contact")}</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ px: 2 }}>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <WhatsApp sx={{ color: "#9bb96d" }} />
              <Typography fontSize={14}>{company.phone}</Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Email sx={{ color: "#9bb96d" }} />
              <Typography fontSize={14}>
                {company.email}
              </Typography>
            </Box>
            <Box display="flex" alignItems="center" gap={1} mb={2}>
              <Phone sx={{ color: "#9bb96d" }} />
              <Typography fontSize={14}>
                {company.phone}
              </Typography>
            </Box>
            {/* <Box display="flex" alignItems="center" gap={1} mb={2}>
              <LocationOn sx={{ color: "#9bb96d" }} />
              <Typography fontSize={14}>
                {company.address}
              </Typography>
            </Box> */}
          </AccordionDetails>
        </Accordion>
      </Box>

      <Divider sx={{ borderColor: "#333", my: 5 }} />

      <Box>
        {Object.entries(footerLinksMap).map(([key, slug]) => (
          <Button
            key={key}
            component={Link}
            href={`/${currentLocale}/${slug}`}
            sx={{ color: "#777", fontSize: 12, pl:0 }}
          >
            {t(`footer.${key}`)}
          </Button>
        ))}
      </Box>
      <Box display="flex" justifyContent="space-between" flexWrap="wrap">
       <Typography fontSize={13} sx={{ opacity: 0.6, px: 1 }}>
        © {new Date().getFullYear()} {company.name}. All rights reserved. | Powered by{' '}
        <Link href="https://www.squareasoft.com" target="_blank" rel="noopener noreferrer" style={{ color: '#9bb96d', textDecoration: 'none' }}>
          Squareasoft.com
        </Link>
      </Typography>
      
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

const mobBtnStyle = {
  display: "block",
  justifyContent: "flex-start",
  color: "#aaa",
  textTransform: "none",
  fontSize: 13,
  textAlign: 'left',
  px: 0,
  py: 0.5,
  minWidth: "auto",
  "&:hover": {
    color: "#fff",
    background: "transparent",
    transform: "translateX(4px)",
  },
};