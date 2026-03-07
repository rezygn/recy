import { SnowAnimation } from '@/components/SnowAnimation';
import Header from '@/components/Header';
import WarningBanner from '@/components/WarningBanner';
import Footer from '@/components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, Lock, Wallet, Truck, Package, Loader2 } from 'lucide-react';
import { useState, useMemo, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

import { useCart } from '@/contexts/CartContext';


// Shipping prices based on region and carrier (approximate official rates)
const shippingRates = {
  EU: {
    DHL: { price: 12.95, days: '3-5' },
    PostNL: { price: 8.95, days: '3-5' },
  },
  UK: {
    DHL: { price: 18.95, days: '5-7' },
    PostNL: { price: 14.95, days: '5-7' },
  },
  USA: {
    DHL: { price: 34.95, days: '7-14' },
    PostNL: { price: 24.95, days: '7-14' },
  },
  INTL: {
    DHL: { price: 39.95, days: '10-21' },
    PostNL: { price: 29.95, days: '14-28' },
  },
};

// Countries organized by region
const countries = {
  EU: [
    'Austria', 'Belgium', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech Republic',
    'Denmark', 'Estonia', 'Finland', 'France', 'Germany', 'Greece', 'Hungary',
    'Ireland', 'Italy', 'Latvia', 'Lithuania', 'Luxembourg', 'Malta',
    'Netherlands', 'Poland', 'Portugal', 'Romania', 'Slovakia', 'Slovenia',
    'Spain', 'Sweden', 'Switzerland', 'Norway', 'Iceland', 'Liechtenstein',
  ],
  UK: ['United Kingdom'],
  USA: ['United States'],
  INTL: [
    'Argentina', 'Brazil', 'Canada', 'Chile', 'Colombia', 'Costa Rica', 'Ecuador',
    'Mexico', 'Panama', 'Peru', 'Uruguay', 'Venezuela',
    'Australia', 'China', 'Hong Kong', 'India', 'Indonesia', 'Japan', 'Malaysia',
    'New Zealand', 'Philippines', 'Singapore', 'South Korea', 'Taiwan', 'Thailand',
    'Vietnam',
    'Bahrain', 'Israel', 'Jordan', 'Kuwait', 'Lebanon', 'Oman', 'Qatar',
    'Saudi Arabia', 'United Arab Emirates',
    'Egypt', 'Kenya', 'Morocco', 'Nigeria', 'South Africa', 'Tunisia',
    'Albania', 'Bosnia and Herzegovina', 'Kosovo', 'Moldova', 'Montenegro',
    'North Macedonia', 'Serbia', 'Turkey', 'Ukraine',
  ],
};

const allCountries = [
  ...countries.EU,
  ...countries.UK,
  ...countries.USA,
  ...countries.INTL,
].sort();

const getRegion = (country: string): 'EU' | 'UK' | 'USA' | 'INTL' => {
  if (countries.UK.includes(country)) return 'UK';
  if (countries.USA.includes(country)) return 'USA';
  if (countries.EU.includes(country)) return 'EU';
  return 'INTL';
};

const Checkout = () => {
  const { items, cartTotal, clearCart } = useCart();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    addressLine2: '',
    city: '',
    postalCode: '',
    country: 'Netherlands',
  });

  const [shippingMethod, setShippingMethod] = useState<'DHL' | 'PostNL'>('PostNL');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUserId(session.user.id);
        setFormData(prev => ({ ...prev, email: session.user.email || '' }));
      }
    });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const region = useMemo(() => getRegion(formData.country), [formData.country]);
  const currentRates = shippingRates[region];

  const subtotal = cartTotal;
  const isFreeShipping = subtotal >= 100;
  const shipping = isFreeShipping ? 0 : currentRates[shippingMethod].price;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <SnowAnimation />
      <div className="fixed inset-0 hex-pattern pointer-events-none z-0 opacity-40" />

      <div className="relative z-10">
        <WarningBanner />
        <Header />

        <main className="container py-8 max-w-5xl">
          {/* Back Link */}
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('cart.title')}
          </Link>

          {/* Page Title */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-3 mb-4">
              <Lock className="w-8 h-8 text-primary" />
              <h1 className="font-steelfish text-5xl md:text-6xl text-foreground tracking-wide">
                {t('checkout.title')} <span className="text-primary">{t('checkout.title2')}</span>
              </h1>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('checkout.evmDesc')}
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-steelfish text-2xl text-foreground mb-6">{t('checkout.contact')}</h2>
                <div className="space-y-4">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder={t('auth.email')}
                    className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder={t('checkout.phone')}
                    className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-steelfish text-2xl text-foreground mb-6">{t('checkout.shippingAddress')}</h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder={t('auth.firstName')}
                      className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder={t('auth.lastName')}
                      className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder={t('checkout.streetAddress')}
                    className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />

                  <input
                    type="text"
                    name="addressLine2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                    placeholder={t('checkout.apartment')}
                    className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                  />

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      placeholder={t('checkout.city')}
                      className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder={t('checkout.postalCode')}
                      className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>

                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-muted/50 border border-border rounded-lg text-foreground focus:outline-none focus:border-primary transition-colors"
                  >
                    {allCountries.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Shipping Method */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-steelfish text-2xl text-foreground mb-6">{t('checkout.shippingMethod')}</h2>
                
                {isFreeShipping && (
                  <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center gap-2">
                    <Truck className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-green-500 font-medium">{t('checkout.freeShipping')}</span>
                  </div>
                )}
                
                <div className="space-y-3">
                  {/* DHL Option */}
                  <label
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      shippingMethod === 'DHL'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value="DHL"
                      checked={shippingMethod === 'DHL'}
                      onChange={() => setShippingMethod('DHL')}
                      className="sr-only"
                    />
                    <div className="w-12 h-12 rounded-lg bg-[#FFCC00] flex items-center justify-center">
                      <Truck className="w-6 h-6 text-[#D40511]" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-steelfish text-lg text-foreground">DHL Express</h3>
                      <p className="text-sm text-muted-foreground">
                        {currentRates.DHL.days} {t('checkout.businessDays')} • {t('checkout.trackingIncluded')}
                      </p>
                    </div>
                    <div className="text-right">
                      {isFreeShipping ? (
                        <span className="font-steelfish text-xl text-green-500">{t('cart.free')}</span>
                      ) : (
                        <span className="font-steelfish text-xl text-primary">€{currentRates.DHL.price.toFixed(2)}</span>
                      )}
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      shippingMethod === 'DHL' ? 'border-primary' : 'border-muted-foreground'
                    }`}>
                      {shippingMethod === 'DHL' && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                    </div>
                  </label>

                  {/* PostNL Option */}
                  <label
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      shippingMethod === 'PostNL'
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value="PostNL"
                      checked={shippingMethod === 'PostNL'}
                      onChange={() => setShippingMethod('PostNL')}
                      className="sr-only"
                    />
                    <div className="w-12 h-12 rounded-lg bg-[#FF6600] flex items-center justify-center">
                      <Package className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-steelfish text-lg text-foreground">PostNL</h3>
                      <p className="text-sm text-muted-foreground">
                        {currentRates.PostNL.days} {t('checkout.businessDays')} • {t('checkout.trackingIncluded')}
                      </p>
                    </div>
                    <div className="text-right">
                      {isFreeShipping ? (
                        <span className="font-steelfish text-xl text-green-500">{t('cart.free')}</span>
                      ) : (
                        <span className="font-steelfish text-xl text-primary">€{currentRates.PostNL.price.toFixed(2)}</span>
                      )}
                    </div>
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      shippingMethod === 'PostNL' ? 'border-primary' : 'border-muted-foreground'
                    }`}>
                      {shippingMethod === 'PostNL' && <div className="w-3 h-3 rounded-full bg-primary"></div>}
                    </div>
                  </label>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-card border border-border rounded-xl p-6">
                <h2 className="font-steelfish text-2xl text-foreground mb-6">{t('checkout.paymentMethod')}</h2>
                
                <div className="border-2 border-primary rounded-xl p-5 bg-primary/5">
                  <div className="flex items-center gap-4">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#627EEA] to-[#3C3C3D] flex items-center justify-center">
                      <Wallet className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-steelfish text-xl text-foreground">{t('checkout.evmAccepted')}</h3>
                      <p className="text-sm text-muted-foreground">ETH • USDT • USDC • DAI • WETH</p>
                    </div>
                    <div className="w-5 h-5 rounded-full border-2 border-primary flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-primary"></div>
                    </div>
                  </div>

                  <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">{t('checkout.paymentConfirm')}</p>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Shield className="w-4 h-4 text-green-500" />
                      <span>{t('checkout.secureAnonymous')}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl p-6 sticky top-8">
                <h3 className="font-steelfish text-2xl text-foreground mb-6">{t('checkout.orderSummary')}</h3>

                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('cart.subtotal')}</span>
                    <span className="font-medium">€{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{t('cart.shipping')} ({shippingMethod})</span>
                    {isFreeShipping ? (
                      <span className="font-medium text-green-500">{t('cart.free')}</span>
                    ) : (
                      <span className="font-medium">€{shipping.toFixed(2)}</span>
                    )}
                  </div>
                </div>

                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-steelfish text-xl">{t('cart.total')}</span>
                    <span className="font-steelfish text-2xl text-primary">€{total.toFixed(2)}</span>
                  </div>
                </div>

                <button 
                  onClick={async () => {
                    if (!userId) {
                      toast({
                        variant: 'destructive',
                        title: 'Login Required',
                        description: 'Please login to place an order.',
                      });
                      navigate('/auth');
                      return;
                    }

                    if (!formData.firstName || !formData.lastName || !formData.address || !formData.city || !formData.postalCode) {
                      toast({
                        variant: 'destructive',
                        title: 'Missing Information',
                        description: 'Please fill in all required fields.',
                      });
                      return;
                    }

                    setIsLoading(true);
                    try {
                      // Create order with 30 min expiration
                      const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();
                      
                      const orderData = {
                        user_id: userId,
                        // PASTE THIS:
order_items: items.map(item => ({
  name: item.name,
  quantity: item.quantity,
  size: item.size,
  price: item.price,
  image: item.image
})),

                        subtotal: subtotal,
                        shipping: shipping,
                        total: total,
                        shipping_address: {
                          firstName: formData.firstName,
                          lastName: formData.lastName,
                          address: formData.address,
                          addressLine2: formData.addressLine2,
                          city: formData.city,
                          postalCode: formData.postalCode,
                          country: formData.country,
                          email: formData.email,
                          phone: formData.phone,
                        },
                        shipping_method: shippingMethod,
                        expires_at: expiresAt,
                      };

                      const { data, error } = await supabase
                        .from('orders')
                        .insert(orderData)
                        .select()
                        .single();

                      if (error) throw error;

                      // Navigate to order page within React app
                      clearCart();

                      navigate(`/order?id=${data.id}`);
                    } catch (error) {
                      console.error('Error creating order:', error);
                      toast({
                        variant: 'destructive',
                        title: 'Error',
                        description: 'Failed to create order. Please try again.',
                      });
                    } finally {
                      setIsLoading(false);
                    }
                  }}
                  disabled={isLoading}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-steelfish text-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Lock className="w-5 h-5" />
                  )}
                  {isLoading ? 'Creating Order...' : t('checkout.placeOrder')}
                </button>

                <div className="mt-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>{t('checkout.sslEncrypted')}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Wallet className="w-4 h-4 text-primary" />
                    <span>{t('checkout.ethPayment')}</span>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground text-center mt-6">
                  {t('checkout.termsAgree')}{' '}
                  <Link to="/terms" className="text-primary hover:underline">{t('checkout.termsConditions')}</Link>
                </p>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Checkout;