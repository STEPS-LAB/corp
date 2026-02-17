export default function HeroBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      {/* Lines */}
      <div className="absolute top-[30%] w-full h-px bg-[linear-gradient(90deg,transparent,rgba(245,246,248,0.03),transparent)] animate-lineMove" />
      <div className="absolute top-[60%] w-full h-px bg-[linear-gradient(90deg,transparent,rgba(245,246,248,0.03),transparent)] animate-lineMove" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
      <div className="absolute top-[80%] w-full h-px bg-[linear-gradient(90deg,transparent,rgba(245,246,248,0.03),transparent)] animate-lineMove" style={{ animationDuration: '30s' }} />
      
      {/* Gradients */}
      <div className="absolute w-[600px] h-[600px] -top-[200px] -right-[100px] rounded-full blur-[80px] opacity-15 bg-[radial-gradient(circle,var(--accent)_0%,transparent_70%)] animate-floatGradient" />
      <div className="absolute w-[500px] h-[500px] -bottom-[150px] -left-[50px] rounded-full blur-[80px] opacity-15 bg-[radial-gradient(circle,rgba(245,246,248,0.2)_0%,transparent_70%)] animate-floatGradient" style={{ animationDuration: '30s', animationDirection: 'reverse' }} />
      
      {/* Circles */}
      <div className="absolute w-[400px] h-[400px] top-[20%] right-[15%] rounded-full border border-[rgba(245,246,248,0.08)] animate-floatCircle" />
      <div className="absolute w-[250px] h-[250px] bottom-[25%] left-[10%] rounded-full border border-[rgba(245,246,248,0.08)] animate-floatCircle" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
      <div className="absolute w-[180px] h-[180px] top-[50%] right-[5%] rounded-full border border-[rgba(245,246,248,0.08)] opacity-50 animate-floatCircle" style={{ animationDuration: '18s' }} />
      
      {/* Dots */}
      <div className="absolute w-1.5 h-1.5 top-[25%] left-[20%] rounded-full bg-white/30 animate-pulseDot" />
      <div className="absolute w-1.5 h-1.5 top-[45%] right-[25%] rounded-full bg-white/30 animate-pulseDot" style={{ animationDelay: '0.5s', animationDuration: '4s' }} />
      <div className="absolute w-1.5 h-1.5 bottom-[30%] left-[30%] rounded-full bg-white/30 animate-pulseDot" style={{ animationDelay: '1s', animationDuration: '3.5s' }} />
      <div className="absolute w-1.5 h-1.5 top-[60%] right-[15%] rounded-full bg-white/30 animate-pulseDot" style={{ animationDelay: '1.5s', animationDuration: '4.5s' }} />
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-40 bg-[linear-gradient(rgba(245,246,248,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(245,246,248,0.02)_1px,transparent_1px)] bg-[length:80px_80px] [mask-image:radial-gradient(ellipse_100%_100%_at_center,black_40%,transparent_70%)]" />
    </div>
  )
}

