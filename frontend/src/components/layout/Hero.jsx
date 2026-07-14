import { motion } from "framer-motion";
import ScoreCard from "../ui/ScoreCard";

export default function Hero() {
  return (
    <section className="min-h-screen bg-slate-950 text-white flex items-center pt-24">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 px-8">

        {/* Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-blue-400 font-semibold mb-4">
            AI Resume Analyzer Pro
          </p>

          <h1 className="text-6xl font-extrabold leading-tight">
            Analyze
            <span className="text-blue-500"> Smarter </span>
            Get Hired Faster.
          </h1>

          <p className="mt-8 text-slate-400 text-lg leading-8">
            ResumeIQ analyzes resumes using AI, ATS scoring,
            skill detection, recruiter insights and intelligent
            recommendations.
          </p>

          <div className="mt-10 flex gap-6">
            <button className="bg-blue-600 hover:bg-blue-500 transition px-7 py-4 rounded-xl font-semibold shadow-lg">
              Analyze Resume
            </button>

            <button className="border border-slate-700 hover:bg-slate-900 transition px-7 py-4 rounded-xl">
              Watch Demo
            </button>
          </div>

          <div className="mt-12 flex gap-8 text-slate-400">
            <div>
              <h3 className="text-3xl font-bold text-white">10K+</h3>
              <p>Resumes Analyzed</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">95%</h3>
              <p>ATS Accuracy</p>
            </div>

            <div>
              <h3 className="text-3xl font-bold text-white">24/7</h3>
              <p>AI Support</p>
            </div>
          </div>
        </motion.div>

        {/* Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
          className="flex justify-center items-center"
        >
          <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 w-[420px] shadow-2xl">

            <h2 className="text-2xl font-bold mb-8 text-center">
              AI Resume Analysis
            </h2>

            <div className="space-y-5">

              <ScoreCard
                title="ATS Score"
                value="96%"
                progress={96}
              />

              <ScoreCard
                title="Job Match"
                value="91%"
                progress={91}
              />

              <ScoreCard
                title="AI Score"
                value="A+"
                progress={98}
              />

              <ScoreCard
                title="Grammar"
                value="Excellent"
                progress={94}
              />

              <ScoreCard
                title="Projects"
                value="Strong"
                progress={90}
              />

            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}