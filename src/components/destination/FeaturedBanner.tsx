'use client';

import {
  Box,
  Typography,
  Button,
  Stack,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  motion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef } from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import BackpackIcon from '@mui/icons-material/Backpack';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { Destination } from "@/types/destination";

type Props = {
  destination: Destination;
};

export default function FeaturedBanner({ destination }: Props) {
  const containerRef = useRef(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const imageWidth = useTransform(scrollYProgress, [0, 0.4], ["100%", "50%"]);
  const contentX = useTransform(scrollYProgress, [0.4, 0.8], ["100%", "0%"]);
  const contentOpacity = useTransform(scrollYProgress, [0.5, 0.8], [0, 1]);

  const highlights = destination?.highlights || [];
  const inclusions = destination?.inclusions || [];
  const items = [
    ...highlights.slice(0, 2).map((h) => h.highlight_key),
    ...inclusions.slice(0, 2).map((i) => i.inclusion_key),
  ];

  if (!destination?.banner_image) return null;

  return (
    <Box
      ref={containerRef}
      sx={{
        height: isMobile ? "auto" : "200vh",
        position: "relative",
        width: "100%",
        my: 10,
        overflow: "visible", 
      }}
    >
      <Box
        sx={{
          position: isMobile ? "relative" : "sticky",
          top: 0, 
          left: 0,
          right: 0,
          height: isMobile ? "auto" : "100vh",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          overflow: "hidden",
          width: "100%",
          background: "#fcf8f3",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            width: isMobile ? "100%" : "35%",
            p: isMobile ? 3 : 8,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            zIndex: 10,
            background: "#fcf8f3",
          }}
        >
          <Typography variant={isMobile ? "h4" : "h2"} fontWeight="bold">
            Discover The Beauty Of Nature
          </Typography>

          <Typography sx={{ my: 3, color: "text.secondary", fontSize: "1.1rem" }}>
            Travor is one of the most popular travel agency for those who want
            to explore the world and try to make adventure.
          </Typography>

          <Stack spacing={3} sx={{ mb: 4 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <SupportAgentIcon color="success" />
              <Typography fontWeight={500}>24/7 Emergency Helpline</Typography>
            </Stack>
            <Stack direction="row" spacing={2} alignItems="center">
              <CurrencyExchangeIcon color="success" />
              <Typography fontWeight={500}>No Booking Fee Rate Guarantee</Typography>
            </Stack>
          </Stack>

          <Button
            variant="contained"
            sx={{
              borderRadius: "50px",
              bgcolor: "#03481f",
              px: 4,
              py: 1.5,
              width: "fit-content",
              "&:hover": { bgcolor: "#023014" }
            }}
          >
            Book a Tour
          </Button>
        </Box>

        <Box sx={{ flex: 1, position: "relative", height: isMobile ? "450px" : "100%" }}>
          <motion.img
            src={`/images/destinations/${destination.banner_image}`}
            style={{
              width: isMobile ? "100%" : imageWidth,
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              left: 0,
              top: 0,
            }}
          />

          {!isMobile && (
            <>
              <Box
                sx={{
                  position: "absolute",
                  bottom: 40,
                  left: 40,
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5,
                  color: "#fff",
                  backdropFilter: "blur(10px)",
                  background: "rgba(0,0,0,0.4)",
                  px: 3,
                  py: 1.5,
                  borderRadius: "12px",
                  zIndex: 5,
                }}
              >
                <VerifiedIcon />
                <Typography fontWeight="bold">Verified Destination</Typography>
              </Box>

              <motion.div
                style={{
                  position: "absolute",
                  right: 0,
                  top: 0,
                  height: "100%",
                  width: "50%",
                  display: "flex",
                  alignItems: "center",
                  padding: "48px",
                  x: contentX,
                  opacity: contentOpacity,
                }}
              >
                <Stack spacing={3} sx={{ width: "100%" }}>
                  {items.map((item, index) => (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 3,
                        borderRadius: "20px",
                        bgcolor: "white",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                      }}
                    >
                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          background: "#03491e",
                          color: "#fff",
                          flexShrink: 0,
                        }}
                      >
                        {getModernIcon(index)}
                      </Box>
                      <Typography sx={{ color: "#000", fontWeight: 600, fontSize: "18px", textTransform: "capitalize" }}>
                        {formatKey(item)}
                      </Typography>
                    </Box>
                  ))}
                </Stack>
              </motion.div>
            </>
          )}

          {isMobile && (
            <Box sx={{ p: 3, mt: "450px" }}>
              <Stack spacing={2}>
                {items.map((item, index) => (
                  <Box key={index} sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                    <Box sx={{ color: "#03491e" }}>{getModernIcon(index)}</Box>
                    <Typography sx={{ fontSize: 18 }}>{formatKey(item)}</Typography>
                  </Box>
                ))}
              </Stack>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
}

function formatKey(key: string): string {
  if (!key) return "";
  return key.replaceAll("_", " ");
}

function getModernIcon(index: number) {
  const icons = [
    <TravelExploreIcon key="1" />,
    <AcUnitIcon key="2" />,
    <BackpackIcon key="3" />,
    <CatchingPokemonIcon key="4" />,
  ];
  return icons[index % icons.length];
}