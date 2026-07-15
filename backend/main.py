from pathlib import Path
import shutil

from fastapi import FastAPI, File, Form, HTTPException, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.parsers.pdf_parser import extract_text_from_pdf
from app.services.resume_parser import parse_resume
from app.services.ats_service import calculate_ats_score

from app.ai.gemini_service import analyze_resume
from app.ai.job_matcher import match_resume_to_job
from app.ai.resume_rewriter import rewrite_resume

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
    job_description: str = Form("")
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
        # Extract Resume Text
        extracted_text = extract_text_from_pdf(str(file_path))

        # Parse Resume
        resume_data = parse_resume(extracted_text)

        # ATS Score
        ats_data = calculate_ats_score(
            resume_data,
            extracted_text,
        )

        # AI Resume Analysis
        ai_analysis = analyze_resume(extracted_text)

        # DEBUG
        print("=" * 60)
        print("TYPE:", type(ai_analysis))
        print("DATA:", ai_analysis)
        print("=" * 60)

        # Job Match (Optional)
        if job_description.strip():
            job_match = match_resume_to_job(
                extracted_text,
                job_description,
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
    }


class RewriteRequest(BaseModel):
    resume_text: str


@app.post("/rewrite")
async def rewrite(data: RewriteRequest):
    rewritten = rewrite_resume(data.resume_text)

    return {
        "rewritten_resume": rewritten,
    }