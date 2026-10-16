import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Check, ShieldCheck, Lock, CreditCard, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'framer-motion';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discount,
  shipping,
  total,
  onOrderCompleted,
}) => {
  const [step, setStep] = useState<'details' | 'success'>('details');
  const [formData, setFormData] = useState({
    fullName: 'Lady Eleanor Vance',
    email: 'eleanor.vance@belgrave.co.uk',
    address: '42 Kensington Palace Gardens',
    city: 'London',
    country: 'United Kingdom',
    postalCode: 'W8 4QP',
    giftNote: 'With warm serenity and admiration.',
    cardNumber: '•••• •••• •••• 1892',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setStep('success');

      // Trigger luxury gold confetti
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c5a059', '#dfba73', '#e8dc9b', '#ffffff']
      });

      onOrderCompleted();
    }, 1400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
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
              className="relative inline-block w-full max-w-2xl bg-forest-950 border border-forest-800 rounded-3xl shadow-2xl text-left overflow-hidden z-10 p-6 sm:p-10 my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={onClose}
                aria-label="Close checkout modal"
                className="absolute top-5 right-5 p-2 rounded-full bg-forest-900 border border-forest-700 text-ivory-300 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>

              {step === 'details' ? (
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Lock className="w-4 h-4 text-gold-400" />
                    <span className="text-[10px] uppercase font-mono tracking-widest text-gold-400">
                      256-Bit Encrypted High-Elevation Dispatch
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl sm:text-3xl text-ivory-50 mb-1">
                    Acquire Ceylon Consignment
                  </h2>
                  <p className="text-xs text-ivory-300/70 mb-8 font-light">
                    Direct single-estate air shipment from Pedro Estate Nuwara Eliya via DHL Express.
                  </p>

                  {/* Order Quick Summary */}
                  <div className="p-4 rounded-xl bg-forest-900/60 border border-forest-800 mb-8 space-y-2 text-xs">
                    <div className="flex justify-between text-ivory-200">
                      <span>Selected Harvesters ({items.length} items)</span>
                      <span className="font-mono text-gold-300">${subtotal.toFixed(2)}</span>
                    </div>
                    {discount > 0 && (
                      <div className="flex justify-between text-sage-400 font-mono">
                        <span>Privilege Code Applied</span>
                        <span>-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-ivory-300/80">
                      <span>DHL Carbon Neutral Global Express</span>
                      <span className="font-mono">{shipping === 0 ? 'Complimentary' : `$${shipping}`}</span>
                    </div>
                    <div className="flex justify-between text-base font-serif text-ivory-50 pt-2 border-t border-forest-800 font-semibold">
                      <span>Grand Total</span>
                      <span className="text-gold-300 font-mono">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Form */}
                  <form onSubmit={handleSubmit} className="space-y-4 text-xs font-sans">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-ivory-300/70 mb-1">
                          Full Name
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.fullName}
                          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                          className="w-full bg-forest-900 border border-forest-800 rounded-lg px-3.5 py-2.5 text-ivory-100 focus:outline-none focus:border-gold-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-ivory-300/70 mb-1">
                          Email for Harvest Dispatch Notification
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-forest-900 border border-forest-800 rounded-lg px-3.5 py-2.5 text-ivory-100 focus:outline-none focus:border-gold-400"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-ivory-300/70 mb-1">
                        Delivery Address
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className="w-full bg-forest-900 border border-forest-800 rounded-lg px-3.5 py-2.5 text-ivory-100 focus:outline-none focus:border-gold-400"
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-ivory-300/70 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className="w-full bg-forest-900 border border-forest-800 rounded-lg px-3.5 py-2.5 text-ivory-100 focus:outline-none focus:border-gold-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-ivory-300/70 mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.country}
                          onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          className="w-full bg-forest-900 border border-forest-800 rounded-lg px-3.5 py-2.5 text-ivory-100 focus:outline-none focus:border-gold-400"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono uppercase tracking-wider text-ivory-300/70 mb-1">
                          Postal Code
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.postalCode}
                          onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                          className="w-full bg-forest-900 border border-forest-800 rounded-lg px-3.5 py-2.5 text-ivory-100 focus:outline-none focus:border-gold-400"
                        />
                      </div>
                    </div>

                    {/* Mock Card */}
                    <div className="pt-2">
                      <label className="block text-[10px] font-mono uppercase tracking-wider text-ivory-300/70 mb-1 flex items-center justify-between">
                        <span>Payment Method</span>
                        <span className="text-gold-400 flex items-center gap-1 font-sans">
                          <CreditCard className="w-3.5 h-3.5" /> Apple Pay / Luxury Concierge
                        </span>
                      </label>
                      <div className="flex items-center bg-forest-900 border border-forest-800 rounded-lg px-3.5 py-2.5 text-ivory-200 justify-between">
                        <span className="font-mono">•••• •••• •••• 1892 (Black Centurion)</span>
                        <span className="text-[10px] font-mono text-gold-400">EXP 12/29</span>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full mt-6 py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 text-forest-950 font-semibold text-xs tracking-[0.25em] uppercase shadow-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                    >
                      {isSubmitting ? (
                        <span>Sealing Your Consignment...</span>
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          <span>Confirm & Authorize ${total.toFixed(2)}</span>
                        </>
                      )}
                    </button>
                  </form>
                </div>
              ) : (
                /* Success State */
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-gold-500/20 border border-gold-400 flex items-center justify-center mx-auto mb-6 text-gold-300 shadow-[0_0_30px_rgba(197,160,89,0.4)]">
                    <Check className="w-8 h-8 stroke-[2.5]" />
                  </div>

                  <span className="text-xs font-mono uppercase tracking-widest text-gold-400 block mb-2">
                    Order Confirmed · Pedro Estate Dispatch #CY-89240
                  </span>

                  <h3 className="font-serif text-3xl sm:text-4xl text-ivory-50 mb-3">
                    Your Highland Harvest Is Reserved
                  </h3>

                  <p className="text-sm text-ivory-300/80 max-w-md mx-auto font-light leading-relaxed mb-6">
                    Thank you, {formData.fullName}. Our team at Pedro Cloud Estate is hand-inspecting your sealed brass canisters. Tracking details will be dispatched to <span className="text-gold-300">{formData.email}</span>.
                  </p>

                  <div className="p-4 rounded-xl bg-forest-900/60 border border-forest-800 max-w-md mx-auto text-xs text-left space-y-2 mb-8">
                    <div className="flex items-center gap-2 text-ivory-200">
                      <Truck className="w-4 h-4 text-gold-400" />
                      <span>Dispatched via DHL Express (Estimated 3-4 business days)</span>
                    </div>
                    <div className="flex items-center gap-2 text-ivory-200">
                      <ShieldCheck className="w-4 h-4 text-gold-400" />
                      <span>Double-walled hermetic climate packaging guaranteed</span>
                    </div>
                  </div>

                  <button
                    onClick={onClose}
                    className="px-8 py-3 rounded-full bg-forest-900 hover:bg-forest-850 border border-gold-500/40 text-ivory-100 text-xs tracking-[0.2em] uppercase transition-colors shadow"
                  >
                    Return to Tea Salon
                  </button>
                </div>
              )}

            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};
