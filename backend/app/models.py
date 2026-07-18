from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text

from app.database import Base


class ResumeHistory(Base):
    __tablename__ = "resume_history"

    id = Column(Integer, primary_key=True, index=True)

    filename = Column(String)

    candidate_name = Column(String)

    ats_score = Column(Integer)

    summary = Column(Text)

    # Store complete analysis
    resume_data = Column(Text)

    ats_data = Column(Text)

    ai_analysis = Column(Text)

    job_match = Column(Text)

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
    )