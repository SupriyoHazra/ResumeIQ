import { motion } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

export default function FeedbackCard({ feedback = [] }) {
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

        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-500 flex items-center justify-center">

          <Sparkles
            size={30}
            className="text-white"
          />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-white">
            AI Recommendations
          </h2>

          <p className="text-slate-400">
            Personalized resume improvements
          </p>

        </div>

      </div>

      {feedback.length === 0 ? (

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="
          bg-green-500/10
          border
          border-green-500/30
          rounded-2xl
          p-8
          text-center
          "
        >

          <CheckCircle2
            size={70}
            className="mx-auto text-green-400"
          />

          <h3 className="text-2xl font-bold text-green-400 mt-5">
            Excellent Resume
          </h3>

          <p className="text-slate-300 mt-3">
            No major improvements detected.
          </p>

        </motion.div>

      ) : (

        <div className="space-y-5">

          {feedback.map((item, index) => (

            <motion.div
              key={index}
              initial={{
                opacity: 0,
                x: -20,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                scale: 1.02,
              }}
              className="
              bg-slate-800/70
              border
              border-slate-700
              rounded-2xl
              p-5
              flex
              items-start
              gap-4
              "
            >

              <div className="mt-1">

                <AlertTriangle
                  size={22}
                  className="text-yellow-400"
                />

              </div>

              <div className="flex-1">

                <p className="text-white leading-7">
                  {item}
                </p>

              </div>

              <ArrowRight
                size={20}
                className="text-slate-500"
              />

            </motion.div>

          ))}

        </div>

      )}

      <div className="mt-10 border-t border-slate-800 pt-6 flex justify-between">

        <div>

          <p className="text-slate-400">
            Suggestions
          </p>

          <h2 className="text-3xl font-bold text-white">
            {feedback.length}
          </h2>

        </div>

        <div className="text-right">

          <Sparkles
            size={32}
            className="text-indigo-400 ml-auto"
          />

          <p className="text-slate-400 mt-2">
            AI Powered
          </p>

        </div>

      </div>

    </motion.div>
  );
}