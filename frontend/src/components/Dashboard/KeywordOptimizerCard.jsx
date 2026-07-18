import { useState } from "react";
import { motion } from "framer-motion";
import api from "../../services/api";

export default function KeywordOptimizerCard({
  resumeText,
  jobDescription,
}) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);

  async function optimize() {
    if (!resumeText) {
      alert("Resume missing.");
      return;
    }

    if (!jobDescription) {
      alert("Please upload with a Job Description.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/keyword-optimizer", {
        resume_text: resumeText,
        job_description: jobDescription,
      });

      setData(res.data);
    } catch (err) {
      console.error(err);
      alert("Keyword optimization failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mt-8"
    >
      <h2 className="text-2xl font-bold mb-6">
        🔑 AI Keyword Optimizer
      </h2>

      <button
        onClick={optimize}
        disabled={loading}
        className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-xl font-bold disabled:opacity-50"
      >
        {loading ? "Optimizing..." : "Optimize Resume Keywords"}
      </button>

      {data && (
        <div className="mt-8 space-y-8">

          <Section
            title="❌ Missing Keywords"
            items={data.missing_keywords}
          />

          <Section
            title="⭐ Important Keywords"
            items={data.important_keywords}
          />

          <Section
            title="📍 Where To Add"
            items={data.where_to_add}
          />

          <div>
            <h3 className="text-xl font-bold text-purple-400 mb-3">
              📝 Optimized Summary
            </h3>

            <div className="bg-slate-800 rounded-xl p-5 text-slate-300">
              {data.optimized_summary}
            </div>
          </div>

        </div>
      )}
    </motion.div>
  );
}

function Section({ title, items }) {
  return (
    <div>
      <h3 className="text-xl font-bold text-purple-400 mb-3">
        {title}
      </h3>

      <ul className="list-disc pl-6 space-y-2 text-slate-300">
        {(items || []).map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}