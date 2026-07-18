import os
import json
import time

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def match_resume_to_job(resume_text: str, job_description: str):
    prompt = f"""
You are a senior ATS recruiter.

Compare the following Resume with the Job Description.

Return ONLY valid JSON.

DO NOT use markdown.
DO NOT wrap the JSON inside ```.

Return exactly this format:

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

    for attempt in range(3):
        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt,
            )

            text = response.text.strip()

            # Remove markdown fences if Gemini adds them
            if text.startswith("```json"):
                text = text.replace("```json", "", 1)

            if text.startswith("```"):
                text = text.replace("```", "", 1)

            if text.endswith("```"):
                text = text[:-3]

            text = text.strip()

            return json.loads(text)

        except Exception as e:
            print(f"Job Match Attempt {attempt+1}: {e}")

            if attempt < 2:
                time.sleep(2)
            else:
                return {
                    "match_score": 0,
                    "matching_skills": [],
                    "missing_skills": [],
                    "recommendations": [],
                }