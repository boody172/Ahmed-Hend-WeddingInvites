import { FadeIn } from './FadeIn';

export function EventDetails() {
  return (
    <section className="py-24 px-6 bg-card relative border-y border-border/50">
      <FadeIn className="max-w-2xl mx-auto text-center border border-border/80 bg-background p-12 md:p-20 shadow-sm relative overflow-hidden">
        {/* Decorative corner accents */}
        <div className="absolute top-4 left-4 w-6 h-6 border-t border-l border-primary/40" />
        <div className="absolute top-4 right-4 w-6 h-6 border-t border-r border-primary/40" />
        <div className="absolute bottom-4 left-4 w-6 h-6 border-b border-l border-primary/40" />
        <div className="absolute bottom-4 right-4 w-6 h-6 border-b border-r border-primary/40" />

        <h2 className="font-serif text-4xl md:text-5xl mb-4 text-foreground">The Reception</h2>
        <p className="font-sans text-xs tracking-[0.3em] uppercase text-primary mb-16 font-medium">Farah</p>

        <div className="space-y-12">
          <div>
            <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">When</h3>
            <p className="font-serif text-2xl md:text-3xl text-foreground">March 2, 2027</p>
            <p className="font-serif text-xl text-foreground/80 italic mt-2">7:30 PM</p>
          </div>

          <div className="w-12 h-[1px] bg-border mx-auto" />

          <div>
            <h3 className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">Where</h3>
            <p className="font-serif text-2xl md:text-3xl text-foreground">Manial Palace</p>
            <p className="font-serif text-lg text-foreground/70 italic mt-2">(Qasr Mohamed Ali)</p>
            <p className="font-sans text-sm tracking-wider uppercase text-foreground/60 mt-4">Cairo, Egypt</p>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}
