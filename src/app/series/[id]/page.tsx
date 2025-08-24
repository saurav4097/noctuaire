"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface Series {
  _id: string;
  name: string;
  description1: string;
  description2: string;
  image: string;
}

interface Dress {
  _id: string;
  name: string;
  image: string;
  gender: string;
  group_name: string;
}

export default function SeriesPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);

  const [series, setSeries] = useState<Series | null>(null);
  const [dresses, setDresses] = useState<Dress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/group/${id}`);
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setSeries(data.series);
        setDresses(data.dresses);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  if (loading) return <p className="text-center mt-20">Loading...</p>;
  if (!series) return <p className="text-center mt-20">Series not found.</p>;

  const maleDresses = dresses.filter((d) => d.gender === "male");
  const femaleDresses = dresses.filter((d) => d.gender === "female");
  const thumbnails = dresses.slice(0, 5);

  return (
    <main className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Top Logo */}
      <header className="flex justify-between items-center px-6 py-4">
        <Link href="/" className="text-sm md:text-base font-medium text-gray-600 hover:text-black">
          ← Back
        </Link>
      </header>

      {/* Logo */}
      <header className="w-full flex justify-center py-6">
        <Image src="/Noctuaire.png" alt="Noctuaire Logo" width={90} height={90} className="object-contain" />
      </header>

      {/* Title & Description */}
      <section className="text-center px-4">
        <h1 className="text-5xl font-extrabold tracking-wide font-serif text-gray-900">
          {series.name}
        </h1>
        <p className="mt-3 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          {series.description1}
        </p>
      </section>

      {/* Main Image */}
      <section className="relative w-full h-[70vh] md:h-[85vh] mt-6">
        <Image src={series.image} alt={series.name} fill priority className="object-cover" />
      </section>

      {/* Thumbnails */}
      <section className="px-4 mt-10 text-center">
        <div className="flex justify-center gap-4 overflow-x-auto scrollbar-hide">
          {thumbnails.map((dress, i) => (
            <div key={i} className="w-24 h-24 relative flex-shrink-0">
              <Image src={dress.image} alt={dress.name} fill className="object-cover rounded-lg shadow-md" />
            </div>
          ))}
        </div>
        <p className="mt-6 text-lg md:text-xl font-light italic text-gray-700">{series.description2}</p>
      </section>

      {/* Male / Female Sections */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 px-4">
        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Male</h2>
          <div className="grid grid-cols-2 gap-4">
            {maleDresses.map((dress) => (
              <Link
                key={dress._id}
                href={`/product/${dress._id}`}
                className="block bg-white border rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
              >
                <div className="relative w-full h-48">
                  <Image src={dress.image} alt={dress.name} fill className="object-cover" />
                </div>
                <div className="p-3 text-center">
                  <h3 className="text-lg font-semibold">{dress.name}</h3>
                  <p className="text-sm text-gray-600">Luxury style piece</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4 text-gray-900">Female</h2>
          <div className="grid grid-cols-2 gap-4">
            {femaleDresses.map((dress) => (
              <Link
                key={dress._id}
                href={`/product/${dress._id}`}
                className="block bg-white border rounded-xl shadow-lg overflow-hidden hover:scale-105 transition"
              >
                <div className="relative w-full h-48">
                  <Image src={dress.image} alt={dress.name} fill className="object-cover" />
                </div>
                <div className="p-3 text-center">
                  <h3 className="text-lg font-semibold">{dress.name}</h3>
                  <p className="text-sm text-gray-600">Elegant timeless wear</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
