// src/components/destination/partials/DestinationCard.tsx
'use client';
import { Box, Chip, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { Destination } from '@/types/destination';
import { useTranslation } from 'react-i18next';

type Props = {
  destination: Destination;
  locale: string;
};

export default function DestinationCard({ destination, locale }: Props) {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        position: "relative",
        height: 320,
        borderRadius: "20px",
        overflow: "hidden",
        cursor: "pointer",
        backgroundImage: `url(/images/destinations/${destination.images ?? 'placeholder.jpg'})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        p: 2,
        transition: "0.35s ease",
        "&:hover": { transform: "scale(1.04)" },
        "&:hover .viewButton": { opacity: 1, bottom: 16 },
        "&:hover .bottomInfo": { transform: 'translateY(-40px)' },
      }}
    >
      {/* Gradient overlay */}
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.75), rgba(0,0,0,0.1))",
          zIndex: 1,
        }}
      />

      {/* Top-right days/nights */}
      <Chip
        label={`${destination.days_old} ${t('other.Days')} / ${destination.nights} ${t('other.Nights')}`}
        sx={{
          bgcolor: "rgba(0,0,0,0.6)",
          color: "#fff",
          zIndex: 2,
          fontWeight: 500,
          backdropFilter: "blur(4px)",
          width: 'fit-content',
          position: 'absolute',
          top: 16,
          right: 16,
        }}
      />

      {/* Bottom info (destination & lineup) */}
      <Box
        className="bottomInfo"
        sx={{
          zIndex: 2,
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          transition: '0.35s ease',
        }}
      >
        <Chip
          label={destination.label}
          sx={{ bgcolor: "#fff", color: "#000", fontWeight: 600 }}
        />
        <Chip
          label={`${destination.lineupCount ?? 0} ${t('other.places')}`}
          sx={{
            bgcolor: "rgba(21, 19, 19, 0.25)",
            color: "#fff",
            backdropFilter: "blur(8px)",
          }}
        />
      </Box>

      {/* View More button */}
      <Button
        onClick={() => router.push(`/${locale}/destinations/${destination.key}`)}
        className="viewButton"
        sx={{
          position: 'absolute',
          bottom: -40,
          left: '50%',
          transform: 'translateX(-50%)',
          bgcolor: "#fff",
          color: "#000",
          borderRadius: "12px",
          px: 3,
          py: 0.8,
          textTransform: "none",
          fontWeight: 500,
          width: '90%',
          opacity: 0,
          transition: "0.35s ease",
          zIndex: 2,
        }}
      >
        {t('other.view more')}
      </Button>
    </Box>
  );
}