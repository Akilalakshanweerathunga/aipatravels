import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Use Service Role Key for backend bypass of RLS
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase
      .from("tailor_requests")
      .insert([
        {
          contact_name: body.contactName,
          email: body.email,
          phone: body.phone,
          num_adults: parseInt(body.numAdults) || 0,
          age_adults: body.ageAdults,
          num_children: parseInt(body.numChildren) || 0,
          age_children: body.ageChildren,
          trip_departure_date: body.tripDepartureDate || null,
          tour_length: body.tourLength,
          first_time_visit: body.firstTimeVisit,
          dietary_preference: body.dietaryPreference,
          other_dietary: body.otherDietary,
          medical_issues: body.medicalIssues,
          vehicle_type: body.vehicleType,
          places_to_visit: body.placesToVisit, // Array
          other_places: body.otherPlaces,
          activities: body.activities,       // Array
          other_activities: body.otherActivities,
          budget: body.budget,
          observations: body.observations,
        },
      ]);

    if (error) {
      console.error("Supabase Insert Error:", error.message);
      throw error;
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Server Error:", err);
    return NextResponse.json({ error: err.message || "DB error" }, { status: 500 });
  }
}