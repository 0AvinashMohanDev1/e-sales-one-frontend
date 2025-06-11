"use client";

import React from "react";
import sampleProduct from "./data";
import ProductCard from "@/component/product";

export default function ProductPage() {
  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Products</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {sampleProduct.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </main>
  );
}
