# 🎯 MeetIQ — AI Meeting Intelligence Platform

> **Turn meeting conversations into actionable intelligence.**

MeetIQ is an AI-powered meeting intelligence platform that transforms meeting audio into structured, actionable insights.

Simply upload a meeting recording and MeetIQ automatically processes the audio, generates a transcript, and extracts important information such as the executive summary, key decisions, action items, open questions, and discussion topics.

---

## ✨ Features

- 🎤 **Meeting Audio Upload**
  - Supports MP3, WAV, M4A and MP4 files.

- 📝 **Automatic Transcription**
  - Converts meeting audio into text using AI-powered speech recognition.

- 🤖 **AI Executive Summary**
  - Generates a concise overview of the meeting.

- 🎯 **Key Decision Detection**
  - Identifies important decisions discussed during the meeting.

- ✅ **Action Item Extraction**
  - Detects tasks along with owners and deadlines when available.

- ❓ **Open Question Detection**
  - Identifies questions that still require answers.

- 🏷️ **Topic Extraction**
  - Automatically identifies the main subjects discussed.

- 📋 **Copy Summary**
  - Quickly copy the generated meeting summary.

- 📝 **Copy Transcript**
  - Copy the complete meeting transcript.

- 📥 **Download Meeting Report**
  - Download the generated meeting intelligence as a text report.

- 🔄 **Analyze Another Meeting**
  - Easily reset the interface and process another recording.

---

## 📸 Screenshots

### 🏠 Main Dashboard

![MeetIQ Dashboard](Screenshots/Meet_1.png)

### 🧠 Meeting Analysis



### 📊 Meeting Intelligence
![MeetIQ Analysis](Screenshots/meet_2.png)
![MeetIQ Intelligence](Screenshots/meet_3.png)

### 📝 Transcript & Insights

![MeetIQ Transcript](Screenshots/meet_4.png)
---

## 🏗️ How MeetIQ Works

```text
                    🎤 Meeting Audio
                           │
                           ▼
                    📤 Audio Upload
                           │
                           ▼
                  ⚙️ Audio Processing
                           │
                           ▼
                📝 AI Transcription
                           │
                           ▼
                    📄 Transcript
                           │
                           ▼
                  🤖 AI Analysis
                           │
          ┌────────────────┼────────────────┐
          ▼                ▼                ▼
     📌 Summary       🎯 Decisions     ✅ Actions
          │                │                │
          └────────────────┼────────────────┘
                           │
                  ┌────────┴────────┐
                  ▼                 ▼
             ❓ Questions       🏷️ Topics
```

---

## 🛠️ Tech Stack

### Frontend

- HTML5
- CSS3
- JavaScript
- Responsive UIMeet_1

### Backend

- Python
- FastAPI
- Uvicorn
- REST API

### AI / Machine Learning

- Groq API
- Whisper-based speech transcription
- LLM-based meeting analysis

---

## 📁 Project Structure

```text
MeetIQ/
│
├── backend/
│   ├── services/
│   │   ├── transcription.py
│   │   └── summarization.py
│   │
│   ├── uploads/
│   └── main.py
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── Screenshots/
│   ├── Meet_1.png
│   ├── meet_2.png
│   ├── meet_3.png
│   └── meet_4.png
│
├── ├── .gitignore
├── check_models.py
└── README.md
```

---

## 🔄 Application Workflow

### 1. Upload Meeting

The user selects a meeting audio/video file from the frontend.

### 2. Audio Processing

The backend receives and stores the uploaded file.

### 3. Transcription

The audio is sent for AI-powered speech transcription.

### 4. Meeting Analysis

The generated transcript is analyzed by the LLM.

### 5. Structured Insights

MeetIQ extracts:

```text
📌 Executive Summary
🎯 Key Decisions
✅ Action Items
❓ Open Questions
🏷️ Topics
📝 Full Transcript
```

### 6. Results Dashboard

The frontend displays the generated meeting intelligence in an easy-to-read dashboard.

---

## 🚀 Getting Started

### Prerequisites

Make sure you have:

- Python 3.x
- Git
- A Groq API key

---

### 1. Clone the Repository

```bash
git clone <your-github-repository-url>
```

```bash
cd MeetIQ
```

---

### 2. Create Virtual Environment

```bash
python -m venv venv
```

Activate it on Windows:

```powershell
venv\Scripts\activate
```

---

### 3. Install Dependencies

Install the required Python packages:

```bash
pip install fastapi uvicorn python-dotenv python-multipart groq
```

---

### 4. Configure Environment Variables

Create a `.env` file in the project root:

```text
GROQ_API_KEY=your_groq_api_key_here
```

> ⚠️ Never upload your `.env` file or API key to GitHub.

---

### 5. Start the Backend

From the project root:

```bash
uvicorn backend.main:app --reload
```

The backend will run at:

```text
http://127.0.0.1:8000
```

API documentation is available at:

```text
http://127.0.0.1:8000/docs
```

---

### 6. Start the Frontend

Open another terminal:

```bash
cd frontend
```

Then:

```bash
python -m http.server 5500
```

Open the application:

```text
http://127.0.0.1:5500
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | Check backend status |
| POST | `/upload` | Upload meeting audio |
| POST | `/transcribe` | Transcribe meeting audio |
| POST | `/summarize` | Generate meeting analysis |
| POST | `/meeting` | Complete meeting processing pipeline |

### Main Endpoint

```text
POST /meeting
```

The `/meeting` endpoint performs the complete workflow:

```text
Audio
  ↓
Transcription
  ↓
Transcript
  ↓
AI Analysis
  ↓
Structured Meeting Intelligence
```

---

## 📊 Example Output

MeetIQ produces structured meeting intelligence such as:

```text
Executive Summary
────────────────────────────────
The meeting discussed the audit and
data analytics profile, eligibility
criteria and the online assessment
process.


Key Decisions
────────────────────────────────
No key decisions detected.


Action Items
────────────────────────────────
No action items detected.


Open Questions
────────────────────────────────
No open questions detected.


Topics
────────────────────────────────
• Audit and data analytics profile
• Eligibility criteria
• Profile awareness session
• Online assessment


Full Transcript
────────────────────────────────
Complete AI-generated transcription
of the meeting...
```

---

## 🔐 Security

The project uses environment variables for API credentials.

The following files should **not** be committed:

```text
.env
venv/
__pycache__/
*.pyc
```

Make sure your `.gitignore` contains:

```gitignore
.env
venv/
__pycache__/
*.pyc
```

---

## 🎯 Future Improvements

Possible future enhancements include:

- 🎧 Built-in audio playback
- 👥 Speaker identification
- ⏱️ Meeting duration and timestamps
- 📄 PDF report generation
- 📧 Email meeting summaries
- 🔍 Search within transcripts
- 🌐 Multi-language transcription
- 📈 Meeting analytics dashboard
- ☁️ Cloud deployment

---

## 💡 Why MeetIQ?

Meetings often contain valuable information that is difficult to track manually.

MeetIQ reduces this effort by converting unstructured meeting conversations into organized information that users can quickly understand and act upon.

```text
Listen less.
Understand more.
Act faster.
```

---

## 👩‍💻 Author

**Shreya Singh**

MCA Student | AI & Software Development

---

## ⭐ Project

**MeetIQ — AI Meeting Intelligence Platform**

Built with **FastAPI + JavaScript + AI-powered transcription and analysis**.
