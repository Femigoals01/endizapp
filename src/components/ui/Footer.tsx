import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center">
        <p className="mb-4">&copy; {new Date().getFullYear()} InsightTechHub. All rights reserved.</p>
        <div className="flex justify-center gap-6">
          <a href="https://www.instagram.com/endiz_design?igsh=N3NuN2Q0dGhtbWhv" className="hover:text-gray-400 transition">
            <Image
              src="/instagram-logo.png"
              alt="Instagram"
              width={24}
              height={24}
              className="inline-block ml-2"
            />

          </a>
          <a href="#" className="hover:text-gray-400 transition">

              <Image
              src="/linkedin-log.png"
              alt="LinkedIn"
              width={24}
              height={24}
              className="inline-block ml-2"
            />
          </a>
          <a href="https://www.facebook.com/endizdesign" className="hover:text-gray-400 transition">

              <Image
              src="/facrbk-logo.png"
              alt="Facebook"
              width={24}
              height={24}
              className="inline-block ml-2"
            />
          </a>
          <a href="#" className="hover:text-gray-400 transition">
            <Image
              src="/youtube-logo.png"
              alt="Youtube"
              width={24}
              height={24}
              className="inline-block ml-2"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
