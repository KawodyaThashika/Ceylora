import React, { useState, useEffect } from 'react';
import { ArrowDown, Sparkles, Compass, ShieldCheck } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TextReveal, ParagraphReveal, Magnetic } from '../utils/motion';

interface HeroProps {
  onExplore: () => void;
  onOurStory: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onExplore, onOurStory }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const { scrollY } = useScroll();

  // Scroll-linked parallax for background and content
  const bgY = useTransform(scrollY, [0, 800], [0, 180]);
  const textY = useTransform(scrollY, [0, 600], [0, 100]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0.2]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (typeof window === 'undefined' || 'ontouchstart' in window) return;
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 pb-16">
      
      {/* Background Cinematic Ceylon Plantation Layer with Parallax */}
      <motion.div 
        className="absolute inset-0 bg-cover bg-center will-change-transform scale-105"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=2200&q=85')`,
          y: bgY,
          transform: `translate3d(${mousePos.x * -12}px, ${mousePos.y * -12}px, 0) scale(1.08)`,
          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Cinematic Multi-Gradient Overlays for Luxury Contrast */}
        <div className="absolute inset-0 bg-forest-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/40 to-forest-950/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-950/90 via-transparent to-forest-950/80" />
      </motion.div>

      {/* Atmospheric Sunrise Glow Filter */}
      <div 
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-gradient-to-b from-gold-400/15 via-gold-500/5 to-transparent rounded-full blur-3xl pointer-events-none transition-transform duration-700 ease-out"
        style={{
          transform: `translate(-50%, -30%) translate3d(${mousePos.x * 25}px, ${mousePos.y * 25}px, 0)`
        }}
      />

      {/* Atmospheric Rolling Mist Layers */}
      <div className="absolute bottom-0 inset-x-0 h-96 pointer-events-none overflow-hidden opacity-45">
        <div className="absolute -inset-x-[50%] bottom-0 h-64 bg-gradient-to-t from-forest-950 via-sage-900/20 to-transparent blur-2xl animate-mist" />
        <div className="absolute -inset-x-[30%] bottom-10 h-48 bg-gradient-to-t from-forest-950 via-forest-800/15 to-transparent blur-xl animate-mist [animation-duration:35s]" />
      </div>

      {/* Floating Organic Tea Leaves with Varied Parallax Physics */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Leaf 1 - Top Left */}
        <motion.div 
          className="absolute top-[16%] left-[8%] transition-transform duration-700 ease-out animate-float"
          style={{ transform: `translate3d(${mousePos.x * 40}px, ${mousePos.y * 30}px, 0)` }}
        >
          <svg className="w-16 h-16 sm:w-20 sm:h-20 text-sage-400/40 drop-shadow-lg transform -rotate-12" viewBox="0 0 100 100" fill="currentColor">
            <path d="M10,80 Q20,20 80,10 Q90,50 60,80 Q30,90 10,80 Z" />
            <path d="M10,80 Q50,45 80,10" stroke="#c5a059" strokeWidth="2" fill="none" opacity="0.6" />
            <path d="M35,60 Q45,55 50,45" stroke="#c5a059" strokeWidth="1" fill="none" opacity="0.4" />
            <path d="M45,45 Q55,42 65,30" stroke="#c5a059" strokeWidth="1" fill="none" opacity="0.4" />
          </svg>
        </motion.div>

        {/* Leaf 2 - Right Mid */}
        <motion.div 
          className="absolute top-[32%] right-[10%] transition-transform duration-700 ease-out animate-float [animation-delay:2s]"
          style={{ transform: `translate3d(${mousePos.x * -45}px, ${mousePos.y * -35}px, 0)` }}
        >
          <svg className="w-20 h-20 sm:w-28 sm:h-28 text-sage-300/30 drop-shadow-xl transform rotate-45" viewBox="0 0 100 100" fill="currentColor">
            <path d="M15,85 Q25,15 85,15 Q95,65 65,85 Q35,95 15,85 Z" />
            <path d="M15,85 Q50,50 85,15" stroke="#c5a059" strokeWidth="2" fill="none" opacity="0.5" />
          </svg>
        </motion.div>

        {/* Leaf 3 - Bottom Left */}
        <motion.div 
          className="absolute bottom-[22%] left-[14%] transition-transform duration-700 ease-out animate-float [animation-delay:4s]"
          style={{ transform: `translate3d(${mousePos.x * 25}px, ${mousePos.y * 35}px, 0)` }}
        >
          <svg className="w-12 h-12 text-gold-400/30 transform rotate-[-35deg]" viewBox="0 0 100 100" fill="currentColor">
            <path d="M10,80 Q20,20 80,10 Q90,50 60,80 Q30,90 10,80 Z" />
          </svg>
        </motion.div>

        {/* Leaf 4 - Bottom Right */}
        <motion.div 
          className="absolute bottom-[18%] right-[16%] transition-transform duration-700 ease-out animate-float [animation-delay:1.5s]"
          style={{ transform: `translate3d(${mousePos.x * -30}px, ${mousePos.y * -25}px, 0)` }}
        >
          <svg className="w-14 h-14 text-sage-400/35 transform rotate-12" viewBox="0 0 100 100" fill="currentColor">
            <path d="M10,80 Q20,20 80,10 Q90,50 60,80 Q30,90 10,80 Z" />
          </svg>
        </motion.div>
      </div>

      {/* Hero Content Container */}
      <motion.div 
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center"
      >
        
        {/* Terroir Badge / Heritage Callout with Entrance Animation */}
        <motion.div
          initial={{ opacity: 0, y: -15, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-gold-500/30 bg-forest-900/60 backdrop-blur-md mb-6 shadow-lg transform transition-all hover:border-gold-500/60"
        >
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span className="text-[11px] sm:text-xs tracking-[0.25em] uppercase text-ivory-200 font-sans font-medium">
            Nuwara Eliya Highlands · 6,240 FT Terroir
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
          <span className="text-[11px] sm:text-xs tracking-[0.15em] uppercase text-gold-300 hidden sm:inline">
            Single Estate
          </span>
        </motion.div>

        {/* Word-by-Word Cinematic Animated Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-tight leading-[1.08] max-w-4xl flex flex-col items-center">
          <TextReveal
            text="Rooted in Nature."
            as="span"
            className="block text-ivory-50 drop-shadow-sm font-normal"
            wordClassName="text-ivory-50"
            immediate={true}
            delay={0.15}
          />
          <TextReveal
            text="Crafted for Serenity."
            as="span"
            className="block italic text-gold-300 font-light mt-1 sm:mt-2"
            wordClassName="text-gold-300 italic font-light"
            immediate={true}
            delay={0.4}
          />
        </h1>

        {/* Supporting Editorial Subtitle with Staggered Fade */}
        <ParagraphReveal
          delay={0.65}
          immediate={true}
          className="mt-6 text-base sm:text-lg md:text-xl text-ivory-200/90 max-w-2xl font-light leading-relaxed font-sans"
        >
          Discover the timeless taste of authentic Ceylon tea, cultivated in the heart of Sri Lanka. Hand-picked at dawn where mountain mist meets the morning sun.
        </ParagraphReveal>

        {/* 3D-Style Luxury Packaging Floating Preview */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 mb-6 relative group cursor-pointer"
          onClick={onExplore}
          style={{
            transform: `perspective(1000px) rotateY(${mousePos.x * 9}deg) rotateX(${-mousePos.y * 9}deg)`,
            transition: 'transform 0.4s ease-out'
          }}
        >
          <div className="relative w-48 sm:w-56 h-48 sm:h-56 mx-auto flex items-center justify-center">
            {/* Ambient Gold Glow Behind Canister */}
            <div className="absolute inset-0 bg-gold-500/20 rounded-full blur-2xl group-hover:bg-gold-500/35 transition-all duration-700 animate-pulseGlow" />
            
            {/* Luxury Canister Visual Graphic */}
            <div className="relative w-36 sm:w-44 h-44 sm:h-52 bg-gradient-to-b from-[#1a221d] via-[#101813] to-[#0a100d] rounded-2xl border border-gold-500/50 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_20px_rgba(197,160,89,0.25)] flex flex-col items-center justify-between p-4 transform group-hover:scale-105 transition-transform duration-500">
              {/* Canister Metallic Cap with Gold Emboss */}
              <div className="w-full h-7 bg-gradient-to-r from-gold-600 via-gold-300 to-gold-700 rounded-lg shadow-inner flex items-center justify-center border-b border-gold-300/40">
                <span className="text-[8px] uppercase tracking-[0.25em] text-forest-950 font-bold">HERMETIC SEAL</span>
              </div>

              {/* Canister Body Label */}
              <div className="flex flex-col items-center text-center my-auto">
                <div className="w-9 h-9 rounded-full border border-gold-400/60 flex items-center justify-center mb-2 bg-forest-900/40">
                  <span className="font-serif text-gold-300 text-sm font-semibold">C</span>
                </div>
                <h3 className="font-serif text-sm tracking-[0.25em] text-ivory-100 font-semibold">CEYLORA</h3>
                <p className="text-[7.5px] uppercase tracking-[0.2em] text-gold-400 mt-0.5">Imperial Pekoe</p>
                <div className="mt-2 text-[6.5px] uppercase tracking-widest text-ivory-300/70 border-t border-gold-500/30 pt-1">
                  Nuwara Eliya · 6,240 FT
                </div>
              </div>

              {/* Certified Lion Emblem Tag */}
              <div className="w-full flex items-center justify-between text-[7px] text-ivory-300/60 border-t border-forest-800 pt-1 font-mono">
                <span>FLUSH 2026</span>
                <span className="text-gold-400">100g ℮</span>
              </div>
            </div>
          </div>
          <span className="text-[11px] text-gold-400/80 tracking-widest uppercase font-mono block mt-1">
            Tap to Inspect Harvest Tin
          </span>
        </motion.div>

        {/* Magnetic Primary and Secondary CTAs */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.95, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mt-2 w-full sm:w-auto"
        >
          <Magnetic strength={0.25}>
            <button
              onClick={onExplore}
              className="relative overflow-hidden w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-300 text-forest-950 font-semibold text-xs tracking-[0.25em] uppercase rounded-full shadow-[0_10px_30px_-5px_rgba(197,160,89,0.4)] hover:shadow-[0_15px_35px_-5px_rgba(197,160,89,0.6)] transform hover:-translate-y-0.5 transition-all duration-300 group"
            >
              <span className="relative z-10">Explore Our Teas</span>
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none" />
            </button>
          </Magnetic>
          
          <Magnetic strength={0.25}>
            <button
              onClick={onOurStory}
              className="w-full sm:w-auto px-8 py-4 border border-ivory-200/40 hover:border-gold-400 text-ivory-100 hover:text-gold-300 bg-forest-900/30 hover:bg-forest-900/60 backdrop-blur-sm text-xs tracking-[0.25em] uppercase rounded-full transition-all duration-300 flex items-center justify-center gap-2 group"
            >
              <Compass className="w-3.5 h-3.5 text-gold-400 group-hover:rotate-45 transition-transform duration-500" />
              <span>Our Story</span>
            </button>
          </Magnetic>
        </motion.div>

        {/* Proof Markers / Accreditations */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.15 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-ivory-300/70 border-t border-forest-800/60 pt-6"
        >
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-gold-400" />
            <span>100% Pure Ceylon Guaranteed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
            <span>Single-Estate Hand-Harvested</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold-400"></span>
            <span>Carbon-Neutral Global Shipping</span>
          </div>
        </motion.div>

        {/* Elegant Animated Scroll Indicator */}
        <div 
          onClick={onExplore}
          className="mt-10 cursor-pointer flex flex-col items-center gap-2 text-ivory-300/70 hover:text-gold-400 transition-colors group"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] font-sans">
            Scroll to Immerse
          </span>
          <div className="w-5 h-9 rounded-full border border-ivory-300/40 group-hover:border-gold-400 flex items-start justify-center p-1 transition-colors">
            <div className="w-1 h-2 bg-gold-400 rounded-full animate-bounce" />
          </div>
          <ArrowDown className="w-3.5 h-3.5 animate-pulse text-gold-400/80" />
        </div>
      </motion.div>
    </section>
  );
};
