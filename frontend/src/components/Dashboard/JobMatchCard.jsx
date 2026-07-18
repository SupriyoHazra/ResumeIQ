import { motion } from "framer-motion";
import {
  Briefcase,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Target,
} from "lucide-react";

export default function JobMatchCard({ result }) {
  if (!result || Object.keys(result).length === 0) return null;

  const score = result.match_score || 0;

  let color = "text-red-400";
  let ring = "bg-red-500";

  if (score >= 80) {
    color = "text-green-400";
    ring = "bg-green-500";
  } else if (score >= 60) {
    color = "text-blue-400";
    ring = "bg-blue-500";
  } else if (score >= 40) {
    color = "text-yellow-400";
    ring = "bg-yellow-500";
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl"
    >
      <div className="flex items-center gap-4 mb-10">
        <div className="w-14 h-14 rounded-2xl bg-indigo-600 flex items-center justify-center">
          <Briefcase size={28} />
        </div>

        <div>
          <h2 className="text-3xl font-bold">
            AI Job Match
          </h2>

          <p className="text-slate-400">
            Compatibility with the selected role
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center">

        <div className={`w-44 h-44 rounded-full ${ring} p-2`}>

          <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center">

            <div className="text-center">

              <div className={`text-6xl font-black ${color}`}>
                {score}%
              </div>

              <p className="text-slate-400 mt-2">
                Match Score
              </p>

            </div>

          </div>

        </div>

      </div>

      <div className="grid md:grid-cols-2 gap-8 mt-12">

        <Section
          icon={<CheckCircle2 size={20} />}
          color="text-green-400"
          title="Matching Skills"
        >
          {(result.matching_skills || []).length ? (
            result.matching_skills.map((skill, i) => (
              <Skill
                key={i}
                color="bg-green-600"
                skill={skill}
              />
            ))
          ) : (
            <p className="text-slate-400">
              No matching skills detected.
            </p>
          )}
        </Section>

        <Section
          icon={<XCircle size={20} />}
          color="text-red-400"
          title="Missing Skills"
        >
          {(result.missing_skills || []).length ? (
            result.missing_skills.map((skill, i) => (
              <Skill
                key={i}
                color="bg-red-600"
                skill={skill}
              />
            ))
          ) : (
            <p className="text-slate-400">
              No missing skills.
            </p>
          )}
        </Section>

      </div>

      <div className="mt-10 bg-slate-800 rounded-2xl p-6">

        <div className="flex items-center gap-3 mb-5">

          <Lightbulb
            className="text-yellow-400"
            size={22}
          />

          <h3 className="text-xl font-bold">
            AI Recommendations
          </h3>

        </div>

        {(result.recommendations || []).length ? (
          <ul className="space-y-3 text-slate-300">

            {result.recommendations.map((item, i) => (

              <li
                key={i}
                className="flex gap-3"
              >
                <Target
                  size={18}
                  className="text-blue-400 mt-1"
                />

                {item}

              </li>

            ))}

          </ul>
        ) : (
          <p className="text-green-400">
            Excellent! Your resume already matches this job very well.
          </p>
        )}

      </div>

    </motion.div>
  );
}

function Section({
  icon,
  title,
  color,
  children,
}) {
  return (
    <div className="bg-slate-800 rounded-2xl p-6">

      <div className={`flex items-center gap-3 ${color} mb-5`}>

        {icon}

        <h3 className="text-xl font-bold">
          {title}
        </h3>

      </div>

      <div className="flex flex-wrap gap-3">

        {children}

      </div>

    </div>
  );
}

function Skill({
  skill,
  color,
}) {
  return (
    <span
      className={`${color} px-4 py-2 rounded-full text-white font-medium`}
    >
      {skill}
    </span>
  );
}