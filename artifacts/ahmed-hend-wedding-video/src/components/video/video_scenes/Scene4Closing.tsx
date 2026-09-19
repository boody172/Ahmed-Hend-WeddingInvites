import { motion } from 'framer-motion';

export const Scene4Closing = () => {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5, ease: 'easeInOut' }}
    >
      {/* Background Image */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.2, x: '5%' }}
        animate={{ scale: 1, x: '0%' }}
        transition={{ duration: 6, ease: 'easeOut' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/photo-3.jpg`}
          alt="Ahmed & Hend"
          className="w-full h-full object-cover object-center"
        />
        {/* Dark Vignette Overlay for mood and text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-dark)]/80 via-[var(--color-bg-dark)]/20 to-[var(--color-bg-dark)]/60" />
      </motion.div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full flex flex-col items-center justify-center px-[8vw] text-center h-full space-y-[4vh]">

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, delay: 1, ease: 'easeOut' }}
        >
          <h1 className="font-display text-[var(--color-text-inverse)] text-[10vw] leading-[1.2] italic max-w-[80%] mx-auto font-light">
            We can't wait to celebrate this day with you.
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 2, ease: 'easeOut' }}
          className="mt-[6vh] pt-[4vh]"
        >
          <div className="w-[1px] h-[8vh] bg-[var(--color-primary)] mx-auto mb-[4vh]" />
          <h2 className="font-display text-[var(--color-primary)] text-[12vw] leading-none">
            A <span className="text-[8vw] mx-2 italic">&</span> H
          </h2>
        </motion.div>
      </div>
    </motion.div>
  );
};
