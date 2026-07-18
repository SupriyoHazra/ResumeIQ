import { motion } from "framer-motion";

export default function ResumeComparisonCard({ result }) {

  if (!result) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mt-8"
    >

      <h2 className="text-2xl font-bold mb-8">
        📊 Resume vs Job Description
      </h2>

      {/* Match Score */}

      <div className="mb-8">

        <div className="flex justify-between mb-2">

          <span className="font-semibold">
            Overall Match
          </span>

          <span className="text-cyan-400 font-bold">
            {result.match_score || 0}%
          </span>

        </div>

        <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">

          <div
            className="h-full bg-cyan-500"
            style={{
              width: `${result.match_score || 0}%`,
            }}
          />

        </div>

      </div>

      {/* Matching Skills */}

      <div className="mb-8">

        <h3 className="text-green-400 text-lg font-bold mb-4">
          ✅ Matching Skills
        </h3>

        <div className="flex flex-wrap gap-3">

          {(result.matching_skills || []).map((skill, i) => (

            <span
              key={i}
              className="bg-green-600 px-4 py-2 rounded-xl"
            >
              {skill}
            </span>

          ))}

        </div>

      </div>

      {/* Missing Skills */}

      <div className="mb-8">

        <h3 className="text-red-400 text-lg font-bold mb-4">
          ❌ Missing Skills
        </h3>

        <div className="flex flex-wrap gap-3">

          {(result.missing_skills || []).map((skill, i) => (

            <span
              key={i}
              className="bg-red-600 px-4 py-2 rounded-xl"
            >
              {skill}
            </span>

          ))}

        </div>

      </div>

      {/* Recommendations */}

      <div>

        <h3 className="text-yellow-400 text-lg font-bold mb-4">
          💡 AI Recommendations
        </h3>

        <ul className="space-y-3 list-disc pl-6">

          {(result.recommendations || []).map((tip, i) => (

            <li key={i}>
              {tip}
            </li>

          ))}

        </ul>

      </div>

    </motion.div>
  );
}