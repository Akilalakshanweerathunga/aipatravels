import { IMAGE_BASE_URL } from "@/data/constants";

export const images = {

  logo: {
    src: `${IMAGE_BASE_URL}/logo/logo.png`,
    alt: "Logo",
    backgroundImage: `url('${IMAGE_BASE_URL}/logo/logo.png')`,
  },

  hero: [
    {
      mobile: "/images/hero/mobile/nine-arch.png",
      desktop: "/images/hero/web/nine-arches.png",
      title: "hero.nineArch.title",
      subtitle: "hero.nineArch.subtitle",
      description: "hero.nineArch.description",
      position: "left",
    },
    {
      mobile: "/images/hero/mobile/galle.png",
      desktop: "/images/hero/web/galle.png",
      title: "hero.galle.title",
      subtitle: "hero.galle.subtitle",
      description: "hero.galle.description",
      position: "left",
    },
    {
      mobile: "/images/hero/mobile/sigiriya.png",
      desktop: "/images/hero/web/sigiriya.png",
      title: "hero.sigiriya.title",
      subtitle: "hero.sigiriya.subtitle",
      description: "hero.sigiriya.description",
      position: "left",
    },
    {
      mobile: "/images/hero/mobile/bentota.png",
      desktop: "/images/hero/web/bentota.png",
      title: "hero.bentota.title",
      subtitle: "hero.bentota.subtitle",
      description: "hero.bentota.description",
      position: "left",
    },
    {
      mobile: "/images/hero/mobile/tea-leaf.png",
      desktop: "/images/hero/web/tea-leaf.png",
      title: "hero.tea.title",
      subtitle: "hero.tea.subtitle",
      description: "hero.tea.description",
      position: "left",
    },
  ],
  whoWeAre: {
    left: { src: `${IMAGE_BASE_URL}/images/others/leopard.png`, alt: 'aboutUs.leftImageAlt' },
    center: { src: `${IMAGE_BASE_URL}/images/others/sigiriya.webp`, alt: 'aboutUs.centerImageAlt' },
    right: { src: `${IMAGE_BASE_URL}/images/others/polonnaru.png`, alt: 'aboutUs.rightImageAlt' },
    homeBanner: { src: `${IMAGE_BASE_URL}/images/others/desktop/banner.png`, alt: 'aboutUs.homeBannerAlt' },
    homeBannerMobile: { src: `${IMAGE_BASE_URL}/images/others/mobile/banner.png`, alt: 'aboutUs.homeBannerAlt' },
  },
  home: {
    leopard: { src: `${IMAGE_BASE_URL}/images/home/f-destinations/leopard.png`, alt: 'home.leopardAlt' },
    sigiriya: { src: `${IMAGE_BASE_URL}/images/home/f-destinations/sigiriya.png`, alt: 'home.sigiriyaAlt' },
    galle_fort: { src: `${IMAGE_BASE_URL}/images/home/f-destinations/galle_fort.png`, alt: 'home.galleAlt' },
    temple_of_tooth: { src: `${IMAGE_BASE_URL}/images/home/f-destinations/temple_of_tooth.png`, alt: 'home.bentotaAlt' },
    hikkaduwa: { src: `${IMAGE_BASE_URL}/images/home/f-destinations/hikkaduwa.png`, alt: 'home.teaLeafAlt' },
    littleAdams: { src: `${IMAGE_BASE_URL}/images/home/f-destinations/little_adams.png`, alt: 'home.littleAdamsAlt' },
    adventures: { src: `${IMAGE_BASE_URL}/images/others/adventures.png`, alt: 'home.adventuresAlt' },
    adventuresbg: { src: `${IMAGE_BASE_URL}/images/others/adventure-bg.png`, alt: 'home.adventuresBgAlt' },
  },
  itineraries: {
    culturalTriangle: { src: `${IMAGE_BASE_URL}/images/itineraries/cultural-triangle.png`, alt: 'itineraries.culturalTriangleItinerary.imageAlt' },
    teaHighland: { src: `${IMAGE_BASE_URL}/images/itineraries/tea-highland.png`, alt: 'itineraries.teaHighlandItinerary.imageAlt' },
    wildlifeSafari: { src: `${IMAGE_BASE_URL}/images/itineraries/wildlife-safari.png`, alt: 'itineraries.wildlifeSafariItinerary.imageAlt' },
    coastalParadise: { src: `${IMAGE_BASE_URL}/images/itineraries/coastal-paradise.png`, alt: 'itineraries.coastalParadiseItinerary.imageAlt' },
    grandIsland: { src: `${IMAGE_BASE_URL}/images/itineraries/grand-island.png`, alt: 'itineraries.grandIslandItinerary.imageAlt' },
    wellnessRetreat: { src: `${IMAGE_BASE_URL}/images/itineraries/wellness-retreat.png`, alt: 'itineraries.wellnessRetreatItinerary.imageAlt' },
  }
};