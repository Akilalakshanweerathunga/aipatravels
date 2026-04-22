import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";
import { company } from "@/data/company";

const resend = new Resend(process.env.RESEND_API_KEY);

// Initialize Supabase Admin (using Service Role Key for bypass RLS if needed)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const { booking_date, booking_time, firstName, lastName, email, phone, message } = data;
    const fullName = `${firstName} ${lastName}`;

    // 1. SERVER-SIDE VALIDATION: Re-check booking limit
    const { count, error: countError } = await supabase
      .from('bookings')
      .select('*', { count: 'exact', head: true })
      .eq('booking_date', booking_date);

    if (countError) throw countError;
    if (count !== null && count >= 3) {
      return NextResponse.json({ error: "Date fully booked" }, { status: 400 });
    }

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=Consultation+with+AIPA+Travels&dates=${data.booking_date.replace(/-/g, '')}T${data.booking_time.replace(':', '')}00Z&details=Travel+consultation+regarding+your+upcoming+trip.&location=Online/Office`;
    const adminCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=Consultation:+${fullName}&dates=${booking_date.replace(/-/g, '')}T${booking_time.replace(':', '')}00Z&details=Client+Contact:+${phone}+|++Message:+${message.substring(0, 100)}&location=AIPA+Office/Online`;
    // 2. PREPARE EMAIL TEMPLATES
    const adminHtml = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f8fafc; padding: 40px 10px; color: #1e293b;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 20px 50px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
            
            <div style="background: #0f172a; padding: 40px 30px; color: #ffffff;">
            <div style="display: flex; align-items: center; justify-content: space-between;">
                <div>
                <p style="margin: 0; text-transform: uppercase; font-size: 11px; letter-spacing: 2px; color: #8fae5d; font-weight: 700;">New Booking Received</p>
                <h2 style="margin: 5px 0 0; font-size: 24px; font-weight: 600;">Consultation Request</h2>
                </div>
            </div>
            </div>

            <div style="padding: 30px;">
            
            <div style="display: flex; background: #f1f5f9; border-radius: 16px; padding: 20px; margin-bottom: 30px;">
                <div style="flex: 1;">
                <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600;">Scheduled Date</p>
                <p style="margin: 5px 0 0; font-size: 16px; font-weight: 700;">${new Date(booking_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                </div>
                <div style="flex: 1; border-left: 1px solid #cbd5e1; padding-left: 20px;">
                <p style="margin: 0; font-size: 12px; color: #64748b; text-transform: uppercase; font-weight: 600;">Time Slot</p>
                <p style="margin: 5px 0 0; font-size: 16px; font-weight: 700;">${booking_time}</p>
                </div>
            </div>

            <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; border-bottom: 1px solid #f1f5f9; padding-bottom: 10px; margin-bottom: 15px;">Client Information</h3>
            
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 30px;">
                <tr>
                <td style="padding: 8px 0; font-size: 14px; color: #64748b; width: 100px;">Name:</td>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #0f172a;">${fullName}</td>
                </tr>
                <tr>
                <td style="padding: 8px 0; font-size: 14px; color: #64748b;">Email:</td>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 600; color: #657b43;">${email}</td>
                </tr>
                <tr>
                <td style="padding: 8px 0; font-size: 14px; color: #64748b;">Phone:</td>
                <td style="padding: 8px 0; font-size: 14px; font-weight: 600;">${phone || 'Not Provided'}</td>
                </tr>
            </table>

            <h3 style="font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; margin-bottom: 10px;">Inquiry Details</h3>
            <div style="background: #fdfdfd; border: 1px solid #f1f5f9; border-left: 4px solid #657b43; padding: 20px; border-radius: 8px; font-style: italic; color: #334155; line-height: 1.6;">
                "${message}"
            </div>

            <div style="margin-top: 40px; text-align: center;">
                <a href="${adminCalendarUrl}" style="background: #0f172a; color: #ffffff; text-decoration: none; padding: 15px 30px; border-radius: 12px; font-weight: 600; font-size: 14px; display: inline-block;">
                ➕ Add to Admin Calendar
                </a>
            </div>

            </div>

            <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #f1f5f9;">
            <p style="margin: 0; font-size: 12px; color: #94a3b8;">Sent via AIPA Travels Booking Engine</p>
            </div>

        </div>
        </div>`;

    const customerHtml = `
    <div style="font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; background-color: #f4f7f5; padding: 40px 10px; color: #374151;">
        <div style="max-width: 600px; margin: auto; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 25px rgba(101, 123, 67, 0.1);">
            
            <div style="background: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop'); background-size: cover; background-position: center; padding: 60px 20px; text-align: center; color: #fff;">
            <h1 style="margin: 0; font-size: 28px; letter-spacing: 2px; text-transform: uppercase;">AIPA Travels</h1>
            <div style="height: 2px; width: 40px; background: #8fae5d; margin: 15px auto;"></div>
            <p style="margin: 0; font-size: 16px; font-weight: 300;">Your Journey Begins Here</p>
            </div>

            <div style="padding: 40px 30px;">
            <h2 style="font-size: 22px; color: #111827; margin-top: 0;">Hi ${data.firstName}, 👋</h2>
            <p style="line-height: 1.6; color: #4b5563;">Your travel consultation has been successfully booked. We've reserved a dedicated time slot for our experts to help craft your perfect itinerary.</p>

            <div style="margin: 30px 0; padding: 25px; border-radius: 20px; background-color: #f9fafb; border: 1px solid #edf2f7; text-align: center;">
                <p style="text-transform: uppercase; font-size: 12px; color: #657b43; font-weight: 700; margin-bottom: 10px; letter-spacing: 1px;">Scheduled For</p>
                <p style="font-size: 20px; font-weight: 700; color: #1a202c; margin: 0;">
                ${new Date(data.booking_date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                </p>
                <p style="font-size: 18px; color: #4a5568; margin: 5px 0 20px;">at ${data.booking_time}</p>
                
                <a href="${googleCalendarUrl}" target="_blank" style="display: inline-block; padding: 12px 25px; background-color: #657b43; color: #ffffff; text-decoration: none; border-radius: 12px; font-weight: 600; font-size: 14px; box-shadow: 0 4px 12px rgba(101, 123, 67, 0.2);">
                🗓️ Add to Google Calendar
                </a>
            </div>

            <div style="border-top: 1px solid #f3f4f6; padding-top: 25px;">
                <p style="margin: 5px 0; font-size: 14px;"><strong>Consultant:</strong> AIPA Senior Advisor</p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Location:</strong> Online Meeting / Office Visit</p>
                <p style="margin: 5px 0; font-size: 14px;"><strong>Topic:</strong> ${data.message.substring(0, 50)}...</p>
            </div>

            <div style="margin-top: 40px; padding: 20px; border-left: 4px solid #8fae5d; background: #fdfdfd; font-style: italic; color: #6b7280; font-size: 14px;">
                "Traveling – it leaves you speechless, then turns you into a storyteller." We look forward to hearing your story!
            </div>
            <p style="font-size:12px;color:#64748b;margin-top:20px">If you need to reschedule, please contact us at ${company.email}</p>
            </div>

          
          <!-- CTA -->
            <div style="margin-top:30px;padding:20px;background:#f1f5f9;border-radius:12px;text-align:center">
              <p style="margin:0;font-size:14px">
                We usually reply within <strong>24 hours</strong>.
              </p>
            </div>

          <!-- FOOTER -->
          <div style="background:#647b42;color:#fff;padding:25px;text-align:center;font-size:13px">
            
            <p style="margin:0 0 8px"><strong>${company.name}</strong></p>
            <p style="margin:0">${company.address}</p>
            <p style="margin:5px 0">${company.phone} | ${company.email}</p>

            <div style="margin:10px 0">
              <a href="${company.social.facebook}" style="margin:0 5px;color:#fff;text-decoration:none">Facebook</a> |
              <a href="${company.social.instagram}" style="margin:0 5px;color:#fff;text-decoration:none">Instagram</a>
            </div>

            <p style="margin-top:10px;font-size:11px;color:#fff">
              ${company.Policy}
            </p>

            <p style="margin-top:10px;font-size:11px;color:#fff">
              © ${new Date().getFullYear()} ${company.name}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>`;

    // 3. SEND EMAILS
    await Promise.all([
      resend.emails.send({
        from: "AIPA Travels <info@aipatravels.com>",
        to: company.email,
        subject: `[Booking] ${fullName} - ${booking_date}`,
        html: adminHtml,
      }),
      resend.emails.send({
        from: "AIPA Travels <info@aipatravels.com>",
        to: email,
        subject: "Consultation Confirmed - AIPA Travels",
        html: customerHtml,
      })
    ]);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Processing failed" }, { status: 500 });
  }
}