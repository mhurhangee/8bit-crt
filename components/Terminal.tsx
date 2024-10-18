'use client'

import { useState, useEffect, useRef } from 'react'
import { useChat } from 'ai/react'
import { useRouter } from 'next/navigation'

const COMMANDS = {
  help: "Show available commands",
  new: "Start a new chat (delete message history)",
  regen: "Regenerate the last AI response",
  del: "Delete the last user message and AI response",
  fullscreen: "Toggle fullscreen mode for the terminal",
  exit: "Close the terminal and return to the previous page",
  home: "Navigate to the home page",
}

const WELCOME_MESSAGE =
  "Welcome to the 8-bit AI Terminal! Type /help to see available commands."

const LoadingAnimation = () => {
  const frames = ["|", "/", "-", "\\"]
  const [frame, setFrame] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setFrame((prevFrame) => (prevFrame + 1) % frames.length)
    }, 250)
    return () => clearInterval(timer)
  }, [])

  return <span className="loading-animation">{frames[frame]}</span>
}

export function Terminal() {
  const router = useRouter()
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    error,
    reload,
    setMessages,
    setInput,
    isLoading,
    stop,
  } = useChat({
    initialMessages: [
      { role: "system", content: WELCOME_MESSAGE, id: "welcome" },
    ],
    keepLastMessageOnError: true,
    onError: (error) => {
      console.error("Chat error:", error)
    },
  })
  const [caretPosition, setCaretPosition] = useState(0)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const caretRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [messages, error, isLoading])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
      updateCaretPosition()
    }
  }, [input])

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  })

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullscreenChange)
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  const updateCaretPosition = () => {
    if (inputRef.current && caretRef.current) {
      const inputRect = inputRef.current.getBoundingClientRect()
      const selectionStart = inputRef.current.selectionStart || 0
      const textBeforeCaret = input.slice(0, selectionStart)
      const textWidth = getTextWidth(textBeforeCaret, getComputedStyle(inputRef.current))
      setCaretPosition(textWidth)
    }
  }

  const getTextWidth = (text: string, font: CSSStyleDeclaration) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (context) {
      context.font = font.font
      return context.measureText(text).width
    }
    return 0
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      const trimmedInput = input.trim()

      if (trimmedInput.startsWith("/")) {
        handleCommand(trimmedInput.slice(1))
      } else {
        handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
      }
    }
    updateCaretPosition()
  }

  const handleCommand = (command: string) => {
    const lowerCommand = command.toLowerCase()
    switch (lowerCommand) {
      case "help":
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            content:
              "Available commands:\n" +
              Object.entries(COMMANDS)
                .map(([cmd, desc]) => `/${cmd} - ${desc}`)
                .join("\n"),
            id: Date.now().toString(),
          },
        ])
        break
      case "new":
        setMessages([
          { role: "system", content: WELCOME_MESSAGE, id: "welcome" },
        ])
        break
      case "regen":
        reload()
        break
      case "del":
        setMessages((prev) => {
          const newMessages = [...prev]
          if (newMessages.length >= 2) {
            newMessages.splice(-2, 2)
          }
          return newMessages
        })
        break
      case "fullscreen":
        toggleFullscreen()
        break
      case "exit":
        router.back()
        break
      case "home":
        router.push('/')
        break
      default:
        setMessages((prev) => [
          ...prev,
          {
            role: "system",
            content: `Unknown command: /${command}`,
            id: Date.now().toString(),
          },
        ])
    }
    setInput("")
  }

  const handleClick = () => {
    updateCaretPosition()
  }

  const toggleFullscreen = () => {
    if (!isFullscreen) {
      if (terminalRef.current) {
        if (terminalRef.current.requestFullscreen) {
          terminalRef.current.requestFullscreen().catch(err => {
            console.error(`Error attempting to enable fullscreen mode: ${err.message}`)
          })
        } else {
          // Fallback for browsers that don't support requestFullscreen
          setIsFullscreen(true)
        }
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(err => {
          console.error(`Error attempting to exit fullscreen mode: ${err.message}`)
        })
      } else {
        // Fallback for browsers that don't support exitFullscreen
        setIsFullscreen(false)
      }
    }
  }

  const allDisplayMessages = [
    ...messages,
    ...(error
      ? [{ role: "system", content: `ERROR: ${error.message}`, id: "error" }]
      : []),
    ...(isLoading ? [{ role: "assistant", content: "", id: "loading" }] : []),
  ]

  return (
    <div 
      ref={terminalRef}
      className={`terminal-container ${isFullscreen ? 'fullscreen' : ''}`}
    >
      <h2 className="eight-bit-subtitle mb-4">AI Terminal</h2>

      <div className="terminal-scroll-area">
        {allDisplayMessages.map((message, index) => (
          <div key={message.id || index} className="mb-2">
            <span
              className={
                message.role === "user"
                  ? "user-message"
                  : message.role === "assistant"
                  ? "ai-message"
                  : "system-message"
              }
            >
              {message.role === "user"
                ? "> "
                : message.role === "assistant"
                ? "$ "
                : "! "}
            </span>
            <span className="message-content">
              {message.content}
              {message.id === "loading" && <LoadingAnimation />}
            </span>
          </div>
        ))}
        <div className="terminal-input-container">
          <span className="user-message">{"> "}</span>
          <div className="terminal-input-wrapper">
            <input
              ref={inputRef}
              className="terminal-input"
              value={input}
              onChange={(e) => {
                handleInputChange(e)
                updateCaretPosition()
              }}
              onKeyDown={handleKeyDown}
              onClick={handleClick}
              autoFocus
              disabled={isLoading || !!error}
            />
            <div
              ref={caretRef}
              className="terminal-caret"
              style={{ left: `${caretPosition}px` }}
            />
          </div>
        </div>
      </div>
      {isLoading && (
        <button className="stop-button" onClick={stop}>
          Stop
        </button>
      )}
    </div>
  )
}