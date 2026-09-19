import { FadeIn } from './FadeIn';

export function Location() {
  return (
    <section className="py-24 px-6 bg-background">
      <FadeIn className="max-w-5xl mx-auto flex flex-col items-center">
        <div className="w-full aspect-[4/3] md:aspect-[21/9] bg-muted relative mb-12 grayscale opacity-90 hover:grayscale-0 hover:opacity-100 transition-all duration-1000 border border-border">
          <iframe
            src="https://maps.google.com/maps?q=Manial+Palace,+Cairo,+Egypt&t=&z=15&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
            title="Map to Manial Palace"
          />
        </div>
        <a
          href="https://share.google/AcwNzJrcNhmsW3TJE"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-10 py-4 bg-foreground text-background font-sans text-xs uppercase tracking-[0.2em] hover:bg-primary transition-colors duration-300 shadow-md"
        >
          Get Directions
        </a>
      </FadeIn>
    </section>
  );
}
