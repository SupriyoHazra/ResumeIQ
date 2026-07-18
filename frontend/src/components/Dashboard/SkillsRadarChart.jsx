import { motion } from "framer-motion";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

import {
  Brain,
  Code2,
  Database,
  Server,
} from "lucide-react";

export default function SkillsRadarChart({ skills = [] }) {
  const categories = {
    Programming: [
      "Python",
      "Java",
      "C",
      "C++",
      "JavaScript",
      "TypeScript",
    ],

    Frontend: [
      "HTML",
      "CSS",
      "React",
      "Next.js",
    ],

    Backend: [
      "FastAPI",
      "Flask",
      "Django",
      "Node.js",
    ],

    Database: [
      "SQL",
      "MongoDB",
    ],

    "AI / ML": [
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Pandas",
      "NumPy",
    ],

    DevOps: [
      "Git",
      "GitHub",
      "Docker",
      "AWS",
    ],
  };

  const data = Object.entries(categories).map(([name, list]) => {
    const count = list.filter((skill) =>
      skills.some(
        (s) => s.toLowerCase() === skill.toLowerCase()
      )
    ).length;

    return {
      subject: name,
      value: Math.round((count / list.length) * 100),
      fullMark: 100,
    };
  });

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 30,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      whileHover={{
        y: -5,
      }}
      className="
      bg-slate-900/80
      backdrop-blur-xl
      rounded-3xl
      border
      border-slate-800
      p-8
      shadow-xl
      hover:border-cyan-500
      hover:shadow-[0_0_45px_rgba(34,211,238,.35)]
      transition-all
      duration-300
      "
    >
      <div className="flex justify-between items-center mb-8">

        <div>

          <h2 className="text-3xl font-bold flex items-center gap-3">

            <Brain className="text-cyan-400" />

            Skills Intelligence

          </h2>

          <p className="text-slate-400 mt-2">
            AI visualization of technical expertise
          </p>

        </div>

        <div className="bg-cyan-500/10 border border-cyan-500/30 px-5 py-3 rounded-xl">

          <h3 className="text-cyan-400 font-bold">
            {skills.length} Skills
          </h3>

        </div>

      </div>

      <div style={{ width: "100%", height: 430 }}>

        <ResponsiveContainer>

          <RadarChart data={data}>

            <PolarGrid stroke="#334155" />

            <PolarAngleAxis
              dataKey="subject"
              stroke="#cbd5e1"
            />

            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              stroke="#64748b"
            />

            <Tooltip />

            <Radar
              dataKey="value"
              stroke="#22d3ee"
              fill="#22d3ee"
              fillOpacity={0.45}
            />

          </RadarChart>

        </ResponsiveContainer>

      </div>

      <div className="grid md:grid-cols-4 gap-5 mt-8">

        <MiniCard
          icon={<Code2 />}
          title="Programming"
        />

        <MiniCard
          icon={<Server />}
          title="Backend"
        />

        <MiniCard
          icon={<Database />}
          title="Database"
        />

        <MiniCard
          icon={<Brain />}
          title="AI / ML"
        />

      </div>

    </motion.div>
  );
}

function MiniCard({
  icon,
  title,
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
      }}
      className="
      bg-slate-800
      border
      border-slate-700
      rounded-2xl
      p-5
      text-center
      "
    >
      <div className="text-cyan-400 flex justify-center mb-3">
        {icon}
      </div>

      <h3 className="text-white font-semibold">
        {title}
      </h3>
    </motion.div>
  );
}