def calculate_ats_score(resume, text):
    score = 0
    feedback = []

    keyword_score = 0
    education_score = 0
    experience_score = 0
    project_score = 0
    formatting_score = 0

    # Name
    if resume.get("name"):
        score += 5
    else:
        feedback.append("Add your full name.")

    # Email
    if resume.get("email"):
        score += 5
    else:
        feedback.append("Add an email address.")

    # Phone
    if resume.get("phone"):
        score += 5
    else:
        feedback.append("Add a phone number.")

    # Skills
    skills = resume.get("skills", [])

    if len(skills) >= 10:
        keyword_score = 100
        score += 25
    elif len(skills) >= 7:
        keyword_score = 80
        score += 20
    elif len(skills) >= 5:
        keyword_score = 60
        score += 15
    elif len(skills) >= 3:
        keyword_score = 40
        score += 10
    else:
        keyword_score = 20
        feedback.append("Add more technical skills.")

    lower = text.lower()

    # Education
    education_keywords = [
        "education",
        "college",
        "university",
        "b.tech",
        "btech",
        "degree",
    ]

    if any(word in lower for word in education_keywords):
        education_score = 100
        score += 15
    else:
        education_score = 20
        feedback.append("Education section missing.")

    # Projects
    project_keywords = [
        "project",
        "github",
        "built",
        "developed",
        "created",
    ]

    if any(word in lower for word in project_keywords):
        project_score = 100
        score += 20
    else:
        project_score = 30
        feedback.append("Projects section missing.")

    # Experience
    experience_keywords = [
        "experience",
        "internship",
        "intern",
        "company",
        "worked",
    ]

    if any(word in lower for word in experience_keywords):
        experience_score = 100
        score += 15
    else:
        experience_score = 25
        feedback.append("Experience section missing.")

    words = len(text.split())

    if words >= 350:
        formatting_score = 100
        score += 10
    elif words >= 250:
        formatting_score = 80
        score += 8
    elif words >= 150:
        formatting_score = 60
        score += 6
    else:
        formatting_score = 30
        feedback.append("Resume is too short.")

    return {
        "score": score,
        "feedback": feedback,

        "keyword_score": keyword_score,
        "education_score": education_score,
        "experience_score": experience_score,
        "project_score": project_score,
        "formatting_score": formatting_score,
    }