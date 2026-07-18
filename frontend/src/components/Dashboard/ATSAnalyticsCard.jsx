import { motion } from "framer-motion";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

import {
  TrendingUp,
  Target,
  Award,
  BarChart3,
} from "lucide-react";

export default function ATSAnalyticsCard({ ats }) {
  const score = ats?.score || 0;

  const keyword = ats?.keyword_score || 0;
  const education = ats?.education_score || 0;
  const experience = ats?.experience_score || 0;
  const formatting = ats?.formatting_score || 0;
  const projects = ats?.project_score || 0;

  const chartData = [
    { name: "Keywords", value: keyword },
    { name: "Education", value: education },
    { name: "Experience", value: experience },
    { name: "Projects", value: projects },
    { name: "Format", value: formatting },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -6 }}
      className="
      bg-slate-900/80
      backdrop-blur-xl
      rounded-3xl
      border
      border-slate-800
      p-8
      shadow-xl
      hover:border-indigo-500
      hover:shadow-[0_0_40px_rgba(99,102,241,0.35)]
      transition-all
      duration-300
      "
    >
      <div className="flex justify-between items-center mb-10">

        <div>

          <h2 className="text-3xl font-bold flex items-center gap-3">

            <BarChart3
              className="text-cyan-400"
            />

            ATS Analytics

          </h2>

          <p className="text-slate-400 mt-2">
            Detailed ATS category performance
          </p>

        </div>

        <div className="text-right">

          <p className="text-slate-400">
            Overall Score
          </p>

          <h2 className="text-5xl font-black text-cyan-400">
            {score}%
          </h2>

        </div>

      </div>

      <div className="h-80">

        <ResponsiveContainer>

          <BarChart data={chartData}>

            <XAxis
              dataKey="name"
              stroke="#94a3b8"
            />

            <YAxis
              domain={[0, 100]}
              stroke="#94a3b8"
            />

            <Tooltip />

            <Bar
              dataKey="value"
              radius={[10, 10, 0, 0]}
            >

              {chartData.map((entry, index) => (

                <Cell
                  key={index}
                  fill={
                    entry.value >= 80
                      ? "#22c55e"
                      : entry.value >= 60
                      ? "#3b82f6"
                      : "#f59e0b"
                  }
                />

              ))}

            </Bar>

          </BarChart>

        </ResponsiveContainer>

      </div>

      <div className="grid md:grid-cols-3 gap-5 mt-10">

        <Stat
          icon={<Target />}
          title="ATS Ready"
          value={`${score}%`}
          color="text-green-400"
        />

        <Stat
          icon={<TrendingUp />}
          title="Performance"
          value={
            score >= 80
              ? "Excellent"
              : score >= 60
              ? "Good"
              : "Needs Work"
          }
          color="text-cyan-400"
        />

        <Stat
          icon={<Award />}
          title="Resume Quality"
          value={
            score >= 90
              ? "Professional"
              : "Improving"
          }
          color="text-purple-400"
        />

      </div>
    </motion.div>
  );
}

function Stat({
  icon,
  title,
  value,
  color,
}) {
  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700 p-5">

      <div className="flex items-center gap-3">

        <div className={color}>
          {icon}
        </div>

        <div>

          <p className="text-slate-400 text-sm">
            {title}
          </p>

          <h3 className={`text-xl font-bold ${color}`}>
            {value}
          </h3>

        </div>

      </div>

    </div>
  );
}