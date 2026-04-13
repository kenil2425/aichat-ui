import { useRef, useEffect } from 'react'
import './ChatInput.css'

export default function ChatInput({ input, setInput, onSend, loading, streaming }) {
  const textareaRef = useRef(null)
  const disabled = loading || streaming

  // Auto-resize textarea
  useEffect(() => {
    const ta = textareaRef.current
    if (!ta) return
    ta.style.height = 'auto'
    ta.style.height = Math.min(ta.scrollHeight, 160) + 'px'
  }, [input])

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (input.trim() && !disabled) onSend(input)
    }
  }

  return (
    <div className="input-area">
      <div className="input-inner">
        <textarea
          ref={textareaRef}
          className="chat-textarea"
          placeholder="Ask me anything… (Enter to send, Shift+Enter for new line)"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKey}
          rows={1}
          disabled={disabled}
        />
        <button
          className={`send-btn ${disabled || !input.trim() ? 'send-btn--disabled' : ''}`}
          onClick={() => onSend(input)}
          disabled={disabled || !input.trim()}
          aria-label="Send message"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/>
            <polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
      <p className="input-hint">
        AI responses are simulated. Add your OpenAI key in <code>useChat.js</code> to go live.
      </p>
    </div>
  )
}
