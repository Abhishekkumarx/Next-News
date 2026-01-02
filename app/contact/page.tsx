"use client"

import { useState } from "react"

declare global {
  interface Window {
    Razorpay: any
  }
}

export default function ContactPage() {
  const [paid, setPaid] = useState(false)
  const [loading, setLoading] = useState(false)

  const loadRazorpay = () =>
    new Promise((resolve) => {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.onload = resolve
      document.body.appendChild(script)
    })

            const handlePayment = async () => {
            setLoading(true)

            await loadRazorpay()

            const orderRes = await fetch("/api/razorpay/order", {
                method: "POST",
            })

            const order = await orderRes.json()

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
                amount: order.amount,
                currency: order.currency,
                order_id: order.id,
                name: "NextNews",
                description: "Contact Verification",

                handler: async function (response: any) {
                try {
                    const verifyRes = await fetch("/api/razorpay/verify", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(response),
                    })

                    const data = await verifyRes.json()

                    if (data.success) {
                    setPaid(true) // ✅ THIS WAS NOT FIRING
                    } else {
                    alert("Payment verification failed")
                    }
                } catch (err) {
                    alert("Something went wrong during verification")
                }
                },

                theme: { color: "#2563eb" },
            }

            const rzp = new window.Razorpay(options)
            rzp.open()

            setLoading(false)
            }


  return (
    <main className="max-w-xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold mb-6">
        Contact Us
      </h1>

{!paid ? (
  <>
    <p className="text-gray-600 mb-6">
      Please complete a small verification payment to contact us.
    </p>

    <button
      onClick={handlePayment}
      disabled={loading}
      className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
    >
      {loading ? "Processing..." : "Pay ₹50 & Continue"}
    </button>
  </>
) : (
  <>
    <p className="text-green-600 font-medium mb-6">
      ✅ Payment successful! You can now contact us.
    </p>

    <form className="space-y-4">
      <input
        className="w-full border px-4 py-2 rounded"
        placeholder="Your Name"
        required
      />

      <input
        className="w-full border px-4 py-2 rounded"
        placeholder="Your Email"
        type="email"
        required
      />

      <textarea
        className="w-full border px-4 py-2 rounded"
        placeholder="Your Message"
        rows={4}
        required
      />

      <button className="bg-blue-600 text-white px-6 py-2 rounded">
        Send Message
      </button>
    </form>
  </>
)}

    </main>
  )
}
