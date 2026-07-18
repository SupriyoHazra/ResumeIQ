import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { motion } from "framer-motion";

export default function DashboardLayout({ children }) {
  return (
    <div className="relative flex min-h-screen overflow-hidden bg-[#030712] text-white">

      {/* Animated Background Glow */}
      <motion.div
        animate={{
          x: [0, 120, -80, 0],
          y: [0, -60, 70, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full bg-indigo-600/20 blur-[180px]"
      />

      <motion.div
        animate={{
          x: [0, -150, 80, 0],
          y: [0, 80, -60, 0],
          scale: [1, 0.8, 1.15, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-250px] right-[-250px] w-[700px] h-[700px] rounded-full bg-cyan-500/20 blur-[220px]"
      />

      {/* Floating Grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
          `,
          backgroundSize: "70px 70px",
        }}
      />

      <Sidebar />

      <div className="flex-1 flex flex-col relative z-10">

        <Topbar />

        <motion.main
          initial={{
            opacity: 0,
            scale: 0.97,
            y: 40,
          }}
          animate={{
            opacity: 1,
            scale: 1,
            y: 0,
          }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="flex-1 p-8"
        >
          {children}
        </motion.main>

      </div>
    </div>
  );
}