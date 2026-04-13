import './Message.css'

// Minimal markdown renderer: bold, inline code, code blocks, numbered/bullet lists
function renderContent(text) {
  // Code blocks
  const parts = text.split(/(```[\s\S]*?```)/g)
  return parts.map((part, i) => {
    if (part.startsWith('```')) {
      const code = part.replace(/^```\w*\n?/, '').replace(/```$/, '')
      return <pre key={i} className="msg-code-block"><code>{code}</code></pre>
    }
    // Inline formatting
    const lines = part.split('\n')
    return (
      <span key={i}>
        {lines.map((line, j) => {
          // Numbered list
          if (/^\d+\.\s/.test(line)) {
            return <div key={j} className="msg-list-item msg-numbered">{formatInline(line.replace(/^\d+\.\s/, ''))}</div>
          }
          // Bullet list
          if (/^[-•]\s/.test(line)) {
            return <div key={j} className="msg-list-item msg-bullet">{formatInline(line.replace(/^[-•]\s/, ''))}</div>
          }
          return (
            <span key={j}>
              {formatInline(line)}
              {j < lines.length - 1 && line !== '' && <br />}
            </span>
          )
        })}
      </span>
    )
  })
}

function formatInline(text) {
  // Bold **text**
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`)/g)
  return parts.map((p, i) => {
    if (p.startsWith('**') && p.endsWith('**'))
      return <strong key={i}>{p.slice(2, -2)}</strong>
    if (p.startsWith('`') && p.endsWith('`'))
      return <code key={i} className="msg-inline-code">{p.slice(1, -1)}</code>
    return p
  })
}

function Avatar({ role }) {
  return (
    <div className={`avatar avatar-${role}`}>
      {role === 'user' ? 'U' : 'AI'}
    </div>
  )
}

function formatTime(date) {
  return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

export default function Message({ message, isStreaming }) {
  const isUser = message.role === 'user'
  return (
    <div className={`msg-row ${isUser ? 'msg-row--user' : 'msg-row--ai'}`}>
      {!isUser && <Avatar role="assistant" />}
      <div className={`msg-bubble ${isUser ? 'msg-bubble--user' : 'msg-bubble--ai'}`}>
        <div className="msg-content">
          {renderContent(message.content)}
          {isStreaming && <span className="msg-cursor" />}
        </div>
        <span className="msg-time">{formatTime(message.timestamp)}</span>
      </div>
      {isUser && <Avatar role="user" />}
    </div>
  )
}
