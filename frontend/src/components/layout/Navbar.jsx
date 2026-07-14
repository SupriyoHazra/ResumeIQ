import { motion } from "framer-motion";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 w-full z-50 bg-slate-950/80 backdrop-blur-lg border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-8 py-5">

        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-white font-bold">
            R
          </div>

          <div>
            <h1 className="text-xl font-bold text-white">
              ResumeIQ
            </h1>

            <p className="text-xs text-slate-400">
              AI Resume Analyzer Pro
            </p>
          </div>
        </div>

        {/* Navigation */}

        <div className="hidden md:flex gap-10 text-slate-300">

          <a href="#" className="hover:text-white transition">
            Home
          </a>

          <a href="#" className="hover:text-white transition">
            Features
          </a>

          <a href="#" className="hover:text-white transition">
            Dashboard
          </a>

          <a href="#" className="hover:text-white transition">
            Pricing
          </a>

        </div>

        {/* Button */}

        <button className="bg-blue-600 hover:bg-blue-500 transition px-6 py-3 rounded-xl text-white font-semibold shadow-lg">
          Analyze Resume
        </button>

      </div>
    </motion.nav>
  );
}