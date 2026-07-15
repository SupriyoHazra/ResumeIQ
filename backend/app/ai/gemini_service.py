import os
import json

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def analyze_resume(resume_text: str):
    prompt = f"""
You are an expert ATS recruiter.

Analyze this resume.

Return ONLY valid JSON.

Do NOT return markdown.
Do NOT use ```.

Return EXACTLY this structure:

{{
  "summary":"",
  "strengths":[
    "",
    "",
    ""
  ],
  "weaknesses":[
    "",
    "",
    ""
  ],
  "missing_skills":[
    "",
    "",
    ""
  ],
  "ats_tips":[
    "",
    "",
    ""
  ],
  "grammar":[
    "",
    "",
    ""
  ],
  "project_suggestions":[
    "",
    "",
    ""
  ],
  "recruiter_feedback":"",
  "overall_rating":8
}}

Resume:

{resume_text}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    text = response.text.strip()

    print("\n========== GEMINI RESPONSE ==========\n")
    print(text)
    print("\n=====================================\n")

    if text.startswith("```json"):
        text = text.replace("```json", "", 1)

    if text.startswith("```"):
        text = text.replace("```", "", 1)

    if text.endswith("```"):
        text = text[:-3]

    text = text.strip()

    try:
        return json.loads(text)

    except Exception as e:
        print("JSON ERROR:", e)

        return {
            "summary": "Unable to parse AI response.",
            "strengths": [],
            "weaknesses": [],
            "missing_skills": [],
            "ats_tips": [],
            "grammar": [],
            "project_suggestions": [],
            "recruiter_feedback": "",
            "overall_rating": 0,
        }