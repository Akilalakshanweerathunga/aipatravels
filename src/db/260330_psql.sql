-- WARNING: This schema is for context only and is not meant to be run.
-- Table order and constraints may not be valid for execution.

CREATE TABLE public.categories (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  key text NOT NULL UNIQUE,
  label text NOT NULL,
  CONSTRAINT categories_pkey PRIMARY KEY (id)
);
CREATE TABLE public.destination_highlights (
  id uuid NOT NULL,
  destination_id uuid,
  highlight_key text NOT NULL,
  sort_order integer DEFAULT 1,
  CONSTRAINT destination_highlights_pkey PRIMARY KEY (id),
  CONSTRAINT destination_highlights_destination_id_fkey FOREIGN KEY (destination_id) REFERENCES public.destinations(id)
);
CREATE TABLE public.destination_inclusions (
  id uuid NOT NULL,
  destination_id uuid,
  inclusion_key text NOT NULL,
  sort_order integer DEFAULT 1,
  CONSTRAINT destination_inclusions_pkey PRIMARY KEY (id),
  CONSTRAINT destination_inclusions_destination_id_fkey FOREIGN KEY (destination_id) REFERENCES public.destinations(id)
);
CREATE TABLE public.destination_lineups (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  destination_id uuid NOT NULL,
  place_key text NOT NULL,
  place_name text NOT NULL,
  sort_order integer NOT NULL DEFAULT 1,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT destination_lineups_pkey PRIMARY KEY (id),
  CONSTRAINT fk_destination FOREIGN KEY (destination_id) REFERENCES public.destinations(id)
);
CREATE TABLE public.destinations (
  id uuid NOT NULL,
  key text NOT NULL,
  label text NOT NULL,
  category_key text,
  base_price numeric,
  currency text DEFAULT 'USD'::text,
  nights integer,
  days interger,
  locale_tag text,
  images text,
  created_at timestamp without time zone DEFAULT now(),
  CONSTRAINT destinations_pkey PRIMARY KEY (id)
);
CREATE TABLE public.itineraries (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  category_key text NOT NULL,
  base_price numeric NOT NULL,
  currency text DEFAULT 'USD'::text,
  created_at timestamp without time zone DEFAULT now(),
  nights numeric,
  day_num numeric,
  locale_tag text,
  images text,
  CONSTRAINT itineraries_pkey PRIMARY KEY (id),
  CONSTRAINT fk_category FOREIGN KEY (category_key) REFERENCES public.categories(key)
);
CREATE TABLE public.itinerary_days (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  itinerary_id uuid,
  day_number integer NOT NULL,
  title_key text,
  description_key text,
  CONSTRAINT itinerary_days_pkey PRIMARY KEY (id),
  CONSTRAINT itinerary_days_itinerary_id_fkey FOREIGN KEY (itinerary_id) REFERENCES public.itineraries(id)
);
CREATE TABLE public.itinerary_highlights (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  itinerary_id uuid,
  highlight_key text,
  sort_order numeric,
  CONSTRAINT itinerary_highlights_pkey PRIMARY KEY (id),
  CONSTRAINT itinerary_highlights_itinerary_id_fkey FOREIGN KEY (itinerary_id) REFERENCES public.itineraries(id)
);
CREATE TABLE public.itinerary_inclusions (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  itinerary_id uuid,
  inclusion_key text NOT NULL,
  sort_order integer DEFAULT 0,
  CONSTRAINT itinerary_inclusions_pkey PRIMARY KEY (id),
  CONSTRAINT itinerary_inclusions_itinerary_id_fkey FOREIGN KEY (itinerary_id) REFERENCES public.itineraries(id)
);