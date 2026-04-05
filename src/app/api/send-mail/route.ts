import { NextResponse } from "next/server";
import { Resend } from "resend";
import { company } from "@/data/company";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const adminHtml = `
        <div style="font-family:Arial,sans-serif;padding:20px;background:#f8fafc;color:#334155">
            <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.08)">
            
            <div style="background:#657b43;color:#fff;padding:20px">
                <h2 style="margin:0">New Travel Inquiry</h2>
            </div>

            <div style="padding:20px">
                <h3 style="border-bottom:1px solid #eee;padding-bottom:10px">Contact Details</h3>
                <p><strong>Name:</strong> ${data.contactName}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>

                <h3 style="border-bottom:1px solid #eee;padding-bottom:10px;margin-top:20px">Trip Details</h3>
                <p><strong>Departure Date:</strong> ${data.tripDepartureDate || 'Not specified'}</p>
                <p><strong>Duration:</strong> ${data.tourLength}</p>
                <p><strong>First Visit:</strong> ${data.firstTimeVisit}</p>
                <p><strong>Budget:</strong> ${data.budget}</p>
                <p><strong>Vehicle Type:</strong> ${data.vehicleType}</p>

                <h3 style="border-bottom:1px solid #eee;padding-bottom:10px;margin-top:20px">Group & Health</h3>
                <p><strong>Adults:</strong> ${data.numAdults} (Ages: ${data.ageAdults})</p>
                <p><strong>Children:</strong> ${data.numChildren} (Ages: ${data.ageChildren})</p>
                <p><strong>Dietary:</strong> ${data.dietaryPreference} ${data.otherDietary ? `(${data.otherDietary})` : ''}</p>
                <p><strong>Medical Issues:</strong> ${data.medicalIssues || 'None'}</p>

                <h3 style="border-bottom:1px solid #eee;padding-bottom:10px;margin-top:20px">Preferences</h3>
                <p><strong>Places:</strong> ${data.placesToVisit?.join(", ") || 'None selected'}</p>
                <p><strong>Other Places:</strong> ${data.otherPlaces || 'N/A'}</p>
                <p><strong>Activities:</strong> ${data.activities?.join(", ") || 'None selected'}</p>
                <p><strong>Other Activities:</strong> ${data.otherActivities || 'N/A'}</p>
                
                <p style="margin-top:20px"><strong>Client Observations:</strong></p>
                <div style="background:#f9fafb;padding:15px;border-radius:8px;font-style:italic">
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

                <!-- HEADER -->
                <div style="background:linear-gradient(135deg,#657b43,#8fae5d);padding:30px;text-align:center;color:#fff">
                    <img src="https://aipatravels.com/logo.png" alt="${company.name}" style="height:60px;margin-bottom:10px"/>
                    <h1 style="margin:0;font-size:24px">${company.name}</h1>
                    <p style="margin:5px 0 0;font-size:14px;opacity:0.9">${company.slogan}</p>
                </div>

                <!-- BODY -->
                <div style="padding:30px">

                    <h2 style="margin-top:0">Hi ${data.contactName}, 👋</h2>
                    <p>Thank you for reaching out to us! We've received your travel request and our team is already working on crafting your perfect Sri Lanka experience 🇱🇰</p>

                    <!-- TRIP SUMMARY -->
                    <div style="margin-top:25px">
                    <h3 style="border-bottom:2px solid #e2e8f0;padding-bottom:8px;color:#657b43">Trip Details</h3>
                    <p><strong>Departure Date:</strong> ${data.tripDepartureDate || 'Flexible'}</p>
                    <p><strong>Duration:</strong> ${data.tourLength}</p>
                    <p><strong>First Visit:</strong> ${data.firstTimeVisit}</p>
                    <p><strong>Budget:</strong> ${data.budget}</p>
                    <p><strong>Vehicle Type:</strong> ${data.vehicleType}</p>
                    </div>

                    <!-- CONTACT -->
                    <div style="margin-top:25px">
                    <h3 style="border-bottom:2px solid #e2e8f0;padding-bottom:8px;color:#657b43">Your Contact Info</h3>
                    <p><strong>Name:</strong> ${data.contactName}</p>
                    <p><strong>Email:</strong> ${data.email}</p>
                    <p><strong>Phone:</strong> ${data.phone}</p>
                    </div>

                    <!-- GROUP -->
                    <div style="margin-top:25px">
                    <h3 style="border-bottom:2px solid #e2e8f0;padding-bottom:8px;color:#657b43">Travel Group</h3>
                    <p><strong>Adults:</strong> ${data.numAdults} (Ages: ${data.ageAdults})</p>
                    <p><strong>Children:</strong> ${data.numChildren} (Ages: ${data.ageChildren})</p>
                    <p><strong>Dietary:</strong> ${data.dietaryPreference} ${data.otherDietary ? `(${data.otherDietary})` : ''}</p>
                    <p><strong>Medical:</strong> ${data.medicalIssues || 'None'}</p>
                    </div>

                    <!-- PREFERENCES -->
                    <div style="margin-top:25px">
                    <h3 style="border-bottom:2px solid #e2e8f0;padding-bottom:8px;color:#657b43">Your Preferences</h3>
                    <p><strong>Places:</strong> ${data.placesToVisit?.join(", ") || 'None selected'}</p>
                    <p><strong>Other Places:</strong> ${data.otherPlaces || 'N/A'}</p>
                    <p><strong>Activities:</strong> ${data.activities?.join(", ") || 'None selected'}</p>
                    <p><strong>Other Activities:</strong> ${data.otherActivities || 'N/A'}</p>
                    </div>

                    <!-- NOTES -->
                    <div style="margin-top:25px">
                    <h3 style="border-bottom:2px solid #e2e8f0;padding-bottom:8px;color:#657b43">Your Notes</h3>
                    <div style="background:#f8fafc;padding:15px;border-radius:10px;font-style:italic">
                        ${data.observations || 'No additional notes provided.'}
                    </div>
                    </div>

                    <!-- CTA -->
                    <div style="margin-top:30px;padding:20px;background:#f1f5f9;border-radius:12px;text-align:center">
                    <p style="margin:0;font-size:14px">
                        We will get back to you within <strong>24 hours</strong> with your personalized itinerary.
                    </p>
                    </div>

                </div>

                <!-- FOOTER -->
                <div style="background:#0f172a;color:#cbd5f5;padding:25px;text-align:center;font-size:13px">
                    
                    <p style="margin:0 0 8px"><strong>${company.name}</strong></p>
                    <p style="margin:0">${company.address}</p>
                    <p style="margin:5px 0">
                    ${company.phone} |  ${company.email}
                    </p>

                    <div style="margin:10px 0">
                    <a href="${company.social.facebook}" style="margin:0 5px;color:#cbd5f5;text-decoration:none">Facebook</a> |
                    <a href="${company.social.instagram}" style="margin:0 5px;color:#cbd5f5;text-decoration:none">Instagram</a> |
                    <a href="${company.social.linkedin}" style="margin:0 5px;color:#cbd5f5;text-decoration:none">LinkedIn</a>
                    </div>

                    <p style="margin-top:10px;font-size:11px;color:#94a3b8">
                    ${company.Policy}
                    </p>

                    <p style="margin-top:10px;font-size:11px;color:#64748b">
                    © ${new Date().getFullYear()} ${company.name}. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    `;
    await resend.emails.send({
      from: "info@aipatravels.com",
      to: "info@aipatravels.com",
      subject: `New Travel Request - ${data.contactName}`,
      html: adminHtml,
    });

    await resend.emails.send({
      from: "Aipa Travels <info@aipatravels.com>",
      to: data.email,
      subject: "We've received your travel request! 🇱🇰",
      html: customerHtml,
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}