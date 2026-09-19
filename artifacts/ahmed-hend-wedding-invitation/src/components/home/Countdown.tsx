import { useState, useEffect } from 'react';
import { FadeIn } from './FadeIn';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    // Target: March 2, 2026, 19:30:00 Cairo time (UTC+2)
    // We can construct this strictly using UTC milliseconds to avoid local timezone issues
    const targetDate = new Date('2026-03-02T19:30:00+02:00').getTime();

    const calculateTimeLeft = () => {
      const difference = targetDate - new Date().getTime();

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!isMounted) return null;

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ];

  return (
    <section className="py-24 bg-card relative border-y border-border/50">
      <FadeIn className="max-w-4xl mx-auto px-6">
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {timeUnits.map(({ label, value }) => (
            <div key={label} className="flex flex-col items-center">
              <div className="w-20 h-24 md:w-28 md:h-32 bg-background border border-border/60 flex items-center justify-center shadow-sm">
                <span className="font-serif text-4xl md:text-5xl text-foreground font-medium">
                  {value.toString().padStart(2, '0')}
                </span>
              </div>
              <span className="mt-4 text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                {label}
              </span>
            </div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
