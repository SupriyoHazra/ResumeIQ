import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { motion } from "framer-motion";
import DashboardLayout from "../components/DashboardLayout";

import DashboardHeader from "../components/Dashboard/DashboardHeader";
import OverviewCards from "../components/Dashboard/OverviewCards";
import ATSScoreCard from "../components/Dashboard/ATSScoreCard";
import CandidateCard from "../components/Dashboard/CandidateCard";
import SkillsCard from "../components/Dashboard/SkillsCard";
import FeedbackCard from "../components/Dashboard/FeedbackCard";
import SkillsRadarChart from "../components/Dashboard/SkillsRadarChart";
import ATSAnalyticsCard from "../components/Dashboard/ATSAnalyticsCard";
import AIAnalysisCard from "../components/Dashboard/AIAnalysisCard";
import JobMatchCard from "../components/Dashboard/JobMatchCard";

export default function ResumeDetails() {
  const { id } = useParams();

  const [resume, setResume] = useState(null);

  useEffect(() => {
    fetchResume();
  }, [id]);

  async function fetchResume() {
    try {
      const res = await api.get(`/history/${id}`);

      console.log("Backend Response:", res.data);

      setResume(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  if (!resume) {
    return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto py-20 text-center text-white text-3xl">
          Loading...
        </div>
      </DashboardLayout>
    );
  }

  let resumeData = {};
  let atsData = {};
  let aiAnalysis = {};
  let jobMatch = {};

  try {
    resumeData =
      typeof resume.resume_data === "string"
        ? JSON.parse(resume.resume_data)
        : resume.resume_data || {};
  } catch {
    resumeData = {};
  }

  try {
    atsData =
      typeof resume.ats_data === "string"
        ? JSON.parse(resume.ats_data)
        : resume.ats_data || {};
  } catch {
    atsData = {};
  }

  try {
    aiAnalysis =
      typeof resume.ai_analysis === "string"
        ? JSON.parse(resume.ai_analysis)
        : resume.ai_analysis || {};
  } catch {
    aiAnalysis = {};
  }

  try {
    jobMatch =
      typeof resume.job_match === "string"
        ? JSON.parse(resume.job_match)
        : resume.job_match || {};
  } catch {
    jobMatch = {};
  }

  const skills = resumeData.skills || [];

  return (
    <DashboardLayout>
      <motion.div
  initial={{
    opacity: 0,
    scale: 0.94,
    y: 80,
    filter: "blur(15px)",
  }}
  animate={{
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
  }}
  transition={{
    duration: 1,
    ease: [0.22, 1, 0.36, 1],
  }}
  className="min-h-screen bg-transparent text-white p-8"
>

        <div className="max-w-7xl mx-auto space-y-8">

          <DashboardHeader />

          <OverviewCards ats={atsData} />

          <div className="grid xl:grid-cols-3 gap-8">

            <div>
              <ATSScoreCard ats={atsData} />
            </div>

            <div className="xl:col-span-2">
              <CandidateCard resume={resumeData} />
            </div>

          </div>

          <div className="grid xl:grid-cols-2 gap-8">

            <SkillsCard skills={skills} />

            <SkillsRadarChart skills={skills} />

          </div>

          <ATSAnalyticsCard ats={atsData} />

          <FeedbackCard
            feedback={atsData.feedback || []}
          />

          <AIAnalysisCard
            analysis={aiAnalysis}
          />

          <JobMatchCard
            result={jobMatch}
          />

        </div>

      </motion.div>
    </DashboardLayout>
  );
}