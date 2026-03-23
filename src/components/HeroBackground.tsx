export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(58,91,255,0.22),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_40%)]" />
      <div className="absolute inset-0 opacity-35 bg-[linear-gradient(rgba(245,246,248,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(245,246,248,0.02)_1px,transparent_1px)] bg-[length:96px_96px]" />
    </div>
  )
}

