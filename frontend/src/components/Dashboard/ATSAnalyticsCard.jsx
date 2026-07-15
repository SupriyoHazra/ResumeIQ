import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

export default function ATSAnalyticsCard({ ats }) {
  const score = ats?.score || 0;

  const data = [
    {
      name: "ATS Score",
      value: score,
    },
    {
      name: "Remaining",
      value: 100 - score,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-8"
    >
      <h2 className="text-2xl font-bold mb-8">
        📊 ATS Analytics
      </h2>

      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" stroke="#94a3b8" />
            <YAxis domain={[0, 100]} stroke="#94a3b8" />
            <Tooltip />

            <Bar dataKey="value" radius={[10, 10, 0, 0]}>
              <Cell fill="#3b82f6" />
              <Cell fill="#475569" />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 text-center">
        <p className="text-slate-400">
          Current ATS Performance
        </p>

        <h3 className="text-5xl font-black text-blue-400 mt-2">
          {score}%
        </h3>
      </div>
    </motion.div>
  );
}