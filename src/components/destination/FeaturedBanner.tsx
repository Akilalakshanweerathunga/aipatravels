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

import VerifiedIcon from "@mui/icons-material/Verified";
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import BackpackIcon from '@mui/icons-material/Backpack';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { useRef } from "react";
import { Destination } from "@/types/destination";
import { relative } from "path/win32";

type Props = {
  destination: Destination;
};

export default function FeaturedBanner({ destination }: Props) {
  const ref = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const imageWidth = useTransform(
    scrollYProgress,
    [0, 0.4],
    ["100%", "50%"]
  );

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  const contentX = useTransform(scrollYProgress, [0.2, 0.5], ["100%", "0%"]);
  const contentOpacity = useTransform(scrollYProgress, [0.6, 0.9], [0, 1]);

  const highlights = destination?.highlights || [];
  const inclusions = destination?.inclusions || [];

  const items = [
    ...highlights.slice(0, 2).map((h) => h.highlight_key),
    ...inclusions.slice(0, 2).map((i) => i.inclusion_key),
  ];

  if (!destination?.banner) return null;

  return (
    <Box
      ref={ref}
      sx={{
        height: isMobile ? "auto" : "250vh", 
        position: "relative",
        my: 10,
      }}
    >
      <Box
        sx={{
          position: isMobile ? "relative" : "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            width: isMobile ? "100%" : "33%",
            p: isMobile ? 3 : 6,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            zIndex: 2,
          }}
        >
            <Typography variant={isMobile ? "h4" : "h2"} fontWeight="bold">
            Discover The Beauty Of Nature
            </Typography>

            <Typography sx={{ my: 3, color: "text.secondary" }}>
            Travor is one of the most popular travel agency for those who want
            to explore the world and try to make adventure
            </Typography>

            <Stack spacing={2} sx={{ mb: 4 }}>
            <Stack direction="row" spacing={1} alignItems="center">
                <SupportAgentIcon color="success" />
                <Typography>24/7 Emergency Helpline</Typography>
            </Stack>

            <Stack direction="row" spacing={1} alignItems="center">
                <CurrencyExchangeIcon color="success" />
                <Typography>No Booking Fee Rate Guarantee</Typography>
            </Stack>
            </Stack>

            <Button
            variant="contained"
            sx={{
                borderRadius: 50,
                bgcolor: "#03481f",
            }}
            >
            Book a Tour
            </Button>
        </Box>

        <Box
          sx={{
            width: isMobile ? "100%" : "67%",
            position: "relative",
          }}
        >
          <motion.img
            src={`/images/destinations/${destination.banner_image}`}
            style={{
              width: isMobile ? "100%" : imageWidth,
              height: "100%",
              objectFit: "cover",
              position: "absolute",
              left: 0,
              top: -30,
              y,
            }}
          />

   

          {!isMobile && (
            <Box
              sx={{
                position: "absolute",
                bottom: 20,
                left: 20,
                display: "flex",
                alignItems: "center",
                gap: 1,
                color: "#fff",

                backdropFilter: "blur(10px)",
                background: "rgba(0,0,0,0.4)",
                px: 2,
                py: 1,
                borderRadius: "12px",
              }}
            >
              <VerifiedIcon />
              <Typography fontWeight="bold">
                Verified Destination
              </Typography>
            </Box>
          )}

          {!isMobile && (
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
                opacity: 1,
              }}
            >
              <Stack spacing={3}>
                {items.map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 60 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 3,
                        borderRadius: "20px",

                        "&:hover": {
                          transform: "translateY(-5px) scale(1.02)",
                        },
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
                        }}
                      >
                        {getModernIcon(index)}
                      </Box>

                      <Typography
                        sx={{
                          color: "#000000",
                          fontWeight: 500,
                          fontSize: "18px",
                          textTransform: "capitalize",
                        }}
                      >
                        {formatKey(item)}
                      </Typography>
                    </Box>
                  </motion.div>
                ))}
              </Stack>
            </motion.div>
          )}

          {isMobile && (
            <Box sx={{ 
                p: 3,
                top: '250px',
                position: 'relative',
                
            }}>
              <Stack spacing={2}>
                {items.map((item, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      gap: 2,
                      alignItems: "center",
                    }}
                  >
                    {getModernIcon(index)}
                    <Typography sx={{fontSize: 22}}>{formatKey(item)}</Typography>
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
  return key.replaceAll("_", " ");
}

function getModernIcon(index: number) {
  const icons = [
    <TravelExploreIcon />,
    <AcUnitIcon />,
    <BackpackIcon />,
    <CatchingPokemonIcon />,
  ];
  return icons[index % icons.length];
}