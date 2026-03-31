export type Destination = {
  id: string;
  key: string;
  label: string;
  category_key?: string;
  base_price?: number;
  currency?: string;
  nights: number;
  days_old: number;
  locale_tag?: string;
  images: string;
  lineupCount: number;

  // 👇 make optional
  banner?: boolean;
  banner_image?: string;
  highlights?: DestinationHighlight[];
  inclusions?: DestinationInclusion[];
};

export interface DestinationHighlight {
  id: string;
  destination_id: string;
  highlight_key: string;
  sort_order: number;
}

export interface DestinationInclusion {
  id: string;
  destination_id: string;
  inclusion_key: string;
  sort_order: number;
}