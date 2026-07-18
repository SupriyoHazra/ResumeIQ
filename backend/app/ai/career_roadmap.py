import os

from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)


def generate_career_roadmap(resume_text):
    prompt = f"""
You are a Senior Career Mentor.

Based on this resume create a detailed roadmap.

Resume:

{resume_text}

Return markdown.

Include:

# Career Goal

# Skills To Learn

# Best Projects

# Certifications

# Interview Preparation

# 30 Day Roadmap

# 90 Day Roadmap

# Job Roles

# Salary Growth

# Final Advice
"""

    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=prompt,
    )

    return response.text