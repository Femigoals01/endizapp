"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function FounderSection() {
  return (
    <section id="founder" className="py-32 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center gap-12">
        
        {/* Founder Image */}
        <motion.div
          className="md:w-1/2 relative w-full h-80 md:h-96 rounded-full shadow-lg overflow-hidden"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/endizceos.png"  // Replace with your actual founder image
            alt="Founder / CEO"
            fill
            className="object-cover rounded-xl"
            placeholder="blur" 
            blurDataURL="/images/founder-blur.jpg" // optional low-res blur image
          />
        </motion.div>

        {/* Founder Bio */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1F4E73] mb-4"> Founder/CEO</h2>
          <h3 className="text-2xl text-[#FBB040] font-semibold mb-6">Oginni Olusola, CEO</h3>
          <p className="text-gray-700 mb-4">
            Oginni Olusola founded Endiz Design with a vision to create spaces that inspire and elevate lifestyles. 
          </p>
          <p className="text-gray-700">
            With over 15 years of experience in architecture and design, Olusola leads a team of creatives dedicated to sustainable, innovative, and functional architecture.
          </p>
        </motion.div>

      </div>
    </section>
  );
}
