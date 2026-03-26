export type ItineraryType = {
  id: string;
  category_key: string;
  base_price: number;
  currency: string;
  nights: number;
  day_num: number;
  locale_tag: string;
  itinerary_days: { day_number: number; title_key: string; description_key: string }[];
  highlights: { highlight_key: string }[];
  inclusions: { inclusion_key: string }[];
};