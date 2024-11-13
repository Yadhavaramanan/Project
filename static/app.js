let socket = io.connect(window.location.origin);

function startRecording() {
    document.getElementById("recording-indicator").textContent = "Recording...";
    document.getElementById("output").textContent = "";
    
    // Emit event to start recording on the server
    socket.emit('start_recording');
    
    // Listen for transcription result
    socket.on('transcription', (text) => {
        document.getElementById("recording-indicator").textContent = "";
        document.getElementById("output").textContent = text;
    });
}

function translateText() {
    const text = document.getElementById("output").textContent;
    const lang = document.getElementById("languageSelect").value;

    if (!text) {
        alert("No text to translate. Please record your speech first.");
        return;
    }

    fetch('/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ text: text, language: lang })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("translatedText").textContent = data.translated_text || "Translation failed.";
    })
    .catch(error => {
        document.getElementById("translatedText").textContent = "Error: " + error.message;
    });
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
}
