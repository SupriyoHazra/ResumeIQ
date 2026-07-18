import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_interview_questions(resume, job_description):
    prompt = f"""
You are a Senior Technical Interviewer.

Using the resume and job description below, generate interview preparation.

Return Markdown.

# HR Questions
- Question
- Ideal Answer

# Technical Questions
- Question
- Ideal Answer

# Project Questions
- Question
- Ideal Answer

# Coding Questions
- Question
- Ideal Answer

# AI/ML Questions
- Question
- Ideal Answer

Resume:

{resume}

Job Description:

{job_description}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return response.text