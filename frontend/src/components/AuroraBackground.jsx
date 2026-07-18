import { motion } from "framer-motion";

export default function AuroraBackground({ children }) {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#040816]">

      {/* Glow 1 */}
      <motion.div
        animate={{
          x: [0, 150, -100, 0],
          y: [0, -120, 80, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-[-150px] left-[-150px] w-[550px] h-[550px] rounded-full bg-cyan-500/20 blur-[140px]"
      />

      {/* Glow 2 */}
      <motion.div
        animate={{
          x: [0, -150, 120, 0],
          y: [0, 120, -80, 0],
          scale: [1, 0.9, 1.3, 1],
        }}
        transition={{
          duration: 24,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-[-180px] right-[-120px] w-[650px] h-[650px] rounded-full bg-indigo-600/20 blur-[160px]"
      />

      {/* Hero Content */}
      <div className="relative z-10">
        {children}
      </div>

    </div>
  );
}