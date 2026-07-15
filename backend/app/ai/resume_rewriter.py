import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def rewrite_resume(resume_text: str):
    prompt = f"""
You are an expert technical recruiter.

Rewrite the following resume professionally.

Requirements:

- Better grammar
- ATS optimized
- Strong action verbs
- Better formatting
- Modern resume writing style
- Keep factual information unchanged
- Return the rewritten resume in Markdown

Resume:

{resume_text}
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return response.text