
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    // 1. Receive frontend data
    const {
      name,
      email,
      subject,
      message,
      type,
      company,
    } = await request.json();

    // 2. Honeypot spam protection
    if (company) {
      return Response.json(
        { success: true, message: "Message received." },
        { status: 200 }
      );
    }

    // 3. Validate required fields
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return Response.json(
        { error: "Name, email and message are required." },
        { status: 400 }
      );
    }

    // 4. Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {
      return Response.json(
        { error: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    // 5. Read environment variables
    const {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      CONTACT_EMAIL,
    } = process.env;

    const requiredEnv = {
      SMTP_HOST,
      SMTP_PORT,
      SMTP_USER,
      SMTP_PASS,
      CONTACT_EMAIL,
    };

    const missingEnv = Object.entries(requiredEnv)
      .filter(([key, value]) => !value?.trim())
      .map(([key]) => key);

    if (missingEnv.length > 0) {
      console.error("Missing SMTP variables:", missingEnv);

      return Response.json(
        {
          error: `Missing environment variables: ${missingEnv.join(", ")}`,
        },
        { status: 503 }
      );
    }

    // 6. Create SMTP transporter
    const port = Number(SMTP_PORT);

    if (![465, 587].includes(port)) {
      return Response.json(
        { error: "Invalid SMTP port configuration." },
        { status: 503 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,

      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS.replace(/\s/g, ""),
      },

      connectionTimeout: 15000,
      greetingTimeout: 15000,
      socketTimeout: 20000,
    });

    // 7. Send email
    const info = await transporter.sendMail({
      from: `"Portfolio Contact" <${SMTP_USER}>`,
      to: CONTACT_EMAIL,
      replyTo: email.trim(),

      subject:
        subject?.trim() ||
        `${type || "General Inquiry"} from ${name.trim()}`,

      text: `
New Contact Form Message

Name: ${name}
Email: ${email}
Inquiry Type: ${type || "General"}

Subject: ${subject || "No subject"}

Message:
${message}
      `,

      html: `
        <h2>New Portfolio Contact Message</h2>

        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Inquiry:</strong> ${escapeHtml(type || "General")}</p>
        <p><strong>Subject:</strong> ${escapeHtml(subject || "No subject")}</p>

        <hr />

        <h3>Message:</h3>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });

    console.log("Email sent successfully:", info.messageId);

    // 8. Success response
    return Response.json(
      {
        success: true,
        message: "Email sent successfully!",
      },
      { status: 200 }
    );

  } catch (error) {
    // 9. Debug actual error
    console.error("CONTACT EMAIL ERROR:", {
      message: error.message,
      code: error.code,
      responseCode: error.responseCode,
      command: error.command,
    });

    return Response.json(
      {
        error: error.message || "Unable to send email.",
        code: error.code || "UNKNOWN_ERROR",
      },
      { status: 503 }
    );
  }
}

// 10. Prevent HTML injection
function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
