import React, { useState } from 'react';
import { Mail, ArrowRight, ShieldCheck, Sparkles, Check, Heart } from 'lucide-react';

export const Footer: React.FC<{ onNavigate: (id: string) => void }> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  };

  return (
    <footer className="bg-forest-950 text-ivory-200 border-t border-forest-900 pt-20 pb-12 relative overflow-hidden">
      
      {/* Background Subtle Monogram Watermark */}
      <div className="absolute right-[-80px] bottom-[-40px] select-none pointer-events-none opacity-[0.03] font-serif text-[380px] leading-none text-gold-400">
        C
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Newsletter & Brand Philosophy Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-forest-800/70">
          
          <div className="lg:col-span-6 space-y-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gold-500/30 bg-forest-900/40 text-gold-400 text-xs uppercase tracking-[0.25em]">
              <Sparkles className="w-3.5 h-3.5" />
              The Morning Chronicle
            </div>

            <h3 className="font-serif text-3xl sm:text-4xl text-ivory-50 font-normal leading-snug">
              Receive First Notice of <br />
              <span className="italic text-gold-300">Equinox Flushes & Private Micro-Lots</span>
            </h3>

            <p className="text-sm text-ivory-300/80 max-w-md font-light leading-relaxed">
              We dispatch seasonal bulletins when our highest-altitude gardens begin their dawn harvests. Subscribers receive priority allocation for limited-reserve canisters.
            </p>
          </div>

          <div className="lg:col-span-6 flex flex-col justify-center">
            {subscribed ? (
              <div className="p-6 rounded-2xl bg-forest-900/60 border border-gold-500/40 text-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-gold-500/20 text-gold-300 flex items-center justify-center mx-auto">
                  <Check className="w-5 h-5 stroke-[2.5]" />
                </div>
                <h4 className="font-serif text-xl text-ivory-50">Welcome to the CEYLORA Salon</h4>
                <p className="text-xs text-ivory-300/80">
                  A gift voucher for your first reserve harvest has been dispatched to your inbox. Use code <span className="text-gold-400 font-mono font-bold">SERENITY10</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-ivory-300/40 absolute left-4 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your confidential email..."
                      className="w-full bg-forest-900/70 border border-forest-800 rounded-full pl-11 pr-4 py-3.5 text-xs text-ivory-100 placeholder:text-ivory-300/40 focus:outline-none focus:border-gold-400 font-sans"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-7 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-forest-950 font-semibold text-xs uppercase tracking-[0.2em] shadow-lg flex items-center justify-center gap-2 transition-all shrink-0"
                  >
                    <span>Request Invitation</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
                <p className="text-[11px] text-ivory-300/60 pl-2">
                  Unsubscribe with one click. We respect your digital serenity.
                </p>
              </form>
            )}
          </div>

        </div>

        {/* Links Navigation Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 py-16 border-b border-forest-800/70 text-xs">
          
          {/* Col 1 */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400 mb-4">
              Terroirs & Gardens
            </h4>
            <ul className="space-y-2.5 text-ivory-300/80 font-sans">
              <li><button onClick={() => onNavigate('heritage')} className="hover:text-gold-300 transition-colors">Pedro Estate (6,240 ft)</button></li>
              <li><button onClick={() => onNavigate('heritage')} className="hover:text-gold-300 transition-colors">Dimbula Ridge (4,500 ft)</button></li>
              <li><button onClick={() => onNavigate('heritage')} className="hover:text-gold-300 transition-colors">Maskeliya Sanctuary</button></li>
              <li><button onClick={() => onNavigate('heritage')} className="hover:text-gold-300 transition-colors">Uva Highland Valleys</button></li>
              <li><button onClick={() => onNavigate('heritage')} className="hover:text-gold-300 transition-colors">Matale Botanical Terraces</button></li>
            </ul>
          </div>

          {/* Col 2 */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400 mb-4">
              The Harvests
            </h4>
            <ul className="space-y-2.5 text-ivory-300/80 font-sans">
              <li><button onClick={() => onNavigate('collection')} className="hover:text-gold-300 transition-colors">High-Grown Pekoe</button></li>
              <li><button onClick={() => onNavigate('collection')} className="hover:text-gold-300 transition-colors">Imperial Silver Needle</button></li>
              <li><button onClick={() => onNavigate('collection')} className="hover:text-gold-300 transition-colors">Organic Ceylon Green</button></li>
              <li><button onClick={() => onNavigate('collection')} className="hover:text-gold-300 transition-colors">Cold-Pressed Earl Grey</button></li>
              <li><button onClick={() => onNavigate('discovery-box')} className="hover:text-gold-300 transition-colors">Bespoke 3-Tin Flight</button></li>
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400 mb-4">
              Rituals & Education
            </h4>
            <ul className="space-y-2.5 text-ivory-300/80 font-sans">
              <li><button onClick={() => onNavigate('brewing-guide')} className="hover:text-gold-300 transition-colors">Interactive Brewing Guide</button></li>
              <li><button onClick={() => onNavigate('journey')} className="hover:text-gold-300 transition-colors">The 5-Stage Journey</button></li>
              <li><button onClick={() => onNavigate('sovereign-tin')} className="hover:text-gold-300 transition-colors">Canister Engineering</button></li>
              <li><a href="#heritage" className="hover:text-gold-300 transition-colors">Ethical Artisan Community</a></li>
              <li><a href="#heritage" className="hover:text-gold-300 transition-colors">The 17-Leaf Lion Standard</a></li>
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 className="font-mono text-[10px] uppercase tracking-[0.25em] text-gold-400 mb-4">
              Client Concierge
            </h4>
            <ul className="space-y-2.5 text-ivory-300/80 font-sans">
              <li><span className="text-ivory-100 font-mono">salon@ceylora.com</span></li>
              <li><span className="text-ivory-300/70">Colombo & London Salons</span></li>
              <li><span>DHL Carbon-Neutral Tracking</span></li>
              <li><span>Wholesale & Sommelier Guild</span></li>
              <li><span>Corporate Gifting Atelier</span></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Certifications & Copyright */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-ivory-300/60 font-sans">
          
          {/* Ceylon Lion Logo Seal */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full border border-gold-500/40 bg-forest-900 flex items-center justify-center text-gold-400 font-serif font-bold text-xs">
              🦁
            </div>
            <div>
              <p className="text-ivory-200 font-medium">Sri Lanka Tea Board Certified</p>
              <p className="text-[10px] text-ivory-300/60 font-mono">Lion Logo of Purity · Pure Ceylon Single Estate</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-center sm:text-right">
            <span>© 2026 CEYLORA Luxury Tea. All Rights Reserved.</span>
            <span className="hidden md:inline">·</span>
            <span className="hidden md:inline">Crafted in Nuwara Eliya, Sri Lanka</span>
          </div>

        </div>

      </div>
    </footer>
  );
};
