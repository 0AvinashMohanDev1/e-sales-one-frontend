// app/checkout/page.tsx
"use client";

import { useFormik } from "formik";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { useCartStore } from "@/store/cardStore";
import { useState } from "react";
import { checkoutSchema } from "@/types/checkout";

type CheckoutFormValues = z.infer<typeof checkoutSchema>;

function ErrorModal({
  message,
  onClose,
}: {
  message: string;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-red-600">Error</h2>
        <p className="mb-6">{message}</p>
        <button
          onClick={onClose}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.cartItems);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const initialValues: CheckoutFormValues = {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  };

  const formik = useFormik({
    initialValues,
    validationSchema: toFormikValidationSchema(checkoutSchema),
    onSubmit: (values, { setFieldError }) => {
      const cardLastDigit = values.cardNumber.slice(-1);

      if (cardLastDigit === "3") {
        // Show popup error for Declined Transaction
        setErrorMessage("Declined Transaction: Your card was declined.");
        setFieldError("cardNumber", "Declined Transaction");
        return;
      }

      if (cardLastDigit === "5") {
        // Show popup error for Gateway Error / Failure
        setErrorMessage(
          "Gateway Error / Failure: There was a problem with the payment gateway."
        );
        setFieldError("cardNumber", "Gateway Error / Failure");
        return;
      }

      // If everything is fine, proceed
      console.log("Transaction Approved:", values);
      console.log("Form submitted", values);
      localStorage.setItem("orderData", JSON.stringify(values));
      router.push("/thank-you");
    },
  });

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-10 flex justify-center">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row gap-6">
        {/* Left: Form */}
        <form
          onSubmit={formik.handleSubmit}
          className="w-full md:w-2/3 space-y-4"
        >
          <h1 className="text-2xl font-bold mb-4">Checkout</h1>
          {/* Contact Section */}
          <h2 className="text-lg font-semibold mt-4 mb-2">Contact Details</h2>
          <div className="space-y-4">
            {[
              { name: "fullName", placeholder: "Full Name" },
              { name: "email", placeholder: "Email", type: "email" },
              { name: "phone", placeholder: "Phone Number" },
            ].map(({ name, placeholder, type = "text" }) => (
              <div key={name}>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={formik.values[name as keyof CheckoutFormValues]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                {formik.errors[name as keyof CheckoutFormValues] &&
                  formik.touched[name as keyof CheckoutFormValues] && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors[name as keyof CheckoutFormValues]}
                    </div>
                  )}
              </div>
            ))}
          </div>

          {/* Address Section */}
          <h2 className="text-lg font-semibold mt-6 mb-2">Shipping Address</h2>
          <div className="space-y-4">
            {[
              { name: "address", placeholder: "Address", type: "text" },
              { name: "city", placeholder: "City" },
              { name: "state", placeholder: "State" },
              { name: "zip", placeholder: "Zip Code" },
            ].map(({ name, placeholder, type = "text" }) => (
              <div key={name}>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={formik.values[name as keyof CheckoutFormValues]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                {formik.errors[name as keyof CheckoutFormValues] &&
                  formik.touched[name as keyof CheckoutFormValues] && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors[name as keyof CheckoutFormValues]}
                    </div>
                  )}
              </div>
            ))}
          </div>

          {/* Card Section */}
          <h2 className="text-lg font-semibold mt-6 mb-2">Card Details</h2>
          <div className="mb-4 p-3 rounded-md bg-yellow-50 border border-yellow-300 text-sm text-yellow-800">
            <strong>Note:</strong> Use a card number ending with{" "}
            <span className="font-medium text-red-600">
              3 (xxxxxxxxxxxxxxx3)
            </span>{" "}
            to simulate a <em>Declined Transaction </em>, and{" "}
            <span className="font-medium text-red-600">
              5 (xxxxxxxxxxxxxxx5)
            </span>{" "}
            to simulate a <em>Gateway Error / Failure </em>.
          </div>

          <div className="space-y-4">
            {[
              { name: "cardNumber", placeholder: "Card Number" },
              {
                name: "expiryDate",
                placeholder: "Expiry Date (YYYY-MM-DD)",
                type: "date",
              },
              { name: "cvv", placeholder: "CVV" },
            ].map(({ name, placeholder, type = "text" }) => (
              <div key={name}>
                <input
                  type={type}
                  name={name}
                  placeholder={placeholder}
                  value={formik.values[name as keyof CheckoutFormValues]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="w-full border border-gray-300 rounded-md p-2"
                />
                {formik.errors[name as keyof CheckoutFormValues] &&
                  formik.touched[name as keyof CheckoutFormValues] && (
                    <div className="text-red-500 text-sm mt-1">
                      {formik.errors[name as keyof CheckoutFormValues]}
                    </div>
                  )}
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
          >
            Place Order
          </button>
        </form>

        {/* Right: Cart Summary */}
        <div className="w-full md:w-1/3 border-l border-gray-200 pl-6">
          <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
          <div className="space-y-4 max-h-[500px] overflow-auto">
            {cartItems.length === 0 ? (
              <p className="text-gray-500">No items in cart.</p>
            ) : (
              cartItems.map((item, idx) => (
                <div
                  key={idx}
                  className="flex gap-4 border rounded-md p-2 shadow-sm"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-semibold">{item.title}</h3>
                    <p className="text-sm text-gray-600">
                      Color: {item.selectedColor}, Size: {item.selectedSize}
                    </p>
                    <p className="text-sm">Quantity: {item.quantity}</p>
                    <p className="font-semibold text-green-700">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Pricing Summary */}
          {cartItems.length > 0 && (
            <div className="mt-6 border-t pt-4 space-y-2 text-sm text-gray-800">
              {/* Subtotal */}
              <div className="flex justify-between">
                <span>
                  Subtotal ·{" "}
                  {cartItems.reduce((acc, item) => acc + item.quantity, 0)}{" "}
                  item(s)
                </span>
                <span>
                  ₹
                  {cartItems
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>

              {/* Shipping */}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Free</span>
              </div>

              {/* Estimated Taxes (Example: 18%) */}
              <div className="flex justify-between">
                <span>Estimated taxes</span>
                <span>
                  ₹
                  {cartItems
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>

              <div className="border-t pt-4 font-semibold flex justify-between text-base">
                <span>Total</span>
                <span>
                  ₹
                  {cartItems
                    .reduce((acc, item) => acc + item.price * item.quantity, 0)
                    .toFixed(2)}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Error Modal */}
        {errorMessage && (
          <ErrorModal
            message={errorMessage}
            onClose={() => setErrorMessage(null)}
          />
        )}
      </div>
    </main>
  );
}
