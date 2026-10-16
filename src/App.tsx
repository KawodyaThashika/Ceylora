import React, { useState } from 'react';
import { TeaProduct, CartItem } from './types';
import { PRODUCTS } from './data/teaData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Heritage } from './components/Heritage';
import { TeaJourney } from './components/TeaJourney';
import { FeaturedCollection } from './components/FeaturedCollection';
import { SovereignTinShowcase } from './components/SovereignTinShowcase';
import { BrewingRitual } from './components/BrewingRitual';
import { DiscoveryBoxBuilder } from './components/DiscoveryBoxBuilder';
import { SommelierTestimonials } from './components/SommelierTestimonials';
import { EditorialGallery } from './components/EditorialGallery';
import { FAQSection } from './components/FAQSection';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { Footer } from './components/Footer';

export const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: PRODUCTS[0],
      quantity: 1,
      grindOrFormat: 'Whole Leaf Tin',
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Cart operations
  const handleAddToCart = (
    product: TeaProduct,
    quantity: number,
    format: 'Whole Leaf Tin' | 'Silk Pyramids (20x)' | 'Refill Pouch'
  ) => {
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === product.id && item.grindOrFormat === format
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id && item.grindOrFormat === format
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity, grindOrFormat: format }];
    });
    setIsCartOpen(true);
  };

  const handleAddBoxToCart = (customProduct: TeaProduct, quantity: number, _note: string) => {
    setCartItems((prev) => [
      ...prev,
      { product: customProduct, quantity, grindOrFormat: 'Whole Leaf Tin' },
    ]);
    setIsCartOpen(true);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handleRemoveItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleScrollTo = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const discount = subtotal > 75 ? subtotal * 0.1 : 0;
  const shipping = subtotal >= 75 || cartItems.length === 0 ? 0 : 12;
  const grandTotal = Math.max(0, subtotal - discount + shipping);

  return (
    <div className="min-h-screen bg-forest-950 text-ivory-100 flex flex-col selection:bg-gold-500 selection:text-forest-950">
      
      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onNavigate={handleScrollTo}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onExplore={() => handleScrollTo('collection')}
          onOurStory={() => handleScrollTo('heritage')}
        />

        {/* 2. Brand Story / Heritage ("The Heart of Ceylon") */}
        <Heritage />

        {/* 3. The 5-Stage Transformation Journey */}
        <TeaJourney />

        {/* 4. Featured Tea Boutique Collection */}
        <FeaturedCollection
          onAddToCart={handleAddToCart}
        />

        {/* 5. The Sovereign Tin Engineering Showcase */}
        <SovereignTinShowcase
          onAddToCart={handleAddToCart}
        />

        {/* 6. Interactive Brewing Ritual Guide */}
        <BrewingRitual />

        {/* 7. Bespoke Tea Discovery Flight Builder */}
        <DiscoveryBoxBuilder
          onAddBoxToCart={handleAddBoxToCart}
        />

        {/* 8. Master Sommelier Accolades */}
        <SommelierTestimonials />

        {/* 9. Visual Editorial Gallery */}
        <EditorialGallery />

        {/* 10. Frequently Inquired (FAQ Accordion) */}
        <FAQSection />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleScrollTo} />

      {/* Slide-over Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
        onExploreTeas={() => handleScrollTo('collection')}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        subtotal={subtotal}
        discount={discount}
        shipping={shipping}
        total={grandTotal}
        onOrderCompleted={() => {
          setCartItems([]);
        }}
      />

    </div>
  );
};

export default App;
