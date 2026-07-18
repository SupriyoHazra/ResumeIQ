import { motion } from "framer-motion";
import {
  Brain,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Target,
  BookOpen,
  Briefcase,
  Star,
} from "lucide-react";

export default function AIAnalysisCard({ analysis }) {
  if (!analysis) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-xl"
    >
      <div className="flex items-center gap-4 mb-8">
        <div className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center">
          <Brain size={28} />
        </div>

        <div>
          <h2 className="text-3xl font-bold text-white">
            AI Resume Intelligence
          </h2>

          <p className="text-slate-400">
            Generated using ResumeIQ AI Engine
          </p>
        </div>
      </div>

      <Section
        icon={<BookOpen size={20} />}
        color="text-cyan-400"
        title="Resume Summary"
      >
        <p>{analysis.summary || "No summary available."}</p>
      </Section>

      <Section
        icon={<CheckCircle2 size={20} />}
        color="text-green-400"
        title="Strengths"
      >
        {analysis.strengths?.length ? (
          analysis.strengths.map((item, i) => (
            <li key={i}>{item}</li>
          ))
        ) : (
          <li>No strengths detected.</li>
        )}
      </Section>

      <Section
        icon={<AlertTriangle size={20} />}
        color="text-red-400"
        title="Weaknesses"
      >
        {analysis.weaknesses?.length ? (
          analysis.weaknesses.map((item, i) => (
            <li key={i}>{item}</li>
          ))
        ) : (
          <li>No weaknesses detected.</li>
        )}
      </Section>

      <Section
        icon={<Target size={20} />}
        color="text-yellow-400"
        title="Missing Skills"
      >
        {analysis.missing_skills?.length ? (
          analysis.missing_skills.map((item, i) => (
            <li key={i}>{item}</li>
          ))
        ) : (
          <li>No missing skills.</li>
        )}
      </Section>

      <Section
        icon={<Lightbulb size={20} />}
        color="text-indigo-400"
        title="ATS Tips"
      >
        {analysis.ats_tips?.length ? (
          analysis.ats_tips.map((item, i) => (
            <li key={i}>{item}</li>
          ))
        ) : (
          <li>No ATS suggestions.</li>
        )}
      </Section>

      <Section
        icon={<BookOpen size={20} />}
        color="text-pink-400"
        title="Grammar Suggestions"
      >
        {analysis.grammar?.length ? (
          analysis.grammar.map((item, i) => (
            <li key={i}>{item}</li>
          ))
        ) : (
          <li>No grammar issues found.</li>
        )}
      </Section>

      <Section
        icon={<Briefcase size={20} />}
        color="text-orange-400"
        title="Project Suggestions"
      >
        {analysis.project_suggestions?.length ? (
          analysis.project_suggestions.map((item, i) => (
            <li key={i}>{item}</li>
          ))
        ) : (
          <li>No project suggestions.</li>
        )}
      </Section>

      <Section
        icon={<Brain size={20} />}
        color="text-cyan-400"
        title="Recruiter Feedback"
      >
        <p>
          {analysis.recruiter_feedback ||
            "No recruiter feedback available."}
        </p>
      </Section>

      <motion.div
        whileHover={{ scale: 1.02 }}
        className="mt-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl p-8 text-center"
      >
        <Star
          size={36}
          className="mx-auto mb-4 text-yellow-300"
        />

        <h3 className="text-xl font-semibold">
          Overall AI Rating
        </h3>

        <div className="text-6xl font-black mt-3">
          {analysis.overall_rating || 0}/10
        </div>
      </motion.div>
    </motion.div>
  );
}

function Section({
  icon,
  color,
  title,
  children,
}) {
  return (
    <div className="mb-8 bg-slate-800 rounded-2xl p-6">
      <div className={`flex items-center gap-3 ${color}`}>
        {icon}

        <h3 className="text-xl font-bold">
          {title}
        </h3>
      </div>

      <ul className="mt-4 space-y-3 text-slate-300 list-disc pl-6">
        {children}
      </ul>
    </div>
  );
}