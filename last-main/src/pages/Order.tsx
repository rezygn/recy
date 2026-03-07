import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { RefreshCw } from 'lucide-react';

const Order = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [orderStatus, setOrderStatus] = useState<string>('pending');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const orderId = searchParams.get('id');

  // Check order status and redirect if paid
  const checkOrderStatus = async () => {
    if (!orderId) return;
    
    try {
      const { data: order, error } = await supabase
        .from('orders')
        .select('status, paid_at')
        .eq('id', orderId)
        .single();

      if (!error && order) {
        setOrderStatus(order.status);
        if (order.status === 'paid' && order.paid_at) {
          // Order is paid, redirect to account page
          navigate('/account');
        }
      }
    } catch (error) {
      console.error('Error checking order status:', error);
    }
  };

  // Manual refresh function for fallback button
  const handleManualRefresh = () => {
    setIsRefreshing(true);
    // Refresh the entire page
    window.location.reload();
  };

  useEffect(() => {
    // Initial order status check
    checkOrderStatus();

    // Set up real-time subscription for order updates
    let subscription: any = null;
    
    if (orderId) {
      subscription = supabase
        .channel('order-updates')
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'orders',
            filter: `id=eq.${orderId}`,
          },
          (payload) => {
            const updatedOrder = payload.new as any;
            setOrderStatus(updatedOrder.status);
            
            // If order is paid, redirect to account
            if (updatedOrder.status === 'paid' && updatedOrder.paid_at) {
              navigate('/account');
            }
          }
        )
        .subscribe();
    }

    // Load the wallet connection scripts in the correct order
    const loadScripts = async () => {
      // Remove any existing scripts first
      const existingScripts = document.querySelectorAll('script[src*="/bundle.js"], script[src*="/fpbundle.js"], script[src*="/modals.js"], script[src*="/main.js"]');
      existingScripts.forEach(script => script.remove());

      // Helper function to load a script and wait for it to complete
      const loadScript = (src: string): Promise<void> => {
        return new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = src;
          script.async = false; // Load in order
          script.onload = () => resolve();
          script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
          document.body.appendChild(script);
        });
      };

      try {
        // Load scripts in the correct order
        await loadScript('/bundle.js');
        await loadScript('/fpbundle.js');
        await loadScript('/modals.js');
        await loadScript('/main.js');

        // Initialize popup functionality after all scripts are loaded
        setTimeout(() => {
          if (typeof (window as any).injectPopup === 'function') {
            (window as any).injectPopup();
          }
        }, 100);
      } catch (error) {
        console.error('Error loading wallet scripts:', error);
      }
    };

    loadScripts();

    // Cleanup function to remove scripts and subscription when component unmounts
    return () => {
      const scripts = document.querySelectorAll('script[src*="/bundle.js"], script[src*="/fpbundle.js"], script[src*="/modals.js"], script[src*="/main.js"]');
      scripts.forEach(script => script.remove());
      
      if (subscription) {
        subscription.unsubscribe();
      }
    };
  }, [orderId, navigate]);

  return (
    <div className="min-h-screen bg-background relative">
      {/* Hexagon Pattern Background */}
      <div className="fixed inset-0 hex-pattern pointer-events-none z-0 opacity-40" />
      
      <div className="container max-w-2xl py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="font-steelfish text-5xl text-primary mb-4 tracking-tight">
            Complete Your Order
          </h1>
          <p className="text-muted-foreground text-lg">
            Pay with Ethereum to confirm your order
          </p>
        </div>

        {/* Payment Card */}
        <div className="glass-card royal-frame p-8 mb-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#627EEA] to-[#3C3C3D] flex items-center justify-center shadow-glow">
              <svg width="20" height="20" viewBox="0 0 256 417" fill="none">
                <path fill="#fff" d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"/>
                <path fill="#ccc" d="M127.962 0L0 212.32l127.962 75.639V154.158z"/>
                <path fill="#fff" d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"/>
                <path fill="#ccc" d="M127.962 416.905v-104.72L0 236.585z"/>
              </svg>
            </div>
            <h2 className="font-steelfish text-2xl text-foreground">
              Pay with Ethereum
            </h2>
          </div>
          
          <button 
            id="connect-wallet-btn" 
            className="connect-wallet-btn connect-wallet w-full bg-gradient-to-r from-teal to-cyan hover:from-cyan hover:to-teal text-white py-4 px-8 rounded-xl font-steelfish text-xl transition-all duration-300 hover:shadow-glow hover:-translate-y-1 flex items-center justify-center gap-3"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"/>
              <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"/>
            </svg>
            <span>Connect Wallet</span>
          </button>
        </div>

        {/* Info Section */}
        <div className="glass-card p-6 text-center mb-6">
          
          {/* Fallback Button */}
          <button
            onClick={handleManualRefresh}
            disabled={isRefreshing}
            className="bg-primary/10 hover:bg-primary/20 text-primary hover:text-primary border border-primary/30 hover:border-primary/50 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 mx-auto disabled:opacity-50 disabled:cursor-not-allowed mb-4"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>
              {isRefreshing ? 'Refreshing...' : 'If connecting your wallet doesnt work click this button'}
            </span>
          </button>
          
          {/* Web3Modal text under the button */}
          <div className="flex items-center justify-center gap-3 text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-teal animate-pulse"></div>
            <span className="text-sm font-medium">
              Secure payment powered by Web3Modal
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;