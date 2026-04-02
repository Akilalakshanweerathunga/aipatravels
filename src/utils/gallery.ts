export const getGalleryImages = (
  destination: any,
  activities: any[]
) => {
  const destImages = destination?.image_array || [];

  const activityImages =
    activities?.flatMap((a) => a.images || []) || [];

  const allImages = [...new Set([...destImages, ...activityImages])];

  return allImages;
};

export const getImagePath = (img: string) => {
  if (
    img.includes('whale') ||
    img.includes('lagoon') ||
    img.includes('bridge') ||
    img.includes('zip') ||
    img.includes('yala') ||
    img.includes('uda')
  ) {
    return `/images/activities/${img}`;
  }

  return `/images/destinations/${img}`;
};