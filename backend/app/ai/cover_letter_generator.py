import os
import time

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_cover_letter(resume, job_description):
    prompt = f"""
You are an expert recruiter.

Write a professional cover letter.

Resume:

{resume}

Job Description:

{job_description}

Requirements:
- Professional
- Around 350 words
- No markdown
- Ready to send
"""

    for attempt in range(3):
        try:
            response = client.models.generate_content(
                model="gemini-2.5-flash",
                contents=prompt,
            )

            return response.text.strip()

        except Exception as e:
            print(f"Cover Letter Attempt {attempt+1}: {e}")

            if attempt < 2:
                time.sleep(2)
            else:
                raise e