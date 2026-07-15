import { useLocation, Navigate } from "react-router-dom";

import DashboardHeader from "../components/Dashboard/DashboardHeader";
import OverviewCards from "../components/Dashboard/OverviewCards";
import ATSAnalyticsCard from "../components/Dashboard/ATSAnalyticsCard";
import ATSScoreCard from "../components/Dashboard/ATSScoreCard";
import CandidateCard from "../components/Dashboard/CandidateCard";
import SkillsCard from "../components/Dashboard/SkillsCard";
import FeedbackCard from "../components/Dashboard/FeedbackCard";
import AIAnalysisCard from "../components/Dashboard/AIAnalysisCard";
import JobMatchCard from "../components/Dashboard/JobMatchCard";
import ResumeRewriteCard from "../components/Dashboard/ResumeRewriteCard";

export default function Result() {
  const { state } = useLocation();

  // Prevent crashes if page is refreshed
  if (!state || !state.result) {
    return <Navigate to="/upload" replace />;
  }

  const data = state.result;
  console.log("AI Analysis:", data.ai_analysis);

  const resume = data.resume || {};

  const ats = data.ats || {
    score: 0,
    feedback: [],
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <DashboardHeader />

        {/* Overview Cards */}
        <OverviewCards ats={ats} />

        {/* ATS Analytics */}
        <div className="mt-8">
          <ATSAnalyticsCard ats={ats} />
        </div>

        {/* Top Row */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">

          <ATSScoreCard ats={ats} />

          <CandidateCard resume={resume} />

        </div>

        {/* Middle Row */}
        <div className="grid lg:grid-cols-2 gap-8 mt-8">

          <SkillsCard skills={resume.skills || []} />

          <FeedbackCard feedback={ats.feedback || []} />

        </div>

        {/* AI Resume Review */}
        <div className="mt-8">

          <AIAnalysisCard
            analysis={data.ai_analysis}
          />

        </div>

        {/* Job Match Analysis */}
        <div className="mt-8">

          <JobMatchCard
            result={data.job_match || null}
          />

        </div>

        {/* AI Resume Rewriter */}
        <div className="mt-8">

          <ResumeRewriteCard
            resumeText={data.text || ""}
          />

        </div>

      </div>
    </div>
  );
}