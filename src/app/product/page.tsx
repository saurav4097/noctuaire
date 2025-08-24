"use client";

import Image from "next/image";
import Link from "next/link";

import { useEffect, useState } from "react";

interface product {
  name: string;
  image: string;
  gender: string;
  description: string;
  aff_url: string;
  dress_code: string;
  group_name: string;
}
export default function ProductPage() {
  const [products, setProducts] = useState<product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const res = await fetch("/api/product");
      const data = await res.json();
      setProducts(data);
    }
    fetchProducts();
  }, []);
  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header with Logo & Back */}
        {/* Top Logo */}
      <header className="flex justify-between items-center px-6 py-4">  
        <Link
          href="/series"
          className="text-sm md:text-base font-medium text-gray-600 hover:text-black"
        >
          ← Back
        </Link>
      </header>

      <header className="w-full flex justify-center py-6">
        <Image
          src="/Noctuaire.png"
          alt="Noctuaire Logo"
          width={90}
          height={90}
          className="object-contain"
        />
      </header>


      {/* Product Title & Description */}
      <section className="px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide font-serif">
          Product Name
        </h1>
        <p className="text-lg text-gray-500 italic mt-1">Series Name</p>
        <p className="mt-4 text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
          Description of the product goes here — refined, bold and timeless style
          that defines luxury living.
        </p>
      </section>

      {/* Main Product Image Full Width */}
      <section className="relative w-full h-[80vh] md:h-[90vh] mt-6">
        <Image
          src="/front page.jpg"
          alt="Main Product"
          fill
          className="object-cover"
        />

        {/* Overlay Small Cards (instead of arrows & labels) */}
        <div className="absolute top-1/3 left-4 bg-white shadow-lg rounded-lg p-3 flex items-center gap-3 w-48">
          <Image
            src="/front page.jpg"
            alt="Hair Style"
            width={60}
            height={60}
            className="object-cover rounded-md"
          />
          <div>
            <p className="text-sm font-semibold">Hair Style</p>
            <p className="text-xs text-gray-600">$30</p>
          </div>
        </div>

        {products && products.length > 0 ? (
          <Link
    href={products[0].aff_url}
    target="_blank" // 👈 open in new tab
    rel="noopener noreferrer"
    className="absolute top-1/2 right-4 bg-white shadow-lg rounded-lg p-3 flex items-center gap-3 w-48 hover:scale-105 transition cursor-pointer"
  >
  <div className="absolute top-1/2 right-4 bg-white shadow-lg rounded-lg p-3 flex items-center gap-3 w-48">
    <Image
      src={products[0].image}
      alt={products[0].name}
      width={60}
      height={60}
    />
    <span className="text-sm font-medium">{products[0].name}</span>
  </div>
  </Link>
) : (
  <p className="text-gray-500">No products found.</p>
)}


        <div className="absolute bottom-20 left-10 bg-white shadow-lg rounded-lg p-3 flex items-center gap-3 w-48">
          <Image
            src="/front page.jpg"
            alt="Shoes"
            width={60}
            height={60}
            className="object-cover rounded-md"
          />
          <div>
            <p className="text-sm font-semibold">Shoes</p>
            <p className="text-xs text-gray-600">$200</p>
          </div>
        </div>
      </section>

      {/* Price & Buy Section */}
      <section className="text-center py-10">
        <h2 className="text-2xl md:text-3xl font-bold">Price: $350</h2>
        <Link
          href="#"
          className="inline-block mt-4 bg-black text-white px-6 py-3 rounded-full font-semibold hover:opacity-90 transition"
        >
          Buy Now
        </Link>
      </section>

      {/* Suggested Products Section */}
      <section className="px-6 mt-10">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="bg-white border rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
            >
              <div className="relative w-full h-40">
                <Image
                  src="/front page.jpg"
                  alt={`Product ${i}`}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3">
                <h3 className="text-sm font-semibold">Product {i}</h3>
                <p className="text-xs text-gray-600">$100</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bottom Logo + Line */}
      <section className="text-center mt-16">
        <div className="flex justify-center mb-6">
          <Image
            src="/Noctuaire.png"
            alt="Noctuaire Logo"
            width={100}
            height={100}
            className="object-contain"
          />
        </div>
        <p className="text-lg md:text-xl italic text-gray-700 max-w-2xl mx-auto leading-relaxed">
          “Luxury isn’t about buying more — it’s about choosing the timeless
          pieces that walk with you forever.”
        </p>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 bg-gray-100 border-t mt-10">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Noctuaire. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
