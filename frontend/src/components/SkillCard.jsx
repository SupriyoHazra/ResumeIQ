import { motion } from "framer-motion";

export default function SkillCard({ skill }) {
  return (
    <motion.div
      whileHover={{
        scale: 1.08,
        y: -5,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        px-5
        py-3
        rounded-xl
        bg-gradient-to-r
        from-indigo-600
        to-blue-500
        font-semibold
        shadow-lg
        shadow-blue-900/40
        cursor-pointer
        select-none
      "
    >
      {skill}
    </motion.div>
  );
}