import { useState } from 'react';
import { SnowAnimation } from '@/components/SnowAnimation';
import Header from '@/components/Header';
import WarningBanner from '@/components/WarningBanner';
import Footer from '@/components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, ArrowRight, FlaskConical, Loader2, ArrowLeft, KeyRound, Lock, CheckCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { z } from 'zod';

const emailSchema = z.string().email('Please enter a valid email address');
const codeSchema = z.string().length(6, 'Code must be 6 digits');
const passwordSchema = z.string().min(6, 'Password must be at least 6 characters');

type Step = 'email' | 'code' | 'success';

const ForgotPassword = () => {
  const [step, setStep] = useState<Step>('email');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      setErrors({ email: emailResult.error.errors[0].message });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const { data, error } = await supabase.functions.invoke('send-password-reset', {
        body: { email, redirectUrl: window.location.origin }
      });

      if (error) throw error;

      toast({
        title: 'Code Sent!',
        description: 'Check your email for the 6-digit reset code.',
      });
      setStep('code');
    } catch (error: any) {
      console.error('Error sending reset code:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to send reset code. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: Record<string, string> = {};
    
    const codeResult = codeSchema.safeParse(code);
    if (!codeResult.success) {
      newErrors.code = codeResult.error.errors[0].message;
    }

    const passwordResult = passwordSchema.safeParse(newPassword);
    if (!passwordResult.success) {
      newErrors.newPassword = passwordResult.error.errors[0].message;
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const { data, error } = await supabase.functions.invoke('verify-reset-code', {
        body: { email, code, newPassword }
      });

      if (error) throw error;

      if (data?.error) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: data.error,
        });
        return;
      }

      toast({
        title: 'Password Reset!',
        description: 'Your password has been successfully updated.',
      });
      setStep('success');
    } catch (error: any) {
      console.error('Error verifying reset code:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Invalid or expired code. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.functions.invoke('send-password-reset', {
        body: { email, redirectUrl: window.location.origin }
      });

      if (error) throw error;

      toast({
        title: 'Code Resent!',
        description: 'A new code has been sent to your email.',
      });
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to resend code. Please try again.',
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
              {step === 'email' && 'Reset Password'}
              {step === 'code' && 'Enter Code'}
              {step === 'success' && 'Success!'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {step === 'email' && "Enter your email to receive a reset code"}
              {step === 'code' && `Enter the 6-digit code sent to ${email}`}
              {step === 'success' && "Your password has been reset"}
            </p>
          </div>

          {/* Card */}
          <div className="bg-card border border-border rounded-2xl p-8">
            {step === 'email' && (
              <form onSubmit={handleSendCode} className="space-y-4">
                <div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (errors.email) setErrors({});
                      }}
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

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-steelfish text-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Reset Code
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <div className="text-center pt-4">
                  <Link to="/auth" className="text-primary hover:underline inline-flex items-center gap-2">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Sign In
                  </Link>
                </div>
              </form>
            )}

            {step === 'code' && (
              <form onSubmit={handleVerifyCode} className="space-y-4">
                {/* Code Input */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Reset Code</label>
                  <div className="relative">
                    <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="text"
                      value={code}
                      onChange={(e) => {
                        const val = e.target.value.replace(/\D/g, '').slice(0, 6);
                        setCode(val);
                        if (errors.code) setErrors({ ...errors, code: '' });
                      }}
                      placeholder="000000"
                      maxLength={6}
                      className={`w-full pl-12 pr-4 py-3 bg-muted/50 border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors text-center text-2xl font-mono tracking-[0.5em] ${
                        errors.code ? 'border-destructive' : 'border-border'
                      }`}
                    />
                  </div>
                  {errors.code && (
                    <p className="text-xs text-destructive mt-1">{errors.code}</p>
                  )}
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">New Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => {
                        setNewPassword(e.target.value);
                        if (errors.newPassword) setErrors({ ...errors, newPassword: '' });
                      }}
                      placeholder="New Password"
                      className={`w-full pl-12 pr-4 py-3 bg-muted/50 border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors ${
                        errors.newPassword ? 'border-destructive' : 'border-border'
                      }`}
                    />
                  </div>
                  {errors.newPassword && (
                    <p className="text-xs text-destructive mt-1">{errors.newPassword}</p>
                  )}
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm text-muted-foreground mb-2">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: '' });
                      }}
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

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-steelfish text-xl hover:bg-primary/90 transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Reset Password
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </button>

                <div className="text-center pt-4 space-y-2">
                  <button
                    type="button"
                    onClick={handleResendCode}
                    disabled={isLoading}
                    className="text-primary hover:underline text-sm"
                  >
                    Didn't receive the code? Resend
                  </button>
                  <div>
                    <button
                      type="button"
                      onClick={() => setStep('email')}
                      className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Use different email
                    </button>
                  </div>
                </div>
              </form>
            )}

            {step === 'success' && (
              <div className="text-center space-y-6">
                <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-4">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <p className="text-muted-foreground">
                  Your password has been successfully reset. You can now sign in with your new password.
                </p>
                <Link
                  to="/auth"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-xl font-steelfish text-lg hover:bg-primary/90 transition-colors"
                >
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ForgotPassword;
