from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet


def create_report(filename, data):
    styles = getSampleStyleSheet()

    pdf = SimpleDocTemplate(filename)

    story = []

    story.append(Paragraph("<b>ResumeIQ AI Report</b>", styles["Title"]))

    story.append(Paragraph("<br/>", styles["Normal"]))

    story.append(
        Paragraph(
            f"<b>Candidate:</b> {data['resume'].get('name','Unknown')}",
            styles["BodyText"],
        )
    )

    story.append(
        Paragraph(
            f"<b>ATS Score:</b> {data['ats'].get('score',0)}",
            styles["BodyText"],
        )
    )

    story.append(Paragraph("<br/>", styles["Normal"]))

    summary = ""

    if isinstance(data["ai_analysis"], dict):
        summary = data["ai_analysis"].get("summary", "")

    story.append(
        Paragraph(
            f"<b>AI Summary:</b><br/>{summary}",
            styles["BodyText"],
        )
    )

    pdf.build(story)

    return filename