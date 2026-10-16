import React, { useState } from 'react';
import { TESTIMONIALS } from '../data/teaData';
import { Star, Quote, ChevronLeft, ChevronRight, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextReveal, Magnetic, DriftingTeaLeaves } from '../utils/motion';

export const SommelierTestimonials: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const t = TESTIMONIALS[activeIdx];

  return (
    <section className="py-24 sm:py-32 bg-forest-950 relative overflow-hidden border-t border-forest-900">
      
      {/* Drifting Leaves */}
      <DriftingTeaLeaves density="low" />

      {/* Background Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-forest-900/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Section Heading */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-forest-900/40 text-gold-400 text-xs uppercase tracking-[0.25em] mb-4"
        >
          <Award className="w-3.5 h-3.5" />
          The Sommelier Guild
        </motion.div>
        
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-ivory-50 font-normal leading-tight mb-16">
          <TextReveal text="Acclaimed by Masters of Taste" as="span" />
        </h2>

        {/* Carousel Card with AnimatePresence */}
        <div className="relative bg-forest-900/40 border border-forest-800 rounded-3xl p-8 sm:p-14 shadow-2xl backdrop-blur-sm">
          
          <Quote className="w-12 h-12 text-gold-400/30 mx-auto mb-6" />

          {/* Rating Stars */}
          <div className="flex items-center justify-center gap-1.5 mb-6">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 text-gold-400 fill-gold-400" />
            ))}
          </div>

          {/* Quote Text with Smooth Crossfade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="font-serif text-xl sm:text-2xl md:text-3xl text-ivory-100 font-light italic leading-relaxed max-w-3xl mx-auto">
                "{t.quote}"
              </p>

              {/* Author Details */}
              <div className="mt-8 pt-8 border-t border-forest-800/80 flex flex-col items-center">
                <h4 className="font-serif text-lg text-gold-300 font-medium tracking-wide">
                  {t.author}
                </h4>
                <p className="text-xs uppercase tracking-widest text-ivory-300/80 mt-1">
                  {t.title} · <span className="text-gold-400/90">{t.location}</span>
                </p>
                <div className="mt-3 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-950 border border-forest-800 text-[11px] font-mono text-ivory-300">
                  <span className="text-ivory-300/60">Preferred Vintage:</span>
                  <span className="text-gold-400 font-serif italic">{t.teaFav}</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Arrows with Magnetic Touch */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <Magnetic strength={0.25}>
              <button
                onClick={() => setActiveIdx((prev) => (prev > 0 ? prev - 1 : TESTIMONIALS.length - 1))}
                aria-label="Previous testimonial"
                className="p-3 rounded-full border border-forest-700 bg-forest-950/80 hover:border-gold-400 text-ivory-300 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            </Magnetic>

            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIdx(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === activeIdx ? 'w-8 bg-gold-400' : 'w-2 bg-forest-800'
                  }`}
                />
              ))}
            </div>

            <Magnetic strength={0.25}>
              <button
                onClick={() => setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length)}
                aria-label="Next testimonial"
                className="p-3 rounded-full border border-forest-700 bg-forest-950/80 hover:border-gold-400 text-ivory-300 hover:text-white transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </Magnetic>
          </div>

        </div>

      </div>
    </section>
  );
};
