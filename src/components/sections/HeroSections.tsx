


// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";

// export default function HeroSection() {
//   return (
//     <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-white to-gray-100">
      
//       {/* Fullscreen Responsive Background Image */}
//       <div className="absolute inset-0 -z-10">
//         <Image
//           src="/archi4.jpeg"
//           alt="Background"
//           fill
//           priority
//           className="object-cover object-center"
//         />
//       </div>

//       {/* Your Animated Circles */}
//       <motion.div 
//         className="absolute -top-20 -left-20 w-96 h-96 bg-[#FBB040] rounded-full opacity-30 blur-3xl"
//         animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
//         transition={{ duration: 10, repeat: Infinity }}
//       />

//       <motion.div 
//         className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#8BC63F] rounded-full opacity-30 blur-3xl"
//         animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
//         transition={{ duration: 12, repeat: Infinity }}
//       />

//       {/* Content */}
//       <div className="z-10 text-center px-6 md:px-12">
//         <motion.h1
//           className="text-5xl md:text-7xl font-extrabold text-[#1F4E73] mb-6 drop-shadow-lg"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           Endiz Design
//         </motion.h1>

//         <motion.p
//           className="text-lg md:text-2xl text-gray-800 mb-10 max-w-3xl mx-auto drop-shadow-md"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5, duration: 1 }}
//         >
//           Crafting modern, sustainable architecture for visionary spaces. 
//           Where creativity meets precision and every detail matters.
//         </motion.p>

//         <motion.a
//           href="#contact"
//           className="px-8 py-4 bg-[#FBB040] text-white font-semibold rounded-full shadow-lg hover:bg-[#8BC63F] transition-colors"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1, duration: 1 }}
//         >
//           Get In Touch
//         </motion.a>
//       </div>

//     </section>
//   );
// }


// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import { useState, useEffect } from "react";

// const images = [
//   "/archi4.jpeg",
//   "/arch12.jpg",
//   "/archi13.jpg",
//   "/archi14.jpg",
//   "/archi16.jpg",
// ];

// export default function HeroSection() {
//   const [index, setIndex] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setIndex((prev) => (prev + 1) % images.length);
//     }, 5000); // 5 seconds

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden w-full">
//       {/* Background Slideshow */}
//       {images.map((img, i) => (
//         <motion.div
//           key={i}
//           className="absolute inset-0 w-full h-full"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: index === i ? 1 : 0 }}
//           transition={{ duration: 1.2 }}
//         >
//           <Image
//             src={img}
//             alt="Background Image"
//             fill
//             className="object-cover object-center"
//             priority={i === 0}
//           />
//         </motion.div>
//       ))}

//       {/* Animated Background Shapes */}
//       <motion.div
//         className="absolute -top-10 -left-10 w-56 h-56 md:w-96 md:h-96 bg-[#FBB040] rounded-full opacity-30 blur-3xl"
//         animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
//         transition={{ duration: 10, repeat: Infinity }}
//       />
//       <motion.div
//         className="absolute -bottom-10 -right-10 w-56 h-56 md:w-96 md:h-96 bg-[#8BC63F] rounded-full opacity-30 blur-3xl"
//         animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
//         transition={{ duration: 12, repeat: Infinity }}
//       />

//       {/* Hero Content */}
//       <div className="z-10 text-center px-4 sm:px-8 md:px-12">
//         <motion.h1
//           className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white drop-shadow-lg mb-6"
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1 }}
//         >
//           Endiz Design
//         </motion.h1>

//         <motion.p
//           className="text-base sm:text-lg md:text-2xl text-white drop-shadow-md mb-10 max-w-3xl mx-auto"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.5, duration: 1 }}
//         >
//           Crafting modern, sustainable architecture for visionary spaces.
//           Where creativity meets precision and every detail matters.
//         </motion.p>

//         <motion.a
//           href="#contact"
//           className="px-6 sm:px-8 py-3 sm:py-4 bg-[#FBB040] text-white font-semibold rounded-full shadow-lg hover:bg-[#8BC63F] transition-colors"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1, duration: 1 }}
//         >
//           Get In Touch
//         </motion.a>
//       </div>
//     </section>
//   );
// }



"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

const texts = [
  "Crafting modern, sustainable architecture for visionary spaces. Where creativity meets precision and every detail matters.",
  "Our Vision: To redefine contemporary architecture through innovative, sustainable, and timeless design solutions.",
  "Our Mission: To design functional, elegant spaces that inspire living, enhance communities, and respect the environment.",
];

export default function HeroSection() {
  const [textIndex, setTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [charIndex, setCharIndex] = useState(0);

  // Typing effect
  useEffect(() => {
    if (charIndex < texts[textIndex].length) {
      const typingTimeout = setTimeout(() => {
        setDisplayedText((prev) => prev + texts[textIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      }, 35);

      return () => clearTimeout(typingTimeout);
    }
  }, [charIndex, textIndex]);

  // Switch text every 6 seconds
  useEffect(() => {
    const switchTimeout = setTimeout(() => {
      setDisplayedText("");
      setCharIndex(0);
      setTextIndex((prev) => (prev + 1) % texts.length);
    }, 6000);

    return () => clearTimeout(switchTimeout);
  }, [textIndex]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-white to-gray-100">

      {/* Background Image */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/archi4.jpeg"
          alt="Architecture Background"
          fill
          priority
          className="object-cover object-center"
        />
      </div>

      {/* Animated Background Blobs */}
      <motion.div
        className="absolute -top-20 -left-20 w-96 h-96 bg-[#FBB040] rounded-full opacity-30 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, -50, 0] }}
        transition={{ duration: 10, repeat: Infinity }}
      />

      <motion.div
        className="absolute -bottom-20 -right-20 w-96 h-96 bg-[#8BC63F] rounded-full opacity-30 blur-3xl"
        animate={{ x: [0, -50, 0], y: [0, 50, 0] }}
        transition={{ duration: 12, repeat: Infinity }}
      />

      {/* Content */}
      <div className="z-10 text-center px-6 md:px-12">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-[#1F4E73] mb-6 drop-shadow-lg"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Endiz Design
        </motion.h1>

        {/* Typing Text */}
        <motion.p
          key={textIndex}
          className="text-lg md:text-2xl text-gray-800 mb-10 max-w-3xl mx-auto drop-shadow-md min-h-[7rem]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {displayedText}
          <span className="inline-block w-1 h-6 bg-gray-800 ml-1 animate-pulse" />
        </motion.p>

        <motion.a
          href="#contact"
          className="px-8 py-4 bg-[#FBB040] text-white font-semibold rounded-full shadow-lg hover:bg-[#8BC63F] transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Get In Touch
        </motion.a>
      </div>
    </section>
  );
}
