import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";
import api from "../services/api";

export default function UploadPage({ setResult }) {
  const navigate = useNavigate();

  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [uploading, setUploading] = useState(false);

  async function handleUpload() {
    if (!file) {
      alert("Please select a PDF or DOCX file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("job_description", jobDescription);

    try {
      setUploading(true);

      const response = await api.post("/upload", formData);

console.log(response);
console.log(response.data);

      if (setResult) {
        setResult(response.data);
      }

      navigate("/loading");

      setTimeout(() => {
        navigate("/result", {
          state: {
            result: response.data,
          },
        });
      }, 2500);

    } catch (error) {
      console.error(error);
      alert("Upload Failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="max-w-2xl w-full bg-slate-900 rounded-3xl p-10 border border-slate-800"
      >
        <h1 className="text-4xl text-center font-bold text-white">
          Upload Resume
        </h1>

        <p className="text-center text-slate-400 mt-3">
          Upload your resume and optionally paste a Job Description.
        </p>

        <input
          type="file"
          accept=".pdf,.docx"
          className="hidden"
          id="resume"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <label
          htmlFor="resume"
          className="cursor-pointer mt-8 flex flex-col items-center border-2 border-dashed border-blue-500 rounded-2xl p-12"
        >
          <Upload size={60} className="text-blue-500" />

          <p className="mt-5 text-white text-center break-all">
            {file ? file.name : "Choose Resume"}
          </p>
        </label>

        <textarea
          placeholder="Paste Job Description here (Optional)"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          rows={8}
          className="mt-8 w-full bg-slate-800 text-white p-4 rounded-xl border border-slate-700 focus:outline-none focus:border-blue-500"
        />

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-500 transition py-4 rounded-xl text-white font-bold disabled:opacity-50"
        >
          {uploading ? "Analyzing..." : "Analyze Resume"}
        </button>
      </motion.div>
    </div>
  );
}