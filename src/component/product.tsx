"use client";

import { useCartStore } from "@/store/cardStore";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type Product = {
  _id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  variants: {
    color: string[];
    size: string[];
  };
  defaultVariant: {
    color: string;
    size: string;
  };
  stock: number;
};

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const addToCart = useCartStore((state) => state.addToCart);
  const router = useRouter();

  const [showModal, setShowModal] = useState(false);
  const [selectedColor, setSelectedColor] = useState(
    product.defaultVariant.color || product.variants.color[0] || ""
  );
  const [selectedSize, setSelectedSize] = useState(
    product.defaultVariant.size || product.variants.size[0] || ""
  );
  const [quantity, setQuantity] = useState(1);
  const [error, setError] = useState("");

  const formattedPrice = product.price.toFixed(2);

  const handleConfirmAddToCart = () => {
    addToCart({
      _id: product._id,
      title: product.title,
      image: product.image,
      price: product.price,
      currency: product.currency,
      selectedColor,
      selectedSize,
      quantity,
    });
    setShowModal(false);
    alert(
      `✅ Added ${quantity} x ${product.title} (${selectedColor}, ${selectedSize}) to cart.`
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val > 5) {
      setQuantity(5);
      setError("Maximum quantity allowed is 5.");
    } else if (val < 1) {
      setQuantity(1);
      setError("Quantity must be at least 1.");
    } else {
      setQuantity(val);
      setError("");
    }
  };

  return (
    <>
      <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition overflow-hidden max-w-sm">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-52 object-cover"
        />

        <div className="p-4">
          <h2 className="font-bold text-lg text-gray-900">{product.title}</h2>
          <p className="text-gray-600 text-sm mt-1 line-clamp-2">
            {product.description}
          </p>
          <div className="mt-3 text-gray-800 font-semibold text-base">
            {product.currency} {formattedPrice}
          </div>

          <button
            disabled={product.stock === 0}
            onClick={() => setShowModal(true)}
            className={`mt-4 w-full py-2 rounded-lg text-white font-medium text-sm transition ${
              product.stock === 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
            }`}
          >
            {product.stock === 0 ? "Out of Stock" : "Choose Options"}
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4">
          <div className="bg-white text-black max-w-md w-full rounded-xl shadow-lg p-6 relative">
            <h3 className="text-lg font-bold mb-3 text-gray-800">
              Customize your product
            </h3>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover rounded-md mb-3"
            />
            <h4 className="text-md font-semibold text-gray-900 mb-1">
              {product.title}
            </h4>
            <p className="text-sm text-gray-600 mb-4">{product.description}</p>

            {/* Color Selector */}
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Color
              </label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {product.variants.color.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>

            {/* Size Selector */}
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Size
              </label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                {product.variants.size.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            {/* Quantity Selector */}
            <div className="mb-3">
              <label className="block text-sm font-medium mb-1 text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                min={1}
                max={5}
                value={quantity}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
              {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
              <p className="mt-2 text-sm font-medium text-gray-700">
                Total: {product.currency}{" "}
                {(Number(formattedPrice) * quantity).toFixed(2)}
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-sm rounded-md border border-gray-400 text-gray-700 bg-white hover:bg-gray-100 transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={!!error}
                onClick={handleConfirmAddToCart}
                className={`px-4 py-2 text-sm font-semibold text-white rounded-md transition ${
                  error
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-indigo-600 hover:bg-indigo-700 cursor-pointer"
                }`}
              >
                Add to Cart
              </button>
              <button
                onClick={() => router.push("/cart")}
                className="px-4 py-2 text-sm rounded-md border border-gray-400 text-gray-700 bg-white hover:bg-gray-100 transition cursor-pointer"
              >
                Go to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
