'use client'

import { useState, useEffect, useRef } from 'react'
import { useChat } from 'ai/react'

const COMMANDS = {
  help: 'Show available commands',
  new: 'Start a new chat (delete message history)',
  clear: 'Clear the terminal display (keeps message history)',
  regen: 'Regenerate the last AI response',
  del: 'Delete the last user message and AI response',
}

const WELCOME_MESSAGE = 'Welcome to the 8-bit AI Terminal! Type /help to see available commands.'

export default function Terminal() {
  const { messages: chatMessages, input, handleInputChange, handleSubmit, error, reload, setMessages, setInput } = useChat({
    initialMessages: [
      { role: 'system', content: WELCOME_MESSAGE, id: 'welcome' }
    ],
    keepLastMessageOnError: true,
    onError: (error) => {
      console.error("Chat error:", error);
    }
  })
  const [displayMessages, setDisplayMessages] = useState(chatMessages)
  const [caretPosition, setCaretPosition] = useState(0)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setDisplayMessages(chatMessages)
  }, [chatMessages])

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [displayMessages, error])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
      setCaretPosition(input.length)
    }
  }, [input])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      const trimmedInput = input.trim()
      
      if (trimmedInput.startsWith('/')) {
        handleCommand(trimmedInput.slice(1))
      } else {
        handleSubmit(e as any)
      }
    }
  }

  const handleCommand = (command: string) => {
    switch (command) {
      case 'help':
        setDisplayMessages(prev => [...prev, { role: 'system', content: 'Available commands:\n' + Object.entries(COMMANDS).map(([cmd, desc]) => `/${cmd} - ${desc}`).join('\n'), id: Date.now().toString() }])
        break
      case 'new':
        setMessages([{ role: 'system', content: WELCOME_MESSAGE, id: 'welcome' }])
        setDisplayMessages([{ role: 'system', content: WELCOME_MESSAGE, id: 'welcome' }])
        break
      case 'clear':
        setDisplayMessages([{ role: 'system', content: 'Terminal cleared. Message history preserved.', id: Date.now().toString() }])
        break
      case 'regen':
        reload()
        break
      case 'del':
        setMessages(prev => {
          const newMessages = [...prev]
          if (newMessages.length >= 2) {
            newMessages.splice(-2, 2)
          }
          return newMessages
        })
        break
      default:
        setDisplayMessages(prev => [...prev, { role: 'system', content: `Unknown command: /${command}`, id: Date.now().toString() }])
    }
    setInput('')
  }

  const handleClick = () => {
    if (inputRef.current) {
      setCaretPosition(inputRef.current.selectionStart || 0)
    }
  }

  const allDisplayMessages = [
    ...displayMessages,
    ...(error ? [{ role: 'system', content: `ERROR: ${error.message}`, id: 'error' }] : [])
  ]

  return (
    <div className="terminal-container">
      <h2 className="eight-bit-subtitle mb-4">AI Terminal</h2>
      <div className="terminal-scroll-area" ref={terminalRef}>
        {allDisplayMessages.map((message, index) => (
          <div key={message.id || index} className="mb-2">
            <span className={
              message.role === 'user' 
                ? 'user-message' 
                : message.role === 'assistant' 
                  ? 'ai-message' 
                  : 'system-message'
            }>
              {message.role === 'user' ? '> ' : message.role === 'assistant' ? '$ ' : '! '}
            </span>
            <span className="message-content">{message.content}</span>
          </div>
        ))}
        <div className="terminal-input-container">
          <span className="user-message">{'> '}</span>
          <div className="terminal-input-wrapper">
            <input
              ref={inputRef}
              className="terminal-input"
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onClick={handleClick}
              autoFocus
              disabled={!!error}
            />
            <div 
              className="terminal-caret" 
              style={{ left: `${caretPosition * 14}px` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}