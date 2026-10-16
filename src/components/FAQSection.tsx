import React, { useState } from 'react';
import { FAQS } from '../data/teaData';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextReveal, ParagraphReveal } from '../utils/motion';

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Origin & Terroir', 'Brewing & Storage', 'Orders & Sustainability'];

  const filteredFaqs = selectedCategory === 'All'
    ? FAQS
    : FAQS.filter((f) => f.category === selectedCategory);

  return (
    <section className="py-24 sm:py-32 bg-forest-950 relative overflow-hidden border-t border-forest-900">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-forest-900/40 text-gold-400 text-xs uppercase tracking-[0.25em] mb-4"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            Curiosities & Clarifications
          </motion.div>

          <h2 className="font-serif text-3xl sm:text-5xl text-ivory-50 font-normal leading-tight">
            <TextReveal text="Frequently Inquired" as="span" />
          </h2>

          <ParagraphReveal delay={0.2} className="mt-3 text-ivory-300/80 text-sm sm:text-base font-light">
            Insights on single-estate authenticity, optimal conservation, and global dispatch.
          </ParagraphReveal>

          {/* Category Tabs with Animated Pill */}
          <div className="flex flex-wrap justify-center gap-2 mt-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-4 py-1.5 rounded-full text-xs font-sans tracking-wider transition-colors ${
                  selectedCategory === cat
                    ? 'text-forest-950 font-semibold'
                    : 'bg-forest-900/60 border border-forest-800 text-ivory-300 hover:text-white hover:border-gold-500/40'
                }`}
              >
                {selectedCategory === cat && (
                  <motion.div
                    layoutId="activeFaqCategory"
                    className="absolute inset-0 bg-gold-500 rounded-full -z-10 shadow"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{cat}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Accordion List with Smooth Height Animation */}
        <div className="space-y-4">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <motion.div
                key={faq.question}
                layout
                className="bg-forest-900/40 border border-forest-800/80 rounded-2xl overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:text-gold-300 transition-colors"
                >
                  <span className="font-serif text-lg sm:text-xl text-ivory-100 font-normal">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-7 h-7 rounded-full border flex items-center justify-center shrink-0 ${
                      isOpen ? 'border-gold-400 text-gold-400' : 'border-forest-700 text-ivory-300'
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-1 text-sm text-ivory-300/85 leading-relaxed font-light border-t border-forest-800/40">
                        <p>{faq.answer}</p>
                        <div className="mt-3 flex items-center gap-2 text-[10px] font-mono text-gold-400 uppercase tracking-widest">
                          <Sparkles className="w-3 h-3" />
                          <span>{faq.category} · CEYLORA Standards</span>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
