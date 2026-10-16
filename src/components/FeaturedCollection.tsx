import React, { useState } from 'react';
import { TeaProduct } from '../types';
import { PRODUCTS } from '../data/teaData';
import { ProductModal } from './ProductModal';
import { Sparkles, Eye, ShoppingBag, Check, Compass, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextReveal, ParagraphReveal, Card3DTilt, Magnetic, DriftingTeaLeaves } from '../utils/motion';

interface FeaturedCollectionProps {
  onAddToCart: (product: TeaProduct, quantity: number, format: 'Whole Leaf Tin' | 'Silk Pyramids (20x)' | 'Refill Pouch') => void;
}

export const FeaturedCollection: React.FC<FeaturedCollectionProps> = ({ onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProduct, setSelectedProduct] = useState<TeaProduct | null>(null);
  const [addedId, setAddedId] = useState<string | null>(null);

  const categories = [
    { id: 'all', label: 'All Terroirs' },
    { id: 'black', label: 'Black Tea' },
    { id: 'green', label: 'Organic Green' },
    { id: 'white', label: 'Silver Tips White' },
    { id: 'herbal', label: 'Herbal Wellness' },
    { id: 'reserve', label: 'Rare Reserve' },
  ];

  const filteredProducts = activeCategory === 'all'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleQuickAdd = (product: TeaProduct, e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, 1, 'Whole Leaf Tin');
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1800);
  };

  return (
    <section id="collection" className="py-24 sm:py-32 bg-forest-950 relative overflow-hidden border-t border-forest-900">
      
      {/* Drifting Tea Leaves Background Atmosphere */}
      <DriftingTeaLeaves density="low" />

      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-forest-900/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-forest-900/40 text-gold-400 text-xs uppercase tracking-[0.25em] mb-4"
            >
              <Sparkles className="w-3.5 h-3.5" />
              The Ceylon Boutique
            </motion.div>

            <h2 className="font-serif text-3xl sm:text-5xl text-ivory-50 font-normal leading-tight">
              <TextReveal text="Featured Tea Collection" as="span" />
            </h2>

            <ParagraphReveal delay={0.2} className="mt-3 text-ivory-300/80 text-sm sm:text-base max-w-xl font-light">
              Single-estate orthodox harvests, hand-selected at dawn across Sri Lanka's most celebrated highlands.
            </ParagraphReveal>
          </div>

          {/* Category Filter Pills with Layout Motion */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-4 py-2 rounded-full text-xs font-sans tracking-wider transition-all duration-300 ${
                  activeCategory === cat.id
                    ? 'text-forest-950 font-semibold shadow-md'
                    : 'bg-forest-900/60 border border-forest-800 text-ivory-300/80 hover:border-gold-500/50 hover:text-white'
                }`}
              >
                {activeCategory === cat.id && (
                  <motion.div
                    layoutId="activeCategoryPill"
                    className="absolute inset-0 bg-gold-500 rounded-full -z-10 shadow-lg"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid with 3D Tilt and Staggered Viewport Entrance */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
              >
                <Card3DTilt
                  maxTilt={6}
                  onClick={() => setSelectedProduct(product)}
                  className="group bg-forest-900/40 border border-forest-800/80 rounded-3xl overflow-hidden hover:border-gold-500/60 transition-all duration-500 flex flex-col justify-between hover:shadow-2xl cursor-pointer h-full"
                >
                  {/* Product Visual Container */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-forest-950">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent" />
                    
                    {/* Elevation & Grade Floating Badge */}
                    <div className="absolute top-4 left-4 flex flex-col gap-1.5 z-10">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-forest-950/85 backdrop-blur-md border border-forest-700/80 text-[10px] font-mono text-gold-300 shadow-md">
                        <Compass className="w-3 h-3 text-gold-400" />
                        {product.elevation}
                      </span>
                      {product.isBestseller && (
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-gold-500 text-forest-950 text-[9px] font-bold uppercase tracking-wider shadow">
                          Signature
                        </span>
                      )}
                      {product.isLimited && (
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-sage-500 text-ivory-50 text-[9px] font-bold uppercase tracking-wider shadow">
                          Micro-Lot Reserve
                        </span>
                      )}
                    </div>

                    {/* Rating badge */}
                    <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full bg-forest-950/85 backdrop-blur-md border border-forest-700/80 text-[10px] text-ivory-200 flex items-center gap-1 font-mono shadow-md z-10">
                      <Star className="w-3 h-3 text-gold-400 fill-gold-400" />
                      <span>{product.rating}</span>
                    </div>

                    {/* Hover Quick Action Layer */}
                    <div className="absolute inset-0 bg-forest-950/45 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <span className="px-5 py-2.5 rounded-full bg-forest-950/95 border border-gold-400/90 text-gold-300 text-xs font-semibold uppercase tracking-[0.2em] shadow-2xl flex items-center gap-2 transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                        <Eye className="w-3.5 h-3.5" />
                        Discover Tea
                      </span>
                    </div>
                  </div>

                  {/* Product Info Content */}
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] font-mono uppercase tracking-wider text-gold-400 mb-1">
                        <span>{product.categoryLabel}</span>
                        <span className="text-ivory-300/60 font-sans">{product.weight}</span>
                      </div>

                      <h3 className="font-serif text-2xl text-ivory-50 group-hover:text-gold-300 transition-colors font-normal leading-snug">
                        {product.name}
                      </h3>

                      <p className="text-xs text-ivory-300/70 font-sans mt-2 line-clamp-2 font-light">
                        {product.description}
                      </p>

                      {/* Flavor Notes Pills */}
                      <div className="flex flex-wrap gap-1.5 mt-4">
                        {product.tastingNotes.slice(0, 3).map((note) => (
                          <span
                            key={note}
                            className="px-2 py-0.5 rounded bg-forest-950/80 border border-forest-800 text-[10px] text-ivory-200 font-sans"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Price and Action Bar */}
                    <div className="pt-6 mt-6 border-t border-forest-800/80 flex items-center justify-between">
                      <div>
                        <span className="text-[10px] uppercase font-mono tracking-wider text-ivory-300/60 block">Price</span>
                        <span className="font-serif text-2xl text-ivory-100 font-medium">
                          ${product.price}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Magnetic strength={0.2}>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedProduct(product);
                            }}
                            className="px-4 py-2 rounded-full border border-forest-700 hover:border-gold-400/70 text-xs text-ivory-200 hover:text-white transition-colors"
                          >
                            Inspect
                          </button>
                        </Magnetic>

                        <Magnetic strength={0.3}>
                          <button
                            onClick={(e) => handleQuickAdd(product, e)}
                            title="Add Whole Leaf Tin to Cart"
                            className={`p-2.5 rounded-full transition-all duration-300 ${
                              addedId === product.id
                                ? 'bg-sage-600 text-ivory-50 scale-110'
                                : 'bg-gold-500 text-forest-950 hover:bg-gold-400 shadow-md hover:scale-105'
                            }`}
                          >
                            {addedId === product.id ? (
                              <Check className="w-4 h-4" />
                            ) : (
                              <ShoppingBag className="w-4 h-4" />
                            )}
                          </button>
                        </Magnetic>
                      </div>
                    </div>

                  </div>
                </Card3DTilt>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Discover Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={onAddToCart}
      />
    </section>
  );
};
