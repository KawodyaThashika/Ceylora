import React, { useState } from 'react';
import { TeaProduct } from '../types';
import { PRODUCTS } from '../data/teaData';
import { Shield, Check, ShoppingBag, RefreshCw, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextReveal, ParagraphReveal, Card3DTilt, Magnetic, DriftingTeaLeaves } from '../utils/motion';

interface SovereignTinShowcaseProps {
  onAddToCart: (product: TeaProduct, quantity: number, format: 'Whole Leaf Tin' | 'Silk Pyramids (20x)' | 'Refill Pouch') => void;
}

export const SovereignTinShowcase: React.FC<SovereignTinShowcaseProps> = ({ onAddToCart }) => {
  const [activeAngle, setActiveAngle] = useState<number>(0);
  const [activeHotspot, setActiveHotspot] = useState<number>(0);
  const [added, setAdded] = useState(false);

  // The featured hero product for the showcase: Single-Origin Golden Tip Reserve
  const heroProduct = PRODUCTS[5] || PRODUCTS[0];

  const angles = [
    {
      id: 0,
      label: 'Front View',
      title: 'Monolithic Silhouette',
      description: 'Double-walled matte midnight aluminum with hand-applied gold leaf serif typography.',
      img: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=1200&q=85',
    },
    {
      id: 1,
      label: '45° Profile',
      title: 'Airtight Brass Crown',
      description: 'Precision-machined brass hermetic screw lid locking out oxygen, light, and humidity.',
      img: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=85',
    },
    {
      id: 2,
      label: 'Unsealed Leaf',
      title: 'Whole Needle Purity',
      description: 'Gently unfurled unbroken leaf buds with gleaming golden trichomes resting inside food-grade virgin tinplate.',
      img: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1200&q=85',
    },
    {
      id: 3,
      label: 'Collector Caddy',
      title: 'Artisan Lacquered Wood',
      description: 'Includes our handcrafted Ceylon teak outer casing with individually engraved batch serial number.',
      img: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=85',
    },
  ];

  const hotspots = [
    {
      id: 0,
      name: 'Oxygen-Free Hermetic Seal',
      desc: 'Inner silicone compression ring prevents oxidation of delicate floral catechins for up to 24 months.',
    },
    {
      id: 1,
      name: 'UV Light Barrier Coating',
      desc: 'Multi-layer matte black exterior shields polyphenols against ambient sunlight degradation.',
    },
    {
      id: 2,
      name: 'Ceylon Lion Board Authenticity',
      desc: 'Official 17-leaf lion insignia embossed in genuine gold leaf, certifying 100% pure Ceylon origin.',
    },
    {
      id: 3,
      name: 'Micro-Lot GPS Coordinates',
      desc: 'Laser-etched QR on base connects directly to Pedro Estate Block 4 meteorological weather logs.',
    },
  ];

  const handlePurchase = () => {
    onAddToCart(heroProduct, 1, 'Whole Leaf Tin');
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <section id="sovereign-tin" className="py-24 sm:py-32 bg-forest-900/50 relative overflow-hidden border-t border-forest-800">
      
      {/* Drifting Leaves */}
      <DriftingTeaLeaves density="low" />

      {/* Background radial spotlight */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[700px] bg-forest-800/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-forest-950 text-gold-400 text-xs uppercase tracking-[0.25em] mb-4"
          >
            <Layers className="w-3.5 h-3.5" />
            Vessel Architecture
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory-50 font-normal leading-[1.15]">
            <TextReveal text="The Sovereign Tin" as="span" className="block" />
            <TextReveal text="Engineering Eternal Freshness" as="span" className="italic font-light text-gold-300" delay={0.2} italicLastWord={true} />
          </h2>

          <ParagraphReveal delay={0.3} className="mt-4 text-ivory-300/80 text-sm sm:text-base font-light">
            Designed like a sacred chronometer to safeguard the fleeting aromatic soul of the high country.
          </ParagraphReveal>
        </div>

        {/* Split Screen Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Interactive 360 / Multi-Angle Visual Showcase */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Visual Display Container with 3D Tilt */}
            <Card3DTilt maxTilt={5} className="w-full max-w-lg aspect-square">
              <div className="relative w-full h-full rounded-3xl overflow-hidden border border-forest-800/90 bg-forest-950 shadow-2xl p-4 sm:p-6 group">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={angles[activeAngle].img}
                    src={angles[activeAngle].img}
                    alt={angles[activeAngle].title}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </AnimatePresence>

                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-transparent to-forest-950/20 pointer-events-none" />

                {/* Angle Tag Indicator */}
                <div className="absolute top-6 left-6 px-3 py-1.5 rounded-full bg-forest-950/85 backdrop-blur-md border border-gold-500/30 text-gold-300 text-xs font-mono shadow-lg">
                  {angles[activeAngle].label} · {angles[activeAngle].title}
                </div>

                {/* Interactive Hotspot Pills in Image */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-2">
                  {hotspots.map((spot, idx) => (
                    <button
                      key={spot.id}
                      onClick={() => setActiveHotspot(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-sans transition-all backdrop-blur-md ${
                        activeHotspot === idx
                          ? 'bg-gold-500 text-forest-950 font-semibold shadow-lg scale-105'
                          : 'bg-forest-950/80 text-ivory-200 border border-forest-700/80 hover:border-gold-400'
                      }`}
                    >
                      0{idx + 1}. {spot.name.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            </Card3DTilt>

            {/* Angle Selector Tabs with Spring Motion */}
            <div className="flex items-center gap-2 mt-6">
              <span className="text-xs uppercase font-mono tracking-wider text-ivory-300/60 mr-2 flex items-center gap-1">
                <RefreshCw className="w-3 h-3 text-gold-400" />
                Angles:
              </span>
              {angles.map((ang) => (
                <button
                  key={ang.id}
                  onClick={() => setActiveAngle(ang.id)}
                  className={`px-3.5 py-1.5 rounded-full text-xs transition-all ${
                    activeAngle === ang.id
                      ? 'bg-gold-500 text-forest-950 font-semibold shadow scale-105'
                      : 'bg-forest-900 border border-forest-800 text-ivory-300 hover:text-white'
                  }`}
                >
                  {ang.label}
                </button>
              ))}
            </div>

          </div>

          {/* Right: Technical Storytelling & Tasting Metrics */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-gold-400">
                Specifications & Sensory Craft
              </span>

              <h3 className="font-serif text-3xl sm:text-4xl text-ivory-50 mt-2 font-normal">
                {heroProduct.name}
              </h3>

              <ParagraphReveal delay={0.15} className="mt-4 text-ivory-300/80 leading-relaxed font-light text-sm sm:text-base">
                {angles[activeAngle].description}
              </ParagraphReveal>

              {/* Active Hotspot Deep Dive with AnimatePresence */}
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeHotspot}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-6 p-5 rounded-2xl bg-forest-950/80 border border-gold-500/30 shadow-lg"
                >
                  <div className="flex items-center gap-2 text-gold-300 font-serif text-base mb-1">
                    <Shield className="w-4 h-4 text-gold-400" />
                    <span>{hotspots[activeHotspot].name}</span>
                  </div>
                  <p className="text-xs text-ivory-300/90 leading-relaxed font-light">
                    {hotspots[activeHotspot].desc}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Live Sensory Taste Radar / Animated Bars */}
              <div className="mt-6 space-y-3">
                <span className="text-[10px] uppercase font-mono tracking-widest text-ivory-300/70 block">
                  Sommelier Profile Balance
                </span>

                {[
                  { label: 'Aromatic Complexity', value: heroProduct.flavorProfile.aroma },
                  { label: 'Body & Mouthfeel', value: heroProduct.flavorProfile.body },
                  { label: 'Natural Sweetness', value: heroProduct.flavorProfile.sweetness },
                  { label: 'Highland Finish (Lingering)', value: heroProduct.flavorProfile.finish },
                ].map((stat) => (
                  <div key={stat.label} className="space-y-1">
                    <div className="flex justify-between text-xs font-sans text-ivory-200">
                      <span>{stat.label}</span>
                      <span className="font-mono text-gold-400">{stat.value} / 10</span>
                    </div>
                    <div className="w-full h-1.5 bg-forest-950 rounded-full overflow-hidden border border-forest-800">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${stat.value * 10}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="h-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-300 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Direct Purchase CTA Bar with Magnetic Attraction */}
            <div className="pt-8 mt-8 border-t border-forest-800/80 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-widest text-ivory-300/60 block">
                  Collector Canister Edition
                </span>
                <span className="font-serif text-2xl text-gold-300 font-semibold">
                  ${heroProduct.price}
                </span>
                <span className="text-xs text-ivory-300/60 ml-2 font-mono">/ 50g Caddy</span>
              </div>

              <Magnetic strength={0.3}>
                <button
                  onClick={handlePurchase}
                  className={`py-3.5 px-8 rounded-full text-xs font-semibold uppercase tracking-[0.2em] flex items-center gap-2 transition-all duration-300 ${
                    added
                      ? 'bg-sage-600 text-ivory-50 scale-105'
                      : 'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 hover:to-gold-300 text-forest-950 shadow-xl hover:scale-105'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Caddy</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Acquire Sovereign Tin</span>
                    </>
                  )}
                </button>
              </Magnetic>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
