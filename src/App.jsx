import { useChat } from './hooks/useChat'
import Sidebar    from './components/Sidebar'
import Header     from './components/Header'
import ChatWindow from './components/ChatWindow'
import ChatInput  from './components/ChatInput'
import './App.css'

export default function App() {
  const { messages, input, setInput, sendMessage, loading, streaming, clearChat } = useChat()

  const handleSuggest = (text) => {
    setInput(text)
    sendMessage(text)
  }

  return (
    <div className="app-shell">
      <Sidebar onClear={clearChat} onSuggest={handleSuggest} />
      <div className="chat-pane">
        <Header messageCount={messages.length} onClear={clearChat} />
        <ChatWindow messages={messages} loading={loading} streaming={streaming} />
        <ChatInput
          input={input}
          setInput={setInput}
          onSend={sendMessage}
          loading={loading}
          streaming={streaming}
        />
      </div>
    </div>
  )
}
