"use client";

import { useEffect, useState } from "react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";

export default function ScrollButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  const scrollToBottom = () =>
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

  return (
    showButton && (
      <div className="fixed bottom-5 right-5 flex flex-col gap-3 z-50">
        <button
          onClick={scrollToTop}
          className="p-3 bg-indigo-600 text-white rounded-full shadow-lg hover:bg-indigo-700 transition"
        >
          <FaArrowUp />
        </button>
        <button
          onClick={scrollToBottom}
          className="p-3 bg-gray-600 text-white rounded-full shadow-lg hover:bg-gray-700 transition"
        >
          <FaArrowDown />
        </button>
      </div>
    )
  );
}
