import { useState } from "react";
import { motion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import api from "../../services/api";

export default function SalaryPredictorCard({ resumeText }) {
  const [loading, setLoading] = useState(false);
  const [prediction, setPrediction] = useState("");

  async function predictSalary() {
    if (!resumeText) {
      alert("Resume text missing.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/salary-predictor", {
        resume_text: resumeText,
      });

      setPrediction(res.data.salary_prediction);
    } catch (err) {
      console.error(err);
      alert("Salary prediction failed.");
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
        💰 AI Salary Predictor
      </h2>

      <button
        onClick={predictSalary}
        disabled={loading}
        className="bg-emerald-600 hover:bg-emerald-500 px-6 py-3 rounded-xl font-bold disabled:opacity-50"
      >
        {loading
          ? "Analyzing..."
          : "Predict My Salary"}
      </button>

      {prediction && (
        <div className="mt-8 bg-slate-800 rounded-2xl p-6 max-h-[700px] overflow-y-auto">
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {prediction}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </motion.div>
  );
}