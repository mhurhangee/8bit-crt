export default function Home() {
  return (
    <div className="eight-bit-text crt-border">
      <section className="eight-bit-section">
        <h2 className="eight-bit-subtitle">Welcome to the future-past!</h2>
        <p>
          Step into a world where nostalgia meets innovation. This retro-styled website is inspired by the golden age of 8-bit gaming, bringing you a unique blend of old-school charm and modern web technology.
        </p>
      </section>
      <section className="eight-bit-section">
        <h3 className="eight-bit-subtitle">Testimonials</h3>
        <p>
        &quot;It makes me want to jump higher than ever!&quot; - Mario
        </p>
        <p style={{ color: 'var(--color-emphasis)' }}>
        &quot;Pink is my favorite color, and this site is a dream!&quot; - Kirby
        </p>
        <p>
        &quot;Gotta scroll fast! This site is as speedy as I am!&quot; - Sonic
        </p>
        <p style={{ color: 'var(--color-secondary)' }}>
        &quot;I&apos;ve never seen pixels this sharp since my last dungeon!&quot; - Link
        </p>
      </section>
    </div>
  );
}