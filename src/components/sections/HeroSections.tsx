


// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";
// import { useEffect, useState } from "react";

// const texts = [
//   "Crafting modern, sustainable architecture for visionary spaces. Where creativity meets precision and every detail matters.",
//   "Our Vision: To redefine contemporary architecture through innovative, sustainable, and timeless design solutions.",
//   "Our Mission: To design functional, elegant spaces that inspire living, enhance communities, and respect the environment.",
// ];

// export default function HeroSection() {
//   const [textIndex, setTextIndex] = useState(0);
//   const [displayedText, setDisplayedText] = useState("");
//   const [charIndex, setCharIndex] = useState(0);

//   // Typing effect
//   useEffect(() => {
//     if (charIndex < texts[textIndex].length) {
//       const typingTimeout = setTimeout(() => {
//         setDisplayedText((prev) => prev + texts[textIndex][charIndex]);
//         setCharIndex((prev) => prev + 1);
//       }, 35);

//       return () => clearTimeout(typingTimeout);
//     }
//   }, [charIndex, textIndex]);

//   // Switch text every 6 seconds
//   useEffect(() => {
//     const switchTimeout = setTimeout(() => {
//       setDisplayedText("");
//       setCharIndex(0);
//       setTextIndex((prev) => (prev + 1) % texts.length);
//     }, 6000);

//     return () => clearTimeout(switchTimeout);
//   }, [textIndex]);

//   return (
//     <section className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-gradient-to-b from-white to-gray-100">

//       {/* Background Image */}
//       <div className="absolute inset-0 -z-10">
//         <Image
//           src="/archi4.jpeg"
//           alt="Architecture Background"
//           fill
//           priority
//           className="object-cover object-center"
//         />
//       </div>

//       {/* Animated Background Blobs */}
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

//         {/* Typing Text */}
//         <motion.p
//           key={textIndex}
//           className="text-lg md:text-2xl text-gray-800 mb-10 max-w-3xl mx-auto drop-shadow-md min-h-[7rem]"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.5 }}
//         >
//           {displayedText}
//           <span className="inline-block w-1 h-6 bg-gray-800 ml-1 animate-pulse" />
//         </motion.p>

//         <motion.a
//           href="#contact"
//           className="px-8 py-4 bg-[#FBB040] text-white font-semibold rounded-full shadow-lg hover:bg-[#8BC63F] transition-colors"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 1.5, duration: 1 }}
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
// import { useEffect, useState } from "react";

// const texts = [
//   "Crafting modern, sustainable architecture for visionary spaces. Where creativity meets precision and every detail matters.",
//   "Our Vision: To redefine contemporary architecture through innovative, sustainable, and timeless design solutions.",
//   "Our Mission: To design functional, elegant spaces that inspire living, enhance communities, and respect the environment.",
// ];

// export default function HeroSection() {
//   const [textIndex, setTextIndex] = useState(0);
//   const [displayedText, setDisplayedText] = useState("");
//   const [charIndex, setCharIndex] = useState(0);

//   // Typing effect
//   useEffect(() => {
//     if (charIndex < texts[textIndex].length) {
//       const typingTimeout = setTimeout(() => {
//         setDisplayedText((prev) => prev + texts[textIndex][charIndex]);
//         setCharIndex((prev) => prev + 1);
//       }, 35);

//       return () => clearTimeout(typingTimeout);
//     }
//   }, [charIndex, textIndex]);

//   // Switch text every 6 seconds
//   useEffect(() => {
//     const switchTimeout = setTimeout(() => {
//       setDisplayedText("");
//       setCharIndex(0);
//       setTextIndex((prev) => (prev + 1) % texts.length);
//     }, 6000);

//     return () => clearTimeout(switchTimeout);
//   }, [textIndex]);

//   return (
//     <section
//       className="relative flex h-screen w-full items-center justify-center overflow-hidden"
//       id="home"
//     >
//       {/* Background Image */}
//       <div className="absolute inset-0">
//         <Image
//           src="/hero.jpg"
//           alt="Endiz Design architectural project"
//           fill
//           priority
//           sizes="100vw"
//           className="object-cover object-center"
//         />
//       </div>

//       {/* Dark Premium Overlay */}
//       <div className="absolute inset-0 bg-[#071827]/65" />

//       {/* Subtle Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-b from-[#071827]/40 via-[#071827]/55 to-[#071827]/80" />

//       {/* Content */}
//       <div className="relative z-10 mx-auto max-w-5xl px-6 text-center md:px-12">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.9 }}
//         >
//           {/* Small Label */}
//           <p className="mb-5 text-sm font-medium uppercase tracking-[0.3em] text-[#FBB040] md:text-base">
//             Architecture • Design • Innovation
//           </p>

//           {/* Main Heading */}
//           <motion.h1
//             className="mb-6 text-5xl font-extrabold tracking-tight text-white drop-shadow-2xl md:text-7xl lg:text-8xl"
//             initial={{ opacity: 0, y: -30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1 }}
//           >
//             Endiz Design
//           </motion.h1>

//           {/* Typing Text */}
//           <motion.p
//             key={textIndex}
//             className="mx-auto mb-10 min-h-[7rem] max-w-3xl text-lg leading-relaxed text-white/90 drop-shadow-lg md:text-2xl"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}
//           >
//             {displayedText}
//             <span className="ml-1 inline-block h-6 w-1 animate-pulse bg-[#FBB040]" />
//           </motion.p>

//           {/* CTA */}
//           <motion.a
//             href="#contact"
//             className="inline-flex items-center rounded-full bg-[#FBB040] px-8 py-4 font-semibold text-white shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-[#8BC63F] hover:shadow-2xl"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 1.2, duration: 0.8 }}
//           >
//             Get In Touch
//           </motion.a>
//         </motion.div>
//       </div>

//       {/* Bottom Fade */}
//       <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#071827] to-transparent" />
//     </section>
//   );
// }





"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center overflow-hidden bg-[#305A77]"
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.06 }}
        animate={{ scale: 1 }}
        transition={{
          duration: 14,
          ease: "easeOut",
        }}
      >
        <Image
          src="/hero.jpg"
          alt="Endiz Design architectural project"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Main Brand Overlay */}
      <div className="absolute inset-0 bg-[#305A77]/65" />

      {/* Cinematic Gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#305A77]/95 via-[#305A77]/70 to-[#305A77]/25" />

      {/* Bottom Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#305A77]/95 via-transparent to-[#305A77]/20" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pb-28 pt-32 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className="max-w-4xl"
        >
          {/* Brand Label */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.2,
              duration: 0.8,
            }}
            className="mb-7 flex items-center gap-4"
          >
            <span className="h-px w-14 bg-[#F3B24E]" />

            <span className="text-sm font-medium uppercase tracking-[0.3em] text-white/85">
              Endiz Design & Con. Ltd.
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.35,
              duration: 1,
            }}
            className="max-w-4xl text-5xl font-light leading-[0.95] tracking-[-0.045em] text-white sm:text-6xl md:text-7xl lg:text-8xl"
          >
            We design
            <br />
            <span className="font-semibold">
              spaces that matter.
            </span>
          </motion.h1>

          {/* Gold Accent */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 80 }}
            transition={{
              delay: 0.8,
              duration: 0.8,
            }}
            className="mt-7 h-1 bg-[#F3B24E]"
          />

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.75,
              duration: 0.8,
            }}
            className="mt-7 max-w-2xl text-base leading-7 text-white/80 sm:text-lg"
          >
            Architecture, engineering, construction and project management
            shaped around people, purpose and lasting impact.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 1,
              duration: 0.8,
            }}
            className="mt-10 flex flex-wrap items-center gap-5"
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-4 bg-[#F3B24E] px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#305A77] transition-all duration-300 hover:bg-[#8EC543]"
            >
              Explore Our Work

              <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </a>

            <a
              href="#contact"
              className="group inline-flex items-center gap-3 border border-white/50 px-7 py-4 text-sm font-medium uppercase tracking-[0.16em] text-white transition-all duration-300 hover:border-[#F3B24E] hover:text-[#F3B24E]"
            >
              Start a Project
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Information */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1.4,
          duration: 1,
        }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="mx-auto flex w-full max-w-7xl items-end justify-between px-6 pb-7 sm:px-8 lg:px-12">
          {/* Left Information */}
          <div className="hidden sm:block">
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/50">
              Architecture · Engineering · Construction
            </p>

            <p className="mt-1 text-xs uppercase tracking-[0.15em] text-white/90">
              Ibadan · Nigeria
            </p>
          </div>

          {/* Scroll Indicator */}
          <a
            href="#about"
            className="group ml-auto flex items-center gap-4 text-white/70 transition-colors duration-300 hover:text-white"
          >
            <span className="text-[10px] uppercase tracking-[0.3em]">
              Scroll to explore
            </span>

            <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/40 pt-2">
              <motion.span
                animate={{ y: [0, 12, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="h-1.5 w-1.5 rounded-full bg-[#F3B24E]"
              />
            </span>
          </a>
        </div>
      </motion.div>

      {/* Brand Accent Line */}
      <div className="absolute bottom-0 left-0 z-20 h-[3px] w-28 bg-[#F3B24E]" />

      {/* Subtle Green Accent */}
      <div className="absolute bottom-0 left-28 z-20 h-[3px] w-16 bg-[#8EC543]" />
    </section>
  );
}