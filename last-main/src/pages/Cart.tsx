import { SnowAnimation } from '@/components/SnowAnimation';
import Header from '@/components/Header';
import WarningBanner from '@/components/WarningBanner';
import Footer from '@/components/Footer';
import { ArrowLeft, Plus, Minus, Trash2, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import freeShippingBanner from '@/assets/free-shipping-banner.png';

import { useCart } from '@/contexts/CartContext';


const Cart = () => {
  const { items: cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();
  const { t } = useLanguage();
  const subtotal = cartTotal;

  const freeShippingThreshold = 100;
  const hasFreeShipping = subtotal >= freeShippingThreshold;
  const shipping = hasFreeShipping ? 0 : 4.95;
  const total = subtotal + shipping;
  const minimumOrder = 50;
  const canCheckout = subtotal >= minimumOrder;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <SnowAnimation />
      <div className="fixed inset-0 hex-pattern pointer-events-none z-0 opacity-40" />

      <div className="relative z-10">
        <WarningBanner />
        <Header />

        {/* Free Shipping Banner - Full Width */}
        <div className="w-full overflow-hidden mt-6">
          <div className="animate-marquee flex">
            <img src={freeShippingBanner} alt="Free shipping on orders above 100€" className="h-40 md:h-52 w-auto" />
            <img src={freeShippingBanner} alt="Free shipping on orders above 100€" className="h-40 md:h-52 w-auto" />
            <img src={freeShippingBanner} alt="Free shipping on orders above 100€" className="h-40 md:h-52 w-auto" />
            <img src={freeShippingBanner} alt="Free shipping on orders above 100€" className="h-40 md:h-52 w-auto" />
            <img src={freeShippingBanner} alt="Free shipping on orders above 100€" className="h-40 md:h-52 w-auto" />
            <img src={freeShippingBanner} alt="Free shipping on orders above 100€" className="h-40 md:h-52 w-auto" />
            <img src={freeShippingBanner} alt="Free shipping on orders above 100€" className="h-40 md:h-52 w-auto" />
            <img src={freeShippingBanner} alt="Free shipping on orders above 100€" className="h-40 md:h-52 w-auto" />
          </div>
        </div>

        <main className="container py-8 max-w-4xl">
          {/* Page Title */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <ShoppingCart className="w-8 h-8 text-primary" />
              <h1 className="font-steelfish text-5xl md:text-6xl text-foreground tracking-wide">
                {t('cart.title')} <span className="text-primary">{t('cart.title2')}</span>
              </h1>
            </div>
            <p className="text-muted-foreground">{cartItems.length > 0 ? t('cart.reviewDesc') : t('cart.emptyDesc')}</p>
          </div>

          {cartItems.length > 0 ? (
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-card border border-border rounded-xl p-5 hover:border-primary/30 transition-all"
                  >
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-muted/50 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-contain p-1" />
                      </div>

                      {/* Product Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-steelfish text-xl text-foreground">{item.name}</h3>
                            <p className="text-xs text-muted-foreground uppercase">{item.category}</p>
                          </div>
                          <button
  onClick={() => removeFromCart(item.id, item.size)}
  className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
>
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                          <span className="px-2 py-1 bg-green-500/10 text-green-500 rounded text-xs font-medium">
                            {item.purity}
                          </span>
                          <span>{item.size}</span>
                        </div>

                        <div className="flex items-center justify-between mt-4">
                          {/* Quantity Controls */}
<div className="flex items-center gap-2">
  <button
    onClick={() => updateQuantity(item.id, item.size, -1)} 
    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
  >
    <Minus className="w-4 h-4" />
  </button>
  <span className="w-10 text-center font-steelfish text-lg">{item.quantity}</span>
  <button
    onClick={() => updateQuantity(item.id, item.size, 1)} 
    className="w-8 h-8 rounded-lg border border-border flex items-center justify-center hover:bg-muted transition-colors"
  >
    <Plus className="w-4 h-4" />
  </button>
</div>


                          {/* Price */}
                          <span className="font-steelfish text-2xl text-primary">
                            €{(item.price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <Link
                  to="/products"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mt-4"
                >
                  <ArrowLeft className="w-4 h-4" />
                  {t('cart.startShopping')}
                </Link>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card border border-border rounded-xl p-6 sticky top-8">
                  <h3 className="font-steelfish text-2xl text-foreground mb-6">{t('cart.orderSummary')}</h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('cart.subtotal')} ({cartItems.length} items)</span>
                      <span className="font-medium">€{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">{t('cart.shipping')}</span>
                      {hasFreeShipping ? (
                        <span className="font-medium text-green-500">FREE</span>
                      ) : (
                        <span className="font-medium">€{shipping.toFixed(2)}</span>
                      )}
                    </div>
                    {!hasFreeShipping && (
                      <p className="text-xs text-green-500">
                        Add €{(freeShippingThreshold - subtotal).toFixed(2)} more for free shipping!
                      </p>
                    )}
                  </div>

                  <div className="border-t border-border pt-4 mb-6">
                    <div className="flex justify-between">
                      <span className="font-steelfish text-xl">{t('cart.total')}</span>
                      <span className="font-steelfish text-2xl text-primary">€{total.toFixed(2)}</span>
                    </div>
                  </div>

                  {canCheckout ? (
                    <Link
                      to="/checkout"
                      className="block w-full bg-primary text-primary-foreground py-4 rounded-xl font-steelfish text-xl text-center hover:bg-primary/90 transition-colors"
                    >
                      {t('cart.proceed')}
                    </Link>
                  ) : (
                    <div className="space-y-3">
                      <button
                        disabled
                        className="block w-full bg-muted text-muted-foreground py-4 rounded-xl font-steelfish text-xl text-center cursor-not-allowed"
                      >
                        {t('cart.proceed')}
                      </button>
                      <p className="text-sm text-amber-500 text-center">
                        {t('cart.minimumOrder')} (€{(minimumOrder - subtotal).toFixed(2)} {t('cart.moreNeeded')})
                      </p>
                    </div>
                  )}

                  <p className="text-xs text-muted-foreground text-center mt-4">
                    {t('cart.securePayment')}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <ShoppingCart className="w-12 h-12 text-muted-foreground" />
              </div>
              <h3 className="font-steelfish text-2xl text-foreground mb-2">{t('cart.empty')}</h3>
              <p className="text-muted-foreground mb-6">{t('cart.emptyDesc')}</p>
              <Link
                to="/products"
                className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-steelfish text-lg"
              >
                {t('cart.startShopping')}
              </Link>
            </div>
          )}
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Cart;