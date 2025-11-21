import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req) {
  try {
    // parse JSON body
    const { name, email, message } = await req.json();

    // --- Minimal server-side validation ---
    if (!name || !email || !message) {
      return Response.json(
        { ok: false, error: "Missing required fields." },
        { status: 400 }
      );
    }

    // --- Send the email ---
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM,
      to: process.env.RESEND_TO, // MUST be YOUR email for testing
      subject: `Portfolio Contact from ${name}`,
      text: `From: ${name} (${email})\n\n${message}`,
    });

    if (error) {
      return Response.json(
        { ok: false, error: error },
        { status: error?.statusCode || 400 }
      );
    }

    return Response.json(
      {
        ok: true,
        message: "Email sent successfully.",
      },
      { status: 200 }
    );

  } catch (err) {
    console.error("CONTACT API ERROR:", err);
    return Response.json(
      { ok: false, error: "Server error processing request." },
      { status: 500 }
    );
  }
}

// Optional: Prevent GET requests
export function GET() {
  return Response.json(
    { error: "Method Not Allowed" },
    { status: 405 }
  );
}
