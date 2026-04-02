// controllers/payment.controller.js
import axios from "axios";

export const createCashfreeOrder = async (req, res) => {
  try {
    const { amount, userId, customer_name, customer_email, customer_phone } =
      req.body;

    if (!amount || amount <= 0) {
      return res.status(400).json({ error: true, message: "Invalid amount" });
    }

    const orderData = {
      order_amount: amount, // ← amount in rupees (13220 = ₹13220)
      order_currency: "INR",
      customer_details: {
        customer_id: userId || "guest_123",
        customer_name: customer_name || "Guest",
        customer_email: customer_email || "guest@example.com",
        customer_phone: customer_phone || "9999999999",
      },
      // Optional but recommended
      order_meta: {
        return_url: `http://localhost:5173/order/success`,
        notify_url: "https://yourdomain.com/api/webhook/cashfree", // for server-side verification
      },
    };

    const response = await axios.post(
      "https://sandbox.cashfree.com/pg/orders", // ← sandbox for testing
      orderData,
      {
        headers: {
          "Content-Type": "application/json",
          "x-api-version": "2023-08-01",
          "x-client-id": process.env.CASHFREE_APP_ID, // ← your test app ID
          "x-client-secret": process.env.CASHFREE_SECRET_KEY, // ← your test secret
        },
      }
    );

    // This is the exact field name Cashfree returns now
    return res.json({
      success: true,
      payment_session_id: response.data.payment_session_id,
      order_id: response.data.order_id,
    });
  } catch (error) {
    console.error("Cashfree Error:", error.response?.data || error.message);
    return res.status(500).json({
      error: true,
      message: "Failed to create Cashfree order",
      details: error.response?.data || error.message,
    });
  }
};
