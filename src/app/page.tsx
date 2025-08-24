"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { ObjectId } from "mongodb";

interface group {
  _id: ObjectId;  
  name: string;
  image: string;
  description1: string;
  description2: string;
  number: number;
}


export default function Home() {
const [groups, setGroups] = useState<group[]>([]);

  useEffect(() => {
    async function fetchGroups() {
      const res = await fetch("/api/group");
      const data = await res.json();
      setGroups(data);
    }
    fetchGroups();
  }, []);
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Top Navbar */}
      <nav className="w-full flex justify-end items-center px-6 py-4 bg-white shadow-sm">
        <div className="flex gap-8 text-gray-800 font-medium text-lg">
          <Link href="/collection" className="hover:text-orange-500 transition">
            Collection
          </Link>
          <Link href="/#" className="hover:text-orange-500 transition">
            Style
          </Link>
          <Link href="/blog" className="hover:text-orange-500 transition">
            Blog
          </Link>
          <Link href="/contact" className="hover:text-orange-500 transition">
            Contact Us
          </Link>
        </div>
      </nav>
      {/* Top Logo + Title */}
      <section className="flex flex-col items-center text-center py-8">
        <Image
          src="/Noctuaire.png"
          alt="Noctuaire Logo"
          width={90}
          height={90}
          className=""
        />
        <h1 className="text-5xl font-extrabold tracking-wide text-gray-900">
          Noctuaire
        </h1>
        <p className=" text-lg text-gray-600 max-w-xl">
          <span className="font-semibold">Bold</span> as the King,{" "}
          <span className="font-semibold">Sharp</span> as the Knight,{" "}
          <span className="font-semibold">Timeless</span> as the Game.
        </p>
      </section>

      {/* Hero Image Full Width */}
      <section className="relative w-full h-[80vh] sm:h-[90vh]">
        <Image
          src="/front page.jpg"
          alt="Hero Banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute bottom-6 left-0 w-full flex justify-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white px-4 py-2 rounded-lg">
            Explore All Collection
          </h2>
        </div>
      </section>
{groups && groups.length > 0 ? (
      
      <section className="relative w-full h-[90vh] mt-4">
        <Image
          src={groups[0].image}
          alt={groups[0].name}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black/30 px-6">
          <h2 className="text-4xl font-bold">{groups[0].name}</h2>
          <p className="mt-3 text-2xl font-semibold">Dressing Easy</p>
          <p className="mt-2 text-lg max-w-lg">
            {groups[0].description1}
          </p>
          <Link
             href={`/series/${groups[0]._id}`}
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg shadow-md text-lg font-semibold transition"
          >
            Explore Now
          </Link>
        </div>
      </section>
      ) : (
  <p className="text-gray-500">No products found.</p>
)}

      {/* Scrollable Row: Platforms */}
      <section className="px-4 mt-12">
        <h3 className="text-2xl font-semibold mb-4 text-center">Handpicked Styles</h3>
        <div className="flex justify-center">
          <div className="flex gap-10 overflow-x-auto scrollbar-hide py-4 px-2">
            <Image
              src="/amazon.png"
              alt="Amazon"
              width={140}
              height={70}
              className="h-16 w-auto object-contain"
            />
            <Image
              src="/flipkart.jpg"
              alt="Flipkart"
              width={140}
              height={70}
              className="h-16 w-auto object-contain"
            />
            <Image
              src="/myntra.avif"
              alt="Myntra"
              width={140}
              height={70}
              className="h-16 w-auto object-contain"
            />
            {/* Add more logos */}
          </div>
        </div>
      </section>

      {/* Scrollable Row: Clothing Brands */}
      <section className="px-4 mt-14 mb-16">
        <h3 className="text-2xl font-semibold mb-4 text-center">Signature Brands</h3>
        <div className="flex justify-center">
          <div className="flex gap-10 overflow-x-auto scrollbar-hide py-4 px-2">
            <Image
              src="/levis.jpg"
              alt="Levi's"
              width={140}
              height={70}
              className="h-16 w-auto object-contain"
            />
            <Image
              src="/adidas.png"
              alt="Adidas"
              width={140}
              height={70}
              className="h-16 w-auto object-contain"
            />
            <Image
              src="/h&m.png"
              alt="H&M"
              width={140}
              height={70}
              className="h-16 w-auto object-contain"
            />
            <Image
              src="/rare-rabbit.png"
              alt="Rare Rabbit"
              width={140}
              height={70}
              className="h-16 w-auto object-contain"
            />
            <Image
              src="/snitch.png"
              alt="Snitch"
              width={140}
              height={70}
              className="h-16 w-auto object-contain"
            />
            <Image
              src="/US-Polo.png"
              alt="US Polo"
              width={140}
              height={70}
              className="h-16 w-auto object-contain"
            />
            {/* Add more logos */}
          </div>
        </div>
      </section>

    {/* Hero Section */}
<section className="text-center">
  <h1 className=" mt-6 text-4xl md:text-4xl font-serif italic font-light tracking-wide text-gray-900">
    Style that defines you, not the crowd.
  </h1>
  <p className="text-lg md:text-xl font-light text-gray-600 max-w-2xl mx-auto mt-3 leading-relaxed">
    Elevate your lifestyle with curated collections that blend sophistication, 
    modern elegance, and everlasting style.
  </p>
  <div className="flex justify-center mt-6">
    <Image
      src="/Noctuaire.png"
      alt="Noctuaire Logo"
      width={160}
      height={160}
      className="object-contain"
    />
  </div>
</section>

{/* Luxury Statement Section */}
<section className="text-center mt-12">
  <h2 className="text-3xl md:text-4xl font-serif italic font-medium text-gray-900">
    Signature Elegance
  </h2>
  <p className="text-lg md:text-xl font-light text-gray-600 max-w-2xl mx-auto leading-relaxed mt-4">
    <span className="italic">Noctuaire</span> is more than fashion—it’s a return to your true style.  
    We believe in choices that last, in pieces that walk with you, not just for a season, but for a statement.  
    Stop buying random, disposable trends. Start walking together with confidence, elegance, and timeless design.
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
