import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import professorImage from "@/assets/professor-hero.png";

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream to-secondary">
      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 items-center py-12 lg:py-20">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-500 text-sm font-medium">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              {t('hero.badge')}
            </div>
            
            <h1 className="font-steelfish text-5xl md:text-6xl lg:text-7xl text-foreground leading-tight tracking-wide">
              {t('hero.title1')}{" "}
              <span className="text-primary">{t('hero.title2')}</span>
              <br />
              {t('hero.title3')}
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
              {t('hero.description')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/products">
                <Button variant="hero" className="group font-steelfish text-lg tracking-wide">
                  {t('hero.cta')}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-6 justify-center lg:justify-start pt-4">
              <div className="text-center">
                <div className="font-steelfish text-3xl text-foreground">99.9%</div>
                <div className="text-xs text-muted-foreground">{t('hero.purity')}</div>
              </div>
              <div className="w-px h-10 bg-border"></div>
              <div className="text-center">
                <div className="font-steelfish text-3xl text-foreground">24h</div>
                <div className="text-xs text-muted-foreground">{t('hero.shipping')}</div>
              </div>
              <div className="w-px h-10 bg-border"></div>
              <div className="text-center">
                <div className="font-steelfish text-3xl text-foreground">5K+</div>
                <div className="text-xs text-muted-foreground">{t('hero.clients')}</div>
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative flex justify-center lg:justify-end animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="relative">
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-orange/20 rounded-full blur-2xl"></div>
              
              <img
                src={professorImage}
                alt="Friendly scientist with colorful chemicals"
                className="relative w-full max-w-md lg:max-w-lg animate-float rounded-3xl"
                style={{ filter: 'drop-shadow(0 0 0 transparent)' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <svg className="absolute top-0 right-0 w-1/2 h-full" viewBox="0 0 400 400" fill="none">
          <circle cx="300" cy="100" r="80" stroke="currentColor" strokeWidth="0.5" className="text-primary/20" />
          <circle cx="350" cy="200" r="120" stroke="currentColor" strokeWidth="0.5" className="text-primary/20" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;