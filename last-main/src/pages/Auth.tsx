import { useState, useEffect } from 'react';
import { SnowAnimation } from '@/components/SnowAnimation';
import Header from '@/components/Header';
import WarningBanner from '@/components/WarningBanner';
import Footer from '@/components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight, FlaskConical, Loader2, ChevronDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';
import { useLanguage } from '@/contexts/LanguageContext';

const emailSchema = z.string().email('Please enter a valid email address');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [termsExpanded, setTermsExpanded] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useLanguage();

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (session?.user) {
          navigate('/');
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        navigate('/');
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Validate email
    const emailResult = emailSchema.safeParse(formData.email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }

    // Validate password
    const passwordResult = passwordSchema.safeParse(formData.password);
    if (!passwordResult.success) {
      newErrors.password = passwordResult.error.errors[0].message;
    }

    // For signup, validate confirm password
    if (!isLogin) {
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      if (!formData.firstName.trim()) {
        newErrors.firstName = 'First name is required';
      }
      if (!formData.lastName.trim()) {
        newErrors.lastName = 'Last name is required';
      }
      if (!termsAccepted) {
        newErrors.terms = 'You must accept the Terms & Conditions';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              variant: 'destructive',
              title: 'Login Failed',
              description: 'Invalid email or password. Please try again.',
            });
          } else {
            toast({
              variant: 'destructive',
              title: 'Login Failed',
              description: error.message,
            });
          }
          return;
        }

        toast({
          title: 'Welcome back!',
          description: 'You have successfully signed in.',
        });
      } else {
        const redirectUrl = `${window.location.origin}/`;
        
        const { error } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: redirectUrl,
            data: {
              first_name: formData.firstName,
              last_name: formData.lastName,
            },
          },
        });

        if (error) {
          if (error.message.includes('User already registered')) {
            toast({
              variant: 'destructive',
              title: 'Account Exists',
              description: 'An account with this email already exists. Please sign in instead.',
            });
            setIsLogin(true);
          } else {
            toast({
              variant: 'destructive',
              title: 'Sign Up Failed',
              description: error.message,
            });
          }
          return;
        }

        toast({
          title: 'Account Created!',
          description: 'Welcome to the research community.',
        });
      }
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 hex-pattern pointer-events-none z-0 opacity-40" />
      <SnowAnimation />
      
      <WarningBanner />
      <Header />

      <main className="relative z-10 py-12">
        <div className="container max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <FlaskConical className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-steelfish text-4xl text-foreground tracking-wide">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isLogin 
                ? 'Sign in to access your research account' 
                : 'Join our research community'}
            </p>
          </div>

          {/* Auth Card */}
          <div className="bg-card border border-border rounded-2xl p-8">
            {/* Toggle */}
            <div className="flex bg-muted/50 rounded-xl p-1 mb-8">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-lg font-steelfish text-lg transition-all ${
                  isLogin 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-lg font-steelfish text-lg transition-all ${
                  !isLogin 
                    ? 'bg-primary text-primary-foreground' 
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Sign Up
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name fields for signup */}
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First Name"
                        className={`w-full pl-12 pr-4 py-3 bg-muted/50 border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors ${
                          errors.firstName ? 'border-destructive' : 'border-border'
                        }`}
                      />
                    </div>
                    {errors.firstName && (
                      <p className="text-xs text-destructive mt-1">{errors.firstName}</p>
                    )}
                  </div>
                  <div>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last Name"
                        className={`w-full pl-12 pr-4 py-3 bg-muted/50 border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors ${
                          errors.lastName ? 'border-destructive' : 'border-border'
                        }`}
                      />
                    </div>
                    {errors.lastName && (
                      <p className="text-xs text-destructive mt-1">{errors.lastName}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Email */}
              <div>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className={`w-full pl-12 pr-4 py-3 bg-muted/50 border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors ${
                      errors.email ? 'border-destructive' : 'border-border'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive mt-1">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={`w-full pl-12 pr-4 py-3 bg-muted/50 border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors ${
                      errors.password ? 'border-destructive' : 'border-border'
                    }`}
                  />
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive mt-1">{errors.password}</p>
                )}
              </div>

              {/* Confirm Password for signup */}
              {!isLogin && (
                <div>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm Password"
                      className={`w-full pl-12 pr-4 py-3 bg-muted/50 border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors ${
                        errors.confirmPassword ? 'border-destructive' : 'border-border'
                      }`}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>
                  )}
                </div>
              )}

              {/* Terms Checkbox with Dropdown */}
              {!isLogin && (
                <div className="space-y-2">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      id="termsAccept"
                      checked={termsAccepted}
                      onChange={(e) => {
                        setTermsAccepted(e.target.checked);
                        if (errors.terms) {
                          setErrors({ ...errors, terms: '' });
                        }
                      }}
                      className={`mt-1 w-5 h-5 rounded border-2 bg-muted/50 text-primary focus:ring-primary cursor-pointer ${
                        errors.terms ? 'border-destructive' : 'border-border'
                      }`}
                    />
                    <div className="flex-1">
                      <button
                        type="button"
                        onClick={() => setTermsExpanded(!termsExpanded)}
                        className="flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors"
                      >
                        <span>{t('terms.agreeCheckbox')}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform ${termsExpanded ? 'rotate-180' : ''}`} />
                      </button>
                    </div>
                  </div>
                  
                  {errors.terms && (
                    <p className="text-xs text-destructive ml-8">{errors.terms}</p>
                  )}
                  
                  {/* Expandable Terms Content */}
                  {termsExpanded && (
                    <div className="ml-8 mt-3 p-4 bg-muted/30 border border-border rounded-xl max-h-64 overflow-y-auto text-sm text-foreground/80 space-y-4">
                      <div>
                        <h4 className="font-semibold text-primary mb-1">{t('terms.agreement.title')}</h4>
                        <p>{t('terms.agreement.content')}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-1">{t('terms.age.title')}</h4>
                        <p>{t('terms.age.content')}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-1">{t('terms.products.title')}</h4>
                        <p>{t('terms.products.content')}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-1">{t('terms.ordering.title')}</h4>
                        <p>{t('terms.ordering.content')}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-1">{t('terms.payment.title')}</h4>
                        <p>{t('terms.payment.content')}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-1">{t('terms.returns.title')}</h4>
                        <p>{t('terms.returns.content')}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-1">{t('terms.disclaimer.title')}</h4>
                        <p>{t('terms.disclaimer.content')}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-1">{t('terms.indemnification.title')}</h4>
                        <p>{t('terms.indemnification.content')}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-1">{t('terms.governing.title')}</h4>
                        <p>{t('terms.governing.content')}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold text-primary mb-1">{t('terms.changes.title')}</h4>
                        <p>{t('terms.changes.content')}</p>
                      </div>
                      <Link to="/terms" className="inline-block text-primary hover:underline mt-2">
                        {t('terms.readTerms')} →
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {/* Forgot Password */}
              {isLogin && (
                <div className="text-right">
                  <Link to="/forgot-password" className="text-sm text-primary hover:underline">
                    Forgot password?
                  </Link>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-steelfish text-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {isLogin ? 'Signing In...' : 'Creating Account...'}
                  </>
                ) : (
                  <>
                    {isLogin ? 'Sign In' : 'Create Account'}
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            {/* Terms for signup - removed as it's now in the form */}
          </div>

          {/* Research disclaimer */}
          <p className="text-xs text-muted-foreground text-center mt-6">
            All products are sold strictly for research purposes only.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Auth;