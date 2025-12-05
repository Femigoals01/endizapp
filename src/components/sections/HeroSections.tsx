


"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-b from-white to-gray-100 overflow-hidden      w-full bg-[url('/archi4.jpeg')] bg-cover bg-center bg-no-repeat">
      
      {/* <div className="absolute inset-0 bg-black opacity-50 z-0"></div> */}
      {/* Animated Background Shapes */}
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

      {/* Hero Content */}
      <div className="z-10 text-center px-6 md:px-12">
        <motion.h1
          className="text-5xl md:text-7xl font-extrabold text-[#1F4E73] mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Endiz Design
        </motion.h1>

        <motion.p
          className="text-lg md:text-2xl text-gray-700 mb-10 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Crafting modern, sustainable architecture for visionary spaces. 
          Where creativity meets precision and every detail matters.
        </motion.p>

        <motion.a
          href="#contact"
          className="px-8 py-4 bg-[#FBB040] text-white font-semibold rounded-full shadow-lg hover:bg-[#8BC63F] transition-colors"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          Get In Touch
        </motion.a>
      </div>

      {/* Logo overlay in corner */}
      {/* <div className="absolute top-6 left-6 w-32 h-32">
        <Image 
          src="/endizlogo.jpg" 
          alt="Endiz Design Logo" 
          width={128} 
          height={128} 
          className="animate-pulse"
        />
      </div> */}

    </section>
  );
}
