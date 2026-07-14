import { motion } from "framer-motion";

export default function ScoreCard({
  title,
  value,
  progress,
}) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="bg-slate-800 rounded-xl p-5"
    >
      <div className="flex justify-between mb-3">
        <span className="text-slate-300">{title}</span>

        <span className="font-bold text-blue-400">
          {value}
        </span>
      </div>

      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 1 }}
          className="h-full bg-blue-500"
        />
      </div>
    </motion.div>
  );
}