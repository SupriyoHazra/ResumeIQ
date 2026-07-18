from pathlib import Path
import json

from app.models import ResumeHistory
import shutil
from sqlalchemy.orm import Session

from fastapi import Depends
from app.auth.schemas import UserCreate, UserLogin
from app.auth.auth import (
    create_user,
    authenticate_user,
)
from app.auth.security import create_access_token
from app.database import get_db

from fastapi.responses import FileResponse
from app.report_generator import create_report

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from app.ai.interview_generator import generate_interview_questions
from app.parsers.pdf_parser import extract_text_from_pdf
from app.services.resume_parser import parse_resume
from app.services.ats_service import calculate_ats_score
from app.ai.career_roadmap import generate_career_roadmap
from app.ai.gemini_service import analyze_resume
from app.ai.job_matcher import match_resume_to_job
from app.ai.resume_rewriter import rewrite_resume
from app.ai.cover_letter_generator import generate_cover_letter
from app.ai.keyword_optimizer import optimize_keywords
from app.ai.salary_predictor import predict_salary
from app.database import Base, engine
from app.models import *
from app.crud import (
    save_resume,
    get_history,
    delete_resume,
    get_resume_by_id,
)


Base.metadata.create_all(bind=engine)
app = FastAPI(
    title="ResumeIQ API",
    description="Backend API for ResumeIQ - AI Resume Analyzer Pro",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

ALLOWED_EXTENSIONS = {".pdf", ".docx"}


@app.get("/")
def root():
    return {
        "project": "ResumeIQ",
        "status": "Backend Running",
        "version": "1.0.0",
    }


@app.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    job_description: str = Form(""),
    db: Session = Depends(get_db),
):
    extension = Path(file.filename).suffix.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files are allowed.",
        )

    file_path = UPLOAD_DIR / file.filename

    with file_path.open("wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    extracted_text = ""
    resume_data = {}
    ats_data = {}
    ai_analysis = {}
    job_match = {}

    if extension == ".pdf":
        extracted_text = extract_text_from_pdf(str(file_path))

        resume_data = parse_resume(extracted_text)

        ats_data = calculate_ats_score(
            resume_data,
            extracted_text,
        )

        try:
            ai_analysis = analyze_resume(extracted_text)
        except Exception as e:
            print("AI Analysis Error:", e)
            ai_analysis = {}

        if job_description.strip():
            try:
                job_match = match_resume_to_job(
                    extracted_text,
                    job_description,
                )
            except Exception as e:
                print("Job Match Error:", e)
                job_match = {}

    save_resume(
        db=db,
        filename=file.filename,
        candidate_name=resume_data.get("name", ""),
        ats_score=ats_data.get("score", 0),
        summary=(
            ai_analysis.get("summary", "")
            if isinstance(ai_analysis, dict)
            else ""
        ),
        resume_data=resume_data,
        ats_data=ats_data,
        ai_analysis=ai_analysis,
        job_match=job_match,
    )

    return {
        "success": True,
        "filename": file.filename,
        "saved_to": str(file_path),
        "text": extracted_text,
        "resume": resume_data,
        "ats": ats_data,
        "ai_analysis": ai_analysis,
        "job_match": job_match,
        "job_description": job_description,
    }


# -----------------------------
# Resume Rewriter
# -----------------------------

class RewriteRequest(BaseModel):
    resume_text: str


@app.post("/rewrite")
async def rewrite(data: RewriteRequest):
    rewritten = rewrite_resume(data.resume_text)

    return {
        "rewritten_resume": rewritten,
    }


# -----------------------------
# Cover Letter Generator
# -----------------------------

class CoverLetterRequest(BaseModel):
    resume_text: str
    job_description: str


@app.post("/cover-letter")
async def cover_letter(data: CoverLetterRequest):
    try:
        letter = generate_cover_letter(
            data.resume_text,
            data.job_description,
        )

        return {
            "cover_letter": letter,
        }

    except Exception as e:
        print("Cover Letter Error:", e)

        return {
            "cover_letter": "Unable to generate cover letter at the moment."
        }


# -----------------------------
# Interview Preparation
# -----------------------------

class InterviewRequest(BaseModel):
    resume_text: str
    job_description: str


@app.post("/interview")
async def interview(data: InterviewRequest):
    try:
        questions = generate_interview_questions(
            data.resume_text,
            data.job_description,
        )

        return {
            "interview": questions,
        }

    except Exception as e:
        print("Interview Generator Error:", e)

        return {
            "interview": "Unable to generate interview questions at the moment."
        }


# -----------------------------
# Career Roadmap
# -----------------------------

class CareerRoadmapRequest(BaseModel):
    resume_text: str


@app.post("/career-roadmap")
async def career_roadmap(data: CareerRoadmapRequest):
    try:
        roadmap = generate_career_roadmap(
            data.resume_text,
        )

        return {
            "roadmap": roadmap,
        }

    except Exception as e:
        print("Career Roadmap Error:", e)

        return {
            "roadmap": "Unable to generate career roadmap at the moment."
        }
class KeywordRequest(BaseModel):
    resume_text: str
    job_description: str

@app.post("/keyword-optimizer")
async def keyword_optimizer(data: KeywordRequest):
    try:
        result = optimize_keywords(
            data.resume_text,
            data.job_description,
        )

        return result

    except Exception as e:
        print("Keyword Optimizer Error:", e)

        return {
            "missing_keywords": [],
            "important_keywords": [],
            "where_to_add": [],
            "optimized_summary": ""
        }
class SalaryRequest(BaseModel):
    resume_text: str

@app.post("/salary-predictor")
async def salary_predictor(data: SalaryRequest):
    try:
        result = predict_salary(data.resume_text)

        return {
            "salary_prediction": result,
        }

    except Exception as e:
        print("Salary Predictor Error:", e)

        return {
            "salary_prediction": "Unable to generate salary prediction."
        }
from app.crud import get_history


@app.get("/history")
def history(db: Session = Depends(get_db)):
    records = get_history(db)

    return [
        {
            "id": r.id,
            "candidate_name": r.candidate_name,
            "filename": r.filename,
            "ats_score": r.ats_score,
            "summary": r.summary,
            "created_at": r.created_at,
        }
        for r in records
    ]
class ReportRequest(BaseModel):
    data: dict

@app.post("/download-report")
async def download_report(request: ReportRequest):
    filename = "ResumeIQ_Report.pdf"

    create_report(
        filename,
        request.data,
    )

    return FileResponse(
        path=filename,
        filename="ResumeIQ_Report.pdf",
        media_type="application/pdf",
    )
@app.post("/signup")
def signup(
    user: UserCreate,
    db: Session = Depends(get_db),
):
    created = create_user(db, user)

    if not created:
        raise HTTPException(
            status_code=400,
            detail="Email already registered.",
        )

    return {
        "message": "User created successfully."
    }
@app.post("/login")
def login(
    user: UserLogin,
    db: Session = Depends(get_db),
):
    db_user = authenticate_user(
        db,
        user.email,
        user.password,
    )

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password.",
        )

    token = create_access_token(
        {
            "sub": db_user.email,
        }
    )

    return {
        "access_token": token,
        "token_type": "bearer",
        "username": db_user.username,
    }
@app.delete("/history/{resume_id}")
def delete_history(
    resume_id: int,
    db: Session = Depends(get_db),
):
    delete_resume(db, resume_id)

    return {
        "success": True
    }


@app.get("/history/{resume_id}")
def history_details(
    resume_id: int,
    db: Session = Depends(get_db),
):
    record = get_resume_by_id(db, resume_id)

    if not record:
        raise HTTPException(
            status_code=404,
            detail="Resume not found",
        )

    return {
        "id": record.id,
        "filename": record.filename,
        "candidate_name": record.candidate_name,
        "ats_score": record.ats_score,
        "summary": record.summary,
        "resume_data": json.loads(record.resume_data or "{}"),
        "ats_data": json.loads(record.ats_data or "{}"),
        "ai_analysis": json.loads(record.ai_analysis or "{}"),
        "job_match": json.loads(record.job_match or "{}"),
        "created_at": record.created_at,
    }