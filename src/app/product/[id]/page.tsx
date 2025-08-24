"use client";

import Image from "next/image";
import Link from "next/link";
import { use, useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  image: string;
  gender: string;
  description: string;
  aff_url: string;
  dress_code: string;
  group_name: string;
}

interface Dress {
  _id: string;
  name: string;
  image: string;
  description: string;
  gender: string;
  group_name: string;
  groupId?: string; // 👈 added
}

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // ✅ unwrap Promise

  const [dress, setDress] = useState<Dress | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchData() {
      // 1️⃣ Get the Dress info
      const resDress = await fetch(`/api/dress/${id}`);
      const dressData = await resDress.json();
      setDress(dressData);

      // 2️⃣ Get all products
      const resProd = await fetch("/api/product");
      const prodData: Product[] = await resProd.json();

      const matched = prodData.filter((p) => p.dress_code === dressData.name);
      const padded = [...matched, ...Array(3)].slice(0, 3);

setProducts(padded);
    }

    fetchData();
  }, [id]);

  if (!dress) {
    return <p className="text-center mt-20">Loading dress...</p>;
  }

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4">
        <Link
           href={dress.groupId ? `/series/${dress.groupId}` : "/series"} // ✅ dynamic back
          className="text-sm md:text-base font-medium text-gray-600 hover:text-black"
        >
          ← Back
        </Link>
      </header>

      {/* Logo */}
      <header className="w-full flex justify-center py-6">
        <Image
          src="/Noctuaire.png"
          alt="Noctuaire Logo"
          width={90}
          height={90}
          className="object-contain"
        />
      </header>

      {/* Dress Title */}
      <section className="px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-wide font-serif">
          {dress.name}
        </h1>
        <p className="text-lg text-gray-500 italic mt-1">{dress.group_name}</p>
        <p className="mt-4 text-base md:text-lg text-gray-700 max-w-2xl mx-auto leading-relaxed">
          {dress.description}
        </p>
      </section>

      {/* Dress Image */}
      <section className="relative w-full h-[80vh] md:h-[90vh] mt-6">
        <Image
          src={dress.image}
          alt={dress.name}
          fill
          className="object-cover"
        />

        {/* Overlay Small Product Cards */}
        {products.map((p, index) => {
             if (!p) return null; // skip if no product
          // position overlays in 3 fixed spots
          const positions = [
            "top-1/3 left-4",
            "top-1/2 right-4",
            "bottom-20 left-10",
          ];
          return (
            <Link
              key={p._id}
              href={p.aff_url}
              target="_blank"
              rel="noopener noreferrer"
              className={`absolute ${positions[index]} bg-white shadow-lg rounded-lg p-3 flex items-center gap-3 w-48 hover:scale-105 transition`}
            >
              <Image
                src={p.image}
                alt={p.name}
                width={60}
                height={60}
                className="object-cover rounded-md"
              />
              <div>
                <p className="text-sm font-semibold">{p.name}</p>
                <p className="text-xs text-gray-600">Shop Now</p>
              </div>
            </Link>
          );
        })}
      </section>

      {/* Bottom Section */}
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

      <footer className="text-center py-6 bg-gray-100 border-t mt-10">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Noctuaire. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
