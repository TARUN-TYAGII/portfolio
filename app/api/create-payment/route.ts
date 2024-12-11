import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import ShortUniqueId from "short-unique-id";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const uid = new ShortUniqueId();

export async function POST(request: Request) {
  // console.log("Creating payment order", request);
  // console.log("ID", process.env.RAZORPAY_KEY_ID);
  // console.log("KEY", process.env.RAZORPAY_KEY_SECRET);

  try {
    const { amount } = await request.json();
    // console.log("Amount", amount);

    const options = {
      amount: amount * 100,
      currency: "INR",
      receipt: uid.rnd(),
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({ order });
  } catch (error) {
    console.error("Payment creation error:", error);
    return NextResponse.json({ error: "Error creating payment order" }, { status: 500 });
  }
}
