import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { FadeIn } from './FadeIn';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const TARGET_DATE = new Date('2026-03-02T19:30:00+02:00').getTime();

function getTimeLeft(): TimeLeft {
  const difference = TARGET_DATE - Date.now();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
}

function FlipDigit({ value }: { value: string }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={value}
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="absolute inset-0 flex items-center justify-center font-serif text-4xl md:text-5xl text-foreground font-medium"
        >
          {value}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isMounted, setIsMounted] = useState(false);
  const [isTicking, setIsTicking] = useState(false);
  const tickTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setIsMounted(true);
    setTimeLeft(getTimeLeft());

    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft());
      setIsTicking(true);
      clearTimeout(tickTimeout.current);
      tickTimeout.current = setTimeout(() => setIsTicking(false), 250);
    }, 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(tickTimeout.current);
    };
  }, []);

  if (!isMounted) return null;

  const isArrived = timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0 && TARGET_DATE - Date.now() <= 0;

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section className="py-24 bg-card relative border-y border-border/50 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent pointer-events-none" />

      <FadeIn className="max-w-4xl mx-auto px-6 relative">
        <div className="flex items-center justify-center gap-2 mb-10">
          <span
            className={`relative flex h-2 w-2 ${isArrived ? '' : ''}`}
            aria-hidden="true"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary/70 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
          </span>
          <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground font-medium">
            {isArrived ? "Today's the Day" : 'Counting Down Live'}
          </span>
        </div>

        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {timeUnits.map(({ label, value }, index) => (
            <motion.div
              key={label}
              className="flex flex-col items-center"
              animate={isTicking && index === 3 ? { scale: [1, 1.04, 1] } : {}}
              transition={{ duration: 0.4 }}
            >
              <div className="relative w-20 h-24 md:w-28 md:h-32 bg-background border border-border/60 shadow-sm overflow-hidden">
                <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-border/40 z-10" />
                <FlipDigit value={value.toString().padStart(2, '0')} />
              </div>
              <span className="mt-4 text-[10px] md:text-xs uppercase tracking-[0.2em] text-muted-foreground font-medium">
                {label}
              </span>
            </motion.div>
          ))}
        </div>
      </FadeIn>
    </section>
  );
}
