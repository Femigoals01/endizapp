

// "use client";

// import { motion } from "framer-motion";

// export default function ServicesSection() {
//   const services = [
//     "Residential Architecture",
//     "Commercial Architecture",
//     "Interior Design",
//     "Sustainable Solutions",
//     "Project Planning & Management",
//   ];

//   return (
//     <section id="services" className="py-32 bg-white">
//       <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center">
//         <h2 className="text-4xl md:text-5xl font-bold text-[#1F4E73] mb-12">Our Services</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {services.map((service, idx) => (
//             <motion.div
//               key={idx}
//               className="p-8 bg-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer"
//               whileHover={{ scale: 1.05 }}
//               transition={{ duration: 0.5 }}
//             >
//               <h3 className="text-2xl font-semibold mb-4 text-[#1F4E73]">{service}</h3>
//               <p className="text-gray-700">
//                 Premium architectural solutions that elevate your space and bring your vision to life.
//               </p>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }





"use client";

import { motion } from "framer-motion";

const services = [
  {
    number: "01",
    title: "Residential Architecture",
    description:
      "Thoughtfully designed homes that balance character, comfort, functionality and the way people live.",
  },
  {
    number: "02",
    title: "Commercial Architecture",
    description:
      "Purpose-driven commercial spaces designed to strengthen identity, productivity and long-term value.",
  },
  {
    number: "03",
    title: "Interior Design",
    description:
      "Refined interior environments where materials, proportion, light and detail come together seamlessly.",
  },
  {
    number: "04",
    title: "Sustainable Solutions",
    description:
      "Responsible design strategies that respond intelligently to the environment while improving performance.",
  },
  {
    number: "05",
    title: "Project Planning & Management",
    description:
      "From concept to completion, we coordinate every stage with precision, clarity and attention to detail.",
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="relative overflow-hidden bg-[#305A77] py-28 md:py-36"
    >
      {/* Subtle Background Detail */}
      <div className="pointer-events-none absolute -right-48 top-0 h-[500px] w-[500px] rounded-full bg-[#8EC543]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="mb-16 grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end"
        >
          <div>
            {/* Label */}
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-12 bg-[#F3B24E]" />

              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/70">
                What We Do
              </span>
            </div>

            {/* Heading */}
            <h2 className="max-w-3xl text-4xl font-light leading-tight tracking-[-0.035em] text-white sm:text-5xl md:text-6xl">
              Expertise shaped around
              <br />
              <span className="font-semibold">your vision.</span>
            </h2>
          </div>

          {/* Intro */}
          <p className="max-w-lg text-base leading-7 text-white/65 lg:pb-1 lg:text-lg">
            From the first idea to the final detail, we bring architecture,
            engineering and project expertise together to create spaces with
            purpose.
          </p>
        </motion.div>

        {/* Services List */}
        <div className="border-t border-white/15">
          {services.map((service, index) => (
            <motion.div
              key={service.number}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.7,
                delay: index * 0.08,
              }}
              className="group border-b border-white/15"
            >
              <div className="relative flex flex-col gap-6 py-8 transition-all duration-500 md:flex-row md:items-center md:gap-10 md:py-10">
                {/* Number */}
                <div className="w-16 shrink-0">
                  <span className="text-sm font-medium tracking-[0.2em] text-[#F3B24E]">
                    {service.number}
                  </span>
                </div>

                {/* Title */}
                <div className="md:w-[38%]">
                  <h3 className="text-2xl font-medium tracking-tight text-white transition-transform duration-500 group-hover:translate-x-2 sm:text-3xl">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="flex-1 md:pr-16">
                  <p className="max-w-xl text-sm leading-6 text-white/55 transition-colors duration-500 group-hover:text-white/80 sm:text-base">
                    {service.description}
                  </p>
                </div>

                {/* Arrow */}
                <div className="absolute right-0 top-1/2 hidden -translate-y-1/2 md:block">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-xl text-white/60 transition-all duration-500 group-hover:border-[#F3B24E] group-hover:bg-[#F3B24E] group-hover:text-[#305A77]">
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </span>
                </div>

                {/* Mobile Arrow */}
                <div className="md:hidden">
                  <span className="inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[#F3B24E]">
                    Explore Service
                    <span className="text-base">→</span>
                  </span>
                </div>

                {/* Hover Accent */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-[#F3B24E]"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-14 flex flex-col justify-between gap-6 sm:flex-row sm:items-center"
        >
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-white/40">
              Architecture · Engineering · Construction
            </p>
          </div>

          <a
            href="#contact"
            className="group inline-flex items-center gap-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-colors duration-300 hover:text-[#F3B24E]"
          >
            Discuss Your Project

            <span className="text-lg text-[#F3B24E] transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </motion.div>
      </div>

      {/* Brand Accent */}
      <div className="absolute bottom-0 left-0 h-[3px] w-24 bg-[#F3B24E]" />
      <div className="absolute bottom-0 left-24 h-[3px] w-12 bg-[#8EC543]" />
    </section>
  );
}