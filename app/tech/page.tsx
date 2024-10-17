import Link from 'next/link';

export default function Tech() {
  return (
    <section className="eight-bit-section">
    <h3 className="eight-bit-subtitle">Tech Stack</h3>
    <ul className="eight-bit-text list-disc list-inside">
      <li>Next.js - React framework for server-side rendering and static site generation</li>
      <li>Tailwind CSS - Utility-first CSS framework for rapid UI development</li>
      <li>
        <Link href="https://pixelarticons.com" className="eight-bit-link">PixelArtIcons</Link> - Customizable pixel-perfect icons
      </li>
    </ul>
  </section>
  );
}