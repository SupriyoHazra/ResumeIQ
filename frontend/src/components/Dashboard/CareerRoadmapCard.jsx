import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import api from "../../services/api";

export default function CareerRoadmapCard({ resumeText }) {
  const [loading, setLoading] = useState(false);
  const [roadmap, setRoadmap] = useState("");
  const [copied, setCopied] = useState(false);

  async function generateRoadmap() {
    if (!resumeText) {
      alert("Resume text missing.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/career-roadmap", {
        resume_text: resumeText,
      });

      setRoadmap(res.data.roadmap);
    } catch (err) {
      console.error(err);
      alert("Failed to generate roadmap.");
    } finally {
      setLoading(false);
    }
  }

  async function copyRoadmap() {
    if (!roadmap) return;

    await navigator.clipboard.writeText(roadmap);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mt-8"
    >
      <h2 className="text-2xl font-bold mb-6">
        🗺️ AI Career Roadmap
      </h2>

      <div className="flex flex-wrap gap-4">

        <button
          onClick={generateRoadmap}
          disabled={loading}
          className="bg-cyan-600 hover:bg-cyan-500 px-6 py-3 rounded-xl font-bold disabled:opacity-50"
        >
          {loading
            ? "Generating..."
            : "Generate Career Roadmap"}
        </button>

        {roadmap && (
          <button
            onClick={copyRoadmap}
            className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded-xl flex items-center gap-2"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        )}

      </div>

      {roadmap && (
        <div className="mt-8 bg-slate-800 rounded-2xl p-6 max-h-[700px] overflow-y-auto">

          <div className="prose prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {roadmap}
            </ReactMarkdown>
          </div>

        </div>
      )}
    </motion.div>
  );
}