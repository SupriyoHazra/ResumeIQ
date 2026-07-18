

import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";

import "react-circular-progressbar/dist/styles.css";

export default function ATSGauge({ score = 0 }) {
  let color = "#ef4444";

  if (score >= 80) color = "#22c55e";
  else if (score >= 60) color = "#3b82f6";
  else if (score >= 40) color = "#facc15";

  return (
    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-8 shadow-xl">

      <h2 className="text-3xl font-bold text-center mb-8">
        ATS Score
      </h2>

      <div className="w-64 h-64 mx-auto">

        <CircularProgressbar
          value={score}
          strokeWidth={8}
          styles={buildStyles({
            pathColor: color,
            trailColor: "#1e293b",
            textColor: "#ffffff",
          })}
          text=""
        />

      </div>

      <div className="text-center mt-8">

        <span
  className="text-6xl font-extrabold"
  style={{ color }}
>
  {score}%
</span>

      </div>

      <p className="text-slate-400 text-center mt-4">
        Applicant Tracking System Score
      </p>

    </div>
  );
}
