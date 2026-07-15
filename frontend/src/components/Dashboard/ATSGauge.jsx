import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function ATSGauge({ score }) {
  return (
    <div className="flex justify-center">
      <div className="w-56 h-56">
        <CircularProgressbar
          value={score}
          text={`${score}%`}
          styles={buildStyles({
            textColor: "#ffffff",
            pathColor: "#3b82f6",
            trailColor: "#1e293b",
            textSize: "16px",
          })}
        />
      </div>
    </div>
  );
}