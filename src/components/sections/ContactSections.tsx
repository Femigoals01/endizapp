// "use client";

// import { useForm } from "react-hook-form";

// export default function ContactSection() {
//   const { register, handleSubmit, reset } = useForm();

//   const onSubmit = (data: any) => {
//     console.log(data);
//     reset();
//     alert("Message sent!");
//   };

//   return (
//     <section id="contact" className="py-32 bg-gray-50">
//       <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-2xl">
//         <h2 className="text-4xl font-bold text-center mb-12">Contact Us</h2>
//         <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
//           <input
//             type="text"
//             placeholder="Your Name"
//             {...register("name")}
//             className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
//           />
//           <input
//             type="email"
//             placeholder="Your Email"
//             {...register("email")}
//             className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
//           />
//           <textarea
//             placeholder="Your Message"
//             {...register("message")}
//             rows={5}
//             className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-black"
//           />
//           <button
//             type="submit"
//             className="bg-black text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition"
//           >
//             Send Message
//           </button>
//         </form>
//       </div>
//     </section>
//   );
// }


"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

export default function ContactSection() {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
    reset();
    alert("Message sent!");
  };

  return (
    <section id="contact" className="py-32 bg-gray-50">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 max-w-2xl">
        <h2 className="text-4xl md:text-5xl font-bold text-[#1F4E73] text-center mb-12">Contact Us</h2>
        
        <motion.form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <input
            type="text"
            placeholder="Your Name"
            {...register("name")}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FBB040]"
          />
          <input
            type="email"
            placeholder="Your Email"
            {...register("email")}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FBB040]"
          />
          <textarea
            placeholder="Your Message"
            {...register("message")}
            rows={5}
            className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FBB040]"
          />
          <motion.button
            type="submit"
            className="bg-[#FBB040] text-white py-3 px-6 rounded-full font-semibold hover:bg-[#8BC63F] transition-colors"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            Send Message
          </motion.button>
        </motion.form>
      </div>
    </section>
  );
}
