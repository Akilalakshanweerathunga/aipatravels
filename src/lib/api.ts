import { supabase } from './supabase';
import { Destination } from "@/types/destination";

export async function getItineraries() {
  const { data, error } = await supabase
    .from('itineraries')
    .select(`
      *,
      highlights:itinerary_highlights(*),
      itinerary_days:itinerary_days(*),
      inclusions:itinerary_inclusions(*)
    `)
    .order('created_at', { ascending: true });

  if (error) {
    console.error(error);
    return [];
  }
  return data;
}

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('label', { ascending: true });

  if (error) throw error;
  return data;
}

export async function getDestinations(): Promise<Destination[]> {
  const { data: destinations, error: destError } = await supabase
    .from('destinations')
    .select(`
      *,
      highlights:destination_highlights(*),
      inclusions:destination_inclusions(*)
    `);

  if (destError) {
    console.error('Error fetching destinations:', destError);
    return [];
  }

  const { data: lineups, error: lineupError } = await supabase
    .from('destination_lineups')
    .select('destination_id');

  if (lineupError) {
    console.error("Error fetching lineups:", lineupError);
  }

  const countMap: Record<string, number> = {};
  lineups?.forEach(l => {
    countMap[l.destination_id] = (countMap[l.destination_id] || 0) + 1;
  });

  return destinations.map(d => ({
    ...d,
    lineupCount: countMap[d.id] ?? 0,
  }));
}