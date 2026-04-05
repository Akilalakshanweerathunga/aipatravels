import { NextResponse } from "next/server";
import { Resend } from "resend";
import { company } from "@/data/company";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const fullName = `${data.firstName} ${data.lastName}`;

    const adminHtml = `
    <div style="font-family:Arial,sans-serif;padding:20px;background:#f1f5f9;color:#334155">
      <div style="max-width:600px;margin:auto;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 20px 40px rgba(0,0,0,0.08)">
        
        <!-- HEADER -->
        <div style="background:linear-gradient(135deg,#0f172a,#334155);color:#fff;padding:25px">
          <h2 style="margin:0">New Contact Message</h2>
          <p style="margin:5px 0 0;opacity:0.8">${new Date().toLocaleString()}</p>
        </div>

        <!-- BODY -->
        <div style="padding:25px">

          <h3 style="border-bottom:1px solid #eee;padding-bottom:10px">Contact Details</h3>
          <p><strong>Name:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${data.email}</p>
          <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>

          <h3 style="border-bottom:1px solid #eee;padding-bottom:10px;margin-top:20px">Message</h3>

          <div style="background:#f8fafc;padding:15px;border-radius:10px;border-left:4px solid #657b43;font-style:italic">
            ${data.message}
          </div>

        </div>

        <!-- FOOTER -->
        <div style="background:#f1f5f9;padding:15px;text-align:center;font-size:12px;color:#64748b">
          Sent via ${company.name} Website
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

          <h2 style="margin-top:0">Hi ${data.firstName}, 👋</h2>
          <p>Thank you for reaching out to us! We've received your message and our team will get back to you shortly.</p>

          <!-- MESSAGE SUMMARY -->
          <div style="margin-top:25px;background:#f8fafc;padding:20px;border-radius:12px">
            <h3 style="margin-top:0;color:#657b43">Your Message</h3>
            <p style="font-style:italic">${data.message}</p>
          </div>

          <!-- CONTACT INFO -->
          <div style="margin-top:25px">
            <h3 style="border-bottom:2px solid #e2e8f0;padding-bottom:8px;color:#657b43">Your Details</h3>
            <p><strong>Name:</strong> ${fullName}</p>
            <p><strong>Email:</strong> ${data.email}</p>
            <p><strong>Phone:</strong> ${data.phone || 'N/A'}</p>
          </div>

          <!-- CTA -->
          <div style="margin-top:30px;padding:20px;background:#f1f5f9;border-radius:12px;text-align:center">
            <p style="margin:0;font-size:14px">
              We usually reply within <strong>24 hours</strong>.
            </p>
          </div>

        </div>

        <!-- FOOTER -->
        <div style="background:#0f172a;color:#cbd5f5;padding:25px;text-align:center;font-size:13px">
          
          <p style="margin:0 0 8px"><strong>${company.name}</strong></p>
          <p style="margin:0">${company.address}</p>
          <p style="margin:5px 0">${company.phone} | ${company.email}</p>

          <div style="margin:10px 0">
            <a href="${company.social.facebook}" style="margin:0 5px;color:#cbd5f5;text-decoration:none">Facebook</a> |
            <a href="${company.social.instagram}" style="margin:0 5px;color:#cbd5f5;text-decoration:none">Instagram</a>
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
      from: "Aipa Travels <info@aipatravels.com>",
      to: company.email,
      subject: `New Contact Message - ${fullName}`,
      html: adminHtml,
    });

    await resend.emails.send({
      from: "Aipa Travels <info@aipatravels.com>",
      to: data.email,
      subject: "We received your message",
      html: customerHtml,
    });

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Email Error:", error);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}