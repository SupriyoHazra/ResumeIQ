import { useLocation, Navigate } from "react-router-dom";
import DashboardLayout from "../components/DashboardLayout";
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
import CoverLetterCard from "../components/Dashboard/CoverLetterCard";
import InterviewPreparationCard from "../components/Dashboard/InterviewPreparationCard";
import ResumeComparisonCard from "../components/Dashboard/ResumeComparisonCard";
import SkillsRadarChart from "../components/Dashboard/SkillsRadarChart";
import CareerRoadmapCard from "../components/Dashboard/CareerRoadmapCard";
import KeywordOptimizerCard from "../components/Dashboard/KeywordOptimizerCard";
import SalaryPredictorCard from "../components/Dashboard/SalaryPredictorCard";
import HistoryCard from "../components/Dashboard/HistoryCard";
import DownloadReportCard from "../components/Dashboard/DownloadReportCard";

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
  <DashboardLayout>

    <div className="max-w-7xl mx-auto text-white">

        {/* Header */}
        <DashboardHeader />

        {/* Overview */}
        <OverviewCards ats={ats} />

        {/* ATS Analytics */}
        <div className="mt-8">
          <ATSAnalyticsCard ats={ats} />
        </div>
        {/* Skills Radar */}
<div className="mt-8">
  <SkillsRadarChart
    skills={resume.skills || []}
  />
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

{/* Job Match */}
<div className="mt-8">
  <JobMatchCard
    result={data.job_match || {}}
  />
</div>

{/* Resume vs Job Description */}
<div className="mt-8">
  <ResumeComparisonCard
    result={data.job_match || {}}
  />
</div>

{/* Resume Rewriter */}
<div className="mt-8">
  <ResumeRewriteCard
    resumeText={data.text || ""}
  />
</div>

{/* Cover Letter */}
<div className="mt-8">
  <CoverLetterCard
    resumeText={data.text || ""}
    jobDescription={data.job_description || ""}
  />
</div>

{/* Interview Preparation */}
<div className="mt-8">
  <InterviewPreparationCard
    resumeText={data.text || ""}
    jobDescription={data.job_description || ""}
  />
</div>

{/* AI Career Roadmap */}
<div className="mt-8">
  <CareerRoadmapCard
    resumeText={data.text || ""}
  />
</div>

{/* AI Keyword Optimizer */}
<div className="mt-8">
  <KeywordOptimizerCard
    resumeText={data.text || ""}
    jobDescription={data.job_description || ""}
  />
</div>

{/* AI Salary Predictor */}
<div className="mt-8">
  <SalaryPredictorCard
    resumeText={data.text || ""}
  />
</div>

{/* Resume History */}
<div className="mt-8">
  <HistoryCard />
</div>

<div className="mt-8">
  <DownloadReportCard data={data} />
</div>
            </div>

  </DashboardLayout>
  );
}