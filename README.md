# AICHAT UI — AI Chat Interface

A clean, job-ready AI chat interface built with **React 18 + Vite**. Features streaming responses, markdown rendering, typing indicators, and a polished warm minimal design.

---

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Start dev server
npm run dev

# 3. Open in browser → http://localhost:5173
```

---

## 🔌 Connect Real OpenAI API

By default the app uses **simulated responses** so it works without any API key.

To go live with real GPT responses:

**Step 1** — Create a `.env` file in the project root:
```
VITE_OPENAI_KEY=sk-your-key-here
```

**Step 2** — Open `src/hooks/useChat.js` and replace the `simulateStream` call with:

```js
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${import.meta.env.VITE_OPENAI_KEY}`,
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: messages
      .filter(m => m.content)
      .map(m => ({ role: m.role, content: m.content })),
  }),
})
const data = await response.json()
const text = data.choices[0].message.content
```

---

## ✨ Features

- 💬 **Chat UI** — clean message bubbles with user/AI avatars
- ⌨️  **Streaming effect** — word-by-word typewriter response animation
- 🔵 **Typing indicator** — animated dots while AI is "thinking"
- 📝 **Markdown rendering** — bold, inline code, code blocks, lists
- 💡 **Suggested prompts** — sidebar quick-start prompts
- ↩️  **Enter to send** — Shift+Enter for newlines
- 🗑️  **Clear chat** — reset conversation anytime
- 📱 **Responsive** — sidebar hides on mobile

---

## 🗂 Project Structure

```
aichat/
├── index.html
├── vite.config.js
├── package.json
├── README.md
└── src/
    ├── main.jsx
    ├── App.jsx / App.css
    ├── hooks/
    │   └── useChat.js          ← all chat logic + API call
    ├── styles/
    │   └── global.css          ← CSS variables, reset
    └── components/
        ├── Sidebar.jsx/.css    ← logo, new chat, suggestions
        ├── Header.jsx/.css     ← status, message count, clear
        ├── ChatWindow.jsx/.css ← messages list, auto-scroll
        ├── Message.jsx/.css    ← bubble + markdown renderer
        └── ChatInput.jsx/.css  ← textarea + send button
```

---

## 🎨 Customising the Design

All colors are CSS variables in `src/styles/global.css`:

```css
:root {
  --accent:   #e87c3a;   /* orange — buttons, highlights */
  --ink:      #1a1814;   /* dark — text, user bubble */
  --bg:       #f7f5f2;   /* warm off-white — background */
  --bg-panel: #ffffff;   /* white — chat pane */
}
```

---

## 🛠 Tech Stack

| Layer     | Tech                        |
|-----------|-----------------------------|
| Framework | React 18                    |
| Bundler   | Vite 5                      |
| Styling   | Plain CSS + CSS Variables   |
| Fonts     | DM Sans + DM Mono           |
| API       | OpenAI Chat Completions API |

---

## 💼 Interview Talking Points

- **Custom hook** (`useChat`) separates all logic from UI
- **Streaming simulation** using async/await + closure state updates
- **Minimal markdown parser** built from scratch (no libraries)
- **Auto-resizing textarea** with DOM ref + effect
- **IntersectionObserver-free** — scroll handled via ref + effect
- **Component composition** — each file has one clear responsibility
