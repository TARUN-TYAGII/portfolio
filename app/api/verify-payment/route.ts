import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await request.json();

    // console.log("process.env.RAZORPAY_KEY_SECRET! line 12", process.env.RAZORPAY_KEY_SECRET!);

    const sign = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSign = crypto.createHmac("sha256", process.env.RAZORPAY_KEY_SECRET).update(sign).digest("hex");

    // console.log("Expected sign", expectedSign);
    // console.log("Received sign", razorpay_signature);

    const verified = expectedSign === razorpay_signature;

    return NextResponse.json({ verified });
  } catch (error) {
    console.error("Payment verification error:", error);
    return NextResponse.json({ error: "Error verifying payment" }, { status: 500 });
  }
}
