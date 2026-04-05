import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase
      .from("itinerary_inquiries")
      .insert([
        {
          itinerary_details: body.itineraryDetails,
          title: body.title,
          first_name: body.firstName,
          last_name: body.lastName,
          email: body.email,
          phone: body.phone,
          travel_timing: body.travelTiming,
          arrange_video_call: body.arrangeVideoCall,
          num_adults: parseInt(body.numAdults) || 0,
          age_adults: body.ageAdults,
          num_children: parseInt(body.numChildren) || 0,
          age_children: body.ageChildren,
          trip_departure_date: body.tripDepartureDate || null,
          tour_length: body.tourLength,
          first_time_visit: body.firstTimeVisit,
          dietary_preference: body.dietaryPreference,
          medical_issues: body.medicalIssues,
          observations: body.observations,
          agree_to_share_details: body.agreeToShareDetails,
        },
      ]);

    if (error) throw error;
    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}