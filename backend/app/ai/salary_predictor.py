import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def predict_salary(resume_text):
    prompt = f"""
You are an experienced technical recruiter.

Analyze this resume.

Return ONLY valid Markdown.

Include:

# Estimated Experience Level

# Suggested Job Roles

# Expected Salary Range (Entry, Average, Best Case)

# Suitable Industries

# Hiring Readiness

# Career Advice

Resume:

{resume_text}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return response.text