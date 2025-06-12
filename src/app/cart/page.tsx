"use client";

import EmptyCart from "@/model/emptyCart";
import { useCartStore } from "@/store/cardStore";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const cartItems = useCartStore((state) => state.cartItems);
  const removeFromCart = useCartStore((state) => state.removeFromCart);
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <main className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cartItems.length === 0 ? (
        <EmptyCart />
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map((item) => (
              <div
                key={`${item._id}-${item.selectedColor}-${item.selectedSize}`}
                className="bg-white p-4 rounded-md shadow flex justify-between items-center"
              >
                <div className="flex gap-4">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <h2 className="font-bold">{item.title}</h2>
                    <p className="text-sm text-gray-600">
                      {item.selectedColor} / {item.selectedSize}
                    </p>
                    <p>
                      {item.currency} {item.price.toFixed(2)} × {item.quantity}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item._id)}
                  className="text-red-600 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-6 text-right text-lg font-semibold">
            Total: ₹ {total.toFixed(2)}
          </div>
          <div className="flex justify-center mt-4">
            <button
              className="px-5 py-2 rounded-md border border-gray-500 bg-white text-gray-700 hover:bg-gray-100 transition"
              onClick={() => router.push("/checkout")}
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </main>
  );
}
