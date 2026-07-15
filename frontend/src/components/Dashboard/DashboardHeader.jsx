import { motion } from "framer-motion";

export default function DashboardHeader() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="flex justify-between items-center mb-10"
    >
      <div>
        <h1 className="text-5xl font-extrabold text-white">
          ResumeIQ
        </h1>

        <p className="text-slate-400 mt-2">
          AI Resume Analysis Dashboard
        </p>
      </div>

      <div className="bg-blue-600 px-6 py-3 rounded-xl text-white font-semibold shadow-lg">
        AI Powered
      </div>
    </motion.div>
  );
}