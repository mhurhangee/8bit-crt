import { EBButton } from "@/components/EBButton"

export default function Home() {
  return (
    <div>
      <section className="eight-bit-section">
        <h2 className="eight-bit-subtitle">Welcome to the 8-bit world!</h2>
        <p className="eight-bit-text">This is a retro-styled website built with Next.js and inspired by 8-bit graphics.</p>
        <EBButton variant="eightBit" className="mt-4">Start Adventure</EBButton>
      </section>
      <section className="eight-bit-section">
        <h3 className="eight-bit-subtitle">Features</h3>
        <ul className="eight-bit-text list-disc list-inside">
          <li>Authentic 8-bit styling</li>
          <li>CRT screen effect</li>
          <li>Responsive design</li>
          <li>Next.js powered</li>
        </ul>
      </section>
    </div>
  )
}