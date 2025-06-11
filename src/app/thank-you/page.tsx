"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCartStore } from "@/store/cardStore";

type CartItem = {
  _id: string;
  title: string;
  image: string;
  price: number;
  currency: string;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
};

type OrderData = {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zip: string;
};

export default function ThankYouPage() {
  const [customer, setCustomer] = useState<OrderData | null>(null);
  const [orderId, setOrderId] = useState<string>("");
  const cartItems: CartItem[] = useCartStore((state) => state.cartItems);
  console.log({ cartItems });

  const totalAmount = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const storedData = localStorage.getItem("orderData");
    if (storedData) {
      const parsed = JSON.parse(storedData);
      setCustomer(parsed);
      const generatedId = "ORD-" + Date.now().toString().slice(-6);
      setOrderId(generatedId);
      localStorage.removeItem("orderData");
    }
  }, []);

  console.log({ orderId });

  if (!customer) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
        <div className="text-center">Loading your order details...</div>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-10">
      <div className="max-w-2xl w-full bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-green-600 mb-4 text-center">
          Thank You!
        </h1>
        <p className="text-gray-700 text-lg mb-4 text-center">
          Your order has been successfully placed.
        </p>

        {/* Order Number */}
        <div className="mb-6 text-sm text-gray-600 text-center">
          <p>
            <strong>Order Number:</strong> #{orderId}
          </p>
        </div>

        {/* Customer Details */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Customer Details</h2>
          <ul className="space-y-1 text-sm text-gray-800">
            <li>
              <strong>Name:</strong> {customer.fullName}
            </li>
            <li>
              <strong>Email:</strong> {customer.email}
            </li>
            <li>
              <strong>Phone:</strong> {customer.phone}
            </li>
            <li>
              <strong>Address:</strong>{" "}
              {`${customer.address}, ${customer.city}, ${customer.state} - ${customer.zip}`}
            </li>
          </ul>
        </div>

        {/* Order Summary */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
          <ul className="space-y-3 text-sm text-gray-700">
            {cartItems.map((item, idx) => (
              <li key={idx} className="border rounded-md p-3">
                <p>
                  <strong>{item.title}</strong>
                </p>
                <p>
                  Qty: {item.quantity} | ₹{item.price} each
                </p>
                <p>
                  Color: {item.selectedColor} | Size: {item.selectedSize}
                </p>
              </li>
            ))}
          </ul>
        </div>

        {/* Total Amount */}
        <div className="flex justify-between items-center font-semibold text-base border-t pt-4">
          <span>Total Amount:</span>
          <span>₹{totalAmount.toFixed(2)}</span>
        </div>

        {/* Final Confirmation */}
        <p className="text-green-700 font-medium text-center mt-6">
          A confirmation email has been sent to{" "}
          <strong>{customer.email}</strong>.
          <br />
          Thank you for shopping with us!
        </p>

        <div className="text-center mt-6">
          <Link
            href="/"
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
