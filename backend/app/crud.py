import json

from sqlalchemy.orm import Session

from app.models import ResumeHistory


def save_resume(
    db: Session,
    filename: str,
    candidate_name: str,
    ats_score: float,
    summary: str,
    resume_data: dict,
    ats_data: dict,
    ai_analysis: dict,
    job_match: dict,
):
    record = ResumeHistory(
        filename=filename,
        candidate_name=candidate_name,
        ats_score=int(ats_score),
        summary=summary,
        resume_data=json.dumps(resume_data),
        ats_data=json.dumps(ats_data),
        ai_analysis=json.dumps(ai_analysis),
        job_match=json.dumps(job_match),
    )

    db.add(record)
    db.commit()
    db.refresh(record)

    return record


def get_history(db: Session):
    return (
        db.query(ResumeHistory)
        .order_by(ResumeHistory.id.desc())
        .all()
    )


def get_resume_by_id(
    db: Session,
    resume_id: int,
):
    return (
        db.query(ResumeHistory)
        .filter(ResumeHistory.id == resume_id)
        .first()
    )


def delete_resume(
    db: Session,
    resume_id: int,
):
    record = (
        db.query(ResumeHistory)
        .filter(ResumeHistory.id == resume_id)
        .first()
    )

    if record:
        db.delete(record)
        db.commit()

    return True