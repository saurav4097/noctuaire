"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Group {
  _id: string;
  name: string;
  image: string; // make sure your group schema has this!

}

export default function AllProductsPage() {
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    async function fetchGroups() {
      try {
        const res = await fetch("/api/group");
        const data = await res.json();
        setGroups(data);
      } catch (err) {
        console.error("Error fetching groups", err);
      }
    }
    fetchGroups();
  }, []);

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Top Logo */}
      <header className="flex justify-between items-center px-6 py-4">
        <Link
          href="/"
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

      {/* Title */}
      <section className="text-center my-6">
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-wide font-serif">
          All Collections
        </h1>
      </section>

      {/* Dynamic Groups Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full">
        {groups.map((group) => (
          <Link
            key={group._id}
            href={`/series/${group._id}`} // 👈 navigate to series/[id]
            className="relative w-full h-[60vh] sm:h-[70vh] lg:h-[80vh] group cursor-pointer"
          >
            <Image
              src={group.image || "/front page.jpg"} // fallback
              alt={group.name}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <h2 className="text-white text-2xl font-bold">{group.name}</h2>
            </div>
          </Link>
        ))}
      </section>

      {/* Logo + Classy Line */}
      <section className="text-center mt-12 px-6">
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
          “Defining elegance with collections that speak luxury, crafted for
          those who walk with timeless confidence.”
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
