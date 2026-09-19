import { Volume2, VolumeX } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

export function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Create audio element lazily
    audioRef.current = new Audio("/audio/soft-piano-ambient.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.4;

    // Add interaction listener to autoplay
    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        setHasInteracted(true);
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(err => {
          console.log("Audio play failed or file missing", err);
        });
      }
    };

    window.addEventListener('click', handleFirstInteraction, { once: true });
    window.addEventListener('touchstart', handleFirstInteraction, { once: true });
    window.addEventListener('scroll', handleFirstInteraction, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstInteraction);
      window.removeEventListener('touchstart', handleFirstInteraction);
      window.removeEventListener('scroll', handleFirstInteraction);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, [hasInteracted]);

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation(); // prevent triggering global interaction twice
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => {
        console.log("Audio play failed or file missing", err);
      });
    }
  };

  return (
    <button
      onClick={toggleMute}
      className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-card/80 backdrop-blur-sm border border-border rounded-full flex items-center justify-center text-foreground/60 hover:text-foreground hover:bg-card transition-all duration-300 shadow-sm"
      aria-label={isPlaying ? "Mute music" : "Play music"}
    >
      {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
    </button>
  );
}
