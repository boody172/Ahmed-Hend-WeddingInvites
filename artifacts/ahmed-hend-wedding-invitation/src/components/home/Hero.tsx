import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 24, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.21, 0.47, 0.32, 0.98] },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden bg-background"
    >
      {/* Soft gradient background with subtle parallax */}
      <motion.div
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-background to-background"
      />

      {/* Noise overlay for texture */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 text-center flex flex-col items-center px-4 w-full"
      >
        <motion.span variants={item} className="uppercase tracking-[0.3em] text-xs font-medium text-muted-foreground mb-8">
          The Wedding Of
        </motion.span>
        <motion.h1 variants={item} className="font-serif text-6xl md:text-8xl lg:text-9xl text-foreground mb-6 font-medium tracking-tight">
          Ahmed & Hend
        </motion.h1>
        <motion.div
          variants={item}
          className="h-[1px] bg-primary/60 my-6"
          initial={{ width: 0 }}
          animate={{ width: 64 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
        />
        <motion.p variants={item} className="text-2xl md:text-3xl text-foreground/80 font-serif italic tracking-wide">
          March 2, 2027
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ duration: 1, delay: 1.4 }}
        style={{ opacity: contentOpacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 hover:opacity-100 transition-opacity cursor-pointer"
      >
        <span className="text-[10px] uppercase tracking-[0.25em] text-foreground">Scroll</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-foreground to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
