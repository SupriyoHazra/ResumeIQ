import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../services/api";

export default function HistoryCard() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  async function loadHistory() {
    try {
      const res = await api.get("/history");
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-slate-900 border border-slate-800 rounded-3xl p-8 mt-8"
    >
      <h2 className="text-2xl font-bold mb-6">
        📂 Resume History
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">

          <thead>
            <tr className="text-left border-b border-slate-700">
              <th className="py-3">Candidate</th>
              <th>File</th>
              <th>ATS</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>

            {history.map((item) => (
              <tr
                key={item.id}
                className="border-b border-slate-800"
              >
                <td className="py-4">
                  {item.candidate_name}
                </td>

                <td>{item.filename}</td>

                <td>
                  <span className="bg-green-600 px-3 py-1 rounded-full">
                    {item.ats_score}
                  </span>
                </td>

                <td>{item.created_at}</td>

              </tr>
            ))}

          </tbody>

        </table>
      </div>
    </motion.div>
  );
}