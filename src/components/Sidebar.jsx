import './Sidebar.css'

const SUGGESTED = [
  'Explain React hooks simply',
  'Write a CSS animation example',
  'What is async/await in JS?',
  'Help me debug my code',
  'Best practices for REST APIs',
]

export default function Sidebar({ onClear, onSuggest }) {
  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="logo-icon">AI</div>
        <div className="logo-text">
          <span className="logo-name">AICHAT</span>
          <span className="logo-sub">v1.0 · Demo</span>
        </div>
      </div>

      {/* New Chat */}
      <button className="new-chat-btn" onClick={onClear}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
        </svg>
        New Chat
      </button>

      {/* Suggested prompts */}
      <div className="sidebar-section">
        <p className="sidebar-label">Try asking</p>
        <div className="suggestions">
          {SUGGESTED.map(s => (
            <button key={s} className="suggestion-chip" onClick={() => onSuggest(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Model info */}
      <div className="sidebar-footer">
        <div className="model-badge">
          <div className="model-dot" />
          <span>GPT-3.5 Turbo</span>
        </div>
        <p className="footer-note">
          Connect your OpenAI API key in <code>useChat.js</code> to go live.
        </p>
      </div>
    </aside>
  )
}
