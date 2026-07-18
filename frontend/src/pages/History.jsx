import DashboardLayout from "../components/DashboardLayout";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Trash2 } from "lucide-react";
import api from "../services/api";

export default function History() {
  const navigate = useNavigate();

  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchHistory();
  }, []);

  async function fetchHistory() {
    try {
      const res = await api.get("/history");
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteHistory(id) {
    if (!window.confirm("Delete this analysis?")) return;

    try {
      await api.delete(`/history/${id}`);
      fetchHistory();
    } catch (err) {
      console.error(err);
    }
  }

  const filteredHistory = history.filter((item) =>
    (item.candidate_name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const highestATS =
    history.length > 0
      ? Math.max(...history.map((item) => item.ats_score || 0))
      : 0;

  const averageATS =
    history.length > 0
      ? (
          history.reduce(
            (sum, item) => sum + (item.ats_score || 0),
            0
          ) / history.length
        ).toFixed(1)
      : 0;

  return (
  <DashboardLayout>

    <div className="max-w-7xl mx-auto text-white">

        <h1 className="text-4xl font-bold mb-10">
          Resume History
        </h1>

        {/* Statistics */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-slate-400">Total Analyses</h3>
            <p className="text-4xl font-bold mt-2">
              {history.length}
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-slate-400">Highest ATS Score</h3>
            <p className="text-4xl font-bold text-green-400 mt-2">
              {highestATS}%
            </p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
            <h3 className="text-slate-400">Average ATS</h3>
            <p className="text-4xl font-bold text-blue-400 mt-2">
              {averageATS}%
            </p>
          </div>

        </div>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="🔍 Search candidate..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 outline-none focus:border-blue-500"
          />
        </div>

        {/* Empty State */}
        {filteredHistory.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-16 text-center">
            <h2 className="text-3xl font-bold">
              No Resume History
            </h2>

            <p className="text-slate-400 mt-3">
              Upload your first resume to begin.
            </p>
          </div>
        ) : (
          <div className="grid gap-6">

            {filteredHistory.map((item) => (

              <div
                key={item.id}
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-blue-500 transition-all duration-300"
              >

                <div className="flex justify-between items-start flex-wrap gap-4">

                  <div>
                    <h2 className="text-2xl font-bold">
                      {item.candidate_name || "Unknown Candidate"}
                    </h2>

                    <p className="text-slate-400 mt-2">
                      {item.filename}
                    </p>
                  </div>

                  <div className="bg-green-600 px-5 py-2 rounded-full font-bold shadow-lg">
                    {item.ats_score}%
                  </div>

                </div>

                <p className="text-slate-400 mt-6">
                  {item.summary || "No AI summary available."}
                </p>

                <div className="mt-6 flex justify-between items-center">

                  <span className="text-sm text-slate-500">
                    {new Date(item.created_at).toLocaleString()}
                  </span>

                  <div className="flex gap-3">

                    <button
                      onClick={() => navigate(`/history/${item.id}`)}
                      className="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded-xl transition"
                    >
                      View
                    </button>

                    <button
                      onClick={() => deleteHistory(item.id)}
                      className="flex items-center gap-2 bg-red-600 hover:bg-red-500 px-4 py-2 rounded-xl transition"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>
        )}

            </div>

  </DashboardLayout>
  );
}