import WarningBanner from "@/components/WarningBanner";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SnowAnimation } from "@/components/SnowAnimation";
import { Shield, Users, Beaker, Heart, Wallet } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <SnowAnimation />
      <div className="fixed inset-0 hex-pattern pointer-events-none z-0 opacity-40" />
      
      <div className="relative z-10">
        <WarningBanner />
        <Header />
        
        <main className="py-16 lg:py-24">
          <div className="container max-w-4xl">
            {/* Hero Section */}
            <div className="text-center mb-16">
              <h1 className="font-steelfish text-5xl lg:text-7xl text-foreground mb-6 tracking-wide">
                {t('about.title')}
              </h1>
              <div className="w-24 h-1 bg-primary mx-auto mb-8" />
            </div>

            {/* Main Content */}
            <div className="space-y-8 text-lg leading-relaxed">
              <p className="text-foreground">
                <span className="font-steelfish text-2xl text-primary">rechemsback.com</span> {t('about.intro')}
              </p>

              <p className="text-muted-foreground">
                {t('about.quality')}
              </p>

              {/* Values Section */}
              <div className="grid md:grid-cols-2 gap-6 my-12">
                <div className="glass-card p-6 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-steelfish text-xl text-foreground mb-2">{t('about.privacy')}</h3>
                  <p className="text-muted-foreground text-sm">{t('about.privacy.desc')}</p>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Beaker className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-steelfish text-xl text-foreground mb-2">{t('about.dutchQuality')}</h3>
                  <p className="text-muted-foreground text-sm">{t('about.dutchQuality.desc')}</p>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-steelfish text-xl text-foreground mb-2">{t('about.community')}</h3>
                  <p className="text-muted-foreground text-sm">{t('about.community.desc')}</p>
                </div>

                <div className="glass-card p-6 rounded-2xl">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <Heart className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-steelfish text-xl text-foreground mb-2">{t('about.harmReduction')}</h3>
                  <p className="text-muted-foreground text-sm">{t('about.harmReduction.desc')}</p>
                </div>
              </div>

              {/* Ethereum Payment Section */}
              <div className="bg-card border border-border rounded-2xl p-8 my-12">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#627EEA] to-[#3C3C3D] flex items-center justify-center">
                    <Wallet className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h3 className="font-steelfish text-2xl text-foreground">{t('about.cryptoTitle')}</h3>
                    <p className="text-muted-foreground">{t('about.cryptoSubtitle')}</p>
                  </div>
                </div>
                
                <div className="space-y-4 text-muted-foreground">
                  <p>{t('about.cryptoDesc1')}</p>
                  
                  <p>
                    <span className="text-foreground font-medium">{t('about.cryptoNetworks')}</span> {t('about.cryptoNetworksList')}
                  </p>
                  
                  <p>
                    <span className="text-foreground font-medium">{t('about.cryptoTokens')}</span> {t('about.cryptoTokensList')}
                  </p>
                  
                  <p>{t('about.cryptoPrivacy')}</p>
                </div>
              </div>

              {/* Philosophy */}
              <div className="border-l-4 border-primary pl-6 py-4 bg-secondary/50 rounded-r-xl">
                <p className="text-foreground italic">
                  {t('about.philosophy')}
                </p>
              </div>

              <p className="text-foreground font-medium">
                {t('about.standFor')}
              </p>

              <p className="font-steelfish text-3xl text-primary text-center pt-8">
                {t('about.slogan')}
              </p>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default About;