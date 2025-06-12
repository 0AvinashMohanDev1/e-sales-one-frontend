"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  return (
    <nav className="bg-blue-600 p-4 flex justify-center gap-6">
      <button
        onClick={() => router.push("/")}
        className="text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
      >
        Products
      </button>
      <button
        onClick={() => router.push("/checkout")}
        className="text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
      >
        Checkout
      </button>
      <button
        onClick={() => router.push("/cart")}
        className="text-white font-semibold px-4 py-2 rounded hover:bg-blue-700 transition cursor-pointer"
      >
        Cart
      </button>
    </nav>
  );
}
