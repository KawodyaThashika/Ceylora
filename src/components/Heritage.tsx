import React, { useState } from 'react';
import { CELEBRATED_ESTATES } from '../data/teaData';
import { Mountain, Award, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextReveal, ParagraphReveal, ClipRevealImage, ScrollParallax, DriftingTeaLeaves } from '../utils/motion';

export const Heritage: React.FC = () => {
  const [activeEstate, setActiveEstate] = useState(0);

  return (
    <section id="heritage" className="py-24 sm:py-32 bg-forest-950 relative overflow-hidden border-t border-forest-900">
      
      {/* Drifting Tea Leaves Background Atmosphere */}
      <DriftingTeaLeaves density="low" />

      {/* Subtle Background Glow and Contour */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-forest-900/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-forest-900/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Word-by-Word Scroll Reveal */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-gold-500/30 bg-forest-900/50 text-gold-400 text-xs uppercase tracking-[0.25em] mb-4"
          >
            <Mountain className="w-3.5 h-3.5" />
            Terroir & Heritage
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory-50 font-normal leading-[1.15]">
            <TextReveal
              text="The Heart of Ceylon:"
              as="span"
              className="block"
            />
            <TextReveal
              text="Where Clouds Kiss The Earth"
              as="span"
              className="italic font-light text-gold-300"
              delay={0.2}
              italicLastWord={true}
            />
          </h2>

          <ParagraphReveal
            delay={0.35}
            className="mt-6 text-ivory-300/80 text-base sm:text-lg leading-relaxed font-light"
          >
            In the ancient highland sanctuaries of Sri Lanka, tea is not merely cultivated; it is nurtured by monsoonal rains, equatorial sun, and the quiet devotion of generational artisan families.
          </ParagraphReveal>
        </div>

        {/* Editorial Feature 1: The Sacred High Elevation */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28">
          <div className="lg:col-span-6 relative group">
            {/* Cinematic Clip-Path Image Reveal */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-forest-800">
              <ClipRevealImage
                src="https://images.unsplash.com/photo-1588880331179-bc9b93a8cb5e?auto=format&fit=crop&w=1200&q=85"
                alt="Nuwara Eliya misty tea estate at dawn"
                className="h-[450px] sm:h-[520px]"
                direction="bottom"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent pointer-events-none" />
              
              {/* Floating Terroir Tag with Micro Parallax */}
              <ScrollParallax speed={15} className="absolute bottom-6 left-6 right-6">
                <div className="p-4 rounded-xl bg-forest-950/85 backdrop-blur-md border border-gold-500/30 flex items-center justify-between shadow-xl">
                  <div>
                    <span className="text-[10px] tracking-widest uppercase text-gold-400 font-mono">Elevation</span>
                    <p className="text-ivory-100 font-serif text-lg">6,240 ft / 1,902m Above Sea Level</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] tracking-widest uppercase text-gold-400 font-mono">Terroir</span>
                    <p className="text-ivory-100 font-serif text-lg">Pedro Cloud Valley</p>
                  </div>
                </div>
              </ScrollParallax>
            </div>

            {/* Accent Gold Frame Parallax */}
            <ScrollParallax speed={-20} className="absolute -bottom-4 -right-4 w-full h-full border border-gold-500/20 rounded-2xl pointer-events-none -z-10 hidden sm:block" />
          </div>

          <div className="lg:col-span-6 lg:pl-6">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-mono">Chapter I</span>
            
            <h3 className="font-serif text-3xl sm:text-4xl text-ivory-100 font-normal mt-2 leading-tight">
              <TextReveal text="Highlands Crowned in Mist" as="span" />
            </h3>

            <ParagraphReveal delay={0.15} className="mt-5 text-ivory-300/80 leading-relaxed font-light text-base">
              Nuwara Eliya, often revered as the "Little England" of the East, sits at the highest altitude in Sri Lanka. Here, sub-tropical mountain air collides with warm ocean breezes from the Bay of Bengal.
            </ParagraphReveal>

            <ParagraphReveal delay={0.25} className="mt-4 text-ivory-300/80 leading-relaxed font-light text-base">
              The severe drops in temperature at night force the tea bushes (Camellia sinensis var. assamica) to slow their growth drastically. This deliberate botanical struggle concentrates essential oils, producing the pale gold liquor and delicate muscatel fragrance found in no other tea garden on Earth.
            </ParagraphReveal>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35 }}
              className="mt-8 grid grid-cols-2 gap-4 border-t border-forest-800/80 pt-6"
            >
              <div>
                <span className="text-2xl font-serif text-gold-300">6,240+</span>
                <p className="text-xs text-ivory-300/70 uppercase tracking-wider mt-1">Feet Peak Elevation</p>
              </div>
              <div>
                <span className="text-2xl font-serif text-gold-300">100%</span>
                <p className="text-xs text-ivory-300/70 uppercase tracking-wider mt-1">Single-Estate Harvest</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Editorial Feature 2: The Art of the Imperial Pluck */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-28">
          <div className="lg:col-span-6 order-2 lg:order-1 lg:pr-6">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-mono">Chapter II</span>
            
            <h3 className="font-serif text-3xl sm:text-4xl text-ivory-100 font-normal mt-2 leading-tight">
              <TextReveal text="Two Leaves & A Bud:" as="span" className="block" />
              <span className="text-gold-300 italic font-light">The Sacred Harvest</span>
            </h3>

            <ParagraphReveal delay={0.15} className="mt-5 text-ivory-300/80 leading-relaxed font-light text-base">
              While mass-market industrial producers use motorized shears that indiscriminately shred woody stems and coarse leaves, CEYLORA adheres strictly to the orthodox imperial pluck.
            </ParagraphReveal>

            <ParagraphReveal delay={0.25} className="mt-4 text-ivory-300/80 leading-relaxed font-light text-base">
              At first light, our generational pluckers traverse the terraced hillsides. Using only thumb and forefinger, they harvest exclusively the terminal unopened golden bud and the two youngest, tenderest leaves. This ensures zero bitterness, maximum amino acid theanine, and pure floral sweetness.
            </ParagraphReveal>

            <motion.ul 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35, staggerChildren: 0.1 }}
              className="mt-6 space-y-3"
            >
              {[
                'Hand-selected between 5:30 AM and 8:30 AM before dew evaporates',
                'Zero mechanical shears or mechanized trimming',
                'Fair living wages and comprehensive community healthcare for all artisans',
              ].map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-ivory-200">
                  <CheckCircle2 className="w-4 h-4 text-gold-400 mt-1 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </motion.ul>
          </div>

          <div className="lg:col-span-6 order-1 lg:order-2 relative group">
            {/* Cinematic Clip-Path Image Reveal */}
            <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-forest-800">
              <ClipRevealImage
                src="https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=1200&q=85"
                alt="Two leaves and a bud macro photography"
                className="h-[450px] sm:h-[520px]"
                direction="top"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent pointer-events-none" />
              
              <ScrollParallax speed={15} className="absolute bottom-6 left-6 right-6">
                <div className="p-4 rounded-xl bg-forest-950/85 backdrop-blur-md border border-gold-500/30 shadow-xl">
                  <p className="font-serif italic text-gold-300 text-sm sm:text-base">
                    "If a leaf is even forty-eight hours past its golden bud stage, it will not enter a CEYLORA canister."
                  </p>
                  <p className="text-[10px] uppercase tracking-widest text-ivory-300 mt-1">
                    — Master Plucker’s Oath
                  </p>
                </div>
              </ScrollParallax>
            </div>

            <ScrollParallax speed={-20} className="absolute -bottom-4 -left-4 w-full h-full border border-gold-500/20 rounded-2xl pointer-events-none -z-10 hidden sm:block" />
          </div>
        </div>

        {/* Interactive Terroir Map & Estate Selector */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85 }}
          className="bg-forest-900/60 rounded-3xl p-6 sm:p-12 border border-forest-800 shadow-xl backdrop-blur-sm"
        >
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs uppercase tracking-[0.25em] text-gold-400 font-mono">Terroir Geography</span>
            <h3 className="font-serif text-2xl sm:text-3xl text-ivory-50 mt-1">
              The Four Sacred Tea Valleys of Sri Lanka
            </h3>
            <p className="text-xs sm:text-sm text-ivory-300/70 mt-2">
              Select an estate to explore its elevation, climate dynamics, and distinctive cup profile.
            </p>
          </div>

          {/* Estate Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {CELEBRATED_ESTATES.map((estate, idx) => (
              <button
                key={estate.name}
                onClick={() => setActiveEstate(idx)}
                className={`p-4 rounded-xl border text-left transition-all duration-300 ${
                  activeEstate === idx
                    ? 'border-gold-400 bg-forest-850 shadow-lg text-ivory-50 scale-[1.02]'
                    : 'border-forest-800/80 bg-forest-950/50 hover:border-gold-500/40 text-ivory-300/70'
                }`}
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-gold-400 block">
                  {estate.region}
                </span>
                <h4 className="font-serif text-base font-medium text-ivory-100 mt-1">
                  {estate.name}
                </h4>
                <p className="text-xs font-mono text-ivory-300/60 mt-1">
                  {estate.elevation}
                </p>
              </button>
            ))}
          </div>

          {/* Active Estate Details with Smooth Crossfade */}
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeEstate}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35 }}
              className="p-6 rounded-2xl bg-forest-950/80 border border-forest-800/80 grid grid-cols-1 md:grid-cols-3 gap-6 items-center"
            >
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-gold-400">Cup Characteristics</span>
                <p className="text-ivory-100 text-sm font-sans font-light">
                  {CELEBRATED_ESTATES[activeEstate].character}
                </p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-gold-400">Microclimate</span>
                <p className="text-ivory-100 text-sm font-sans font-light">
                  {CELEBRATED_ESTATES[activeEstate].climate}
                </p>
              </div>
              <div className="flex md:justify-end">
                <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-forest-900 border border-gold-500/30 text-gold-300 text-xs font-mono">
                  <Award className="w-4 h-4 text-gold-400" />
                  <span>Lion Logo Certified Terroir</span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>

      </div>
    </section>
  );
};
