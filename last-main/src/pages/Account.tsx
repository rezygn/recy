import { useState, useEffect } from 'react';
import { SnowAnimation } from '@/components/SnowAnimation';
import Header from '@/components/Header';
import WarningBanner from '@/components/WarningBanner';
import Footer from '@/components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { User, ChevronRight, Mail, Calendar, Clock, Package, AlertCircle, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { useLanguage } from '@/contexts/LanguageContext';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

interface Order {
  id: string;
  status: string;
  total: number;
  expires_at: string;
  created_at: string;
  order_items: OrderItem[];
  paid_at: string | null;
}

const formatTimeRemaining = (expiresAt: string): string => {
  const now = new Date().getTime();
  const expires = new Date(expiresAt).getTime();
  const diff = expires - now;
  
  if (diff <= 0) return 'Expired';
  
  const minutes = Math.floor(diff / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const Account = () => {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<Order[]>([]);
  const [, setTick] = useState(0);
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
        if (!session?.user) {
          navigate('/auth');
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session?.user) {
        navigate('/auth');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  // Fetch orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setOrders(data as unknown as Order[]);
      }
    };

    fetchOrders();
  }, [user]);

  // Timer for countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  const firstName = user?.user_metadata?.first_name || 'Researcher';
  const lastName = user?.user_metadata?.last_name || '';
  const email = user?.email || '';
  const memberSince = user?.created_at ? new Date(user.created_at).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : '';

  const pendingOrders = orders.filter(o => o.status === 'pending' && new Date(o.expires_at) > new Date());
  const paidOrders = orders.filter(o => o.status === 'paid' || o.paid_at);
  const expiredOrders = orders.filter(o => o.status === 'pending' && new Date(o.expires_at) <= new Date());

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 hex-pattern pointer-events-none z-0 opacity-40" />
      <SnowAnimation />
      
      <WarningBanner />
      <Header />

      <main className="relative z-10 py-8">
        <div className="container max-w-4xl">
          {/* Account Header */}
          <div className="bg-card border border-border rounded-2xl p-6 mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="font-steelfish text-3xl text-foreground tracking-wide">
                  {firstName} {lastName}
                </h1>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                  <Mail className="w-4 h-4" />
                  <span>{email}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1">
                  <Calendar className="w-4 h-4" />
                  <span>{t('account.memberSince')} {memberSince}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Pending Orders with Timer */}
          {pendingOrders.length > 0 && (
            <div className="bg-card border border-yellow-500/50 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <AlertCircle className="w-5 h-5 text-yellow-500" />
                <h2 className="font-steelfish text-2xl text-foreground">Pending Payment</h2>
              </div>
              <div className="space-y-4">
                {pendingOrders.map((order) => (
                  <div key={order.id} className="bg-muted/30 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Package className="w-5 h-5 text-primary" />
                        <span className="text-sm text-muted-foreground">Order #{order.id.slice(0, 8)}</span>
                      </div>
                      <div className="flex items-center gap-2 bg-yellow-500/20 px-3 py-1 rounded-full">
                        <Clock className="w-4 h-4 text-yellow-500" />
                        <span className="font-mono text-yellow-500 font-medium">
                          {formatTimeRemaining(order.expires_at)}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                      {(order.order_items as OrderItem[]).slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          {item.image && (
                            <img src={item.image} alt={item.name} className="w-8 h-8 rounded object-cover" />
                          )}
                          <span className="text-sm text-foreground">{item.name} x{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-steelfish text-xl text-primary">€{order.total.toFixed(2)}</span>
                      <Link
                        to={`/order?id=${order.id}`}
                        className="bg-primary text-primary-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors"
                      >
                        Complete Payment
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Paid Orders */}
          {paidOrders.length > 0 && (
            <div className="bg-card border border-green-500/50 rounded-2xl p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <h2 className="font-steelfish text-2xl text-foreground">Completed Orders</h2>
              </div>
              <div className="space-y-3">
                {paidOrders.map((order) => (
                  <div key={order.id} className="bg-muted/30 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <span className="text-sm text-muted-foreground">Order #{order.id.slice(0, 8)}</span>
                      <p className="font-steelfish text-lg text-primary">€{order.total.toFixed(2)}</p>
                    </div>
                    <span className="bg-green-500/20 text-green-500 px-3 py-1 rounded-full text-sm">Paid</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Expired Orders */}
          {expiredOrders.length > 0 && (
            <div className="bg-card border border-border rounded-2xl p-6 mb-6 opacity-60">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-muted-foreground" />
                <h2 className="font-steelfish text-2xl text-foreground">Expired Orders</h2>
              </div>
              <div className="space-y-3">
                {expiredOrders.map((order) => (
                  <div key={order.id} className="bg-muted/30 rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <span className="text-sm text-muted-foreground">Order #{order.id.slice(0, 8)}</span>
                      <p className="font-steelfish text-lg text-muted-foreground">€{order.total.toFixed(2)}</p>
                    </div>
                    <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">Expired</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to="/products"
              className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors"
            >
              <span className="text-foreground font-medium">{t('account.continueShopping')}</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
            <Link
              to="/safety"
              className="flex items-center justify-between p-4 bg-card border border-border rounded-xl hover:border-primary/50 transition-colors"
            >
              <span className="text-foreground font-medium">{t('account.safetyGuidelines')}</span>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Account;
