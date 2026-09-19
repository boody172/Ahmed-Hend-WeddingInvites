import { FadeIn } from './FadeIn';

export function QuranVerse() {
  return (
    <section className="py-32 px-6 bg-background relative">
      <FadeIn className="max-w-3xl mx-auto text-center flex flex-col items-center">
        <span className="text-primary text-2xl mb-12 opacity-80">✧</span>

        <p
          className="font-arabic text-3xl md:text-5xl text-foreground mb-12 leading-[1.8] md:leading-[1.8] text-center w-full"
          dir="rtl"
        >
          "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا"
        </p>

        <p className="font-serif text-lg md:text-2xl text-foreground/80 leading-relaxed mb-8 italic">
          "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous."
        </p>

        <p className="font-sans text-xs tracking-[0.2em] uppercase text-muted-foreground/80">
          Surah Al-Furqan, 25:74
        </p>
      </FadeIn>
    </section>
  );
}
