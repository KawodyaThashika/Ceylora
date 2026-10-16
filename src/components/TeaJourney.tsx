import React, { useState, useEffect } from 'react';
import { JOURNEY_STAGES } from '../data/teaData';
import { ChevronLeft, ChevronRight, Play, Pause, Sparkles, Clock, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextReveal, ParagraphReveal, Magnetic, DriftingTeaLeaves } from '../utils/motion';

export const TeaJourney: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % JOURNEY_STAGES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const stage = JOURNEY_STAGES[currentStep];

  return (
    <section id="journey" className="py-24 sm:py-32 bg-forest-900/40 relative overflow-hidden border-t border-forest-800">
      
      {/* Background Subtle Drifting Leaves */}
      <DriftingTeaLeaves density="low" />

      {/* Background Ambience */}
      <div className="absolute inset-0 bg-radial-gradient from-forest-900/80 via-forest-950 to-forest-950 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading with Staggered Word Reveal */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-forest-950/70 text-gold-400 text-xs uppercase tracking-[0.25em] mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            The 5-Stage Transformation
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory-50 font-normal leading-[1.15]">
            <TextReveal text="From Mist-Clad Peaks" as="span" className="block" />
            <TextReveal text="To Your Teacup" as="span" className="italic font-light text-gold-300" delay={0.2} italicLastWord={true} />
          </h2>

          <ParagraphReveal delay={0.3} className="mt-4 text-ivory-300/80 text-sm sm:text-base max-w-xl mx-auto font-light">
            Follow the sacred alchemy of single-estate Ceylon tea through five intentional acts of craftsmanship.
          </ParagraphReveal>
        </div>

        {/* Step Progress Indicators & Timeline */}
        <div className="relative mb-12">
          {/* Progress Connecting Line with Animated Fill */}
          <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[1.5px] bg-forest-800 -translate-y-1/2 -z-0">
            <motion.div
              className="h-full bg-gradient-to-r from-gold-500 to-gold-300"
              initial={false}
              animate={{ width: `${(currentStep / (JOURNEY_STAGES.length - 1)) * 100}%` }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
          
          <div className="grid grid-cols-5 gap-2 sm:gap-4 relative z-10">
            {JOURNEY_STAGES.map((s, idx) => (
              <button
                key={s.step}
                onClick={() => {
                  setCurrentStep(idx);
                  setIsAutoPlaying(false);
                }}
                className={`flex flex-col items-center group transition-all duration-300 text-center ${
                  idx === currentStep ? 'scale-105' : 'opacity-65 hover:opacity-90'
                }`}
              >
                <motion.div
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-9 h-9 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-serif text-xs sm:text-base transition-all duration-500 ${
                    idx === currentStep
                      ? 'bg-gold-500 text-forest-950 font-bold shadow-[0_0_20px_rgba(197,160,89,0.5)] scale-110'
                      : idx < currentStep
                      ? 'bg-forest-800 text-gold-400 border border-gold-500/40'
                      : 'bg-forest-950 text-ivory-300 border border-forest-800'
                  }`}
                >
                  0{s.step}
                </motion.div>
                <span className="mt-2 text-[10px] sm:text-xs font-mono uppercase tracking-wider hidden sm:block text-ivory-200 truncate w-full">
                  {s.title}
                </span>
                <span className="text-[9px] text-gold-400 font-mono hidden md:block">
                  {s.elevation}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Stage Interactive Cinematic Display Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-forest-950 border border-forest-800/90 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12 min-h-[580px]"
        >
          
          {/* Left / Visual Pane: Layered Photography with Smooth Cross-fade */}
          <div className="lg:col-span-7 relative min-h-[350px] lg:min-h-full overflow-hidden group bg-forest-950">
            <AnimatePresence mode="wait">
              <motion.img
                key={stage.imageUrl}
                src={stage.imageUrl}
                alt={stage.title}
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full object-cover absolute inset-0"
              />
            </AnimatePresence>

            {/* Dark gradient for legibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-forest-950/30 lg:to-forest-950 pointer-events-none" />

            {/* Stage Time & Terroir Floating Badge */}
            <div className="absolute top-6 left-6 flex flex-wrap gap-2 z-10">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-950/80 backdrop-blur-md border border-gold-500/30 text-gold-300 text-xs font-mono">
                <Clock className="w-3.5 h-3.5 text-gold-400" />
                {stage.timeOfDay}
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-forest-950/80 backdrop-blur-md border border-forest-700 text-ivory-200 text-xs font-mono">
                <Compass className="w-3.5 h-3.5 text-sage-400" />
                {stage.elevation}
              </span>
            </div>

            {/* Sommelier Master Quote Overlay */}
            <AnimatePresence mode="wait">
              <motion.div 
                key={stage.quote}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
                className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-forest-950/85 backdrop-blur-md border border-forest-800/80 z-10"
              >
                <p className="font-serif italic text-gold-200 text-xs sm:text-sm">
                  "{stage.quote}"
                </p>
                <p className="text-[10px] uppercase tracking-widest text-ivory-300/80 mt-1 font-sans">
                  — {stage.quoteAuthor}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right / Story & Sensory Pane */}
          <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-gold-400">
                    Act 0{stage.step} of 05
                  </span>
                  <span className="text-xs font-mono uppercase tracking-widest text-ivory-300/60">
                    Ceylon Heritage
                  </span>
                </div>

                <h3 className="font-serif text-3xl sm:text-4xl text-ivory-50 mt-3 font-normal leading-tight">
                  {stage.title}
                </h3>
                
                <h4 className="text-sm uppercase tracking-wider text-gold-300 font-sans mt-1">
                  {stage.subtitle}
                </h4>

                <p className="mt-6 text-ivory-300/90 leading-relaxed font-light text-sm sm:text-base">
                  {stage.description}
                </p>

                {/* Sensory Note Callout */}
                <div className="mt-8 p-4 rounded-2xl bg-forest-900/60 border border-gold-500/20">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400 block mb-1">
                    Sensory Note
                  </span>
                  <p className="text-xs sm:text-sm text-ivory-200 font-sans italic">
                    "{stage.sensoryNote}"
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation and Auto-play Controls with Magnetic Attraction */}
            <div className="pt-8 mt-8 border-t border-forest-800 flex items-center justify-between">
              {/* Autoplay Toggle */}
              <Magnetic strength={0.2}>
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs tracking-wider transition-colors ${
                    isAutoPlaying
                      ? 'border-gold-400 text-gold-300 bg-forest-850'
                      : 'border-forest-700 text-ivory-300/80 hover:text-white'
                  }`}
                >
                  {isAutoPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-gold-400" />
                      <span>Auto Playing</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5" />
                      <span>Auto Tour</span>
                    </>
                  )}
                </button>
              </Magnetic>

              {/* Prev / Next Buttons */}
              <div className="flex items-center gap-2">
                <Magnetic strength={0.3}>
                  <button
                    onClick={() => {
                      setCurrentStep((prev) => (prev > 0 ? prev - 1 : JOURNEY_STAGES.length - 1));
                      setIsAutoPlaying(false);
                    }}
                    aria-label="Previous journey stage"
                    className="p-2.5 rounded-full border border-forest-700 bg-forest-900/50 hover:bg-forest-850 hover:border-gold-500/50 text-ivory-200 transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                </Magnetic>

                <Magnetic strength={0.3}>
                  <button
                    onClick={() => {
                      setCurrentStep((prev) => (prev + 1) % JOURNEY_STAGES.length);
                      setIsAutoPlaying(false);
                    }}
                    aria-label="Next journey stage"
                    className="p-2.5 rounded-full border border-forest-700 bg-forest-900/50 hover:bg-forest-850 hover:border-gold-500/50 text-ivory-200 transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </Magnetic>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};
