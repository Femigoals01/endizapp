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
//         <h2 className="text-4xl font-bold mb-12">Our Services</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//           {services.map((service, index) => (
//             <div
//               key={index}
//               className="p-8 bg-gray-100 rounded-lg shadow hover:shadow-lg transition"
//             >
//               <h3 className="text-2xl font-semibold mb-4">{service}</h3>
//               <p className="text-gray-700">
//                 High-quality design and architecture solutions to elevate your space.
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


"use client";

import { motion } from "framer-motion";

export default function ServicesSection() {
  const services = [
    "Residential Architecture",
    "Commercial Architecture",
    "Interior Design",
    "Sustainable Solutions",
    "Project Planning & Management",
  ];

  return (
    <section id="services" className="py-32 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#1F4E73] mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              className="p-8 bg-gray-100 rounded-xl shadow-lg hover:shadow-2xl transition cursor-pointer"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="text-2xl font-semibold mb-4 text-[#1F4E73]">{service}</h3>
              <p className="text-gray-700">
                Premium architectural solutions that elevate your space and bring your vision to life.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
