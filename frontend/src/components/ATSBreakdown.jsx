import { motion } from "framer-motion";

function Progress({ label, value, color }) {
  return (
    <div className="mb-6">

      <div className="flex justify-between mb-2">

        <span className="font-medium">
          {label}
        </span>

        <span className="font-bold">
          {value}%
        </span>

      </div>

      <div className="w-full bg-slate-800 rounded-full h-3">

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.2 }}
          className={`h-3 rounded-full ${color}`}
        />

      </div>

    </div>
  );
}

export default function ATSBreakdown({ ats }) {

  if (!ats) return null;

  return (

    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8">

      <h2 className="text-3xl font-bold mb-8">
        ATS Breakdown
      </h2>

      <Progress
        label="Keyword Score"
        value={ats.keyword_score || 0}
        color="bg-green-500"
      />

      <Progress
        label="Education"
        value={ats.education_score || 0}
        color="bg-blue-500"
      />

      <Progress
        label="Experience"
        value={ats.experience_score || 0}
        color="bg-purple-500"
      />

      <Progress
        label="Projects"
        value={ats.project_score || 0}
        color="bg-pink-500"
      />

      <Progress
        label="Formatting"
        value={ats.formatting_score || 0}
        color="bg-yellow-500"
      />

    </div>

  );
}