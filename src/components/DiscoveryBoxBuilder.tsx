import React, { useState } from 'react';
import { TeaProduct } from '../types';
import { PRODUCTS } from '../data/teaData';
import { Gift, Check, Sparkles, ShoppingBag, ShieldCheck, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { TextReveal, ParagraphReveal, Magnetic, DriftingTeaLeaves } from '../utils/motion';

interface DiscoveryBoxBuilderProps {
  onAddBoxToCart: (customProduct: TeaProduct, quantity: number, note: string) => void;
}

export const DiscoveryBoxBuilder: React.FC<DiscoveryBoxBuilderProps> = ({ onAddBoxToCart }) => {
  const [selectedTeas, setSelectedTeas] = useState<string[]>([
    PRODUCTS[0].id,
    PRODUCTS[1].id,
    PRODUCTS[2].id,
  ]);
  const [subscriptionType, setSubscriptionType] = useState<'onetime' | 'subscription'>('subscription');
  const [giftInscription, setGiftInscription] = useState<string>('For Serene Mornings & Mindful Evenings');
  const [added, setAdded] = useState(false);

  const toggleTea = (id: string) => {
    if (selectedTeas.includes(id)) {
      if (selectedTeas.length > 1) {
        setSelectedTeas(selectedTeas.filter((t) => t !== id));
      }
    } else {
      if (selectedTeas.length < 3) {
        setSelectedTeas([...selectedTeas, id]);
      } else {
        setSelectedTeas([selectedTeas[0], selectedTeas[1], id]);
      }
    }
  };

  const price = subscriptionType === 'subscription' ? 74 : 88;

  const handleAddCustomBox = () => {
    const selectedNames = selectedTeas
      .map((id) => PRODUCTS.find((p) => p.id === id)?.name || '')
      .filter(Boolean)
      .join(' + ');

    const customBoxProduct: TeaProduct = {
      id: `bespoke-discovery-box-${Date.now()}`,
      name: `Bespoke Ceylon Flight (${subscriptionType === 'subscription' ? 'Bi-Monthly' : 'Collector Edition'})`,
      subtitle: `3x Micro-Tins: ${selectedNames}`,
      category: 'reserve',
      categoryLabel: 'Curated Flight',
      price: price,
      weight: '3x 40g (120g total) with Brass Infuser',
      rating: 5.0,
      reviewCount: 38,
      elevation: '4,500 - 6,240 ft',
      estate: 'Pedro, Adam’s Peak & Kandy Mist',
      region: 'Highland Terroir Selection',
      harvestSeason: 'Peak Flushes 2026',
      grade: 'Tasting Flight Collection',
      caffeine: 'Medium',
      tastingNotes: ['Curated by You', 'Single-Estate', 'Brass Spoon Included'],
      description: `Custom curated flight featuring: ${selectedNames}. Includes hand-forged golden tea spoon and gift casing.`,
      story: 'Crafted for connoisseurs seeking to explore the breadth of Sri Lankan single-origin terroirs in a single tasting flight.',
      imageUrl: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=1000&q=85',
      accentColor: '#c5a059',
      flavorProfile: { aroma: 9.8, body: 8.5, sweetness: 9.2, astringency: 3.5, finish: 9.6 },
      brewing: {
        temperatureC: 90,
        temperatureF: 194,
        steepTimeSec: 210,
        ratioGrams: 2.5,
        ratioWaterMl: 220,
        infusionCount: 3,
        sommelierTip: 'Begin with white tea in the morning, progress to green midday, and reserve pekoe or cinnamon herbal for sunset.'
      }
    };

    onAddBoxToCart(customBoxProduct, 1, giftInscription);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  };

  return (
    <section id="discovery-box" className="py-24 sm:py-32 bg-forest-900/60 relative overflow-hidden border-t border-forest-800">
      
      {/* Drifting Leaves */}
      <DriftingTeaLeaves density="low" />

      {/* Ambient Glow */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] bg-forest-800/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-forest-950 text-gold-400 text-xs uppercase tracking-[0.25em] mb-4"
          >
            <Gift className="w-3.5 h-3.5" />
            Bespoke Tasting Experience
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl text-ivory-50 font-normal leading-[1.15]">
            <TextReveal text="Curate Your Ceylon Flight" as="span" className="block" />
            <TextReveal text="Three Terroirs. One Sacred Box." as="span" className="italic font-light text-gold-300" delay={0.2} italicLastWord={true} />
          </h2>

          <ParagraphReveal delay={0.3} className="mt-4 text-ivory-300/80 text-sm sm:text-base font-light">
            Select three distinct highland teas. Each flight arrives in a hand-crafted paulownia wood presentation box with our signature brass leaf measure.
          </ParagraphReveal>
        </div>

        {/* 3-Step Interactive Customizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left: Step 1 Select 3 Teas */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-forest-800">
              <span className="text-xs font-mono uppercase tracking-widest text-gold-400">
                Step 1: Choose Any 3 Teas ({selectedTeas.length}/3 Selected)
              </span>
              <span className="text-xs text-ivory-300/60">
                Tap to toggle selections
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {PRODUCTS.map((tea) => {
                const isSelected = selectedTeas.includes(tea.id);
                return (
                  <motion.div
                    key={tea.id}
                    whileHover={{ scale: 1.02, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => toggleTea(tea.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-start gap-3.5 ${
                      isSelected
                        ? 'border-gold-400 bg-forest-950 shadow-xl'
                        : 'border-forest-800 bg-forest-900/40 hover:border-forest-700 opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div
                      className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-gold-500 text-forest-950'
                          : 'border border-forest-700 bg-forest-900'
                      }`}
                    >
                      {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                    </div>

                    <div className="flex-1">
                      <span className="text-[10px] font-mono uppercase tracking-wider text-gold-400 block">
                        {tea.categoryLabel}
                      </span>
                      <h4 className="font-serif text-base text-ivory-100 font-medium leading-snug">
                        {tea.name}
                      </h4>
                      <p className="text-xs text-ivory-300/60 font-mono mt-1">
                        {tea.elevation} · {tea.estate.split(',')[0]}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Step 2 Inscription */}
            <div className="pt-6 border-t border-forest-800">
              <span className="text-xs font-mono uppercase tracking-widest text-gold-400 block mb-2">
                Step 2: Personalized Calligraphy Card (Complimentary)
              </span>
              <input
                type="text"
                value={giftInscription}
                onChange={(e) => setGiftInscription(e.target.value)}
                placeholder="Enter personal note or gift recipient's name..."
                className="w-full bg-forest-950 border border-forest-800 rounded-xl px-4 py-3 text-sm text-ivory-100 placeholder:text-ivory-300/40 focus:outline-none focus:border-gold-400 transition-colors font-sans"
              />
            </div>
          </div>

          {/* Right: Summary & Subscription Toggle */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 bg-forest-950 border border-forest-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6"
          >
            <div className="flex items-center justify-between pb-4 border-b border-forest-800">
              <span className="font-serif text-xl text-ivory-50">Flight Summary</span>
              <span className="text-xs font-mono text-gold-400 uppercase tracking-widest">Paulownia Caddy</span>
            </div>

            {/* Selected Teas Preview */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-mono tracking-wider text-ivory-300/60 block">
                Included Micro-Tins (40g each):
              </span>
              {selectedTeas.map((id, index) => {
                const tea = PRODUCTS.find((p) => p.id === id);
                if (!tea) return null;
                return (
                  <motion.div 
                    key={id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-forest-900 border border-forest-800"
                  >
                    <span className="text-ivory-100 font-serif">
                      0{index + 1}. {tea.name}
                    </span>
                    <span className="text-[10px] font-mono text-gold-400">{tea.grade}</span>
                  </motion.div>
                );
              })}
            </div>

            {/* Included Accessories */}
            <div className="p-3.5 rounded-xl bg-forest-900/60 border border-forest-800 text-xs space-y-2">
              <div className="flex items-center gap-2 text-ivory-200">
                <Sparkles className="w-3.5 h-3.5 text-gold-400" />
                <span>Hand-hammered Brass Measuring Spoon ($18 value) — Free</span>
              </div>
              <div className="flex items-center gap-2 text-ivory-200">
                <Heart className="w-3.5 h-3.5 text-gold-400" />
                <span>Gold Foil Tasting Journal with Estate Map — Free</span>
              </div>
            </div>

            {/* Frequency Selector */}
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-mono tracking-wider text-ivory-300/60 block">
                Delivery Plan
              </span>
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => setSubscriptionType('subscription')}
                  className={`p-3 rounded-xl border text-left text-xs transition-colors ${
                    subscriptionType === 'subscription'
                      ? 'border-gold-400 bg-forest-900 text-ivory-100 font-semibold shadow'
                      : 'border-forest-800 bg-forest-950 text-ivory-300'
                  }`}
                >
                  <span className="block text-[10px] text-gold-400 uppercase font-mono">Save 15%</span>
                  <span className="text-sm font-serif">Bi-Monthly</span>
                  <p className="text-[11px] font-mono text-gold-300 mt-1">$74 / delivery</p>
                </button>

                <button
                  onClick={() => setSubscriptionType('onetime')}
                  className={`p-3 rounded-xl border text-left text-xs transition-colors ${
                    subscriptionType === 'onetime'
                      ? 'border-gold-400 bg-forest-900 text-ivory-100 font-semibold shadow'
                      : 'border-forest-800 bg-forest-950 text-ivory-300'
                  }`}
                >
                  <span className="block text-[10px] text-ivory-300/60 uppercase font-mono">Standard</span>
                  <span className="text-sm font-serif">One-Time Gift</span>
                  <p className="text-[11px] font-mono text-ivory-200 mt-1">$88</p>
                </button>
              </div>
            </div>

            {/* Total and Action with Magnetic Button */}
            <div className="pt-4 border-t border-forest-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase font-mono tracking-wider text-ivory-300/60 block">Total</span>
                <span className="font-serif text-3xl text-gold-300 font-semibold">${price}</span>
              </div>

              <Magnetic strength={0.3}>
                <button
                  onClick={handleAddCustomBox}
                  className={`py-3.5 px-6 rounded-full text-xs font-semibold uppercase tracking-[0.2em] flex items-center gap-2 transition-all ${
                    added
                      ? 'bg-sage-600 text-ivory-50 scale-105'
                      : 'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-forest-950 hover:from-gold-400 shadow-xl hover:scale-105'
                  }`}
                >
                  {added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added Custom Flight</span>
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      <span>Claim Tasting Box</span>
                    </>
                  )}
                </button>
              </Magnetic>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-ivory-300/60 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-gold-400" />
              <span>Cancel or pause subscription anytime in 1-click</span>
            </div>

          </motion.div>

        </div>

      </div>
    </section>
  );
};
