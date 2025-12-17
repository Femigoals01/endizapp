// import "../globals.css";
// import Navbar from "@/components/ui/Navbar";
// import Footer from "@/components/ui/Footer";

// export const metadata = {
//   title: "Endi Design",
//   description: "Modern architecture by Endi Design",
// };

// export default function SiteLayout({ children }: { children: React.ReactNode }) {
//   return (
//     <html lang="en">
//       <body className="bg-white text-gray-900">
//         <Navbar />
//         <main>{children}</main>
//         <Footer />
//       </body>
//     </html>
//   );
// }


import "../globals.css";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import WhatsAppChat from "@/components/ui/WhatsAppChat";

export const metadata = {
  title: "Endi Design",
  description: "Modern architecture by Endi Design",
};

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900">
        <Navbar />
        <main>{children}</main>
        <Footer />

        {/* Floating WhatsApp Chat */}
        <WhatsAppChat />
      </body>
    </html>
  );
}
