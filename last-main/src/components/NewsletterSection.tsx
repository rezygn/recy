import { useState } from "react";
import { Mail, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for joining our newsletter.",
      });
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <section className="py-8 lg:py-12 bg-background">
      <div className="container">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-teal-dark p-8 lg:p-16">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 400 400" fill="none">
              <circle cx="50" cy="50" r="100" stroke="currentColor" strokeWidth="0.5" className="text-primary-foreground" />
              <circle cx="350" cy="300" r="150" stroke="currentColor" strokeWidth="0.5" className="text-primary-foreground" />
            </svg>
          </div>

          <div className="relative z-10 max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-foreground/10 mb-6">
              <Mail className="h-8 w-8 text-primary-foreground" />
            </div>
            
            <h2 className="font-steelfish text-4xl lg:text-5xl text-primary-foreground mb-4 tracking-wide">
              {t('newsletter.title')} {t('newsletter.title2')}
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8">
              {t('newsletter.description')}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <div className="relative flex-1">
                <Input
                  type="email"
                  placeholder={t('newsletter.placeholder')}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 pl-4 pr-4 bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-primary-foreground focus:ring-primary-foreground/30"
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="h-12 bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-6 font-steelfish text-lg tracking-wide"
              >
                {isSubmitted ? (
                  <>
                    <CheckCircle className="h-4 w-4" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    {t('newsletter.cta')}
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </Button>
            </form>

            <p className="text-primary-foreground/60 text-sm mt-4">
              {t('newsletter.privacy')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;