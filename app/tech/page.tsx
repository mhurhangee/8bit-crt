import Link from 'next/link';
export default function Tech() {
  return (
    <section className="eight-bit-section">
      <h3 className="eight-bit-subtitle">Tech</h3>
      <ul className="eight-bit-text list-disc list-inside">
        <li>Next.js</li>
        <li>Tailwind CSS</li>
        <li><Link href="https://pixelarticons.com" className="eight-bit-link">PixelArtIcons</Link></li>
      </ul>
    </section>
  );
}
