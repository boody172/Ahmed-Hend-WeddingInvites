import { Hero } from '@/components/home/Hero';
import { Countdown } from '@/components/home/Countdown';
import { QuranVerse } from '@/components/home/QuranVerse';
import { EventDetails } from '@/components/home/EventDetails';
import { Location } from '@/components/home/Location';
import { Gallery } from '@/components/home/Gallery';
import { RsvpForm } from '@/components/home/RsvpForm';
import { Footer } from '@/components/home/Footer';
import { MusicPlayer } from '@/components/home/MusicPlayer';

export default function Home() {
  return (
    <main className="bg-background min-h-screen selection:bg-primary/30 selection:text-foreground overflow-x-hidden">
      <Hero />
      <Countdown />
      <QuranVerse />
      <EventDetails />
      <Location />
      <Gallery />
      <RsvpForm />
      <Footer />
      <MusicPlayer />
    </main>
  );
}
