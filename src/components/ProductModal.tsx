import React, { useState } from 'react';
import { TeaProduct } from '../types';
import { X, Check, ShoppingBag, Thermometer, Clock, Droplets } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductModalProps {
  product: TeaProduct | null;
  onClose: () => void;
  onAddToCart: (product: TeaProduct, quantity: number, format: 'Whole Leaf Tin' | 'Silk Pyramids (20x)' | 'Refill Pouch') => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose, onAddToCart }) => {
  const [selectedFormat, setSelectedFormat] = useState<'Whole Leaf Tin' | 'Silk Pyramids (20x)' | 'Refill Pouch'>('Whole Leaf Tin');
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    if (!product) return;
    onAddToCart(product, quantity, selectedFormat);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const formats = [
    { id: 'Whole Leaf Tin', label: 'Artisanal Brass Tin (100g)', extra: 0 },
    { id: 'Silk Pyramids (20x)', label: 'Biodegradable Pyramids (20x)', extra: -4 },
    { id: 'Refill Pouch', label: 'Compostable Eco Refill (150g)', extra: 6 },
  ] as const;

  const calculatedPrice = (product?.price || 0) + (
    selectedFormat === 'Silk Pyramids (20x)' ? -4 : selectedFormat === 'Refill Pouch' ? 6 : 0
  );

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-forest-950/85 backdrop-blur-md"
          />

          <div className="min-h-screen px-4 text-center flex items-center justify-center py-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative inline-block w-full max-w-4xl bg-forest-950 border border-forest-800 rounded-3xl shadow-2xl text-left overflow-hidden z-10 my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={onClose}
                aria-label="Close product dialog"
                className="absolute top-5 right-5 z-20 p-2 rounded-full bg-forest-900/80 border border-forest-700/80 text-ivory-300 hover:text-white hover:border-gold-400 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="grid grid-cols-1 md:grid-cols-12">
                
                {/* Left Image & Terroir Visual */}
                <div className="md:col-span-5 relative bg-forest-900/60 p-6 flex flex-col justify-between overflow-hidden">
                  <div className="relative rounded-2xl overflow-hidden aspect-square border border-forest-800">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950/80 via-transparent to-transparent" />
                    
                    {product.isBestseller && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-gold-500 text-forest-950 font-bold text-[10px] uppercase tracking-wider">
                        Signature Reserve
                      </span>
                    )}
                    {product.isLimited && (
                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-sage-500 text-ivory-50 font-bold text-[10px] uppercase tracking-wider">
                        Micro-Lot
                      </span>
                    )}
                  </div>

                  {/* Terroir & Origin Quick Specs */}
                  <div className="mt-6 space-y-3 bg-forest-950/60 p-4 rounded-xl border border-forest-800 text-xs">
                    <div className="flex justify-between text-ivory-300">
                      <span className="text-ivory-300/60">Elevation</span>
                      <span className="font-mono text-gold-300">{product.elevation}</span>
                    </div>
                    <div className="flex justify-between text-ivory-300">
                      <span className="text-ivory-300/60">Estate</span>
                      <span className="font-serif text-ivory-100">{product.estate}</span>
                    </div>
                    <div className="flex justify-between text-ivory-300">
                      <span className="text-ivory-300/60">Harvest Season</span>
                      <span className="text-ivory-200">{product.harvestSeason}</span>
                    </div>
                    <div className="flex justify-between text-ivory-300">
                      <span className="text-ivory-300/60">Grade</span>
                      <span className="font-mono text-gold-400">{product.grade}</span>
                    </div>
                    <div className="flex justify-between text-ivory-300">
                      <span className="text-ivory-300/60">Caffeine</span>
                      <span className="text-ivory-200">{product.caffeine}</span>
                    </div>
                  </div>
                </div>

                {/* Right Product Details & Controls */}
                <div className="md:col-span-7 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] uppercase font-mono tracking-widest text-gold-400">
                        {product.categoryLabel}
                      </span>
                      {product.organicCertified && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-sage-300 uppercase tracking-wider font-mono">
                          · Organic Certified
                        </span>
                      )}
                    </div>

                    <h2 className="font-serif text-2xl sm:text-3xl text-ivory-50 mt-1 font-normal">
                      {product.name}
                    </h2>
                    
                    {product.sinhalaName && (
                      <p className="text-xs text-gold-400/80 font-serif italic mt-0.5">
                        {product.sinhalaName} · Single-Estate Ceylon
                      </p>
                    )}

                    <p className="mt-4 text-xs sm:text-sm text-ivory-300/85 leading-relaxed font-light">
                      {product.description}
                    </p>

                    {/* Flavor Notes Badges */}
                    <div className="mt-5">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-ivory-300/70 block mb-2">
                        Tasting Profile Notes
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {product.tastingNotes.map((note) => (
                          <span
                            key={note}
                            className="px-2.5 py-1 rounded-md bg-forest-900 border border-gold-500/25 text-gold-200 text-xs font-sans"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Sommelier Brewing Spec */}
                    <div className="mt-6 p-4 rounded-xl bg-forest-900/50 border border-forest-800">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400 block mb-2 flex items-center gap-1.5">
                        <Droplets className="w-3.5 h-3.5" />
                        Recommended Brewing Ritual
                      </span>
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div className="p-2 rounded bg-forest-950 border border-forest-800">
                          <Thermometer className="w-3.5 h-3.5 mx-auto text-gold-400 mb-1" />
                          <span className="text-xs font-mono text-ivory-100">{product.brewing.temperatureC}°C / {product.brewing.temperatureF}°F</span>
                          <p className="text-[9px] text-ivory-300/60 uppercase">Water Temp</p>
                        </div>
                        <div className="p-2 rounded bg-forest-950 border border-forest-800">
                          <Clock className="w-3.5 h-3.5 mx-auto text-gold-400 mb-1" />
                          <span className="text-xs font-mono text-ivory-100">{Math.floor(product.brewing.steepTimeSec / 60)}:{(product.brewing.steepTimeSec % 60).toString().padStart(2, '0')} min</span>
                          <p className="text-[9px] text-ivory-300/60 uppercase">Steep Time</p>
                        </div>
                        <div className="p-2 rounded bg-forest-950 border border-forest-800">
                          <Droplets className="w-3.5 h-3.5 mx-auto text-gold-400 mb-1" />
                          <span className="text-xs font-mono text-ivory-100">{product.brewing.ratioGrams}g / {product.brewing.ratioWaterMl}ml</span>
                          <p className="text-[9px] text-ivory-300/60 uppercase">Ratio</p>
                        </div>
                      </div>
                    </div>

                    {/* Vessel Format Options */}
                    <div className="mt-6">
                      <span className="text-[10px] uppercase font-mono tracking-widest text-ivory-300/70 block mb-2">
                        Vessel / Packaging Format
                      </span>
                      <div className="space-y-2">
                        {formats.map((fmt) => (
                          <button
                            key={fmt.id}
                            onClick={() => setSelectedFormat(fmt.id)}
                            className={`w-full p-2.5 rounded-lg border text-left text-xs flex items-center justify-between transition-colors ${
                              selectedFormat === fmt.id
                                ? 'border-gold-400 bg-forest-900 text-ivory-100 font-medium'
                                : 'border-forest-800 bg-forest-950 hover:border-forest-700 text-ivory-300'
                            }`}
                          >
                            <span>{fmt.label}</span>
                            <span className="font-mono text-gold-400">
                              {fmt.extra === 0 ? 'Standard' : fmt.extra > 0 ? `+$${fmt.extra}` : `-$${Math.abs(fmt.extra)}`}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Purchase Bar */}
                  <div className="pt-6 mt-6 border-t border-forest-800/80 flex flex-col sm:flex-row items-center gap-4">
                    <div className="flex items-center justify-between w-full sm:w-auto gap-4">
                      <div>
                        <span className="text-[10px] uppercase tracking-wider text-ivory-300/60 block">Price</span>
                        <span className="font-serif text-2xl text-gold-300 font-semibold">
                          ${calculatedPrice * quantity}
                        </span>
                      </div>

                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-forest-700 rounded-lg overflow-hidden bg-forest-900">
                        <button
                          onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                          className="px-3 py-1.5 text-ivory-300 hover:text-white hover:bg-forest-800 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-1.5 font-mono text-xs text-ivory-100">{quantity}</span>
                        <button
                          onClick={() => setQuantity((q) => q + 1)}
                          className="px-3 py-1.5 text-ivory-300 hover:text-white hover:bg-forest-800 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleAdd}
                      className={`flex-1 w-full sm:w-auto py-3.5 px-6 rounded-full text-xs font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2 transition-all ${
                        added
                          ? 'bg-sage-600 text-ivory-50 scale-105'
                          : 'bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-forest-950 hover:from-gold-400 hover:to-gold-300 shadow-lg hover:scale-105'
                      }`}
                    >
                      {added ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Your Order</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Tea Caddy</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>

              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
