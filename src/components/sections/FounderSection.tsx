


// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";

// export default function FounderSection() {
//   return (
//     <section id="founder" className="py-32 bg-gray-50">
//       <div className="container mx-auto px-6 md:px-12 lg:px-24 flex flex-col md:flex-row items-center gap-12">
        
//         {/* Founder Image */}
//         <motion.div
//           className="md:w-1/2 relative w-full h-80 md:h-130 shadow-lg rounded-full overflow-hidden"
//           initial={{ opacity: 0, x: -50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 1 }}
//         >
//           <Image
//             src="/coe-endiz-removebg-preview.png"  // Replace with your actual founder image
//             alt="Founder / CEO"
//             fill
//             className="object-fill"
//             placeholder="blur" 
//             blurDataURL="/images/founder-blur.jpg" // optional low-res blur image
//           />
//         </motion.div>

//         {/* Founder Bio */}
//         <motion.div
//           className="md:w-1/2 text-center md:text-left"
//           initial={{ opacity: 0, x: 50 }}
//           whileInView={{ opacity: 1, x: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 1 }}
//         >
//           <h2 className="text-4xl md:text-5xl font-bold text-[#1F4E73] mb-4"> Founder/CEO</h2>
//           <h3 className="text-2xl text-[#FBB040] font-semibold mb-6">Oginni Olusola</h3>
//           <p className="text-gray-700 mb-4">
//             Oginni Olusola founded Endiz Design with a vision to create spaces that inspire and elevate lifestyles. 
//           </p>
//           <p className="text-gray-700">
//             With over 15 years of experience in architecture and design, Olusola leads a team of creatives dedicated to sustainable, innovative, and functional architecture.
//           </p>
//         </motion.div>

//       </div>
//     </section>
//   );
// }



"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function FounderSection() {
  return (
    <section
      id="founder"
      className="relative overflow-hidden bg-white py-28 md:py-36"
    >
      {/* Subtle Brand Detail */}
      <div className="pointer-events-none absolute left-0 top-0 h-80 w-80 rounded-full bg-[#8EC543]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex items-center gap-4"
        >
          <span className="h-px w-12 bg-[#F3B24E]" />

          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#305A77]">
            Leadership
          </span>
        </motion.div>

        {/* Main Content */}
        <div className="grid items-center gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          {/* Founder Image */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Decorative Frame */}
            <div className="absolute -bottom-5 -left-5 h-full w-full border border-[#F3B24E]/60" />

            {/* Green Corner Detail */}
            <div className="absolute -right-3 -top-3 z-20 h-20 w-20 border-r-4 border-t-4 border-[#8EC543]" />

            {/* Image Container */}
            <div className="relative z-10 flex min-h-[500px] items-end justify-center overflow-hidden bg-[#F2F2EF] sm:min-h-[580px]">
              <Image
                src="/coe-endiz-removebg-preview.png"
                alt="Oginni Olusola, Founder and CEO of Endiz Design"
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-contain object-bottom"
              />

              {/* Bottom Gradient */}
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#305A77]/15 to-transparent" />
            </div>

            {/* Founder Identifier */}
            <div className="relative z-20 -mt-12 ml-6 w-fit bg-[#305A77] px-6 py-5 text-white shadow-xl sm:px-8">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/55">
                Founder & CEO
              </p>

              <p className="mt-1 text-lg font-medium">
                Oginni Olusola
              </p>
            </div>
          </motion.div>

          {/* Founder Information */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 1,
              delay: 0.15,
            }}
          >
            {/* Heading */}
            <h2 className="max-w-2xl text-4xl font-light leading-tight tracking-[-0.035em] text-[#305A77] sm:text-5xl md:text-6xl">
              Designing with
              <br />
              <span className="font-semibold">
                purpose and vision.
              </span>
            </h2>

            {/* Gold Accent */}
            <div className="mt-7 h-1 w-16 bg-[#F3B24E]" />

            {/* Introduction */}
            <p className="mt-8 max-w-2xl text-lg leading-8 text-[#305A77]/90 md:text-xl">
              Oginni Olusola founded Endiz Design with a vision to create
              spaces that inspire, elevate lifestyles and make a lasting
              impact.
            </p>

            {/* Biography */}
            <div className="mt-7 max-w-2xl space-y-5 text-base leading-7 text-gray-600">
              <p>
                With over 15 years of experience in architecture and design,
                Olusola leads Endiz Design with a commitment to thoughtful
                design, technical excellence and meaningful solutions.
              </p>

              <p>
                His approach brings together creativity, functionality and
                sustainability — ensuring that every project is considered
                not only for how it looks, but for how it serves the people
                and communities who experience it.
              </p>
            </div>

            {/* Divider */}
            <div className="my-10 h-px w-full max-w-2xl bg-gray-200" />

            {/* Leadership Principles */}
            <div className="grid max-w-2xl grid-cols-1 gap-8 sm:grid-cols-3">
              <div>
                <span className="text-xs font-semibold tracking-[0.2em] text-[#F3B24E]">
                  01
                </span>

                <h3 className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#305A77]">
                  Vision
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Seeing beyond the structure to its lasting purpose.
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold tracking-[0.2em] text-[#8EC543]">
                  02
                </span>

                <h3 className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#305A77]">
                  Excellence
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Pursuing quality in every stage of every project.
                </p>
              </div>

              <div>
                <span className="text-xs font-semibold tracking-[0.2em] text-[#305A77]">
                  03
                </span>

                <h3 className="mt-2 text-sm font-semibold uppercase tracking-[0.12em] text-[#305A77]">
                  Impact
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Creating spaces that remain valuable over time.
                </p>
              </div>
            </div>

            {/* Closing Statement */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-10"
            >
              <p className="border-l-2 border-[#F3B24E] pl-5 text-sm italic leading-6 text-gray-500">
                “Great architecture should not only be seen. It should be
                experienced.”
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Brand Accent */}
      <div className="absolute bottom-0 left-0 h-[3px] w-24 bg-[#F3B24E]" />
      <div className="absolute bottom-0 left-24 h-[3px] w-12 bg-[#8EC543]" />
    </section>
  );
}