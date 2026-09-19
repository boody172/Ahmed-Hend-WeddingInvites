import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { FadeIn } from './FadeIn';

import photo1 from '@assets/1_1789844562554.jfif';
import photo2 from '@assets/2_1789844562554.jfif';
import photo3 from '@assets/3_1789844562555.jfif';

const photos = [
  { src: photo1, alt: "Ahmed and Hend couple photo 1" },
  { src: photo2, alt: "Ahmed and Hend couple photo 2" },
  { src: photo3, alt: "Ahmed and Hend couple photo 3" },
];

export function Gallery() {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);

  const closeLightbox = () => setSelectedPhotoIndex(null);

  return (
    <section className="py-24 px-6 bg-card border-y border-border/50">
      <div className="max-w-7xl mx-auto">
        <FadeIn className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="relative aspect-[3/4] overflow-hidden cursor-pointer group bg-muted border border-border/50"
              onClick={() => setSelectedPhotoIndex(index)}
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
            </div>
          ))}
        </FadeIn>
      </div>

      <AnimatePresence>
        {selectedPhotoIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 p-2 text-foreground/60 hover:text-foreground transition-colors z-50"
              aria-label="Close lightbox"
            >
              <X className="w-8 h-8" />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              src={photos[selectedPhotoIndex].src}
              alt={photos[selectedPhotoIndex].alt}
              className="max-w-full max-h-[90vh] object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
