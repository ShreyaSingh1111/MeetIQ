const audioFile = document.getElementById("audioFile");
const analyzeBtn = document.getElementById("analyzeBtn");

const audioPlayer = document.getElementById("audioPlayer");
const audioPlayerContainer =
    document.getElementById("audioPlayerContainer");
// =========================================================
// AUDIO PLAYER
// =========================================================

audioFile.addEventListener("change", () => {

    const file = audioFile.files[0];

    if (!file) {

        audioPlayerContainer.classList.add("hidden");

        audioPlayer.removeAttribute("src");

        return;
    }

    const audioURL =
        URL.createObjectURL(file);

    audioPlayer.src = audioURL;

    audioPlayerContainer.classList.remove("hidden");
});

const status = document.getElementById("status");
const loading = document.getElementById("loading");
const results = document.getElementById("results");

const fileName = document.getElementById("fileName");
const summary = document.getElementById("summary");
const decisions = document.getElementById("decisions");
const actions = document.getElementById("actions");
const questions = document.getElementById("questions");
const topics = document.getElementById("topics");
const transcript = document.getElementById("transcript");


// Statistics
const decisionCount = document.getElementById("decisionCount");
const actionCount = document.getElementById("actionCount");
const questionCount = document.getElementById("questionCount");
const topicCount = document.getElementById("topicCount");
const downloadBtn = document.getElementById("downloadBtn");

// Extra buttons
const copySummaryBtn =
    document.getElementById("copySummaryBtn");

const copyTranscriptBtn =
    document.getElementById("copyTranscriptBtn");

const newMeetingBtn =
    document.getElementById("newMeetingBtn");

const newMeetingBtnBottom =
    document.getElementById("newMeetingBtnBottom");


// =========================================================
// ANALYZE MEETING
// =========================================================

analyzeBtn.addEventListener("click", async () => {

    const file = audioFile.files[0];


// Check whether a file was selected
if (!file) {

    status.textContent =
        "Please choose a meeting audio file first.";

    return;
}


// Check supported file type
const allowedTypes = [
    "audio/mpeg",
    "audio/wav",
    "audio/x-wav",
    "audio/mp4",
    "audio/x-m4a"
];

const fileExtension =
    file.name.split(".").pop().toLowerCase();

const allowedExtensions = [
    "mp3",
    "wav",
    "m4a",
    "mp4"
];

if (!allowedExtensions.includes(fileExtension)) {

    status.textContent =
        "Unsupported file type. Please upload MP3, WAV, M4A or MP4.";

    audioFile.value = "";

    return;
}


// Check file size — maximum 100 MB
const maxSize = 100 * 1024 * 1024;

if (file.size > maxSize) {

    status.textContent =
        "File is too large. Please upload a file smaller than 100 MB.";

    audioFile.value = "";

    return;
}


    // Show loading state
    status.textContent = "";

    loading.classList.remove("hidden");

    results.classList.add("hidden");

    analyzeBtn.disabled = true;

    analyzeBtn.textContent = "Analyzing...";


    try {

        // Prepare audio file
        const formData = new FormData();

        formData.append("file", file);


        // Send audio to FastAPI
        const response = await fetch(
            "http://127.0.0.1:8000/meeting",
            {
                method: "POST",
                body: formData
            }
        );


        // Check for backend error
        if (!response.ok) {

            throw new Error(
                "Meeting processing failed."
            );
        }


        // Convert response to JSON
        const data = await response.json();
        


        // =====================================================
        // FILE NAME
        // =====================================================

        fileName.textContent =
            data.filename || file.name;


        // =====================================================
        // SUMMARY
        // =====================================================

        summary.textContent =
            data.summary ||
            data.executive_summary ||
            "No summary available.";


        // =====================================================
        // DECISIONS
        // =====================================================

        decisions.innerHTML = "";


        if (
            data.key_decisions &&
            data.key_decisions.length > 0
        ) {

            data.key_decisions.forEach(decision => {

                const li =
                    document.createElement("li");

                li.textContent = decision;

                decisions.appendChild(li);

            });

        } else {

            const li =
                document.createElement("li");

            li.textContent =
                "No key decisions detected.";

            decisions.appendChild(li);
        }


        // =====================================================
        // ACTION ITEMS
        // =====================================================

        actions.innerHTML = "";


        if (
            data.action_items &&
            data.action_items.length > 0
        ) {

            data.action_items.forEach(item => {

                const div =
                    document.createElement("div");

                div.className = "action-item";


                const task =
                    document.createElement("div");

                task.className = "action-task";

                task.textContent =
                    item.task ||
                    "Task not specified";


                const owner =
                    document.createElement("div");

                owner.className = "action-meta";

                owner.textContent =
                    "👤 Owner: " +
                    (item.owner || "Not specified");


                const deadline =
                    document.createElement("div");

                deadline.className = "action-meta";

                deadline.textContent =
                    "📅 Deadline: " +
                    (item.deadline || "Not specified");


                div.appendChild(task);

                div.appendChild(owner);

                div.appendChild(deadline);

                actions.appendChild(div);

            });

        } else {

            actions.innerHTML = `
                <div class="action-item">
                    No action items detected.
                </div>
            `;
        }


        // =====================================================
        // OPEN QUESTIONS
        // =====================================================

        questions.innerHTML = "";


        if (
            data.open_questions &&
            data.open_questions.length > 0
        ) {

            data.open_questions.forEach(question => {

                const li =
                    document.createElement("li");

                li.textContent = question;

                questions.appendChild(li);

            });

        } else {

            const li =
                document.createElement("li");

            li.textContent =
                "No open questions detected.";

            questions.appendChild(li);
        }


        // =====================================================
        // TOPICS
        // =====================================================

        topics.innerHTML = "";


        if (
            data.topics &&
            data.topics.length > 0
        ) {

            data.topics.forEach(topic => {

                const span =
                    document.createElement("span");

                span.className = "topic";

                span.textContent = topic;

                topics.appendChild(span);

            });

        } else {

            topics.innerHTML = `
                <span class="topic">
                    No topics detected
                </span>
            `;
        }


        // =====================================================
        // TRANSCRIPT
        // =====================================================

        transcript.textContent =
            data.transcript ||
            "No transcript available.";


        // =====================================================
        // STATISTICS
        // =====================================================

        decisionCount.textContent =
            data.key_decisions
                ? data.key_decisions.length
                : 0;


        actionCount.textContent =
            data.action_items
                ? data.action_items.length
                : 0;


        questionCount.textContent =
            data.open_questions
                ? data.open_questions.length
                : 0;


        topicCount.textContent =
            data.topics
                ? data.topics.length
                : 0;


        // =====================================================
        // HIDE LOADING / SHOW RESULTS
        // =====================================================

        loading.classList.add("hidden");

        results.classList.remove("hidden");


        // Scroll to results
        results.scrollIntoView({
            behavior: "smooth",
            block: "start"
        });


    } catch (error) {

    console.error(error);

    loading.classList.add("hidden");

    results.classList.add("hidden");

    if (error.message === "Failed to fetch") {

        status.textContent =
            "Unable to connect to MeetIQ backend. Please make sure FastAPI is running.";

    } else {

        status.textContent =
            "Meeting analysis failed. Please try again.";

    }

}

    finally {

        analyzeBtn.disabled = false;

        analyzeBtn.textContent =
            "Analyze Meeting";

    }

});


// =========================================================
// COPY SUMMARY
// =========================================================

copySummaryBtn.addEventListener(
    "click",
    async () => {

        const text =
            summary.textContent.trim();


        if (!text) {

            return;
        }


        try {

            await navigator.clipboard.writeText(text);

            const oldText =
                copySummaryBtn.textContent;

            copySummaryBtn.textContent =
                "✅ Summary Copied!";


            setTimeout(() => {

                copySummaryBtn.textContent =
                    oldText;

            }, 2000);

        } catch (error) {

            console.error(error);

            alert(
                "Unable to copy summary."
            );
        }

    }
);


// =========================================================
// COPY TRANSCRIPT
// =========================================================

copyTranscriptBtn.addEventListener(
    "click",
    async () => {

        const text =
            transcript.textContent.trim();


        if (!text) {

            return;
        }


        try {

            await navigator.clipboard.writeText(text);

            const oldText =
                copyTranscriptBtn.textContent;

            copyTranscriptBtn.textContent =
                "✅ Transcript Copied!";


            setTimeout(() => {

                copyTranscriptBtn.textContent =
                    oldText;

            }, 2000);

        } catch (error) {

            console.error(error);

            alert(
                "Unable to copy transcript."
            );
        }

    }
);


// =========================================================
// ANALYZE ANOTHER MEETING
// =========================================================

function resetMeeting() {

    audioFile.value = "";

    status.textContent = "";

    results.classList.add("hidden");

    loading.classList.add("hidden");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


newMeetingBtn.addEventListener(
    "click",
    resetMeeting
);


newMeetingBtnBottom.addEventListener(
    "click",
    resetMeeting
);
downloadBtn.addEventListener("click", () => {

    const report = `
MEETIQ — AI MEETING INTELLIGENCE
================================

Meeting: ${fileName.textContent}

EXECUTIVE SUMMARY
-----------------
${summary.textContent}

KEY DECISIONS
-------------
${decisions.innerText}

ACTION ITEMS
------------
${actions.innerText}

OPEN QUESTIONS
--------------
${questions.innerText}

TOPICS
------
${topics.innerText}

FULL TRANSCRIPT
---------------
${transcript.textContent}
`;

    const blob = new Blob([report], {
        type: "text/plain"
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");

    link.href = url;
    link.download = "MeetIQ-Meeting-Report.txt";

    link.click();

    URL.revokeObjectURL(url);
});