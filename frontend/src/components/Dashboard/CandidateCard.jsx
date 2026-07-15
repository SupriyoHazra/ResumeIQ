import { motion } from "framer-motion";

export default function CandidateCard({ resume }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-slate-900 rounded-3xl p-8 border border-slate-800"
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        Candidate Information
      </h2>

      <div className="space-y-4 text-slate-300">
        <p>
          <span className="font-semibold text-white">Name:</span>{" "}
          {resume.name || "Not Found"}
        </p>

        <p>
          <span className="font-semibold text-white">Email:</span>{" "}
          {resume.email || "Not Found"}
        </p>

        <p>
          <span className="font-semibold text-white">Phone:</span>{" "}
          {resume.phone || "Not Found"}
        </p>
      </div>
    </motion.div>
  );
}