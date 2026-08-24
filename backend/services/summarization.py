from groq import Groq
from dotenv import load_dotenv
import os
import json

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))


def summarize_transcript(transcript: str):

    prompt = f"""
You are MeetIQ, an AI Meeting Intelligence Assistant.

Analyze the meeting transcript below.

Your job is to extract useful and factual meeting intelligence.
DO NOT invent names, deadlines, decisions, or tasks.

Return ONLY valid JSON in exactly this structure:

{{
    "executive_summary": "A concise summary of the meeting.",
    "key_decisions": [
        "Decision 1",
        "Decision 2"
    ],
    "action_items": [
        {{
            "task": "Task that needs to be completed",
            "owner": "Person responsible, or 'Not specified'",
            "deadline": "Deadline, or 'Not specified'"
        }}
    ],
    "open_questions": [
        "Question that remains unresolved"
    ],
    "topics": [
        "Important topic discussed"
    ]
}}

Rules:
- Keep the executive summary concise.
- Extract only decisions actually discussed.
- Extract only real action items.
- If an owner is not mentioned, use "Not specified".
- If a deadline is not mentioned, use "Not specified".
- If there are no decisions, return an empty list.
- If there are no action items, return an empty list.
- If there are no open questions, return an empty list.
- If there are no clear topics, return an empty list.
- Return JSON only. No markdown. No explanation.

MEETING TRANSCRIPT:
{transcript}
"""

    response = client.chat.completions.create(
        model="openai/gpt-oss-20b",
        messages=[
            {
                "role": "system",
                "content": "You are a precise meeting intelligence analyst. Always return valid JSON."
            },
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.1
    )

    result = response.choices[0].message.content

    try:
        return json.loads(result)
    except json.JSONDecodeError:
        return {
            "executive_summary": result,
            "key_decisions": [],
            "action_items": [],
            "open_questions": [],
            "topics": []
        }