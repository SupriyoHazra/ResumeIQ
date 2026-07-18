import {
  Bell,
  Search,
  Upload,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Topbar() {
  const navigate = useNavigate();

  return (
    <header className="h-24 bg-slate-950 border-b border-slate-800 flex items-center justify-between px-10">

      {/* Left */}

      <div>

        <h1 className="text-3xl font-bold text-white">
          ResumeIQ Dashboard
        </h1>

        <p className="text-slate-400 mt-1">
          AI Resume Analyzer Pro
        </p>

      </div>

      {/* Right */}

      <div className="flex items-center gap-5">

        {/* Search */}

        <div className="relative">

          <Search
            className="absolute left-4 top-3.5 text-slate-400"
            size={18}
          />

          <input
            placeholder="Search..."
            className="bg-slate-900 border border-slate-700 rounded-xl pl-12 pr-5 py-3 w-72 outline-none focus:border-indigo-500 text-white"
          />

        </div>

        {/* Notification */}

        <button className="w-12 h-12 rounded-xl bg-slate-900 hover:bg-slate-800 flex items-center justify-center">

          <Bell size={20} />

        </button>

        {/* Upload */}

        <button
          onClick={() => navigate("/upload")}
          className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-500 px-6 py-3 rounded-xl font-semibold"
        >

          <Upload size={20} />

          Upload Resume

        </button>

      </div>

    </header>
  );
}