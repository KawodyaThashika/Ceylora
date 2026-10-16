import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Droplets, Thermometer, Clock, Sparkles, Volume2, CheckCircle2 } from 'lucide-react';
import { soundscape } from '../utils/soundscape';
import { motion, AnimatePresence } from 'framer-motion';
import { TextReveal, ParagraphReveal, Magnetic, DriftingTeaLeaves } from '../utils/motion';

interface TeaBrewSpec {
  id: string;
  name: string;
  tempC: number;
  tempF: number;
  defaultTimeSec: number;
  ratioGrams: number;
  waterMl: number;
  liquorColorStart: string;
  liquorColorEnd: string;
  vessel: string;
  sommelierGuidance: string;
}

const BREW_SPECS: TeaBrewSpec[] = [
  {
    id: 'black',
    name: 'High-Grown Black Tea',
    tempC: 95,
    tempF: 203,
    defaultTimeSec: 180,
    ratioGrams: 2.5,
    waterMl: 220,
    liquorColorStart: '#f7d08a',
    liquorColorEnd: '#c45a1b',
    vessel: 'Porcelain Gaiwan or Pre-warmed Bone China Pot',
    sommelierGuidance: 'Highland Ceylon black teas require water just under full boil to release complex linalool and sweet muscatel notes without scalding tannins.'
  },
  {
    id: 'white',
    name: 'Imperial Silver Needle White',
    tempC: 80,
    tempF: 176,
    defaultTimeSec: 240,
    ratioGrams: 3.0,
    waterMl: 200,
    liquorColorStart: '#fbfbf0',
    liquorColorEnd: '#e8dc9b',
    vessel: 'Tall Clear Glass Tumbler (to admire the dancing trichomes)',
    sommelierGuidance: 'Never use boiling water. Let the unopened silver buds float and dance vertically. Multiple re-steepings yield sweeter honeysuckle nectar.'
  },
  {
    id: 'green',
    name: 'Emerald Mist Green Tea',
    tempC: 75,
    tempF: 167,
    defaultTimeSec: 150,
    ratioGrams: 2.0,
    waterMl: 200,
    liquorColorStart: '#edf5e6',
    liquorColorEnd: '#a3be8c',
    vessel: 'Unglazed Kyusu or Thin Glass Infuser',
    sommelierGuidance: 'Gentle temperature preserves the antioxidant catechins (EGCG) and sweet amino acids. Discard no drops; decant fully to prevent bitterness.'
  },
  {
    id: 'earlgrey',
    name: 'Royal Ceylon Earl Grey',
    tempC: 98,
    tempF: 208,
    defaultTimeSec: 210,
    ratioGrams: 2.5,
    waterMl: 230,
    liquorColorStart: '#e8b87d',
    liquorColorEnd: '#9e3d1b',
    vessel: 'British Silver or Enamel Teapot',
    sommelierGuidance: 'Hotter water lifts the Calabrian cold-pressed bergamot citrus oils into the steam. Extraordinary paired with lemon zest or shortbread.'
  },
  {
    id: 'herbal',
    name: 'Highland Lemongrass & Cinnamon',
    tempC: 100,
    tempF: 212,
    defaultTimeSec: 360,
    ratioGrams: 3.5,
    waterMl: 250,
    liquorColorStart: '#fcefc7',
    liquorColorEnd: '#b56d2e',
    vessel: 'Double-Walled Glass Carafe',
    sommelierGuidance: 'Bark quills and fibrous lemongrass stalks require full rolling boil and a patient 6-minute steep to coax out therapeutic essential oils.'
  }
];

export const BrewingRitual: React.FC = () => {
  const [activeTeaId, setActiveTeaId] = useState<string>('black');
  const [tempUnit, setTempUnit] = useState<'C' | 'F'>('C');
  const [timeLeft, setTimeLeft] = useState<number>(180);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [completed, setCompleted] = useState<boolean>(false);

  const activeSpec = BREW_SPECS.find((s) => s.id === activeTeaId) || BREW_SPECS[0];
  const totalTime = activeSpec.defaultTimeSec;
  const progressPercent = Math.min(100, Math.max(0, ((totalTime - timeLeft) / totalTime) * 100));

  // Reset timer whenever selected tea changes
  useEffect(() => {
    setTimeLeft(activeSpec.defaultTimeSec);
    setIsRunning(false);
    setCompleted(false);
  }, [activeTeaId]);

  // Timer tick effect
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setCompleted(true);
            // Play peaceful meditation singing bowl chime!
            soundscape.playSingingBowl();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, timeLeft]);

  const toggleTimer = () => {
    if (completed) {
      setTimeLeft(totalTime);
      setCompleted(false);
      setIsRunning(true);
    } else {
      setIsRunning(!isRunning);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(totalTime);
    setCompleted(false);
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <section id="brewing-guide" className="py-24 sm:py-32 bg-forest-950 relative overflow-hidden border-t border-forest-900">
      
      {/* Drifting Leaves */}
      <DriftingTeaLeaves density="low" />

      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[550px] bg-forest-900/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-forest-900/40 text-gold-400 text-xs uppercase tracking-[0.25em] mb-4"
          >
            <Sparkles className="w-3.5 h-3.5" />
            The Art of the Steep
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory-50 font-normal leading-[1.15]">
            <TextReveal text="Interactive Brewing Ritual" as="span" className="block" />
            <TextReveal text="Awakening The Leaf" as="span" className="italic font-light text-gold-300" delay={0.2} italicLastWord={true} />
          </h2>

          <ParagraphReveal delay={0.3} className="mt-4 text-ivory-300/80 text-sm sm:text-base font-light">
            Select your Ceylon cultivar below and experience the time-honored infusion parameters crafted by our master sommeliers.
          </ParagraphReveal>
        </div>

        {/* Tea Variety Selector Tabs with Staggered Scale */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-16">
          {BREW_SPECS.map((tea) => (
            <button
              key={tea.id}
              onClick={() => setActiveTeaId(tea.id)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs font-sans tracking-wider transition-all duration-300 ${
                activeTeaId === tea.id
                  ? 'bg-gold-500 text-forest-950 font-semibold shadow-xl scale-105'
                  : 'bg-forest-900/60 border border-forest-800 text-ivory-300/80 hover:border-gold-500/50 hover:text-white'
              }`}
            >
              {tea.name}
            </button>
          ))}
        </div>

        {/* Main Brewing Ritual Console with Entrance Motion */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-forest-900/40 border border-forest-800 rounded-3xl p-6 sm:p-12 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
        >
          
          {/* Left Column: Animated Steeping Cup & Circular Countdown */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            
            {/* Visual Teacup with Dynamic Infusion Color */}
            <div className="relative w-64 h-64 flex items-center justify-center">
              
              {/* Outer Circular Progress Ring */}
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="text-forest-800 stroke-current"
                  strokeWidth="3"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  className="text-gold-400 stroke-current transition-all duration-1000 ease-linear"
                  strokeWidth="3.5"
                  strokeDasharray={283}
                  strokeDashoffset={283 - (283 * progressPercent) / 100}
                  strokeLinecap="round"
                  fill="transparent"
                />
              </svg>

              {/* Center Porcelain Cup Illustration with Dynamic Liquor and Rising Steam */}
              <div className="absolute inset-8 rounded-full border border-forest-700/80 bg-forest-950 shadow-inner flex flex-col items-center justify-center p-4 overflow-hidden">
                
                {/* Steeping Liquid Background with Color Deepening */}
                <motion.div
                  className="absolute inset-0 transition-colors duration-1000 opacity-80"
                  animate={{
                    backgroundColor: progressPercent > 50 ? activeSpec.liquorColorEnd : activeSpec.liquorColorStart,
                  }}
                  style={{
                    filter: 'blur(20px)'
                  }}
                />

                {/* Animated Rising Steam Wisps */}
                {isRunning && (
                  <div className="absolute top-3 inset-x-0 flex justify-center gap-2 pointer-events-none opacity-60">
                    <motion.span
                      animate={{ y: [-2, -18, -2], opacity: [0.2, 0.7, 0.2] }}
                      transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      className="w-1.5 h-6 bg-white/40 rounded-full blur-[1px]"
                    />
                    <motion.span
                      animate={{ y: [-4, -22, -4], opacity: [0.3, 0.8, 0.3] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
                      className="w-1.5 h-8 bg-white/30 rounded-full blur-[1px]"
                    />
                    <motion.span
                      animate={{ y: [-3, -16, -3], opacity: [0.2, 0.6, 0.2] }}
                      transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
                      className="w-1.5 h-5 bg-white/40 rounded-full blur-[1px]"
                    />
                  </div>
                )}

                {/* Digital Clock Display */}
                <div className="relative z-10 text-center">
                  <span className="font-mono text-4xl sm:text-5xl font-light text-ivory-50 tracking-tight">
                    {minutes}:{seconds.toString().padStart(2, '0')}
                  </span>
                  <p className="text-[10px] uppercase font-mono tracking-widest text-gold-400 mt-1">
                    {completed ? 'Steeping Complete' : isRunning ? 'Steeping in Progress' : 'Ready to Infuse'}
                  </p>
                </div>
              </div>
            </div>

            {/* Steeping Controls (Play / Pause / Reset) with Magnetic Attraction */}
            <div className="flex items-center gap-4 mt-8">
              <Magnetic strength={0.25}>
                <button
                  onClick={toggleTimer}
                  className="px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-forest-950 font-semibold text-xs tracking-[0.2em] uppercase shadow-lg flex items-center gap-2 transition-all"
                >
                  {isRunning ? (
                    <>
                      <Pause className="w-4 h-4" />
                      <span>Pause Steep</span>
                    </>
                  ) : completed ? (
                    <>
                      <RotateCcw className="w-4 h-4" />
                      <span>Steep Again</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      <span>Begin Steep</span>
                    </>
                  )}
                </button>
              </Magnetic>

              <Magnetic strength={0.3}>
                <button
                  onClick={resetTimer}
                  title="Reset Steeping Timer"
                  className="p-3.5 rounded-full border border-forest-700 bg-forest-950/80 hover:border-gold-500/50 text-ivory-300 hover:text-white transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </Magnetic>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-ivory-300/60 mt-3 font-mono">
              <Volume2 className="w-3.5 h-3.5 text-gold-400" />
              <span>Sings Tibetan Bell upon completion</span>
            </div>

          </div>

          {/* Right Column: Three Parameter Gauges & Sommelier Guide */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            
            <div>
              {/* Header with Unit Toggle */}
              <div className="flex items-center justify-between pb-6 border-b border-forest-800">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeSpec.id}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.25 }}
                  >
                    <h3 className="font-serif text-2xl sm:text-3xl text-ivory-50">
                      {activeSpec.name}
                    </h3>
                    <p className="text-xs text-gold-400 font-mono uppercase tracking-wider mt-0.5">
                      Recommended Infusion Standard
                    </p>
                  </motion.div>
                </AnimatePresence>

                {/* Celsius / Fahrenheit Toggle */}
                <div className="flex items-center bg-forest-950 border border-forest-800 rounded-full p-1 text-xs font-mono">
                  <button
                    onClick={() => setTempUnit('C')}
                    className={`px-3 py-1 rounded-full transition-colors ${
                      tempUnit === 'C' ? 'bg-gold-500 text-forest-950 font-bold' : 'text-ivory-300 hover:text-white'
                    }`}
                  >
                    °C
                  </button>
                  <button
                    onClick={() => setTempUnit('F')}
                    className={`px-3 py-1 rounded-full transition-colors ${
                      tempUnit === 'F' ? 'bg-gold-500 text-forest-950 font-bold' : 'text-ivory-300 hover:text-white'
                    }`}
                  >
                    °F
                  </button>
                </div>
              </div>

              {/* The 3 Core Parameters Gauges */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
                
                {/* 1. Temperature */}
                <motion.div whileHover={{ y: -3 }} className="p-4 rounded-2xl bg-forest-950 border border-forest-800/80 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-gold-400 mb-2">
                    <Thermometer className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ivory-300/60">Water Temp</span>
                  </div>
                  <span className="font-mono text-2xl text-ivory-50">
                    {tempUnit === 'C' ? `${activeSpec.tempC}°C` : `${activeSpec.tempF}°F`}
                  </span>
                  <p className="text-[11px] text-ivory-300/70 mt-1">
                    {activeSpec.tempC >= 95 ? 'Just off the boil' : 'Soft simmer / cooled'}
                  </p>
                </motion.div>

                {/* 2. Steeping Duration */}
                <motion.div whileHover={{ y: -3 }} className="p-4 rounded-2xl bg-forest-950 border border-forest-800/80 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-gold-400 mb-2">
                    <Clock className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ivory-300/60">Infusion Time</span>
                  </div>
                  <span className="font-mono text-2xl text-ivory-50">
                    {Math.floor(activeSpec.defaultTimeSec / 60)}:{(activeSpec.defaultTimeSec % 60).toString().padStart(2, '0')}
                  </span>
                  <p className="text-[11px] text-ivory-300/70 mt-1">
                    Minutes : Seconds
                  </p>
                </motion.div>

                {/* 3. Water-to-Tea Ratio */}
                <motion.div whileHover={{ y: -3 }} className="p-4 rounded-2xl bg-forest-950 border border-forest-800/80 flex flex-col justify-between">
                  <div className="flex items-center justify-between text-gold-400 mb-2">
                    <Droplets className="w-4 h-4" />
                    <span className="text-[10px] font-mono uppercase tracking-wider text-ivory-300/60">Leaf : Water</span>
                  </div>
                  <span className="font-mono text-2xl text-ivory-50">
                    {activeSpec.ratioGrams}g : {activeSpec.waterMl}ml
                  </span>
                  <p className="text-[11px] text-ivory-300/70 mt-1">
                    Approx. 1 heaped spoon
                  </p>
                </motion.div>

              </div>

              {/* Recommended Vessel */}
              <div className="p-4 rounded-2xl bg-forest-950/80 border border-forest-800/80 mb-6">
                <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400 block mb-1">
                  Ideal Steeping Vessel
                </span>
                <p className="text-xs sm:text-sm text-ivory-100 font-sans">
                  {activeSpec.vessel}
                </p>
              </div>

              {/* Sommelier Secret */}
              <div className="p-5 rounded-2xl bg-forest-950 border border-gold-500/25">
                <div className="flex items-center gap-2 text-gold-300 font-serif text-sm mb-1">
                  <CheckCircle2 className="w-4 h-4 text-gold-400" />
                  <span>Sommelier Master Tip</span>
                </div>
                <p className="text-xs sm:text-sm text-ivory-200/90 leading-relaxed font-light">
                  {activeSpec.sommelierGuidance}
                </p>
              </div>

            </div>

          </div>

        </motion.div>

      </div>
    </section>
  );
};
