import { motion } from "framer-motion";

export default function Loading() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center overflow-hidden">

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear",
        }}
        className="w-36 h-36 rounded-full border-4 border-blue-500 border-t-transparent"
      />

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1,
        }}
        className="mt-12 text-4xl font-bold text-white"
      >
        ResumeIQ AI
      </motion.h1>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
          duration: 1,
        }}
        className="mt-4 text-slate-400 text-lg"
      >
        Analyzing Resume...
      </motion.p>

      <div className="w-96 h-2 bg-slate-800 rounded-full mt-12 overflow-hidden">

        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 3,
          }}
          className="h-full bg-blue-500"
        />

      </div>

    </div>
  );
}