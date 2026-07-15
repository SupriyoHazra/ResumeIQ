import { motion } from "framer-motion";

export default function AIAnalysisCard({ analysis }) {
  if (!analysis) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
    >
      <h2 className="text-3xl font-bold mb-8">
        🤖 AI Resume Review
      </h2>

      <Section title="📝 Resume Summary">
        <p>{analysis.summary}</p>
      </Section>

      <Section title="💪 Strengths">
        {analysis.strengths?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </Section>

      <Section title="⚠️ Weaknesses">
        {analysis.weaknesses?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </Section>

      <Section title="🚀 Missing Skills">
        {analysis.missing_skills?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </Section>

      <Section title="📈 ATS Tips">
        {analysis.ats_tips?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </Section>

      <Section title="✍️ Grammar Suggestions">
        {analysis.grammar?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </Section>

      <Section title="💡 Project Suggestions">
        {analysis.project_suggestions?.map((item, i) => (
          <li key={i}>{item}</li>
        ))}
      </Section>

      <Section title="👨‍💼 Recruiter Feedback">
        <p>{analysis.recruiter_feedback}</p>
      </Section>

      <Section title="⭐ Overall Rating">
        <h3 className="text-4xl font-bold text-blue-400">
          {analysis.overall_rating}/10
        </h3>
      </Section>
    </motion.div>
  );
}

function Section({ title, children }) {
  return (
    <div className="mb-8">
      <h3 className="text-xl font-bold text-blue-400 mb-3">
        {title}
      </h3>

      <ul className="space-y-2 text-slate-300 list-disc pl-6">
        {children}
      </ul>
    </div>
  );
}