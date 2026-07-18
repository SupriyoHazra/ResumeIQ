import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Download } from "lucide-react";
import { jsPDF } from "jspdf";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import api from "../../services/api";

export default function InterviewPreparationCard({
  resumeText,
  jobDescription,
}) {
  const [loading, setLoading] = useState(false);
  const [interview, setInterview] = useState("");
  const [copied, setCopied] = useState(false);

  async function generateInterview() {
    if (!resumeText) {
      alert("Resume text not found.");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/interview", {
        resume_text: resumeText,
        job_description: jobDescription || "",
      });

      setInterview(res.data.interview);
    } catch (err) {
      console.error(err);
      alert("Failed to generate interview preparation.");
    } finally {
      setLoading(false);
    }
  }

  async function copyInterview() {
    if (!interview) return;

    await navigator.clipboard.writeText(interview);

    setCopied(true);

    setTimeout(() => setCopied(false), 2000);
  }

  function downloadPDF() {
    if (!interview) return;

    const pdf = new jsPDF();

    pdf.setFont("helvetica");
    pdf.setFontSize(18);
    pdf.text("ResumeIQ - AI Interview Preparation", 20, 20);

    pdf.setFontSize(11);

    const lines = pdf.splitTextToSize(interview, 170);

    pdf.text(lines, 20, 35);

    pdf.save("ResumeIQ_Interview_Preparation.pdf");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mt-8"
    >
      <h2 className="text-2xl font-bold mb-6">
        🎤 AI Interview Preparation
      </h2>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={generateInterview}
          disabled={loading}
          className="bg-cyan-600 hover:bg-cyan-500 px-6 py-3 rounded-xl font-bold disabled:opacity-50"
        >
          {loading
            ? "Generating..."
            : "Generate Interview Questions"}
        </button>

        {interview && (
          <>
            <button
              onClick={copyInterview}
              className="bg-green-600 hover:bg-green-500 px-6 py-3 rounded-xl flex items-center gap-2"
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Copied!" : "Copy"}
            </button>

            <button
              onClick={downloadPDF}
              className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-xl flex items-center gap-2"
            >
              <Download size={18} />
              Download PDF
            </button>
          </>
        )}
      </div>

      {interview && (
        <div className="mt-8 bg-slate-800 rounded-2xl p-6 max-h-[700px] overflow-y-auto">
          <div className="prose prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {interview}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </motion.div>
  );
}