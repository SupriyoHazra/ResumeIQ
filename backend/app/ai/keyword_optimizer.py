import os
import json

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def optimize_keywords(resume_text, job_description):
    prompt = f"""
You are an ATS optimization expert.

Compare the resume and the job description.

Return ONLY valid JSON.

Format:

{{
    "missing_keywords": [],
    "important_keywords": [],
    "where_to_add": [],
    "optimized_summary": ""
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

    text = response.text.strip()

    if text.startswith("```json"):
        text = text.replace("```json", "", 1)

    if text.startswith("```"):
        text = text.replace("```", "", 1)

    if text.endswith("```"):
        text = text[:-3]

    return json.loads(text)