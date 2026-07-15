import { useState } from "react";
import { motion } from "framer-motion";
import { Copy, Check, Download } from "lucide-react";
import { jsPDF } from "jspdf";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import api from "../../services/api";

export default function ResumeRewriteCard({ resumeText }) {
  const [loading, setLoading] = useState(false);
  const [rewritten, setRewritten] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleRewrite() {
    if (!resumeText) {
      alert("Resume text not found.");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/rewrite", {
        resume_text: resumeText,
      });

      setRewritten(response.data.rewritten_resume);
    } catch (error) {
      console.error(error);
      alert("Rewrite Failed");
    } finally {
      setLoading(false);
    }
  }

  async function copyResume() {
    if (!rewritten) return;

    await navigator.clipboard.writeText(rewritten);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  function downloadPDF() {
    if (!rewritten) return;

    const pdf = new jsPDF();

    pdf.setFont("helvetica");
    pdf.setFontSize(18);
    pdf.text("ResumeIQ - AI Rewritten Resume", 20, 20);

    pdf.setFontSize(11);

    const lines = pdf.splitTextToSize(rewritten, 170);

    pdf.text(lines, 20, 35);

    pdf.save("ResumeIQ_Rewritten_Resume.pdf");
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mt-8"
    >
      <h2 className="text-2xl font-bold text-white mb-6">
        ✨ AI Resume Rewriter
      </h2>

      <div className="flex flex-wrap gap-4">
        <button
          onClick={handleRewrite}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl font-bold disabled:opacity-50"
        >
          {loading ? "Rewriting..." : "Rewrite My Resume"}
        </button>

        {rewritten && (
          <>
            <button
              onClick={copyResume}
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

      {rewritten && (
        <div className="mt-8 bg-slate-800 rounded-2xl p-6 max-h-[600px] overflow-y-auto">
          <h3 className="text-xl font-semibold text-green-400 mb-4">
            Rewritten Resume
          </h3>

          <div className="prose prose-invert max-w-none">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {rewritten}
            </ReactMarkdown>
          </div>
        </div>
      )}
    </motion.div>
  );
}