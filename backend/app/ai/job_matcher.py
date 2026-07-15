import os
import json

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def match_resume_to_job(resume_text: str, job_description: str):
    prompt = f"""
You are an expert ATS recruiter.

Compare the following resume with the given Job Description.

Return ONLY valid JSON.

Format:

{{
    "match_score": 0,
    "matching_skills": [],
    "missing_skills": [],
    "recommendations": []
}}

Resume:

{resume_text}

Job Description:

{job_description}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    try:
        return json.loads(response.text)

    except Exception:
        return {
            "match_score": 0,
            "matching_skills": [],
            "missing_skills": [],
            "recommendations": [],
        }