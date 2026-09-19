import { motion } from 'framer-motion';

export const Scene3Details = () => {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center overflow-hidden bg-[var(--color-bg-dark)]"
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
    >
      {/* Animated geometric accents */}
      <motion.div
        className="absolute top-0 right-0 w-[60vw] h-[60vw] rounded-full border border-[var(--color-primary)]/20 pointer-events-none"
        initial={{ scale: 0, opacity: 0, x: '20%', y: '-20%' }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 0.5, ease: 'easeOut' }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[80vw] h-[80vw] rounded-full border border-[var(--color-primary)]/10 pointer-events-none"
        initial={{ scale: 0, opacity: 0, x: '-30%', y: '30%' }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2, delay: 0.8, ease: 'easeOut' }}
      />

      <div className="relative z-10 w-full flex flex-col items-center px-[10vw] text-center space-y-[6vh]">

        {/* Title */}
        <div className="overflow-hidden">
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 1, delay: 0.6, ease: [0.33, 1, 0.68, 1] }}
          >
            <h2 className="font-body text-[var(--color-primary)] tracking-[0.25em] uppercase text-[3vw] font-medium mb-2">
              The Celebration
            </h2>
            <h1 className="font-display text-[var(--color-text-inverse)] text-[12vw] leading-none italic">
              Wedding Reception
            </h1>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="w-[15vw] h-[1px] bg-[var(--color-primary)]/50"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1, ease: 'circOut' }}
        />

        {/* Time */}
        <motion.div
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.2, delay: 1.2, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <span className="font-body text-[var(--color-text-muted)] tracking-[0.1em] uppercase text-[2.5vw] mb-1">
            Time
          </span>
          <span className="font-display text-[var(--color-text-inverse)] text-[8vw] leading-none">
            7:30 PM
          </span>
        </motion.div>

        {/* Venue */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 1.6, ease: 'easeOut' }}
          className="flex flex-col items-center"
        >
          <span className="font-body text-[var(--color-text-muted)] tracking-[0.1em] uppercase text-[2.5vw] mb-2">
            Venue
          </span>
          <span className="font-display text-[var(--color-text-inverse)] text-[7vw] leading-tight max-w-[80%]">
            Manial Palace
          </span>
          <span className="font-body text-[var(--color-text-inverse)]/80 text-[3.5vw] font-light mt-1">
            (Qasr Mohamed Ali)
          </span>
          <span className="font-body text-[var(--color-primary)] tracking-[0.1em] uppercase text-[3vw] mt-4 font-medium">
            Cairo, Egypt
          </span>
        </motion.div>

      </div>
    </motion.div>
  );
};
