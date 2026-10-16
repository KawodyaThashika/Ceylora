import React, { useState, useEffect } from 'react';
import { ShoppingBag, Volume2, VolumeX, Menu, X, Globe, Sparkles, ChevronRight } from 'lucide-react';
import { soundscape } from '../utils/soundscape';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onNavigate: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onOpenCart, onNavigate }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currency, setCurrency] = useState<'USD' | 'EUR' | 'GBP'>('USD');
  const [currencyOpen, setCurrencyOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const active = soundscape.toggle();
    setIsAudioPlaying(active);
  };

  const navLinks = [
    { label: 'Collection', id: 'collection' },
    { label: 'The 5-Stage Journey', id: 'journey' },
    { label: 'The Sovereign Tin', id: 'sovereign-tin' },
    { label: 'Brewing Ritual', id: 'brewing-guide' },
    { label: 'Terroir & Heritage', id: 'heritage' },
    { label: 'Discovery Box', id: 'discovery-box' },
  ];

  return (
    <>
      {/* Top Luxury Announcement Bar with AnimatePresence */}
      <motion.div 
        animate={{ height: scrolled ? 0 : 'auto', opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="bg-forest-900 border-b border-forest-800/60 text-xs px-4 text-center tracking-widest text-ivory-200/90 font-sans flex items-center justify-center gap-3 relative z-50 overflow-hidden"
      >
        <div className="py-2 flex items-center justify-center gap-3">
          <span className="hidden md:inline-flex items-center gap-1.5 text-gold-400 font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            SINGLE-ESTATE PURITY
          </span>
          <span className="text-ivory-300">
            Complimentary Worldwide Express Delivery on orders over $75 · Harvested at Pedro & Dimbula Estates
          </span>
          <button 
            onClick={() => onNavigate('collection')}
            className="hidden sm:inline-flex items-center gap-1 text-gold-400 hover:text-gold-300 underline underline-offset-2 ml-1"
          >
            Acquire Now <ChevronRight className="w-3 h-3" />
          </button>
        </div>
      </motion.div>

      {/* Main Luxury Navigation Bar */}
      <motion.header
        animate={{
          backgroundColor: scrolled ? 'rgba(6, 19, 12, 0.94)' : 'rgba(6, 19, 12, 0.4)',
          backdropFilter: scrolled ? 'blur(16px)' : 'blur(4px)',
          paddingTop: scrolled ? '0.75rem' : '1.25rem',
          paddingBottom: scrolled ? '0.75rem' : '1.25rem',
          borderBottomColor: scrolled ? 'rgba(23, 60, 42, 0.6)' : 'rgba(23, 60, 42, 0)',
        }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-40 border-b shadow-2xl transition-all"
        style={{ marginTop: scrolled ? 0 : undefined }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open mobile navigation menu"
            className="lg:hidden p-2 text-ivory-200 hover:text-gold-400 transition-colors"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Left Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs uppercase tracking-[0.2em] font-medium text-ivory-200/80">
            {navLinks.slice(0, 3).map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="hover:text-gold-400 transition-colors relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gold-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            ))}
          </nav>

          {/* Brand Identity / Center Monogram */}
          <motion.div 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="cursor-pointer text-center group flex flex-col items-center"
          >
            <div className="flex items-center gap-2">
              <span className="w-4 h-[1px] bg-gold-400/60 hidden sm:block"></span>
              <h1 className="font-serif tracking-[0.28em] text-2xl sm:text-3xl text-ivory-50 font-normal group-hover:text-gold-300 transition-colors">
                CEYLORA
              </h1>
              <span className="w-4 h-[1px] bg-gold-400/60 hidden sm:block"></span>
            </div>
            <span className="font-sans text-[9px] uppercase tracking-[0.35em] text-gold-400/80 -mt-0.5">
              Nature in Every Sip · Ceylon
            </span>
          </motion.div>

          {/* Right Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center space-x-7 text-xs uppercase tracking-[0.2em] font-medium text-ivory-200/80">
            {navLinks.slice(3).map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className="hover:text-gold-400 transition-colors relative group py-1"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-gold-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            ))}
          </nav>

          {/* Right Actions: Highland Soundscape, Currency, Cart */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Ambient Soundscape Toggle with Visualizer Bars */}
            <button
              onClick={toggleSound}
              title={isAudioPlaying ? 'Mute Ceylon Highland Breeze' : 'Play Ceylon Highland Breeze Soundscape'}
              className={`p-2 rounded-full border transition-all duration-300 flex items-center gap-2 text-xs ${
                isAudioPlaying
                  ? 'border-gold-500/70 bg-forest-900 text-gold-300 shadow-[0_0_15px_rgba(197,160,89,0.3)]'
                  : 'border-forest-700/60 bg-forest-900/50 text-ivory-300/70 hover:border-gold-500/40 hover:text-ivory-100'
              }`}
            >
              {isAudioPlaying ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-gold-400 animate-pulse" />
                  <span className="hidden xl:inline text-[10px] tracking-wider uppercase font-medium">Breeze On</span>
                  <div className="flex items-end gap-[2px] h-3">
                    <span className="w-[2px] h-full bg-gold-400 animate-[pulse_0.8s_infinite]"></span>
                    <span className="w-[2px] h-2/3 bg-gold-400 animate-[pulse_1.1s_infinite]"></span>
                    <span className="w-[2px] h-4/5 bg-gold-400 animate-[pulse_0.9s_infinite]"></span>
                  </div>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5" />
                  <span className="hidden xl:inline text-[10px] tracking-wider uppercase">Ambience</span>
                </>
              )}
            </button>

            {/* Currency Switcher */}
            <div className="relative">
              <button
                onClick={() => setCurrencyOpen(!currencyOpen)}
                className="hidden sm:flex items-center gap-1.5 text-xs text-ivory-300 hover:text-gold-400 transition-colors uppercase tracking-wider px-2 py-1"
              >
                <Globe className="w-3.5 h-3.5 text-gold-400/80" />
                <span>{currency}</span>
              </button>
              {currencyOpen && (
                <div className="absolute right-0 mt-2 w-28 bg-forest-900 border border-forest-700/80 rounded shadow-xl py-1 text-xs z-50">
                  {(['USD', 'EUR', 'GBP'] as const).map((curr) => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setCurrencyOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 hover:bg-forest-800 transition-colors ${
                        currency === curr ? 'text-gold-400 font-semibold' : 'text-ivory-200'
                      }`}
                    >
                      {curr === 'USD' ? '$ USD' : curr === 'EUR' ? '€ EUR' : '£ GBP'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Shopping Cart Trigger with Animated Badge Bounce */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.92 }}
              onClick={onOpenCart}
              aria-label={`View shopping cart, ${cartCount} items`}
              className="relative p-2.5 rounded-full border border-forest-700/60 bg-forest-900/60 hover:bg-forest-800/80 hover:border-gold-500/50 text-ivory-100 transition-all group"
            >
              <ShoppingBag className="w-4 h-4 text-ivory-200 group-hover:text-gold-400 transition-colors" />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span 
                    key={cartCount}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                    className="absolute -top-1 -right-1 bg-gradient-to-r from-gold-500 to-gold-400 text-forest-950 font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md"
                  >
                    {cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Slide-in Drawer with AnimatePresence */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 lg:hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-forest-950/80 backdrop-blur-md"
            />

            {/* Drawer Content */}
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-y-0 left-0 w-full max-w-xs bg-forest-950 border-r border-forest-800/80 p-6 shadow-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between pb-6 border-b border-forest-800/70">
                  <div>
                    <h2 className="font-serif tracking-[0.2em] text-xl text-ivory-50">CEYLORA</h2>
                    <p className="text-[10px] uppercase tracking-widest text-gold-400">Sri Lanka · Nuwara Eliya</p>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    aria-label="Close mobile menu"
                    className="p-1.5 text-ivory-300 hover:text-white"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <nav className="mt-8 space-y-4">
                  {navLinks.map((link) => (
                    <button
                      key={link.id}
                      onClick={() => {
                        onNavigate(link.id);
                        setMobileMenuOpen(false);
                      }}
                      className="block w-full text-left py-2 text-sm uppercase tracking-[0.2em] text-ivory-200 hover:text-gold-400 border-b border-forest-900 transition-colors"
                    >
                      {link.label}
                    </button>
                  ))}
                </nav>
              </div>

              <div className="pt-6 border-t border-forest-800/70 text-xs text-ivory-300/80 space-y-3">
                <div className="flex items-center justify-between">
                  <span>Ambient Soundscape</span>
                  <button
                    onClick={toggleSound}
                    className="text-gold-400 font-medium underline"
                  >
                    {isAudioPlaying ? 'Breeze On' : 'Play Sound'}
                  </button>
                </div>
                <p className="text-[11px] text-ivory-300/60 leading-relaxed">
                  Hand-picked single-estate Ceylon tea from the Pedro & Dimbula highlands.
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
