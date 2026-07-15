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
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900 rounded-3xl border border-slate-800 p-8"
    >
      <h2 className="text-2xl font-bold text-white mb-8">
        ATS Compatibility
      </h2>

      <ATSGauge score={score} />

      <div className="mt-8 text-center">
        <h3 className={`text-2xl font-bold ${color}`}>
          {status}
        </h3>

        <p className="text-slate-400 mt-2">
          Overall ATS Score
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-10">

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
  return (
    <div className="bg-slate-800 rounded-xl p-4">
      <div className="flex justify-between mb-2">
        <span className="text-slate-400">{title}</span>
        <span className="text-white font-bold">
          {value}%
        </span>
      </div>

      <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-blue-500 rounded-full transition-all duration-700"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}