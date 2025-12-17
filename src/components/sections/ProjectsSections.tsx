


// "use client";

// import { useState } from "react";
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

//   const filteredProjects = activeCategory === "All"
//     ? allProjects
//     : allProjects.filter(p => p.category === activeCategory);

//   return (
//     <section id="projects" className="py-32 bg-gray-50 relative overflow-hidden">
//       <div className="container mx-auto px-6 md:px-12 lg:px-24">
//         <h2 className="text-4xl md:text-5xl font-bold text-center text-[#1F4E73] mb-8">Our Projects</h2>

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
//                   placeholder="blur"
//                   blurDataURL={`/images/project-${project.id}-blur.jpg`} // optional low-res blur image
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

import { useState, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import Image from "next/image";
import { motion } from "framer-motion";

const allProjects = [
  { id: 1, category: "Residential" },
  { id: 2, category: "Commercial" },
  { id: 3, category: "Residential" },
  { id: 4, category: "Commercial" },
  { id: 5, category: "Residential" },
  { id: 6, category: "Commercial" },
];

const categories = ["All", "Residential", "Commercial"];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [isClient, setIsClient] = useState(false);

  // ✅ Only render after mounting on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  const filteredProjects =
    activeCategory === "All"
      ? allProjects
      : allProjects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-32 bg-gray-50 relative overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#1F4E73] mb-8">
          Our Projects
        </h2>

        {/* Category Tabs */}
        <div className="flex justify-center mb-12 gap-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-semibold transition-colors ${
                activeCategory === cat
                  ? "bg-[#FBB040] text-white shadow-lg"
                  : "bg-white text-[#1F4E73] border border-gray-300 hover:bg-[#FBB040]/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <Tilt
              key={project.id}
              tiltMaxAngleX={15}
              tiltMaxAngleY={15}
              glareEnable={true}
              glareMaxOpacity={0.3}
              glareColor="#FBB040"
              className="rounded-xl shadow-lg cursor-pointer overflow-hidden"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.5 }}
                className="relative"
              >
                <Image
                  src={`/images/project-${project.id}.jpg`}
                  alt={`Project ${project.id}`}
                  width={400}
                  height={300}
                  className="object-cover w-full h-64"
                />
                
                <motion.div
                  className="absolute inset-0 bg-[#FBB040]/40 opacity-0 flex items-center justify-center text-white font-semibold text-2xl transition-all group-hover:opacity-100"
                >
                  {project.category} {project.id}
                </motion.div>
              </motion.div>
            </Tilt>
          ))}
        </div>
      </div>
    </section>
  );
}
