import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

export default function ViewAnalysis() {
  const { id } = useParams();

  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    fetchAnalysis();
  }, []);

  async function fetchAnalysis() {
    try {
      const res = await api.get(`/history/${id}`);
      setAnalysis(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8">
          Resume Analysis
        </h1>

        <div className="grid gap-6">

          <div className="bg-slate-900 rounded-2xl p-6">
            <h2 className="text-2xl font-bold">
              {analysis.candidate_name}
            </h2>

            <p className="text-slate-400 mt-2">
              {analysis.filename}
            </p>

            <p className="text-green-400 text-3xl font-bold mt-6">
              ATS Score: {analysis.ats_score}%
            </p>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">
              AI Summary
            </h2>

            <pre className="whitespace-pre-wrap">
              {analysis.summary}
            </pre>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">
              Resume Data
            </h2>

            <pre className="overflow-auto whitespace-pre-wrap">
              {JSON.stringify(analysis.resume, null, 2)}
            </pre>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">
              ATS Analysis
            </h2>

            <pre className="overflow-auto whitespace-pre-wrap">
              {JSON.stringify(analysis.ats, null, 2)}
            </pre>
          </div>

          <div className="bg-slate-900 rounded-2xl p-6">
            <h2 className="text-xl font-bold mb-4">
              Job Match
            </h2>

            <pre className="overflow-auto whitespace-pre-wrap">
              {JSON.stringify(analysis.job_match, null, 2)}
            </pre>
          </div>

        </div>

      </div>
    </div>
  );
}