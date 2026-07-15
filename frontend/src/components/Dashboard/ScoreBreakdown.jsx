import { motion } from "framer-motion";

const scores = [
  {
    title: "Formatting",
    value: 94,
  },
  {
    title: "Skills",
    value: 90,
  },
  {
    title: "Projects",
    value: 96,
  },
  {
    title: "Grammar",
    value: 92,
  },
];

export default function ScoreBreakdown() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-slate-900 rounded-3xl p-8 border border-slate-800"
    >
      <h2 className="text-2xl font-bold text-white mb-8">
        Score Breakdown
      </h2>

      <div className="space-y-6">

        {scores.map((item) => (
          <div key={item.title}>

            <div className="flex justify-between mb-2">

              <span className="text-white">
                {item.title}
              </span>

              <span className="text-blue-400">
                {item.value}%
              </span>

            </div>

            <div className="h-3 bg-slate-800 rounded-full">

              <motion.div
                initial={{ width: 0 }}
                animate={{
                  width: `${item.value}%`,
                }}
                transition={{
                  duration: 1,
                }}
                className="h-3 rounded-full bg-blue-500"
              />

            </div>

          </div>
        ))}

      </div>
    </motion.div>
  );
}