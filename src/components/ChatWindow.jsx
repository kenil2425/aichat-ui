import { useEffect, useRef } from 'react'
import Message from './Message'
import './ChatWindow.css'

function TypingIndicator() {
  return (
    <div className="typing-row">
      <div className="avatar avatar-assistant">AI</div>
      <div className="typing-bubble">
        <span /><span /><span />
      </div>
    </div>
  )
}

export default function ChatWindow({ messages, loading, streaming }) {
  const bottomRef = useRef(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  return (
    <div className="chat-window">
      <div className="messages-list">
        {messages.map((msg, i) => (
          <Message
            key={msg.id}
            message={msg}
            isStreaming={streaming && i === messages.length - 1 && msg.role === 'assistant'}
          />
        ))}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </div>
    </div>
  )
}
