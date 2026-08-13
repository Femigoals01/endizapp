






// import Image from "next/image";

// export default function Footer() {
//   return (
//     <footer className="bg-gray-900 text-white py-12">
//       <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center">
//         <p className="mb-4">&copy; {new Date().getFullYear()} InsightTechHub. All rights reserved.</p>
//         <div className="flex justify-center gap-6">
//           <a href="https://www.instagram.com/endiz_design?igsh=N3NuN2Q0dGhtbWhv" className="hover:text-gray-400 transition">
//             <Image
//               src="/instagram-logo.png"
//               alt="Instagram"
//               width={24}
//               height={24}
//               className="inline-block ml-2"
//             />

//           </a>
//           <a href="#" className="hover:text-gray-400 transition">

//               <Image
//               src="/linkedin-log.png"
//               alt="LinkedIn"
//               width={24}
//               height={24}
//               className="inline-block ml-2"
//             />
//           </a>
//           <a href="https://www.facebook.com/endizdesign" className="hover:text-gray-400 transition">

//               <Image
//               src="/facrbk-logo.png"
//               alt="Facebook"
//               width={24}
//               height={24}
//               className="inline-block ml-2"
//             />
//           </a>
//           <a href="#" className="hover:text-gray-400 transition">
//             <Image
//               src="/youtube-logo.png"
//               alt="Youtube"
//               width={24}
//               height={24}
//               className="inline-block ml-2"
//             />
//           </a>
//         </div>
//       </div>
//     </footer>
//   );
// }




import Image from "next/image";

const navigation = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Founder", href: "#founder" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/endiz_design?igsh=N3NuN2Q0dGhtbWhv",
    image: "/instagram-logo.png",
  },
  {
    name: "LinkedIn",
    href: "#",
    image: "/linkedin-log.png",
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/endizdesign",
    image: "/facrbk-logo.png",
  },
  {
    name: "YouTube",
    href: "#",
    image: "/youtube-logo.png",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#305A77] text-white">
      {/* Background Detail */}
      <div className="pointer-events-none absolute -right-40 -top-40 h-96 w-96 rounded-full bg-[#8EC543]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-12">
        {/* Main Footer */}
        <div className="grid gap-14 border-b border-white/15 py-20 md:py-24 lg:grid-cols-[1.3fr_0.7fr_0.7fr] lg:gap-20">
          {/* Brand */}
          <div className="max-w-xl">
            {/* Logo */}
            <a
              href="#home"
              className="inline-block transition-opacity duration-300 hover:opacity-80"
            >
              <Image
                src="/endizlogo.jpg"
                alt="Endiz Design"
                width={150}
                height={70}
                className="h-auto w-[130px] object-contain"
              />
            </a>

            {/* Statement */}
            <h2 className="mt-8 max-w-lg text-3xl font-light leading-tight tracking-[-0.03em] sm:text-4xl">
              Designing spaces with
              <span className="font-semibold"> purpose, character and vision.</span>
            </h2>

            <div className="mt-7 h-1 w-14 bg-[#F3B24E]" />

            <p className="mt-7 max-w-md text-sm leading-7 text-white/60">
              Endiz Design creates thoughtful architectural and design
              solutions that bring together functionality, beauty and lasting
              value.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <p className="mb-7 text-xs font-semibold uppercase tracking-[0.25em] text-white/45">
              Explore
            </p>

            <nav className="flex flex-col gap-4">
              {navigation.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="group flex items-center gap-3 text-sm text-white/70 transition-colors duration-300 hover:text-white"
                >
                  <span className="h-px w-0 bg-[#F3B24E] transition-all duration-300 group-hover:w-5" />

                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="mb-7 text-xs font-semibold uppercase tracking-[0.25em] text-white/45">
              Contact
            </p>

            <div className="space-y-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                  Location
                </p>

                <p className="mt-2 text-sm leading-6 text-white/75">
                  Ibadan, Nigeria
                </p>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                  Email
                </p>

                <a
                  href="mailto:info@endizdesign.com"
                  className="mt-2 block text-sm text-white/75 transition-colors duration-300 hover:text-[#F3B24E]"
                >
                  endizdesign@gmail.com
                </a>
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-white/35">
                  Phone
                </p>

                <a
                  href="tel:+2340000000000"
                  className="mt-2 block text-sm text-white/75 transition-colors duration-300 hover:text-[#F3B24E]"
                >
                  +234 801 37 1614
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Social / CTA Row */}
        <div className="flex flex-col gap-8 py-8 md:flex-row md:items-center md:justify-between">
          {/* Social */}
          <div className="flex items-center gap-3">
            <span className="mr-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
              Follow
            </span>

            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target={social.href !== "#" ? "_blank" : undefined}
                rel={
                  social.href !== "#"
                    ? "noopener noreferrer"
                    : undefined
                }
                aria-label={social.name}
                className="group flex h-10 w-10 items-center justify-center border border-white/15 bg-white/5 transition-all duration-300 hover:border-[#F3B24E] hover:bg-[#F3B24E]"
              >
                <Image
                  src={social.image}
                  alt={social.name}
                  width={20}
                  height={20}
                  className="object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                />
              </a>
            ))}
          </div>

          {/* Back To Top */}
          <a
            href="#home"
            className="group flex w-fit items-center gap-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/55 transition-colors duration-300 hover:text-white"
          >
            Back to top

            <span className="flex h-9 w-9 items-center justify-center border border-white/20 text-base transition-all duration-300 group-hover:border-[#F3B24E] group-hover:bg-[#F3B24E] group-hover:text-[#305A77]">
              ↑
            </span>
          </a>
        </div>

        {/* Copyright */}
        <div className="flex flex-col gap-3 border-t border-white/10 py-6 text-[11px] text-white/35 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} Endiz Design. All rights reserved.
          </p>

          <p className="uppercase tracking-[0.15em]">
            Architecture · Design · Excellence
          </p>
        </div>
      </div>

      {/* Brand Accent */}
      <div className="absolute bottom-0 left-0 h-[3px] w-24 bg-[#F3B24E]" />
      <div className="absolute bottom-0 left-24 h-[3px] w-12 bg-[#8EC543]" />
    </footer>
  );
}