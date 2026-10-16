import React, { useState } from 'react';
import { CartItem } from '../types';
import { X, Trash2, ShoppingBag, ArrowRight, Gift, Truck, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedCheckout: () => void;
  onExploreTeas: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
  onExploreTeas,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [promoError, setPromoError] = useState<string | null>(null);
  const [giftBoxEnabled, setGiftBoxEnabled] = useState(false);

  const rawSubtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const giftBoxFee = giftBoxEnabled ? 6 : 0;
  const subtotalWithGift = rawSubtotal + giftBoxFee;

  let discount = 0;
  if (appliedPromo === 'SERENITY10') {
    discount = subtotalWithGift * 0.1;
  } else if (appliedPromo === 'CEYLON15') {
    discount = Math.min(15, subtotalWithGift);
  }

  const freeShippingThreshold = 75;
  const shipping = subtotalWithGift >= freeShippingThreshold || items.length === 0 ? 0 : 12;
  const total = Math.max(0, subtotalWithGift - discount + shipping);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotalWithGift);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'SERENITY10' || code === 'CEYLON15') {
      setAppliedPromo(code);
      setPromoError(null);
    } else {
      setPromoError('Invalid coupon. Try "SERENITY10" or "CEYLON15"');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 bg-forest-950/80 backdrop-blur-md"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen max-w-md bg-forest-950 border-l border-forest-800/80 shadow-2xl flex flex-col justify-between"
            >
              
              {/* Top Bar */}
              <div className="p-6 border-b border-forest-800/70 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-gold-400" />
                  <h2 className="font-serif text-xl text-ivory-50 tracking-wide">
                    Your Tea Caddy
                  </h2>
                  <span className="text-xs font-mono text-gold-400">({items.reduce((s, i) => s + i.quantity, 0)})</span>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Close cart drawer"
                  className="p-1.5 text-ivory-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Free Shipping Dynamic Bar */}
              <div className="px-6 py-3 bg-forest-900/70 border-b border-forest-800/60 text-xs font-sans">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-ivory-200 flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-gold-400" />
                    {amountToFreeShipping === 0 ? (
                      <span className="text-gold-300 font-medium">Complimentary Global Express Unlocked!</span>
                    ) : (
                      <span>Add <strong className="text-gold-300 font-mono">${amountToFreeShipping.toFixed(2)}</strong> for Free Express</span>
                    )}
                  </span>
                  <span className="font-mono text-[10px] text-ivory-300/60">$75 Target</span>
                </div>
                <div className="w-full h-1.5 bg-forest-950 rounded-full overflow-hidden border border-forest-800">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-gold-500 to-gold-300 rounded-full"
                    initial={false}
                    animate={{ width: `${Math.min(100, (subtotalWithGift / freeShippingThreshold) * 100)}%` }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              </div>

              {/* Cart Item List with AnimatePresence */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {items.length === 0 ? (
                  <div className="text-center py-16 flex flex-col items-center">
                    <div className="w-16 h-16 rounded-full bg-forest-900 border border-forest-800 flex items-center justify-center text-ivory-300/40 mb-4">
                      <ShoppingBag className="w-7 h-7" />
                    </div>
                    <h3 className="font-serif text-xl text-ivory-100 mb-2">Your Caddy is Empty</h3>
                    <p className="text-xs text-ivory-300/60 max-w-xs font-light mb-6">
                      Explore our single-estate Nuwara Eliya harvests and curate your tea ceremony.
                    </p>
                    <button
                      onClick={() => {
                        onClose();
                        onExploreTeas();
                      }}
                      className="px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-forest-950 font-semibold text-xs tracking-widest uppercase transition-colors shadow-lg"
                    >
                      Explore Collection
                    </button>
                  </div>
                ) : (
                  <AnimatePresence>
                    {items.map((item) => (
                      <motion.div
                        key={`${item.product.id}-${item.grindOrFormat}`}
                        layout
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="p-3.5 rounded-2xl bg-forest-900/50 border border-forest-800/80 flex gap-4 items-center"
                      >
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-xl object-cover shrink-0 border border-forest-800"
                        />

                        <div className="flex-1 min-w-0">
                          <span className="text-[9px] uppercase font-mono tracking-widest text-gold-400 block truncate">
                            {item.product.estate.split(',')[0]}
                          </span>
                          <h4 className="font-serif text-base text-ivory-50 truncate font-medium">
                            {item.product.name}
                          </h4>
                          <span className="text-[11px] text-ivory-300/70 block -mt-0.5 font-sans">
                            {item.grindOrFormat}
                          </span>

                          <div className="flex items-center justify-between mt-2">
                            <span className="font-serif text-gold-300 font-semibold text-sm">
                              ${item.product.price * item.quantity}
                            </span>

                            {/* Quantity Stepper */}
                            <div className="flex items-center border border-forest-700/80 rounded-md bg-forest-950">
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                                className="px-2 py-0.5 text-xs text-ivory-300 hover:text-white"
                              >
                                -
                              </button>
                              <span className="px-2 text-xs font-mono text-ivory-100">{item.quantity}</span>
                              <button
                                onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                                className="px-2 py-0.5 text-xs text-ivory-300 hover:text-white"
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          aria-label={`Remove ${item.product.name} from cart`}
                          className="p-1.5 text-ivory-300/60 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                )}
              </div>

              {/* Cart Bottom / Totals & Checkout */}
              {items.length > 0 && (
                <div className="p-6 border-t border-forest-800/80 bg-forest-950/90 space-y-4">
                  
                  {/* Luxury Gift Packaging Toggle */}
                  <div 
                    onClick={() => setGiftBoxEnabled(!giftBoxEnabled)}
                    className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-colors ${
                      giftBoxEnabled
                        ? 'border-gold-500/60 bg-forest-900/80'
                        : 'border-forest-800/80 bg-forest-900/30'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Gift className={`w-4 h-4 ${giftBoxEnabled ? 'text-gold-400' : 'text-ivory-300/60'}`} />
                      <div>
                        <span className="text-xs text-ivory-100 block font-medium">Bespoke Gift Wrapping (+ $6)</span>
                        <span className="text-[10px] text-ivory-300/60">Wax seal, calligraphic note & ribbon</span>
                      </div>
                    </div>
                    <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                      giftBoxEnabled ? 'bg-gold-500 border-gold-500 text-forest-950' : 'border-forest-700'
                    }`}>
                      {giftBoxEnabled && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </div>

                  {/* Promo Code Input */}
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Privilege Code (e.g. SERENITY10)"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-forest-900 border border-forest-800 rounded-lg px-3 py-2 text-xs text-ivory-100 placeholder:text-ivory-300/40 focus:outline-none focus:border-gold-400 font-mono"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 bg-forest-850 border border-forest-700 hover:border-gold-400 text-xs font-mono uppercase text-ivory-200 rounded-lg transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                  {appliedPromo && (
                    <p className="text-[11px] text-sage-400 font-mono">
                      ✓ Privilege Code {appliedPromo} Applied!
                    </p>
                  )}
                  {promoError && (
                    <p className="text-[11px] text-red-400 font-mono">
                      {promoError}
                    </p>
                  )}

                  {/* Pricing Breakdown */}
                  <div className="space-y-1.5 text-xs text-ivory-300 border-t border-forest-800/60 pt-3">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono text-ivory-100">${rawSubtotal.toFixed(2)}</span>
                    </div>
                    {giftBoxEnabled && (
                      <div className="flex justify-between">
                        <span>Artisan Gift Presentation</span>
                        <span className="font-mono text-ivory-100">$6.00</span>
                      </div>
                    )}
                    {discount > 0 && (
                      <div className="flex justify-between text-sage-400">
                        <span>Privilege Savings</span>
                        <span className="font-mono">-${discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping (DHL Carbon Neutral)</span>
                      <span className="font-mono text-ivory-100">
                        {shipping === 0 ? <strong className="text-gold-300">Free</strong> : `$${shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-base font-serif text-ivory-50 pt-2 border-t border-forest-800 font-semibold">
                      <span>Grand Total</span>
                      <span className="text-gold-300 font-mono">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={() => {
                      onClose();
                      onProceedCheckout();
                    }}
                    className="w-full py-4 rounded-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 hover:from-gold-400 text-forest-950 font-semibold text-xs tracking-[0.25em] uppercase shadow-xl flex items-center justify-center gap-2 transition-all transform hover:-translate-y-0.5"
                  >
                    <span>Proceed to Reserve</span>
                    <ArrowRight className="w-4 h-4" />
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
