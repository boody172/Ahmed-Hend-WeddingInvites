import { motion } from 'framer-motion';

export const Scene2Verse = () => {
  return (
    <motion.div
      className="absolute inset-0 w-full h-full flex flex-col items-center justify-center overflow-hidden bg-[var(--color-bg-light)]"
      initial={{ clipPath: 'inset(100% 0 0 0)' }}
      animate={{ clipPath: 'inset(0% 0 0 0)' }}
      exit={{ clipPath: 'inset(0 0 100% 0)' }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
    >

      {/* Arch framed photo at the top */}
      <motion.div
        className="absolute top-[8vh] w-[75vw] h-[45vh] overflow-hidden"
        style={{ borderRadius: '40vw 40vw 0 0' }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -50, opacity: 0 }}
        transition={{ duration: 1.4, delay: 0.4, ease: [0.33, 1, 0.68, 1] }}
      >
        <motion.img
          src={`${import.meta.env.BASE_URL}images/photo-2.jpg`}
          alt="Couple"
          className="w-full h-full object-cover"
          initial={{ scale: 1.2, y: -20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 8, ease: 'easeOut' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--color-bg-light)] via-transparent to-transparent opacity-80" />
      </motion.div>

      {/* Decorative Line */}
      <motion.div
        className="absolute top-[56vh] w-[1px] bg-[var(--color-primary)] origin-top"
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1, delay: 1, ease: 'circOut' }}
        style={{ height: '6vh' }}
      />

      {/* Foreground Content */}
      <div className="relative z-10 w-full h-full flex flex-col justify-end pb-[10vh] items-center px-10 text-center">

        <div className="flex flex-col items-center justify-center space-y-[3vh]">
          {/* Arabic Verse */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1.2, delay: 1.4, ease: 'easeOut' }}
            className="w-full"
          >
            <p className="font-arabic text-[var(--color-text-primary)] text-[5.5vw] leading-loose text-center" dir="rtl">
              "رَبَّنَا هَبْ لَنَا مِنْ أَزْوَاجِنَا وَذُرِّيَّاتِنَا قُرَّةَ أَعْيُنٍ وَاجْعَلْنَا لِلْمُتَّقِينَ إِمَامًا"
            </p>
          </motion.div>

          {/* English Translation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 1.2, delay: 1.8, ease: 'easeOut' }}
          >
            <p className="font-display italic text-[var(--color-text-secondary)] text-[4.5vw] leading-relaxed max-w-[85%] mx-auto">
              "Our Lord, grant us from among our wives and offspring comfort to our eyes and make us an example for the righteous."
            </p>
          </motion.div>

          {/* Reference */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, delay: 2.2, ease: 'linear' }}
          >
            <p className="font-body text-[var(--color-primary)] text-[2.5vw] tracking-[0.15em] uppercase font-semibold">
              Surah Al-Furqan, 25:74
            </p>
          </motion.div>
        </div>
      </div>

    </motion.div>
  );
};
