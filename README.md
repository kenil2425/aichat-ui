# 🤖 AICHAT — AI Chat Interface

A clean, job-ready AI chat interface built with **React 18 + Vite**, powered by **Groq API (Llama 3)**. Features real AI responses, word-by-word streaming, markdown rendering, and a polished warm minimal UI — built without any UI libraries.

---

## 🚀 Live Demo

👉 **[View Live Demo](#)** ← *(Replace with your Vercel/Netlify link)*

---

## ✨ Features

- 💬 **Real AI Responses** — powered by Groq API with Llama 3.3 70B model
- ⌨️ **Streaming Effect** — word-by-word typewriter animation for responses
- 🔵 **Typing Indicator** — animated dots while AI is thinking
- 📝 **Markdown Rendering** — supports bold, inline code, code blocks, and lists
- 💡 **Suggested Prompts** — sidebar quick-start prompts for users
- 🗑️ **Clear Chat** — reset conversation anytime
- 📱 **Fully Responsive** — works on mobile, tablet, and desktop
- ↩️ **Keyboard Shortcuts** — Enter to send, Shift+Enter for new line
- 🔒 **Secure API Key** — stored in .env, never exposed to GitHub

---

## 🛠️ Tech Stack

| Layer     | Technology                    |
|-----------|-------------------------------|
| Framework | React 18                      |
| Bundler   | Vite 5                        |
| Styling   | Plain CSS + CSS Variables     |
| Fonts     | DM Sans + DM Mono             |
| AI Model  | Llama 3.3 70B (via Groq)      |
| API       | Groq Chat Completions API     |

---

## 📁 Project Structure

```
aichat/
├── index.html
├── vite.config.js
├── package.json
├── .env                          ← your secret API key (never commit this)
├── .gitignore
└── src/
    ├── main.jsx                  ← entry point
    ├── App.jsx / App.css         ← root layout
    ├── hooks/
    │   └── useChat.js            ← all chat logic + API calls
    ├── styles/
    │   └── global.css            ← CSS variables, reset, base styles
    └── components/
        ├── Sidebar.jsx/.css      ← logo, new chat, suggested prompts
        ├── Header.jsx/.css       ← status indicator, message count, clear
        ├── ChatWindow.jsx/.css   ← messages list + auto-scroll
        ├── Message.jsx/.css      ← chat bubble + markdown renderer
        └── ChatInput.jsx/.css    ← textarea + send button
```

---

## ⚙️ Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/aichat.git
cd aichat
```

### 2. Install dependencies
```bash
npm install
```

### 3. Get a FREE Groq API key
- Go to 👉 https://console.groq.com
- Sign up with Google
- Click **API Keys** → **Create API Key**
- Copy the key (starts with `gsk_...`)

### 4. Create a `.env` file
In the root `aichat/` folder, create a file named `.env`:
```
VITE_GROQ_KEY=gsk_your_api_key_here
```

### 5. Start the development server
```bash
npm run dev
```

### 6. Open in browser
```
http://localhost:5173
```

---

## 🏗️ Build for Production

```bash
npm run build
npm run preview
```

Deploy the `/dist` folder to **Vercel**, **Netlify**, or **GitHub Pages**.

---

## 🔑 Environment Variables

| Variable        | Description                                   |
|-----------------|-----------------------------------------------|
| `VITE_GROQ_KEY` | Your Groq API key from console.groq.com       |

> ⚠️ Never commit your `.env` file to GitHub. Add it to `.gitignore`.

---

## 🧠 How It Works

### Custom Hook — useChat.js
All chat logic lives in a single custom React hook:
- Manages messages, input, loading, and streaming state
- Sends full conversation history to the API for context memory
- Streams the AI reply word-by-word using a setTimeout loop

### Streaming Effect
```js
async function streamWords(text, onChunk) {
  const words = text.split(' ')
  for (let i = 0; i < words.length; i++) {
    await new Promise(r => setTimeout(r, 35 + Math.random() * 35))
    onChunk(words[i] + ' ')
  }
}
```

### API Call (Groq)
```js
const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_GROQ_KEY}`,
  },
  body: JSON.stringify({
    model: 'llama-3.3-70b-versatile',
    messages: conversationHistory,
  }),
})
```

---

## 🎨 Customization

All colors are CSS variables in `src/styles/global.css`:

```css
:root {
  --accent:    #e87c3a;   /* orange — buttons and highlights  */
  --ink:       #1a1814;   /* dark ink — text and user bubble  */
  --bg:        #f7f5f2;   /* warm off-white — background      */
  --bg-panel:  #ffffff;   /* white — chat pane                */
}
```

---

## 📈 Future Improvements

- [ ] Real token-by-token streaming using Groq streaming API
- [ ] Save chat history in localStorage
- [ ] Multiple conversations like ChatGPT sidebar
- [ ] Copy button on code blocks
- [ ] Dark mode toggle
- [ ] Unit tests with React Testing Library

---

## 👨‍💻 Author

**Kenil Daslaniya** — Frontend Developer | React.js | JavaScript

- 📧 Kenil18042002@gmail.com
- 📍 Nashik, Maharashtra
- 💼 LinkedIn: linkedin.com/in/kenil-daslaniya-44b876324
- 🐙 GitHub: github.com/kenil2425

---

## 📄 License

This project is open source and available under the MIT License.

---

⭐ If you found this helpful, please give it a star on GitHub!
