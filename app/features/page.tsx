import Link from 'next/link'

export default function Features() {
  return (
    <div className="eight-bit-text">
      <section className="eight-bit-section">
        <h3 className="eight-bit-subtitle">Features</h3>
        <ul className="list-disc list-inside">
          <li>Authentic 8-bit styling with pixel-perfect design</li>
          <li>Customizable CRT screen effects (scanlines, flicker, and more)</li>
          <li>Responsive design that adapts to all screen sizes</li>
          <li>Interactive UI elements with retro-inspired hover effects</li>
          <li>Color palette reminiscent of classic gaming consoles</li>
          <li>Performance optimized for smooth scrolling and animations</li>
          <li>AI-powered terminal for interactive conversations</li>
        </ul>
      </section>
      <section className="eight-bit-section">
        <h3 className="eight-bit-subtitle">Tech Stack</h3>
        <ul className="eight-bit-text list-disc list-inside">
          <li>Next.js - React framework for server-side rendering and static site generation</li>
          <li>Tailwind CSS - Utility-first CSS framework for rapid UI development</li>
          <li>
            <Link href="https://pixelarticons.com" className="eight-bit-link">PixelArtIcons</Link> - Customizable pixel-perfect icons
          </li>
          <li>AI SDK - for implementing the AI-powered terminal</li>
          <li>Upstash rate-limiting</li>
          <li>Hosted on Vercel</li>
        </ul>
      </section>
    </div>
  );
}