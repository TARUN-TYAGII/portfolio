import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", 
      port: 587,
      secure: false, 
      auth: {
        user: process.env.EMAIL_USER, 
        pass: process.env.EMAIL_PASS, 
      },
      authMethod: 'PLAIN',
      tls: {
        rejectUnauthorized: false
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: ["tyagiishiva@gmail.com","shivatyagii@outlook.com"],
      subject: "Portfolio",
      html: `
        <h5>${name} contacted you from your portfilio site</h5>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Sender's Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });

    // Return success response
    return NextResponse.json({ message: "Email sent successfully" }, { status: 200 });
  } catch (error) {
    // Handle any errors
    console.error("Email send error:", error);
    return NextResponse.json(
      {
        message: "Error sending email",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}