import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Star, ShoppingBag, Menu, X, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLanguage, Language } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import logo from "@/assets/logo.png";
import enFlag from "@/assets/flags/en-flag.jpeg";
import nlFlag from "@/assets/flags/nl-flag.png";
import deFlag from "@/assets/flags/de-flag.webp";

import { useCart } from '@/contexts/CartContext';

const languages = [
  { code: 'en' as Language, name: 'English', flag: enFlag },
  { code: 'nl' as Language, name: 'Nederlands', flag: nlFlag },
  { code: 'de' as Language, name: 'Deutsch', flag: deFlag },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

const { items } = useCart();
// This calculates the total number of all items in the cart
const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasActiveOrder, setHasActiveOrder] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setIsLoggedIn(!!session?.user);
        if (session?.user) {
          checkActiveOrders(session.user.id);
        } else {
          setHasActiveOrder(false);
        }
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session?.user);
      if (session?.user) {
        checkActiveOrders(session.user.id);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkActiveOrders = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('id')
        .eq('user_id', userId)
        .eq('status', 'pending')
        .gt('expires_at', new Date().toISOString())
        .limit(1);

      if (!error && data && data.length > 0) {
        setHasActiveOrder(true);
      } else {
        setHasActiveOrder(false);
      }
    } catch (err) {
      console.error('Error checking active orders:', err);
    }
  };

  const navLinks = [
    { name: t('nav.products'), href: "/products" },
    { name: t('nav.safety'), href: "/safety" },
    { name: t('nav.about'), href: "/about" },
    { name: t('nav.terms'), href: "/terms" },
  ];

  const currentLanguage = languages.find(l => l.code === language) || languages[0];

  return (
    <header className="sticky top-0 z-50 w-full bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border">
      <div className="flex h-16 items-center justify-between pr-4">
        {/* Logo */}
        <Link to="/" className="flex items-center h-16">
          <img src={logo} alt="rechemsback.com" className="h-16 w-auto" />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-muted/50"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-1">
          <Button variant="icon" size="icon" className="hidden sm:flex">
            <Search className="h-5 w-5" />
          </Button>
          
          {/* Language Selector - Circular Flag */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="w-5 h-5 rounded-full overflow-hidden border border-border hover:border-primary/50 transition-colors focus:outline-none">
                <img 
                  src={currentLanguage.flag} 
                  alt={currentLanguage.name}
                  className="w-full h-full object-cover"
                />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="min-w-[120px] bg-card border border-border p-1">
              {languages.map((lang) => (
                <DropdownMenuItem
                  key={lang.code}
                  onClick={() => setLanguage(lang.code)}
                  className={`flex items-center gap-2 cursor-pointer text-sm py-1.5 px-2 ${
                    language === lang.code ? 'bg-primary/10 text-primary' : ''
                  }`}
                >
                  <div className="w-4 h-4 rounded-full overflow-hidden shrink-0">
                    <img src={lang.flag} alt={lang.name} className="w-full h-full object-cover" />
                  </div>
                  <span className="text-xs">{lang.name}</span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link to={isLoggedIn ? "/account" : "/auth"}>
            <Button variant="icon" size="icon" className={`relative ${isLoggedIn ? "text-primary" : ""}`}>
              <User className="h-5 w-5" />
              {hasActiveOrder && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-orange text-[11px] font-semibold text-primary-foreground flex items-center justify-center animate-pulse">
                  1
                </span>
              )}
            </Button>
          </Link>
          
          <Button variant="icon" size="icon" className="hidden sm:flex">
            <Star className="h-5 w-5" />
          </Button>
          
          <Link to="/cart">
            <Button variant="icon" size="icon" className="relative">
              <ShoppingBag className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-orange text-[11px] font-semibold text-primary-foreground flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <Button
            variant="icon"
            size="icon"
            className="lg:hidden ml-1"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-fade-in">
          <nav className="container py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="flex items-center px-4 py-3 text-sm font-medium text-foreground hover:text-primary hover:bg-muted rounded-lg transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            
            {/* Language selector in mobile menu */}
            <div className="px-4 py-3 border-t border-border mt-2">
              <p className="text-xs text-muted-foreground mb-2">{t('language')}</p>
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code)}
                    className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-colors ${
                      language === lang.code
                        ? 'border-primary'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <img src={lang.flag} alt={lang.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;