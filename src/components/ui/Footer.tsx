export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-6 md:px-12 lg:px-24 text-center">
        <p className="mb-4">&copy; {new Date().getFullYear()} InsightTechHub. All rights reserved.</p>
        <div className="flex justify-center gap-6">
          <a href="#" className="hover:text-gray-400 transition">Instagram</a>
          <a href="#" className="hover:text-gray-400 transition">LinkedIn</a>
          <a href="#" className="hover:text-gray-400 transition">Facebook</a>
          <a href="#" className="hover:text-gray-400 transition">Youtube</a>
        </div>
      </div>
    </footer>
  );
}
