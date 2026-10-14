

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-white py-28 md:py-36"
    >
      {/* Subtle Brand Background Detail */}
      <div className="pointer-events-none absolute right-0 top-0 h-72 w-72 rounded-full bg-[#8EC543]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-20 max-w-3xl"
        >
          <div className="mb-5 flex items-center gap-4">
            <span className="h-px w-12 bg-[#F3B24E]" />

            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#305A77]">
              Who We Are
            </span>
          </div>

          <h2 className="text-4xl font-light leading-tight tracking-[-0.03em] text-[#305A77] sm:text-5xl md:text-6xl">
            Architecture with
            <br />
            <span className="font-semibold">
              purpose and character.
            </span>
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.05fr] lg:gap-24">
          {/* Image Composition */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1 }}
            className="relative"
          >
            {/* Background Frame */}
            <div className="absolute -bottom-5 -left-5 h-full w-full border border-[#F3B24E]/50" />

            {/* Green Accent */}
            <div className="absolute -right-3 -top-3 z-10 h-20 w-20 border-r-4 border-t-4 border-[#8EC543]" />

            {/* Image */}
            <div className="relative z-10 overflow-hidden bg-[#305A77]">
              <Image
                src="/endizlogo.jpg"
                alt="Endiz Design"
                width={800}
                height={600}
                className="h-auto w-full object-cover"
              />
            </div>

            {/* Image Caption */}
            <div className="relative z-20 -mt-10 ml-6 w-fit bg-[#305A77] px-6 py-4 text-white shadow-xl">
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                Endiz Design & Con. Ltd.
              </p>

              <p className="mt-1 text-sm font-medium">
                Architecture · Engineering · Construction
              </p>
            </div>
          </motion.div>

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1, delay: 0.15 }}
          >
            <p className="text-lg leading-8 text-[#305A77]/90 md:text-xl">
              At Endiz Design, we believe architecture is more than creating
              structures. It is about shaping environments that inspire,
              function beautifully and stand the test of time.
            </p>

            <p className="mt-6 leading-7 text-gray-600">
              We bring together architectural creativity, engineering
              precision, construction expertise and thoughtful project
              management to transform ideas into meaningful spaces.
            </p>

            <p className="mt-5 leading-7 text-gray-600">
              Every project is approached with a balance of innovation,
              functionality, sustainability and attention to detail — because
              great spaces should not only look remarkable, they should work
              remarkably well.
            </p>

            {/* Divider */}
            <div className="my-10 h-px w-full bg-gray-200" />

            {/* Brand Values */}
            <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3">
              <div>
                <div className="mb-3 h-1 w-8 bg-[#F3B24E]" />

                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#305A77]">
                  Vision
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Creating spaces that shape better futures.
                </p>
              </div>

              <div>
                <div className="mb-3 h-1 w-8 bg-[#8EC543]" />

                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#305A77]">
                  Precision
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Thoughtful design backed by technical excellence.
                </p>
              </div>

              <div>
                <div className="mb-3 h-1 w-8 bg-[#305A77]" />

                <h3 className="text-sm font-semibold uppercase tracking-wider text-[#305A77]">
                  Impact
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  Architecture designed to endure and inspire.
                </p>
              </div>
            </div>

            {/* Learn More */}
            <motion.a
              href="#services"
              whileHover={{ x: 5 }}
              className="group mt-10 inline-flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.18em] text-[#305A77]"
            >
              Discover Endiz Design

              <span className="text-lg text-[#F3B24E] transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}