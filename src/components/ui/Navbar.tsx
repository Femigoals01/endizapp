


// "use client";
// import Link from "next/link";
// import { useState } from "react";

// export default function Navbar() {
//   const [isOpen, setIsOpen] = useState(false);

//   return (
//     <nav className="bg-white shadow-md fixed w-full z-50">
//       <div className="container mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center h-20">
//         <Link href="/" className="text-2xl font-bold">
//           Endi Design
//         </Link>

//         <div className="hidden md:flex space-x-8">
//           <Link href="/" className="hover:text-gray-700 transition">
//             Home
//           </Link>
//           <Link href="#about" className="hover:text-gray-700 transition">
//             About
//           </Link>
//           <Link href="#projects" className="hover:text-gray-700 transition">
//             Projects
//           </Link>
//           <Link href="#services" className="hover:text-gray-700 transition">
//             Services
//           </Link>
//           <Link href="#contact" className="hover:text-gray-700 transition">
//             Contact
//           </Link>
//         </div>

//         {/* Mobile menu button */}
//         <button
//           className="md:hidden"
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <span className="text-2xl">&#9776;</span>
//         </button>
//       </div>

//       {/* Mobile menu */}
//       {isOpen && (
//         <div className="md:hidden bg-white px-6 pb-4 flex flex-col gap-4">
//           <Link href="/">Home</Link>
//           <Link href="#about">About</Link>
//           <Link href="#projects">Projects</Link>
//           <Link href="#services">Services</Link>
//           <Link href="#contact">Contact</Link>
//         </div>
//       )}
//     </nav>
//   );
// }


"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all ${scrolled ? "bg-white shadow-lg" : "bg-transparent"}`}>
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center h-20">
        <Link href="/" className="text-2xl font-bold flex gap-2 items-center">
        
        <Image 
                src="/endizlogo.jpg"
                    alt="About Endiz Design"
                    width={50}
                    height={50}
                    className="rounded-xl shadow-lg object-cover"
                  />
        Endiz Design
        </Link>
        <div className="hidden md:flex space-x-8">
          <Link href="/" className="hover:text-[#FBB040] transition">Home</Link>
          <Link href="#about" className="hover:text-[#FBB040] transition">About</Link>
          <Link href="#projects" className="hover:text-[#FBB040] transition">Projects</Link>
          <Link href="#services" className="hover:text-[#FBB040] transition">Services</Link>
          <Link href="#contact" className="hover:text-[#FBB040] transition">Contact</Link>
        </div>
      </div>
    </nav>
  );
}
