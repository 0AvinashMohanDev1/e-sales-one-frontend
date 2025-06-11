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
    product.defaultVariant.color
  );
  const [selectedSize, setSelectedSize] = useState(product.defaultVariant.size);
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
      `Added ${quantity} x ${product.title} (${selectedColor}, ${selectedSize}) to cart.`
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
      <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white p-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="font-bold text-xl mb-2">{product.title}</h2>
        <p className="text-gray-700 text-sm mb-4">{product.description}</p>

        <p className="text-lg font-semibold mb-4">
          {product.currency} {formattedPrice}
        </p>

        <button
          disabled={product.stock === 0}
          onClick={() => setShowModal(true)}
          className={`w-full py-2 rounded-md text-white font-semibold ${
            product.stock === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          } transition`}
        >
          {product.stock === 0 ? "Out of Stock" : "Choose Options"}
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">
              Customize your product
            </h3>
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover rounded-md mb-4"
            />
            <h2 className="font-bold text-xl mb-2">{product.title}</h2>
            <p className="text-gray-700 text-sm mb-4">{product.description}</p>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Color:</label>
              <select
                value={selectedColor}
                onChange={(e) => setSelectedColor(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                {product.variants.color.map((color) => (
                  <option key={color} value={color}>
                    {color}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Size:</label>
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-2"
              >
                {product.variants.size.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block mb-1 font-medium">Quantity:</label>
              <input
                type="number"
                min={1}
                max={5}
                value={quantity}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2"
              />
              {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
              <p className="text-lg font-semibold mt-2">
                {product.currency} {formattedPrice} × {quantity} ={" "}
                {(Number(formattedPrice) * quantity).toFixed(2)}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-4 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 rounded-md border border-gray-500 bg-white text-gray-700 hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                disabled={!!error}
                onClick={handleConfirmAddToCart}
                className={`px-5 py-2 rounded-md font-semibold text-white transition ${
                  error
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-700"
                }`}
              >
                Add to Cart
              </button>

              <button
                onClick={() => router.push("/cart")}
                className="px-5 py-2 rounded-md border border-gray-500 bg-white text-gray-700 hover:bg-gray-100 transition"
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
