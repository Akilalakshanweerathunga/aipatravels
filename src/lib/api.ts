import { supabase } from './supabase';

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