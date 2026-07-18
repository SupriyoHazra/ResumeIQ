import { motion } from "framer-motion";
import {
  User,
  Mail,
  Phone,
  BadgeCheck,
} from "lucide-react";

export default function CandidateCard({ resume }) {
  const name = resume?.name || "Not Found";
  const email = resume?.email || "Not Found";
  const phone = resume?.phone || "Not Found";

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
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

        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 flex items-center justify-center">

          <User size={32} className="text-white" />

        </div>

        <div>

          <h2 className="text-3xl font-bold text-white">
            Candidate
          </h2>

          <p className="text-slate-400">
            Resume Information
          </p>

        </div>

      </div>

      <div className="space-y-5">

        <InfoCard
          icon={<BadgeCheck size={20} />}
          title="Full Name"
          value={name}
        />

        <InfoCard
          icon={<Mail size={20} />}
          title="Email Address"
          value={email}
        />

        <InfoCard
          icon={<Phone size={20} />}
          title="Phone Number"
          value={phone}
        />

      </div>

    </motion.div>
  );
}

function InfoCard({ icon, title, value }) {
  const missing = value === "Not Found";

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="
      bg-slate-800/70
      border
      border-slate-700
      rounded-2xl
      p-5
      flex
      items-center
      gap-4
      "
    >
      <div className="w-12 h-12 rounded-xl bg-indigo-600 flex items-center justify-center text-white">

        {icon}

      </div>

      <div className="flex-1">

        <p className="text-slate-400 text-sm">
          {title}
        </p>

        <p
          className={`font-semibold text-lg ${
            missing ? "text-red-400" : "text-white"
          }`}
        >
          {value}
        </p>

      </div>

    </motion.div>
  );
}