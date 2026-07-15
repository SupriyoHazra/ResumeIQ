import { motion } from "framer-motion";

export default function JobMatchCard({ result }) {
  if (!result || Object.keys(result).length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
    >
      <h2 className="text-2xl font-bold mb-8">
        🎯 Job Match Analysis
      </h2>

      {/* Match Score */}
      <div className="mb-8">
        <h3 className="text-lg text-slate-400">
          Match Score
        </h3>

        <p className="text-5xl font-bold text-blue-400 mt-2">
          {result.match_score}%
        </p>
      </div>

      {/* Matching Skills */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-green-400 mb-3">
          ✅ Matching Skills
        </h3>

        <div className="flex flex-wrap gap-3">
          {(result.matching_skills || []).map((skill, index) => (
            <span
              key={index}
              className="bg-green-700 px-4 py-2 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Missing Skills */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-red-400 mb-3">
          ❌ Missing Skills
        </h3>

        <div className="flex flex-wrap gap-3">
          {(result.missing_skills || []).map((skill, index) => (
            <span
              key={index}
              className="bg-red-700 px-4 py-2 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <h3 className="text-xl font-semibold text-yellow-400 mb-3">
          💡 AI Recommendations
        </h3>

        <ul className="space-y-2">
          {(result.recommendations || []).map((item, index) => (
            <li key={index}>
              • {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}