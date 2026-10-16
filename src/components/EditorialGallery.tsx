import React, { useState } from 'react';
import { Camera, Instagram, ExternalLink, Sparkles, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { TextReveal, ParagraphReveal, ClipRevealImage, DriftingTeaLeaves } from '../utils/motion';

interface GalleryImage {
  id: number;
  url: string;
  caption: string;
  location: string;
  date: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 1,
    url: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85',
    caption: 'First light breaking over Nuwara Eliya terraces, where the morning mist shelters the young pekoe buds.',
    location: 'Nuwara Eliya, Pedro Valley',
    date: 'Dawn Flush'
  },
  {
    id: 2,
    url: 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?auto=format&fit=crop&w=1200&q=85',
    caption: 'Pluckers moving between the century-old Camellia bushes with bamboo baskets lined in natural jute.',
    location: 'Dimbula Crest Estate',
    date: 'Monsoon Break'
  },
  {
    id: 3,
    url: 'https://images.unsplash.com/photo-1594631252845-29fc4cc8cde9?auto=format&fit=crop&w=1200&q=85',
    caption: 'Luminescent golden ring at the rim of bone china — the hallmark of high-grown Ceylon orthodox purity.',
    location: 'Colombo Tasting Salon',
    date: 'Afternoon Cupping'
  },
  {
    id: 4,
    url: 'https://images.unsplash.com/photo-1597481499750-3e6b22637e12?auto=format&fit=crop&w=1200&q=85',
    caption: 'Virgin silver needle tips sun-drying naturally under the equatorial sun on elevated bamboo racks.',
    location: 'Adam’s Peak Sanctuary',
    date: 'Equinox Harvest'
  },
  {
    id: 5,
    url: 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?auto=format&fit=crop&w=1200&q=85',
    caption: 'Dewdrops suspended on two leaves and a bud, rich in fragrant natural catechins and linalool.',
    location: 'Pedro Cloud Block 4',
    date: '06:00 AM'
  },
  {
    id: 6,
    url: 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=1200&q=85',
    caption: 'The meditative tea ceremony: fragrant steam ascending into quiet morning air.',
    location: 'Kandy Hill Sanctuary',
    date: 'Mindful Morning'
  }
];

export const EditorialGallery: React.FC = () => {
  const [activeImage, setActiveImage] = useState<GalleryImage | null>(null);

  return (
    <section className="py-24 sm:py-32 bg-forest-900/40 relative overflow-hidden border-t border-forest-800">
      
      {/* Drifting Leaves */}
      <DriftingTeaLeaves density="low" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-forest-950 text-gold-400 text-xs uppercase tracking-[0.25em] mb-4"
            >
              <Camera className="w-3.5 h-3.5" />
              Visual Journal
            </motion.div>

            <h2 className="font-serif text-3xl sm:text-5xl text-ivory-50 font-normal leading-tight">
              <TextReveal text="Glimpses of Ceylon" as="span" />
            </h2>

            <ParagraphReveal delay={0.2} className="mt-3 text-ivory-300/80 text-sm sm:text-base max-w-lg font-light">
              Moments of quiet reverence captured across our mist-crowned estates in Sri Lanka.
            </ParagraphReveal>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gold-400 hover:text-gold-300 transition-colors group"
          >
            <Instagram className="w-4 h-4 group-hover:scale-110 transition-transform" />
            <span>@CEYLORATEA · Follow Our Journal</span>
            <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Masonry / Grid with Staggered Viewport Entrance */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_IMAGES.map((img, idx) => (
            <motion.div
              key={img.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-8% 0px' }}
              transition={{ duration: 0.7, delay: idx * 0.08 }}
              onClick={() => setActiveImage(img)}
              className="group relative aspect-[4/3] rounded-2xl overflow-hidden bg-forest-950 border border-forest-800/80 cursor-pointer shadow-lg hover:border-gold-500/50 transition-all duration-500 hover:-translate-y-1.5"
            >
              <img
                src={img.url}
                alt={img.caption}
                className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              {/* Caption Overlay */}
              <div className="absolute inset-0 p-6 flex flex-col justify-between">
                <div className="flex justify-between items-center text-[10px] font-mono text-gold-400 uppercase tracking-widest">
                  <span>{img.location}</span>
                  <span className="text-ivory-300/60">{img.date}</span>
                </div>

                <div>
                  <p className="font-serif text-sm sm:text-base text-ivory-100 font-light leading-snug line-clamp-2 group-hover:line-clamp-none transition-all">
                    "{img.caption}"
                  </p>
                  <span className="text-[10px] uppercase font-mono tracking-wider text-gold-300 mt-2 inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Sparkles className="w-3 h-3" /> Tap to enlarge
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal with AnimatePresence */}
      <AnimatePresence>
        {activeImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveImage(null)}
              className="fixed inset-0 bg-forest-950/90 backdrop-blur-md"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-4xl w-full bg-forest-950 border border-forest-800 rounded-3xl overflow-hidden shadow-2xl z-10"
            >
              <button
                onClick={() => setActiveImage(null)}
                aria-label="Close photo preview"
                className="absolute top-4 right-4 z-20 p-2 rounded-full bg-forest-900/80 text-ivory-200 hover:text-white border border-forest-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full bg-black">
                <img
                  src={activeImage.url}
                  alt={activeImage.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="p-6 sm:p-8 bg-forest-950 border-t border-forest-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <span className="text-xs font-mono text-gold-400 uppercase tracking-widest block mb-1">
                    {activeImage.location} · {activeImage.date}
                  </span>
                  <p className="font-serif text-lg text-ivory-100 italic">
                    "{activeImage.caption}"
                  </p>
                </div>
                <span className="text-xs font-mono text-ivory-300/60 shrink-0">
                  CEYLORA Archives
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
