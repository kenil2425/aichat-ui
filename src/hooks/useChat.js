import { useState, useCallback } from 'react'

// Streams the reply word-by-word for typewriter effect
async function streamWords(text, onChunk) {
  const words = text.split(' ')
  for (let i = 0; i < words.length; i++) {
    await new Promise(r => setTimeout(r, 35 + Math.random() * 35))
    onChunk(words[i] + (i < words.length - 1 ? ' ' : ''))
  }
}

export function useChat() {
  const [messages,  setMessages]  = useState([
    {
      id:        'welcome',
      role:      'assistant',
      content:   "Hi! I'm AICHAT, powered by Groq (Llama 3). Ask me anything — I'm here to help you think, code, write, or just chat. What's on your mind?",
      timestamp: new Date(),
    }
  ])
  const [input,     setInput]     = useState('')
  const [loading,   setLoading]   = useState(false)
  const [streaming, setStreaming] = useState(false)

  const sendMessage = useCallback(async (text) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const userMsg = {
      id:        Date.now() + '-user',
      role:      'user',
      content:   trimmed,
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMsg])
    setInput('')
    setLoading(true)

    try {
      const history = [...messages, userMsg]
        .filter(m => m.content)
        .map(m => ({ role: m.role, content: m.content }))

      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_GROQ_KEY}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages:    history,
          max_tokens:  1024,
          temperature: 0.7,
        }),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error?.message || 'Groq API error')
      }

      const data      = await response.json()
      const replyText = data.choices[0].message.content

      const aiId = Date.now() + '-ai'
      setLoading(false)
      setStreaming(true)
      setMessages(prev => [
        ...prev,
        { id: aiId, role: 'assistant', content: '', timestamp: new Date() }
      ])

      await streamWords(replyText, (chunk) => {
        setMessages(prev =>
          prev.map(m => m.id === aiId ? { ...m, content: m.content + chunk } : m)
        )
      })

      setStreaming(false)

    } catch (err) {
      console.error('Groq error:', err)
      setLoading(false)
      setStreaming(false)
      setMessages(prev => [
        ...prev,
        {
          id:        Date.now() + '-err',
          role:      'assistant',
          content:   `⚠️ Error: ${err.message}\n\nPlease check:\n- Your API key is correct in .env (VITE_GROQ_KEY=...)\n- You restarted the dev server after editing .env\n- Your internet connection is working`,
          timestamp: new Date(),
        }
      ])
    }
  }, [loading, messages])

  const clearChat = useCallback(() => {
    setMessages([{
      id:        'welcome-' + Date.now(),
      role:      'assistant',
      content:   "Hi! I'm AICHAT, powered by Groq (Llama 3). Ask me anything — I'm here to help you think, code, write, or just chat. What's on your mind?",
      timestamp: new Date(),
    }])
  }, [])

  return { messages, input, setInput, sendMessage, loading, streaming, clearChat }
}