import premiumBanner from '@/assets/premium-quality-banner.png';

const FeaturesSection = () => {
  return (
    <section className="py-8 lg:py-12 bg-background relative overflow-hidden">
      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto">
          <img 
            src={premiumBanner} 
            alt="Premium Quality Assured" 
            className="w-full h-auto rounded-2xl"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;