


// "use client";

// import { useState, useEffect } from "react";
// import Tilt from "react-parallax-tilt";
// import Image from "next/image";
// import { motion } from "framer-motion";

// const allProjects = [
//   { id: 1, category: "Residential" },
//   { id: 2, category: "Commercial" },
//   { id: 3, category: "Residential" },
//   { id: 4, category: "Commercial" },
//   { id: 5, category: "Residential" },
//   { id: 6, category: "Commercial" },
// ];

// const categories = ["All", "Residential", "Commercial"];

// export default function ProjectsSection() {
//   const [activeCategory, setActiveCategory] = useState("All");
//   const [isClient, setIsClient] = useState(false);

//   // ✅ Only render after mounting on client
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   if (!isClient) return null;

//   const filteredProjects =
//     activeCategory === "All"
//       ? allProjects
//       : allProjects.filter((p) => p.category === activeCategory);

//   return (
//     <section id="projects" className="py-32 bg-gray-50 relative overflow-hidden">
//       <div className="container mx-auto px-6 md:px-12 lg:px-24">
//         <h2 className="text-4xl md:text-5xl font-bold text-center text-[#1F4E73] mb-8">
//           Our Projects
//         </h2>

//         {/* Category Tabs */}
//         <div className="flex justify-center mb-12 gap-6">
//           {categories.map((cat) => (
//             <button
//               key={cat}
//               onClick={() => setActiveCategory(cat)}
//               className={`px-6 py-2 rounded-full font-semibold transition-colors ${
//                 activeCategory === cat
//                   ? "bg-[#FBB040] text-white shadow-lg"
//                   : "bg-white text-[#1F4E73] border border-gray-300 hover:bg-[#FBB040]/20"
//               }`}
//             >
//               {cat}
//             </button>
//           ))}
//         </div>

//         {/* Project Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {filteredProjects.map((project) => (
//             <Tilt
//               key={project.id}
//               tiltMaxAngleX={15}
//               tiltMaxAngleY={15}
//               glareEnable={true}
//               glareMaxOpacity={0.3}
//               glareColor="#FBB040"
//               className="rounded-xl shadow-lg cursor-pointer overflow-hidden"
//             >
//               <motion.div
//                 whileHover={{ scale: 1.05 }}
//                 transition={{ duration: 0.5 }}
//                 className="relative"
//               >
//                 <Image
//                   src={`/images/project-${project.id}.jpg`}
//                   alt={`Project ${project.id}`}
//                   width={400}
//                   height={300}
//                   className="object-cover w-full h-64"
//                 />
                
//                 <motion.div
//                   className="absolute inset-0 bg-[#FBB040]/40 opacity-0 flex items-center justify-center text-white font-semibold text-2xl transition-all group-hover:opacity-100"
//                 >
//                   {project.category} {project.id}
//                 </motion.div>
//               </motion.div>
//             </Tilt>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }



"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const allProjects = [
  {
    id: 1,
    category: "Residential",
    title: "Contemporary Residence",
    location: "Ibadan, Nigeria",
  },
  {
    id: 2,
    category: "Commercial",
    title: "Modern Commercial Space",
    location: "Ibadan, Nigeria",
  },
  {
    id: 3,
    category: "Residential",
    title: "Private Family Residence",
    location: "Ibadan, Nigeria",
  },
  {
    id: 4,
    category: "Commercial",
    title: "Contemporary Office Complex",
    location: "Ibadan, Nigeria",
  },
  {
    id: 5,
    category: "Residential",
    title: "Modern Luxury Home",
    location: "Ibadan, Nigeria",
  },
  {
    id: 6,
    category: "Commercial",
    title: "Mixed-Use Development",
    location: "Ibadan, Nigeria",
  },
];

const categories = ["All", "Residential", "Commercial"];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredProjects =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((project) => project.category === activeCategory);

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#F7F7F5] py-28 md:py-36"
    >
      {/* Subtle Brand Detail */}
      <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#8EC543]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8 }}
          className="mb-16 flex flex-col justify-between gap-10 lg:flex-row lg:items-end"
        >
          <div className="max-w-3xl">
            {/* Label */}
            <div className="mb-5 flex items-center gap-4">
              <span className="h-px w-12 bg-[#F3B24E]" />

              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#305A77]">
                Selected Work
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl font-light leading-tight tracking-[-0.035em] text-[#305A77] sm:text-5xl md:text-6xl">
              Spaces we've
              <br />
              <span className="font-semibold">brought to life.</span>
            </h2>

            <p className="mt-6 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
              A selection of projects reflecting our approach to architecture,
              functionality, craftsmanship and thoughtful design.
            </p>
          </div>

          {/* Category Navigation */}
          <div className="flex flex-wrap items-center gap-2 border-b border-gray-300 pb-2">
            {categories.map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`relative px-4 py-3 text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-300 ${
                    isActive
                      ? "text-[#305A77]"
                      : "text-gray-500 hover:text-[#305A77]"
                  }`}
                >
                  {category}

                  {isActive && (
                    <motion.span
                      layoutId="activeProjectCategory"
                      className="absolute bottom-[-9px] left-0 right-0 h-[2px] bg-[#F3B24E]"
                      transition={{
                        type: "spring",
                        stiffness: 400,
                        damping: 30,
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Projects */}
        <motion.div
          layout
          className="grid grid-cols-1 gap-x-7 gap-y-14 md:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.08,
                }}
                className="group"
              >
                {/* Image */}
                <div className="relative overflow-hidden bg-[#305A77]">
                  <div className="relative aspect-[4/3] w-full">
                    <Image
                      src={`/images/project-${project.id}.jpg`}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />

                    {/* Dark Hover Overlay */}
                    <div className="absolute inset-0 bg-[#305A77]/0 transition-all duration-500 group-hover:bg-[#305A77]/65" />

                    {/* Project Number */}
                    <div className="absolute left-5 top-5">
                      <span className="text-sm font-medium tracking-[0.15em] text-white drop-shadow-lg">
                        0{project.id}
                      </span>
                    </div>

                    {/* Category */}
                    <div className="absolute right-5 top-5">
                      <span className="bg-white/95 px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#305A77]">
                        {project.category}
                      </span>
                    </div>

                    {/* Hover Content */}
                    <div className="absolute inset-x-0 bottom-0 translate-y-5 p-6 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <div className="flex items-end justify-between gap-5">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-[#F3B24E]">
                            View Project
                          </p>

                          <h3 className="mt-2 text-xl font-medium text-white">
                            {project.title}
                          </h3>
                        </div>

                        <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-white/50 text-xl text-white transition-all duration-300 group-hover:border-[#F3B24E] group-hover:bg-[#F3B24E] group-hover:text-[#305A77]">
                          →
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Information */}
                <div className="flex items-start justify-between gap-6 border-b border-gray-300 py-5">
                  <div>
                    <h3 className="text-lg font-semibold tracking-tight text-[#305A77]">
                      {project.title}
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      {project.location}
                    </p>
                  </div>

                  <span className="pt-1 text-xs font-medium uppercase tracking-[0.15em] text-gray-400">
                    {project.category}
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mt-20 flex flex-col items-start justify-between gap-6 border-t border-gray-300 pt-8 sm:flex-row sm:items-center"
        >
          <div>
            <p className="text-sm text-gray-500">
              Interested in working with us?
            </p>

            <p className="mt-1 text-lg font-medium text-[#305A77]">
              Let&apos;s create something remarkable.
            </p>
          </div>

          <a
            href="#contact"
            className="group inline-flex items-center gap-4 bg-[#305A77] px-7 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#F3B24E] hover:text-[#305A77]"
          >
            Start a Project

            <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
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