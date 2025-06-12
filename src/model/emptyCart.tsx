"use client";

import { useRouter } from "next/navigation";
import { FaShoppingCart } from "react-icons/fa";

export default function EmptyCart() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <FaShoppingCart className="text-5xl text-gray-400 mb-4" />
      <h2 className="text-2xl font-semibold mb-2 text-gray-700">
        Your cart is empty
      </h2>
      <p className="text-gray-500 mb-6">
        Looks like you haven’t added anything yet.
      </p>
      <button
        onClick={() => router.push("/")}
        className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md transition cursor-pointer"
      >
        Continue Shopping
      </button>
    </div>
  );
}
