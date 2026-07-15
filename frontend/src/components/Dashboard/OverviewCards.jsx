import { motion } from "framer-motion";

export default function OverviewCards({ ats }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-5"
    >
      <Card title="ATS Score" value={`${ats.score}%`} />
      <Card title="Feedback" value={ats.feedback.length} />
      <Card title="Strength" value="AI Powered" />
      <Card title="Status" value="Analyzed" />
    </motion.div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
      <p className="text-slate-400 text-sm">{title}</p>

      <h2 className="text-3xl font-bold text-white mt-2">
        {value}
      </h2>
    </div>
  );
}