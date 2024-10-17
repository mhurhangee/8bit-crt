import { EBButton } from "@/components/EBButton";

export default function Home() {
  return (
    <div>
      <section className="eight-bit-section">
        <h2 className="eight-bit-subtitle">Welcome to the 8-bit world!</h2>
        <p className="eight-bit-text">
          This is a retro-styled website built with Next.js and inspired by
          8-bit graphics.
        </p>
        <EBButton variant="eightBit" className="mt-4">
          Welcome 
        </EBButton>
      </section>
    </div>
  );
}
