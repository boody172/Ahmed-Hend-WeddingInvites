import { FadeIn } from './FadeIn';

export function Hero() {
  return (
    <section className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-background">
      {/* Soft gradient background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background" />

      {/* Noise overlay for texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      <FadeIn className="relative z-10 text-center flex flex-col items-center px-4 w-full">
        <span className="uppercase tracking-[0.3em] text-xs font-medium text-muted-foreground mb-8">The Wedding Of</span>
        <h1 className="font-serif text-6xl md:text-8xl lg:text-9xl text-foreground mb-6 font-medium tracking-tight">Ahmed & Hend</h1>
        <div className="w-16 h-[1px] bg-primary/60 my-6" />
        <p className="text-2xl md:text-3xl text-foreground/80 font-serif italic tracking-wide">March 2, 2026</p>
      </FadeIn>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
        <span className="text-[10px] uppercase tracking-[0.25em] text-foreground">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-foreground to-transparent animate-pulse" />
      </div>
    </section>
  );
}
