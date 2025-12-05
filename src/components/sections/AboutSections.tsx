// export default function AboutSection() {
//   return (
//     <section id="about" className="py-32 bg-white">
//       <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center md:text-left">
//         <h2 className="text-4xl font-bold mb-6">About Endi Design</h2>
//         <p className="text-gray-700 max-w-3xl mb-6">
//           At Endi Design, we believe architecture is more than structures — it’s the art of creating spaces that inspire. 
//           Our team combines modern aesthetics, sustainable solutions, and functional design to bring your vision to life.
//         </p>
//         <p className="text-gray-700 max-w-3xl">
//           From residential homes to commercial spaces, we craft unique architectural solutions tailored to each client’s needs.
//         </p>
//       </div>
//     </section>
//   );
// }


"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="py-32 bg-white overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center gap-12">
        
        {/* Text Content */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1F4E73] mb-6">About Endiz Design</h2>
          <p className="text-gray-700 mb-4">
            At Endiz Design, we believe architecture is more than structures — it’s the art of creating spaces that inspire.
          </p>
          <p className="text-gray-700">
            Our team combines modern aesthetics, sustainable solutions, and functional design to bring your vision to life.
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <Image
            src="/endizlogo.jpg"
            alt="About Endiz Design"
            width={600}
            height={400}
            className="rounded-xl shadow-lg object-cover"
          />
        </motion.div>

      </div>
    </section>
  );
}
