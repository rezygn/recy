import { useLanguage } from "@/contexts/LanguageContext";
import cryptoVideo from "@/assets/crypto-tutorial.mp4";
import cryptoThumbnail from "@/assets/crypto-thumbnail.jpeg";

const CryptoVideoSection = () => {
  const { t } = useLanguage();
  
  return (
    <section className="py-8 lg:py-12 bg-background">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-steelfish text-4xl lg:text-5xl text-foreground mb-4 tracking-wide">
            {t('crypto.title')} <span className="text-primary">{t('crypto.title2')}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('crypto.description')}
          </p>
        </div>

        {/* Video Container */}
        <div className="max-w-4xl mx-auto">
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-border shadow-lg">
            <video
              src={cryptoVideo}
              poster={cryptoThumbnail}
              className="absolute inset-0 w-full h-full object-cover"
              controls
              playsInline
              title="How to Buy Crypto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CryptoVideoSection;