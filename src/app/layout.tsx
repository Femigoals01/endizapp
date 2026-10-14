
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Endiz Design & Con. Ltd.",
    template: "%s | Endiz Design & Con. Ltd.",
  },
  description:
    "Endiz Design & Con. Ltd. — Architectural design, planning, construction and project development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
