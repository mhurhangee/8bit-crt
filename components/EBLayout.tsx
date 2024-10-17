import React from 'react'
import { EBButton } from "./EBButton"
import Link from 'next/link'

export default function EightBitLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="eight-bit-layout">
      <header className="eight-bit-header mb-6">
        <h1 className="eight-bit-title text-2xl mb-4">8-Bit Website</h1>
        <nav className="eight-bit-nav flex space-x-4">
          <EBButton variant="eightBit" asChild>
            <Link href="/">Home</Link>
          </EBButton>
          <EBButton variant="eightBit" asChild>
            <Link href="/about">About</Link>
          </EBButton>
          <EBButton variant="eightBit" asChild>
            <Link href="/contact">Contact</Link>
          </EBButton>
        </nav>
      </header>
      <main className="eight-bit-main mb-6">
        {children}
      </main>
      <footer className="eight-bit-footer">
        <p className="eight-bit-text text-sm">© 2023 8-Bit Website. All rights reserved.</p>
      </footer>
    </div>
  )
}