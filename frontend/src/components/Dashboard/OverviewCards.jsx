import { motion } from "framer-motion";
import {
  BadgeCheck,
  Brain,
  FileSearch,
  CheckCircle2,
} from "lucide-react";

export default function OverviewCards({ ats }) {
  const score = ats?.score || 0;
  const feedback = ats?.feedback?.length || 0;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid md:grid-cols-2 xl:grid-cols-4 gap-6"
    >
      <StatCard
        icon={<BadgeCheck size={30} />}
        title="ATS Score"
        value={score}
        suffix="%"
        gradient="from-green-500 to-emerald-500"
      />

      <StatCard
        icon={<Brain size={30} />}
        title="AI Feedback"
        value={feedback}
        gradient="from-blue-500 to-cyan-500"
      />

      <StatCard
        icon={<FileSearch size={30} />}
        title="Analysis"
        text="AI Powered"
        gradient="from-purple-500 to-pink-500"
      />

      <StatCard
        icon={<CheckCircle2 size={30} />}
        title="Status"
        text="Completed"
        gradient="from-orange-500 to-red-500"
      />
    </motion.div>
  );
}

function StatCard({
  icon,
  title,
  value,
  suffix = "",
  text,
  gradient,
}) {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.03 }}
      transition={{ duration: 0.25 }}
      className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 backdrop-blur-xl p-7 shadow-xl hover:border-indigo-500 hover:shadow-[0_0_45px_rgba(99,102,241,0.35)]"
    >
      <div
        className={`absolute -right-12 -top-12 w-40 h-40 rounded-full opacity-20 blur-3xl bg-gradient-to-r ${gradient}`}
      />

      <div
        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${gradient} flex items-center justify-center text-white shadow-lg`}
      >
        {icon}
      </div>

      <p className="mt-6 text-slate-400 text-sm">
        {title}
      </p>

      {text ? (
        <h2 className="mt-2 text-3xl font-bold text-white">
          {text}
        </h2>
      ) : (
        <h2 className="mt-2 text-4xl font-extrabold text-white">
          {value}
          {suffix}
        </h2>
      )}
    </motion.div>
  );
}