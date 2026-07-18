import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import api from "../../services/api";

export default function CoverLetterCard({
  resumeText,
  jobDescription,
}) {
  const [loading, setLoading] = useState(false);
  const [letter, setLetter] = useState("");
  const [copied, setCopied] = useState(false);

  async function generateLetter() {
    if (!resumeText) {
      alert("Resume text missing.");
      return;
    }

    if (!jobDescription) {
      alert("Please upload with a Job Description.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/cover-letter", {
        resume_text: resumeText,
        job_description: jobDescription,
      });

      setLetter(res.data.cover_letter);
    } catch (err) {
      console.error(err);
      alert("Failed to generate cover letter.");
    } finally {
      setLoading(false);
    }
  }

  async function copyLetter() {
    if (!letter) return;

    await navigator.clipboard.writeText(letter);

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
        📄 AI Cover Letter Generator
      </h2>

      <div className="flex flex-wrap gap-4">

        <button
          onClick={generateLetter}
          disabled={loading}
          className="bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl font-bold disabled:opacity-50"
        >
          {loading
            ? "Generating..."
            : "Generate Cover Letter"}
        </button>

        {letter && (
          <button
            onClick={copyLetter}
            className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded-xl flex items-center gap-2"
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        )}

      </div>

      {letter && (
        <div className="mt-8 bg-slate-800 rounded-2xl p-6 max-h-[650px] overflow-y-auto">

          <div className="prose prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {letter}
            </ReactMarkdown>
          </div>

        </div>
      )}
    </motion.div>
  );
}