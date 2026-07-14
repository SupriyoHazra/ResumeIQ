import { useState } from "react";
import { Upload } from "lucide-react";
import { motion } from "framer-motion";
import api from "../services/api";

export default function UploadPage() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  async function handleUpload() {
    if (!file) {
      alert("Please select a PDF or DOCX file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);

      const response = await api.post("/upload", formData);

      alert("Upload Successful!");

      console.log(response.data);

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
        className="max-w-xl w-full bg-slate-900 rounded-3xl p-10 border border-slate-800"
      >

        <h1 className="text-4xl text-center font-bold text-white">
          Upload Resume
        </h1>

        <p className="text-center text-slate-400 mt-3">
          PDF or DOCX only
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
          className="cursor-pointer mt-10 flex flex-col items-center border-2 border-dashed border-blue-500 rounded-2xl p-14"
        >
          <Upload size={60} className="text-blue-500" />

          <p className="mt-5 text-white">
            {file ? file.name : "Choose Resume"}
          </p>
        </label>

        <button
          onClick={handleUpload}
          disabled={uploading}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-500 py-4 rounded-xl text-white font-bold"
        >
          {uploading ? "Uploading..." : "Analyze Resume"}
        </button>

      </motion.div>

    </div>
  );
}