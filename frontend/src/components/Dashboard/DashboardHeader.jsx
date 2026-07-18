import { motion } from "framer-motion";
import {
  Brain,
  Sparkles,
  CalendarDays,
  Clock3,
  Cpu,
  ShieldCheck,
} from "lucide-react";

export default function DashboardHeader() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 18) greeting = "Good Afternoon";

  const username =
    localStorage.getItem("username") || "User";

  const today = new Date();

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.7,
      }}
      className="
      relative
      overflow-hidden
      rounded-[32px]
      border
      border-slate-800
      bg-gradient-to-br
      from-slate-950
      via-indigo-950
      to-slate-950
      p-10
      shadow-2xl
      "
    >

      {/* Background Glow */}
      <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-indigo-600/20 blur-3xl" />
      <div className="absolute left-0 bottom-0 w-80 h-80 rounded-full bg-cyan-500/10 blur-3xl" />

      {/* Grid Effect */}
      <div
        className="
        absolute
        inset-0
        opacity-[0.04]
        bg-[linear-gradient(to_right,#ffffff_1px,transparent_1px),linear-gradient(to_bottom,#ffffff_1px,transparent_1px)]
        bg-[size:35px_35px]
        "
      />

      <div className="relative z-10">

        <div className="flex flex-wrap justify-between gap-8">

          <div>

            <div className="flex items-center gap-3">

              <Brain
                size={42}
                className="text-indigo-400"
              />

              <h1 className="text-5xl md:text-6xl font-black">

                {greeting},

                <span className="block mt-2 bg-gradient-to-r from-cyan-400 via-indigo-400 to-purple-500 bg-clip-text text-transparent">

                  {username}

                </span>

              </h1>

            </div>

            <p className="mt-8 max-w-4xl text-slate-300 text-lg leading-8">

              Welcome back to

              <span className="text-cyan-400 font-bold">
                {" "}ResumeIQ{" "}
              </span>

              — your intelligent AI career platform.

              Analyze resumes, maximize ATS performance,
              optimize keywords, generate interview questions,
              create professional cover letters, estimate salary,
              and receive personalized career guidance powered by AI.

            </p>

          </div>

          <div className="space-y-5">

            <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-5 w-72">

              <div className="flex items-center gap-3">

                <CalendarDays
                  className="text-cyan-400"
                />

                <div>

                  <p className="text-slate-400 text-sm">
                    Today
                  </p>

                  <h3 className="font-bold">

                    {today.toLocaleDateString()}

                  </h3>

                </div>

              </div>

            </div>

            <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-5">

              <div className="flex items-center gap-3">

                <Clock3
                  className="text-indigo-400"
                />

                <div>

                  <p className="text-slate-400 text-sm">
                    Current Time
                  </p>

                  <h3 className="font-bold">

                    {today.toLocaleTimeString()}

                  </h3>

                </div>

              </div>

            </div>

          </div>

        </div>

        <div className="mt-10 flex flex-wrap gap-4">

          <Chip
            icon={<Sparkles size={18} />}
            text="AI Resume Analyzer"
            color="from-indigo-500 to-blue-500"
          />

          <Chip
            icon={<Cpu size={18} />}
            text="ATS Optimization"
            color="from-cyan-500 to-blue-500"
          />

          <Chip
            icon={<ShieldCheck size={18} />}
            text="Career Intelligence"
            color="from-emerald-500 to-green-500"
          />

        </div>

      </div>

    </motion.div>
  );
}

function Chip({
  icon,
  text,
  color,
}) {
  return (
    <motion.div
      whileHover={{
        scale: 1.08,
      }}
      className={`
      bg-gradient-to-r
      ${color}
      px-6
      py-3
      rounded-full
      flex
      items-center
      gap-3
      font-semibold
      shadow-lg
      `}
    >
      {icon}
      {text}
    </motion.div>
  );
}