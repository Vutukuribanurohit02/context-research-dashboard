import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, message } = body;

    // Basic Validation
    if (!name || typeof name !== "string" || name.trim() === "") {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required" }, { status: 400 });
    }
    if (!message || typeof message !== "string" || message.trim() === "") {
      return NextResponse.json({ error: "Message content is required" }, { status: 400 });
    }

    // TODO: Connect this placeholder endpoint to an actual email delivery service (like SendGrid, Resend, or AWS SES)
    // or store the contact inquiry directly in a secure database.
    console.log("Contact form inquiry received:", { name, email, message });

    return NextResponse.json({ success: true, message: "Thanks — I'll get back to you soon." });
  } catch (error: any) {
    console.error("Contact API error:", error);
    return NextResponse.json({ error: error.message || "An unexpected error occurred" }, { status: 500 });
  }
}
