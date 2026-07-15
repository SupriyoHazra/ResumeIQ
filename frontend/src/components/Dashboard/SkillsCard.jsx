import { motion } from "framer-motion";

export default function SkillsCard({ skills = [] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="bg-slate-900 rounded-3xl p-8 border border-slate-800"
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        Technical Skills
      </h2>

      <div className="flex flex-wrap gap-3">
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-600 px-4 py-2 rounded-full text-white"
            >
              {skill}
            </span>
          ))
        ) : (
          <p className="text-slate-400">
            No skills detected.
          </p>
        )}
      </div>
    </motion.div>
  );
}