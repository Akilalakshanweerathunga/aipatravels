import { NextResponse } from "next/server";
import { Resend } from "resend";
import { company } from "@/data/company";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const fullName = `${data.title} ${data.firstName} ${data.lastName}`;

    const adminHtml = `
        <div style="font-family:Arial,sans-serif;padding:20px;background:#f8fafc;color:#334155">
            <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08)">
            
            <div style="background:#657b43;color:#fff;padding:20px">
                <h2 style="margin:0">New Itinerary Inquiry</h2>
                <p style="margin:5px 0 0;opacity:0.9">Target: ${data.itineraryDetails}</p>
            </div>

            <div style="padding:20px">
                <h3 style="border-bottom:1px solid #eee;padding-bottom:10px">Contact Details</h3>
                <p><strong>Name:</strong> ${fullName}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>

                <h3 style="border-bottom:1px solid #eee;padding-bottom:10px;margin-top:20px">Trip Requirements</h3>
                <p><strong>Departure Date:</strong> ${data.tripDepartureDate || 'Not specified'}</p>
                <p><strong>Tour Duration:</strong> ${data.tourLength}</p>
                <p><strong>Travel Timing:</strong> ${data.travelTiming}</p>
                <p><strong>First Visit to SL:</strong> ${data.firstTimeVisit}</p>
                <p><strong>Video Call Requested:</strong> ${data.arrangeVideoCall ? '✅ YES' : '❌ NO'}</p>

                <h3 style="border-bottom:1px solid #eee;padding-bottom:10px;margin-top:20px">Group & Health</h3>
                <p><strong>Adults:</strong> ${data.numAdults} (Ages: ${data.ageAdults})</p>
                <p><strong>Children:</strong> ${data.numChildren} (Ages: ${data.ageChildren})</p>
                <p><strong>Dietary Info:</strong> ${data.dietaryPreference}</p>
                <p><strong>Medical Issues:</strong> ${data.medicalIssues || 'None'}</p>
                
                <p style="margin-top:20px"><strong>Client Observations:</strong></p>
                <div style="background:#f9fafb;padding:15px;border-radius:8px;font-style:italic;border-left:4px solid #657b43">
                ${data.observations || 'No additional notes provided.'}
                </div>
            </div>

            <div style="background:#f1f5f9;padding:15px;text-align:center;font-size:12px;color:#64748b">
                Sent via Aipatravels System • ${new Date().toLocaleString()}
            </div>
            </div>
        </div>
    `;

    const customerHtml = `
        <div style="font-family:Arial,sans-serif;background:#f1f5f9;padding:20px;color:#334155">
            <div style="max-width:650px;margin:auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.08)">

                <div style="background:linear-gradient(135deg,#657b43,#8fae5d);padding:30px;text-align:center;color:#fff">
                    <img src="${company.logo}" alt="${company.name}" style="height:60px;margin-bottom:10px"/>
                    <h1 style="margin:0;font-size:24px">${company.name}</h1>
                    <p style="margin:5px 0 0;font-size:14px;opacity:0.9">${company.slogan}</p>
                </div>

                <div style="padding:30px">
                    <h2 style="margin-top:0">Hi ${data.firstName}, 👋</h2>
                    <p>Thank you for inquiring about our <strong>${data.itineraryDetails}</strong> tour. We've received your request and one of our travel experts will reach out to you shortly to discuss your journey!</p>

                    <div style="margin-top:25px; background:#f8fafc; padding:20px; border-radius:12px;">
                        <h3 style="margin-top:0; color:#657b43; font-size:18px">Inquiry Summary</h3>
                        <p><strong>Selected Tour:</strong> ${data.itineraryDetails}</p>
                        <p><strong>Travel Timing:</strong> ${data.travelTiming}</p>
                        <p><strong>Group Size:</strong> ${data.numAdults} Adults & ${data.numChildren} Children</p>
                        <p><strong>Departure:</strong> ${data.tripDepartureDate || 'TBD'}</p>
                        ${data.arrangeVideoCall ? '<p style="color:#657b43; font-weight:bold;">Video Call Consultation Requested</p>' : ''}
                    </div>

                    <div style="margin-top:30px;padding:20px;background:#f1f5f9;border-radius:12px;text-align:center">
                        <p style="margin:0;font-size:14px">
                            We usually respond within <strong>24 hours</strong>. Get ready for an unforgettable Sri Lankan adventure!
                        </p>
                    </div>
                </div>

                <div style="background:#0f172a;color:#cbd5f5;padding:25px;text-align:center;font-size:13px">
                    <p style="margin:0 0 8px"><strong>${company.name}</strong></p>
                    <p style="margin:0">${company.address}</p>
                    <p style="margin:5px 0">${company.phone} | ${company.email}</p>
                    <div style="margin:10px 0">
                        <a href="${company.social.facebook}" style="color:#cbd5f5;text-decoration:none">Facebook</a> |
                        <a href="${company.social.instagram}" style="color:#cbd5f5;text-decoration:none">Instagram</a>
                    </div>
                    <p style="margin-top:10px;font-size:11px;color:#64748b">
                        © ${new Date().getFullYear()} ${company.name}. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    `;

    // 1. Send to Admin
    await resend.emails.send({
      from: "Aipa Travels <info@aipatravels.com>",
      to: "info@aipatravels.com",
      subject: `New Itinerary Inquiry - ${data.lastName}`,
      html: adminHtml,
    });

    // 2. Send to Customer
    await resend.emails.send({
      from: "Aipa Travels <info@aipatravels.com>",
      to: data.email,
      subject: `We've received your inquiry for ${data.itineraryDetails} 🇱🇰`,
      html: customerHtml,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}