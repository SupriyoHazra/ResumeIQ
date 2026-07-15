from app.ai.gemini_service import analyze_resume

sample = """
John Doe

Python
Machine Learning
FastAPI
React

Built a Fake News Detection System.

"""

print(analyze_resume(sample))