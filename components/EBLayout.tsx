import React from "react";
import { EBButton } from "./EBButton";
import Link from "next/link";
import Icon from "./EBIcons";

export default function EightBitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="eight-bit-layout">
      <header className="eight-bit-header mb-6">
        <h1 className="eight-bit-title text-2xl mb-4">
          8-Bit CRT <Icon name="tv" size={24} />
        </h1>
        <nav className="eight-bit-nav flex space-x-4">
          <EBButton variant="eightBit" asChild>
            <Link href="/" className="eight-bit-text">Home</Link>
          </EBButton>
          <EBButton variant="eightBit" asChild>
            <Link href="/features" className="eight-bit-text">Features</Link>
          </EBButton>
          <EBButton variant="eightBit" asChild>
            <Link href="/tech" className="eight-bit-text">Tech</Link>
          </EBButton>
        </nav>
      </header>
      <main className="eight-bit-main mb-6">{children}</main>
      <footer className="eight-bit-footer">
        <p className="eight-bit-text text-sm">
          2024 with <Icon name="heart" size={24} /> by m.hurhangee@me.com |{" "}
          <Link href="https://github.com/mhurhangee/8bit-crt" className="eight-bit-link">
            <Icon name="github" size={24} />
          </Link>
        </p>
      </footer>
    </div>
  );
}
