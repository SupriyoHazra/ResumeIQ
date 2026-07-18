import { motion } from "framer-motion";
import ATSGauge from "./ATSGauge";

export default function ATSScoreCard({ ats }) {
  const score = ats?.score || 0;

  let status = "";
  let color = "";

  if (score >= 90) {
    status = "Excellent";
    color = "text-green-400";
  } else if (score >= 75) {
    status = "Good";
    color = "text-blue-400";
  } else if (score >= 60) {
    status = "Average";
    color = "text-yellow-400";
  } else {
    status = "Needs Improvement";
    color = "text-red-400";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{
        y: -8,
        scale: 1.01,
      }}
      className="
      bg-slate-900/80
      backdrop-blur-xl
      rounded-3xl
      border
      border-slate-800
      p-8
      shadow-xl
      transition-all
      duration-300
      hover:border-indigo-500
      hover:shadow-[0_0_40px_rgba(99,102,241,0.35)]
      "
    >
      <h2 className="text-3xl font-bold text-white mb-8">
        ATS Compatibility
      </h2>

      <ATSGauge score={score} />

      <div className="mt-8 text-center">

        <h3 className={`text-3xl font-bold ${color}`}>
          {status}
        </h3>

        <p className="text-slate-400 mt-3 text-lg">
          Overall ATS Score
        </p>

      </div>

      <div className="grid grid-cols-2 gap-5 mt-10">

        <Metric
          title="Keywords"
          value={ats?.keyword_score || 0}
        />

        <Metric
          title="Education"
          value={ats?.education_score || 0}
        />

        <Metric
          title="Projects"
          value={ats?.project_score || 0}
        />

        <Metric
          title="Experience"
          value={ats?.experience_score || 0}
        />

        <Metric
          title="Formatting"
          value={ats?.formatting_score || 0}
        />

      </div>

    </motion.div>
  );
}

function Metric({ title, value }) {

  let barColor = "bg-red-500";

  if (value >= 90) barColor = "bg-green-500";
  else if (value >= 75) barColor = "bg-blue-500";
  else if (value >= 60) barColor = "bg-yellow-500";

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="
      bg-slate-800/70
      rounded-2xl
      p-4
      border
      border-slate-700
      "
    >
      <div className="flex justify-between mb-3">

        <span className="text-slate-300">
          {title}
        </span>

        <span className="font-bold text-white">
          {value}%
        </span>

      </div>

      <div className="w-full h-3 bg-slate-700 rounded-full overflow-hidden">

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{
            duration: 1,
            ease: "easeOut",
          }}
          className={`h-full rounded-full ${barColor}`}
        />

      </div>

    </motion.div>
  );
}