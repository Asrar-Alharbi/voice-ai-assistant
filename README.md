# 🎙️ Voice AI Assistant

A web-based AI voice assistant that allows users to interact using their voice. The application converts speech to text, sends the request to the Google Gemini API, and reads the AI response aloud using text-to-speech.


<img width="250" height="250" alt="لقطة شاشة 2026-07-27 052941" src="https://github.com/user-attachments/assets/e2bbb7ba-8f11-4469-a3b6-079f7aa7d816" />


---

# 📽️ Demo

Video Demonstration:

https://drive.google.com/file/d/1xq15lxaSDfzajfaUWVdFyURhiLzCLhIc/view?usp=drive_link
---

# ✨ Features

- 🎤 Voice-to-text using Web Speech API.
- 🤖 AI-generated responses using Google Gemini API.
- 🔊 Text-to-speech voice output.
- 💬 Interactive chat interface.
- 📱 Responsive and modern user interface.

---

# 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- Web Speech API
- Speech Synthesis API
- Google Gemini API

---

# 🚀 Deployment Steps

The project was deployed using **InfinityFree**.

Steps followed:

1. Created an InfinityFree hosting account.
2. Opened the File Manager.
3. Uploaded all project files (`index.html`, `style.css`, and `app.js`).
4. Verified that the homepage loaded correctly.
5. Tested the voice assistant directly from the hosted website.

---

# ⚠️ Challenges & Solutions

### Problem 1: Gemini API Quota Error (429)

**Issue**

The application returned:

```
429 RESOURCE_EXHAUSTED
```

**Solution**

- Created a new API key from Google AI Studio.
- Verified the available Gemini models.
- Updated the application to use a supported model.

---

### Problem 2: JavaScript Syntax Error

**Issue**

The browser displayed:

```
Unexpected identifier
```

because a Markdown code block was accidentally written inside a JavaScript template string.

**Solution**

The template string was corrected by removing the invalid characters and rewriting the system prompt correctly.

---

### Problem 3: GitHub Secret Scanning

**Issue**

GitHub detected the Gemini API key inside `app.js`.

**Solution**

The API key was removed before uploading the project and replaced with:

```javascript
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";
```

This prevents exposing sensitive credentials.


---

# ▶️ How to Run

1. Clone the repository.
2. Open the project folder.
3. Add your Gemini API key inside `app.js`.
4. Open `index.html` using a modern browser such as Google Chrome or Microsoft Edge.
5. Allow microphone access.
6. Start talking to the assistant.
