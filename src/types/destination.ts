export interface DestinationType {
  id: string;
  key: string;
  label: string;
  category_key: string;
  base_price: number;
  currency: string;
  nights: number;
  locale_tag: string;
  images: string;

  highlights?: {
    id: string;
    destination_id: string;
    highlight_key: string;
    sort_order: number;
  }[];

  inclusions?: {
    id: string;
    destination_id: string;
    inclusion_key: string;
    sort_order: number;
  }[];
}