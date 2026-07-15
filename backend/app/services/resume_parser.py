import re

SKILLS = {
    "Python",
    "Java",
    "C",
    "C++",
    "JavaScript",
    "TypeScript",
    "React",
    "Next.js",
    "Node.js",
    "FastAPI",
    "Flask",
    "Django",
    "TensorFlow",
    "PyTorch",
    "Scikit-learn",
    "Pandas",
    "NumPy",
    "SQL",
    "MongoDB",
    "Git",
    "GitHub",
    "Docker",
    "AWS",
    "HTML",
    "CSS",
}


def parse_resume(text: str):
    email = ""
    phone = ""

    email_match = re.search(
        r"[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}",
        text,
    )

    if email_match:
        email = email_match.group()

    phone_match = re.search(
        r"(\+?\d[\d\s-]{8,}\d)",
        text,
    )

    if phone_match:
        phone = phone_match.group()

    lines = [
        line.strip()
        for line in text.splitlines()
        if line.strip()
    ]

    name = lines[0] if lines else ""

    found_skills = []

    lower_text = text.lower()

    for skill in SKILLS:
        if skill.lower() in lower_text:
            found_skills.append(skill)

    return {
        "name": name,
        "email": email,
        "phone": phone,
        "skills": sorted(found_skills),
    }