'use client'

import { useState, useEffect, useRef } from 'react'
import { useChat } from 'ai/react'
import { ScrollArea } from "@/components/ScrollArea"

export default function Terminal() {
  const { messages, input, handleInputChange, handleSubmit, error, reload } = useChat({
    keepLastMessageOnError: true,
    onError: (error) => {
      console.error("Chat error:", error);
    }
  })
  const [caretPosition, setCaretPosition] = useState(0)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
    setCaretPosition(0)
  }, [messages, error])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e as any)
    } else {
      setTimeout(() => {
        if (inputRef.current) {
          setCaretPosition(inputRef.current.selectionStart || 0)
        }
      }, 0)
    }
  }

  const handleClick = () => {
    if (inputRef.current) {
      setCaretPosition(inputRef.current.selectionStart || 0)
    }
  }

  const displayMessages = [
    ...messages,
    ...(error ? [{ role: 'system', content: `ERROR: ${error.message}`, id: 'error' }] : [])
  ]

  return (
    <div className="terminal-container">
      <h2 className="eight-bit-subtitle mb-4">AI Terminal</h2>
      <ScrollArea className="terminal-scroll-area" ref={scrollAreaRef}>
        {displayMessages.map((message, index) => (
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
      </ScrollArea>
    </div>
  )
}