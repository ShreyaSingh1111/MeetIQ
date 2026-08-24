from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
from pathlib import Path
from dotenv import load_dotenv

from backend.services.transcription import transcribe_audio
from backend.services.summarization import summarize_transcript

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = Path("backend/uploads")
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)


@app.get("/")
def home():
    return {
        "message": "MeetIQ backend is running!"
    }


@app.post("/upload")
async def upload_audio(file: UploadFile = File(...)):

    file_path = UPLOAD_DIR / file.filename

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    return {
        "message": "Audio uploaded successfully",
        "filename": file.filename
    }


@app.post("/transcribe")
async def transcribe(file: UploadFile = File(...)):

    file_path = UPLOAD_DIR / file.filename

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    transcription = transcribe_audio(file_path)

    return {
        "filename": file.filename,
        "transcript": transcription.text
    }


@app.post("/summarize")
async def summarize(transcript: str):

    result = summarize_transcript(transcript)

    return result


@app.post("/meeting")
async def process_meeting(file: UploadFile = File(...)):

    # Save uploaded audio
    file_path = UPLOAD_DIR / file.filename

    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())

    # Transcribe audio
    transcription = transcribe_audio(file_path)

    transcript_text = transcription.text

    # Generate AI meeting intelligence
    result = summarize_transcript(transcript_text)

    # Return complete result to frontend
    return {
        "filename": file.filename,
        "transcript": transcript_text,

        "summary": result.get(
            "executive_summary",
            "No summary available."
        ),

        "executive_summary": result.get(
            "executive_summary",
            "No summary available."
        ),

        "key_decisions": result.get(
            "key_decisions",
            []
        ),

        "action_items": result.get(
            "action_items",
            []
        ),

        "open_questions": result.get(
            "open_questions",
            []
        ),

        "topics": result.get(
            "topics",
            []
        )
    }