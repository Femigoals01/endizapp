


// "use client";

// import { useForm } from "react-hook-form";
// import { motion } from "framer-motion";

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
//         <h2 className="text-4xl md:text-5xl font-bold text-[#1F4E73] text-center mb-12">Contact Us</h2>
        
//         <motion.form
//           onSubmit={handleSubmit(onSubmit)}
//           className="flex flex-col gap-6"
//           initial={{ opacity: 0 }}
//           whileInView={{ opacity: 1 }}
//           transition={{ duration: 1 }}
//         >
//           <input
//             type="text"
//             placeholder="Your Name"
//             {...register("name")}
//             className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FBB040]"
//           />
//           <input
//             type="email"
//             placeholder="Your Email"
//             {...register("email")}
//             className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FBB040]"
//           />
//           <textarea
//             placeholder="Your Message"
//             {...register("message")}
//             rows={5}
//             className="border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#FBB040]"
//           />
//           <motion.button
//             type="submit"
//             className="bg-[#FBB040] text-white py-3 px-6 rounded-full font-semibold hover:bg-[#8BC63F] transition-colors"
//             whileHover={{ scale: 1.05 }}
//             transition={{ duration: 0.3 }}
//           >
//             Send Message
//           </motion.button>
//         </motion.form>
//       </div>
//     </section>
//   );
// }


"use client";

import { useForm } from "react-hook-form";
import { motion } from "framer-motion";

type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
};

export default function ContactSection() {
  const { register, handleSubmit, reset } = useForm<ContactFormData>();

  const onSubmit = (data: ContactFormData) => {
    console.log(data);

    reset();

    // Temporary success message.
    // We can connect this to an email service or database later.
    alert("Thank you. Your message has been received.");
  };

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-[#305A77] py-28 md:py-36"
    >
      {/* Background Detail */}
      <div className="pointer-events-none absolute -right-48 -top-48 h-[600px] w-[600px] rounded-full bg-[#8EC543]/10 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 left-0 h-72 w-72 rounded-full bg-[#F3B24E]/5 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1 }}
            className="flex flex-col justify-between"
          >
            <div>
              {/* Label */}
              <div className="mb-6 flex items-center gap-4">
                <span className="h-px w-12 bg-[#F3B24E]" />

                <span className="text-xs font-semibold uppercase tracking-[0.3em] text-white/65">
                  Start a Conversation
                </span>
              </div>

              {/* Heading */}
              <h2 className="max-w-xl text-4xl font-light leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                Let&apos;s create
                <br />
                <span className="font-semibold">
                  something remarkable.
                </span>
              </h2>

              {/* Accent */}
              <div className="mt-8 h-1 w-16 bg-[#F3B24E]" />

              {/* Description */}
              <p className="mt-8 max-w-lg text-base leading-7 text-white/65 md:text-lg">
                Whether you are planning a new home, developing a commercial
                space or looking for expert project guidance, we would love to
                hear about your vision.
              </p>
            </div>

            {/* Contact Details */}
            <div className="mt-14 border-t border-white/15 pt-8">
              <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-1">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                    Location
                  </p>

                  <p className="mt-2 text-sm text-white/80">
                    Ibadan, Nigeria
                  </p>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                    Email
                  </p>

                  <a
                    href="mailto:info@endizdesign.com"
                    className="mt-2 inline-block text-sm text-white/80 transition-colors hover:text-[#F3B24E]"
                  >
                    info@endizdesign.com
                  </a>
                </div>

                <div>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                    Phone
                  </p>

                  <a
                    href="tel:+2340000000000"
                    className="mt-2 inline-block text-sm text-white/80 transition-colors hover:text-[#F3B24E]"
                  >
                    +234 000 000 0000
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
              duration: 1,
              delay: 0.15,
            }}
            className="bg-white p-7 shadow-2xl sm:p-10 md:p-12"
          >
            {/* Form Heading */}
            <div className="mb-9">
              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#F3B24E]">
                Project Enquiry
              </p>

              <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#305A77] sm:text-3xl">
                Tell us about your project.
              </h3>

              <p className="mt-3 text-sm leading-6 text-gray-500">
                Share a few details and our team will get back to you.
              </p>
            </div>

            <motion.form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-[#305A77]"
                >
                  Your Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  {...register("name", {
                    required: true,
                  })}
                  className="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-[#305A77] outline-none placeholder:text-gray-400 focus:border-[#F3B24E] focus:ring-0"
                />
              </div>

              {/* Email + Phone */}
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-[#305A77]"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    placeholder="Your email"
                    {...register("email", {
                      required: true,
                    })}
                    className="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-[#305A77] outline-none placeholder:text-gray-400 focus:border-[#F3B24E] focus:ring-0"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-[#305A77]"
                  >
                    Phone
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    placeholder="Your phone"
                    {...register("phone")}
                    className="w-full border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-[#305A77] outline-none placeholder:text-gray-400 focus:border-[#F3B24E] focus:ring-0"
                  />
                </div>
              </div>

              {/* Service */}
              <div>
                <label
                  htmlFor="service"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-[#305A77]"
                >
                  Service Required
                </label>

                <select
                  id="service"
                  {...register("service")}
                  className="w-full border-0 border-b border-gray-300 bg-white px-0 py-3 text-[#305A77] outline-none focus:border-[#F3B24E] focus:ring-0"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a service
                  </option>

                  <option value="Residential Architecture">
                    Residential Architecture
                  </option>

                  <option value="Commercial Architecture">
                    Commercial Architecture
                  </option>

                  <option value="Interior Design">
                    Interior Design
                  </option>

                  <option value="Sustainable Solutions">
                    Sustainable Solutions
                  </option>

                  <option value="Project Planning & Management">
                    Project Planning & Management
                  </option>

                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-xs font-semibold uppercase tracking-[0.15em] text-[#305A77]"
                >
                  Tell Us About Your Project
                </label>

                <textarea
                  id="message"
                  placeholder="Tell us about your project, goals or requirements..."
                  rows={5}
                  {...register("message", {
                    required: true,
                  })}
                  className="w-full resize-none border-0 border-b border-gray-300 bg-transparent px-0 py-3 text-[#305A77] outline-none placeholder:text-gray-400 focus:border-[#F3B24E] focus:ring-0"
                />
              </div>

              {/* Submit */}
              <div className="pt-3">
                <motion.button
                  type="submit"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.25 }}
                  className="group inline-flex items-center gap-5 bg-[#F3B24E] px-8 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-[#305A77] transition-all duration-300 hover:bg-[#8EC543]"
                >
                  Send Enquiry

                  <span className="text-lg transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </motion.button>
              </div>
            </motion.form>
          </motion.div>
        </div>
      </div>

      {/* Brand Accent */}
      <div className="absolute bottom-0 left-0 h-[3px] w-24 bg-[#F3B24E]" />
      <div className="absolute bottom-0 left-24 h-[3px] w-12 bg-[#8EC543]" />
    </section>
  );
}