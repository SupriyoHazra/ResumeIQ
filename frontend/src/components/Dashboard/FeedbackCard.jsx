import { motion } from "framer-motion";

export default function FeedbackCard({ feedback = [] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-slate-900 rounded-3xl p-8 border border-slate-800"
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        AI Recommendations
      </h2>

      {feedback.length > 0 ? (
        <ul className="space-y-4">
          {feedback.map((item, index) => (
            <li
              key={index}
              className="bg-slate-800 rounded-xl p-4 text-slate-300"
            >
              • {item}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-green-400">
          Excellent! No major improvements detected.
        </p>
      )}
    </motion.div>
  );
}