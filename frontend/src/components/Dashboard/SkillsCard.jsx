import { motion } from "framer-motion";
import {
  Cpu,
  Code2,
  Database,
  Brain,
} from "lucide-react";

const colors = [
  "from-blue-500 to-cyan-500",
  "from-purple-500 to-pink-500",
  "from-green-500 to-emerald-500",
  "from-orange-500 to-red-500",
  "from-indigo-500 to-blue-500",
];

export default function SkillsCard({ skills = [] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      whileHover={{
        y: -8,
        scale: 1.01,
      }}
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
      <div className="flex items-center gap-4 mb-8">

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">

          <Brain className="text-white" size={32} />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-white">
            Technical Skills
          </h2>

          <p className="text-slate-400">
            AI detected technologies
          </p>

        </div>

      </div>

      {skills.length === 0 ? (
        <div className="text-center py-12">

          <Cpu
            size={70}
            className="mx-auto text-slate-600"
          />

          <p className="text-slate-400 mt-5 text-lg">
            No skills detected.
          </p>

        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">

            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  scale: 0.8,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  delay: index * 0.05,
                }}
                whileHover={{
                  scale: 1.08,
                  rotate: 2,
                }}
                className={`
                rounded-2xl
                p-5
                bg-gradient-to-r
                ${
                  colors[index % colors.length]
                }
                shadow-lg
                cursor-pointer
                `}
              >
                <Code2
                  size={22}
                  className="text-white mb-4"
                />

                <h3 className="text-white font-semibold">
                  {skill}
                </h3>

              </motion.div>
            ))}

          </div>

          <div className="mt-10 border-t border-slate-800 pt-6 flex justify-between">

            <div>

              <p className="text-slate-400">
                Total Skills
              </p>

              <h2 className="text-3xl font-bold text-white">
                {skills.length}
              </h2>

            </div>

            <div className="text-right">

              <Database
                size={32}
                className="text-indigo-400 ml-auto"
              />

              <p className="text-slate-400 mt-2">
                Skills Database
              </p>

            </div>

          </div>
        </>
      )}
    </motion.div>
  );
}