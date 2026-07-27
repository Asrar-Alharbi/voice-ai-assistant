const micBtn = document.getElementById("micBtn");
const micIcon = document.getElementById("micIcon");
const chatLog = document.getElementById("chatLog");
const statusText = document.getElementById("statusText");

// ضع مفتاح Gemini هنا
const GEMINI_API_KEY = "YOUR_GEMINI_API_KEY";

const LANG = "ar-SA";
let isListening = false;

// إعداد التعرف على الصوت
const SpeechRecognitionAPI =
  window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognitionAPI) {
  statusText.textContent =
    "متصفحك لا يدعم التعرف على الصوت. استخدم Chrome أو Edge.";
  micBtn.disabled = true;
} else {
  const recognition = new SpeechRecognitionAPI();
  recognition.lang = LANG;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  micBtn.addEventListener("click", () => {
    if (isListening) {
      recognition.stop();
    } else {
      recognition.start();
    }
  });

  recognition.onstart = () => {
    isListening = true;
    micBtn.classList.add("listening");
    micIcon.textContent = "⏹️";
    statusText.textContent = "أستمع الآن...";
  };

  recognition.onend = () => {
    isListening = false;
    micBtn.classList.remove("listening");
    micIcon.textContent = "🎤";
    statusText.textContent =
      "اضغط على الميكروفون للتحدث";
  };

  recognition.onerror = (event) => {
    console.error(event);
    statusText.textContent = "حدث خطأ في الميكروفون.";
  };

  recognition.onresult = async (event) => {
    const userText = event.results[0][0].transcript.trim();

    if (!userText) return;

    console.log("النص المسموع:", userText);

    addMessage("user", userText);

    const thinking = addMessage("bot", "يفكر...");

    try {
      const reply = await askGemini(userText);

      thinking.remove();

      addMessage("bot", reply);

      speak(reply);

    } catch (err) {
      console.error(err);

      thinking.remove();

      addMessage("bot", "حدث خطأ أثناء الاتصال بـ Gemini.");
    }
  };
}

// الاتصال بـ Gemini
async function askGemini(prompt) {

  const url =
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${GEMINI_API_KEY}`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({

      systemInstruction: {
        parts: [
          {
            text: `أنت مساعد صوتي ذكي.

أجب دائماً باللغة العربية.

إذا كانت الرسالة تحية فرد بتحية قصيرة فقط.

إذا طلب المستخدم شرحاً فاشرح بطريقة واضحة ومنظمة.

إذا طلب قصة فاكتب قصة عربية قصيرة.

لا تستخدم الإنجليزية إلا إذا طلبها المستخدم.

لا تستخدم أي تنسيق Markdown.

أعط الإجابة النهائية فقط دون مقدمات طويلة.`
          }
        ]
      },

      contents: [
        {
          parts: [
            {
              text: prompt
            }
          ]
        }
      ],

      generationConfig: {
        temperature: 0.4,
        topP: 0.9,
        topK: 40,
        maxOutputTokens: 500
      }

    })
  });

  const data = await res.json();

  console.log(data);

  if (data.error) {
    throw new Error(data.error.message);
  }

  let reply =
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "عذراً، لم أتمكن من توليد رد.";

  // إزالة تنسيقات Markdown
  reply = reply
    .replace(/\*\*/g, "")
    .replace(/\*/g, "")
    .replace(/`/g, "")
    .replace(/#/g, "")
    .trim();

  return reply;
}

// نطق الرد
function speak(text) {
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = LANG;
  utterance.rate = 1;
  utterance.pitch = 1;

  window.speechSynthesis.speak(utterance);
}

// إضافة رسالة للمحادثة
function addMessage(role, text) {

  const el = document.createElement("div");
  el.className = `message ${role}`;

  const p = document.createElement("p");
  p.textContent = text;

  el.appendChild(p);

  chatLog.appendChild(el);

  chatLog.scrollTop = chatLog.scrollHeight;

  return el;
}