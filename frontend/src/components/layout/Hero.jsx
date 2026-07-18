// Premium Hero.jsx
// NOTE: This is a starter premium Hero file.
// Replace the contents of your current Hero.jsx with this file and continue customizing.

import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ScoreCard from "../ui/ScoreCard";
import AuroraBackground from "../AuroraBackground";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <AuroraBackground>
      <section className="relative min-h-screen overflow-hidden flex items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#2563eb22,transparent_60%)]" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 px-8 relative z-10">

          <motion.div
            initial={{opacity:0,x:-80}}
            animate={{opacity:1,x:0}}
            transition={{duration:1}}
          >
            <p className="uppercase tracking-[0.35em] text-cyan-400 font-bold">
              NEXT GENERATION AI CAREER PLATFORM
            </p>

            <h1 className="mt-6 text-7xl font-black leading-tight">
              Analyze <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500 bg-clip-text text-transparent">Smarter</span><br/>
              Get Hired Faster.
            </h1>

            <p className="mt-8 text-xl text-slate-300 leading-9">
              AI Resume Analyzer with ATS scoring, AI feedback, recruiter insights,
              job matching and interview preparation.
            </p>

            <div className="mt-12 flex gap-5 flex-wrap">
              <motion.button whileHover={{scale:1.08,y:-4}} onClick={()=>navigate("/register")}
                className="px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 font-bold shadow-2xl">
                Create Account
              </motion.button>

              <motion.button whileHover={{scale:1.08,y:-4}} onClick={()=>navigate("/login")}
                className="px-8 py-4 rounded-2xl border border-cyan-500/40 bg-white/5 backdrop-blur-xl">
                Login
              </motion.button>

              <motion.button whileHover={{scale:1.08,y:-4}} onClick={()=>navigate("/upload")}
                className="px-8 py-4 rounded-2xl border border-slate-700 bg-slate-900/40 backdrop-blur-xl">
                Continue
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{opacity:0,scale:.8}}
            animate={{opacity:1,scale:1}}
            transition={{duration:1.2}}
            className="flex justify-center items-center">

            <motion.div
              animate={{y:[-10,10,-10],rotate:[0,1,0,-1,0]}}
              transition={{repeat:Infinity,duration:6}}
              className="w-[430px] rounded-[32px] border border-cyan-500/20 bg-white/5 backdrop-blur-2xl p-8 shadow-[0_0_60px_rgba(59,130,246,.35)]">

              <h2 className="text-3xl font-bold text-center mb-8">
                AI Resume Analysis
              </h2>

              <div className="space-y-5">
                <ScoreCard title="ATS Score" value="96%" progress={96}/>
                <ScoreCard title="Job Match" value="91%" progress={91}/>
                <ScoreCard title="AI Score" value="A+" progress={98}/>
                <ScoreCard title="Grammar" value="Excellent" progress={94}/>
                <ScoreCard title="Projects" value="Strong" progress={90}/>
              </div>

            </motion.div>

          </motion.div>

        </div>
      </section>
    </AuroraBackground>
  );
}
