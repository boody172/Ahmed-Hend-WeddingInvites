import { motion } from 'framer-motion';

export const Scene1Hero = () => {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
    >
      {/* Background Image with Parallax / Zoom */}
      <motion.div
        className="absolute inset-0 w-full h-full"
        initial={{ scale: 1.15 }}
        animate={{ scale: 1 }}
        exit={{ scale: 1.05 }}
        transition={{ duration: 6, ease: 'easeOut' }}
      >
        <img
          src={`${import.meta.env.BASE_URL}images/photo-1.jpg`}
          alt="Ahmed & Hend"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--color-bg-dark)]/20 via-[var(--color-bg-dark)]/10 to-[var(--color-bg-dark)]/80" />
      </motion.div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end pb-[15vh] items-center px-10 text-center">

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1.2, delay: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className="mb-4"
        >
          <p className="text-[var(--color-primary)] font-body tracking-[0.3em] uppercase text-[2vw] font-medium">
            We are getting married
          </p>
        </motion.div>

        <div className="flex flex-col items-center justify-center w-full">
          <motion.h1
            initial={{ opacity: 0, y: 40, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
            transition={{ duration: 1.4, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: '1000px' }}
            className="text-[var(--color-text-inverse)] font-display text-[14vw] leading-[0.9] font-medium tracking-tight"
          >
            Ahmed
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 1.2, delay: 1.6, ease: [0.34, 1.56, 0.64, 1] }}
            className="my-1 text-[var(--color-primary)] font-display text-[8vw] italic"
          >
            &
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
            transition={{ duration: 1.4, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: '1000px' }}
            className="text-[var(--color-text-inverse)] font-display text-[14vw] leading-[0.9] font-medium tracking-tight"
          >
            Hend
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 1, delay: 2.2, ease: [0.25, 1, 0.5, 1] }}
          className="mt-[6vh] pt-[4vh] border-t border-[var(--color-text-inverse)]/20 w-[60%]"
        >
          <p className="text-[var(--color-text-inverse)] font-body tracking-[0.2em] uppercase text-[3vw] font-light">
            March 2, 2026
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};
