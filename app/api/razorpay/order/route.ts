import Razorpay from "razorpay"
import { NextResponse } from "next/server"

function getRazorpayInstance() {
  const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    throw new Error("`key_id` or `oauthToken` is mandatory")
  }

  return new Razorpay({
    key_id: keyId,
    key_secret: keySecret,
  })
}

export async function POST() {
  try {
    const razorpay = getRazorpayInstance()
    const order = await razorpay.orders.create({
      amount: 5000, // ₹50 (in paise)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    })

    return NextResponse.json(order)
  } catch (error) {
    console.error("Razorpay error:", error)
    return NextResponse.json(
      { error: "Failed to create Razorpay order" },
      { status: 500 }
    )
  }
}
