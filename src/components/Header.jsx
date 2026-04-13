import './Header.css'

export default function Header({ messageCount, onClear }) {
  return (
    <header className="chat-header">
      <div className="header-left">
        <div className="header-status">
          <span className="status-dot" />
          <span className="status-text">Online</span>
        </div>
        <h1 className="header-title">New Conversation</h1>
      </div>
      <div className="header-right">
        <span className="msg-count">{messageCount} messages</span>
        <button className="clear-btn" onClick={onClear} title="Clear chat">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="3 6 5 6 21 6"/>
            <path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/>
            <path d="M10 11v6M14 11v6"/>
            <path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/>
          </svg>
          Clear
        </button>
      </div>
    </header>
  )
}
