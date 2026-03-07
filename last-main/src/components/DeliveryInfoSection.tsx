import { Truck, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import euFlag from "@/assets/flags/eu-flag.jpeg";
import ukFlag from "@/assets/flags/uk-flag.jpeg";
import worldFlag from "@/assets/flags/world-flag.jpeg";

const DeliveryInfoSection = () => {
  const { t } = useLanguage();
  
  const deliveryZones = [
    {
      region: t('delivery.eu'),
      flag: euFlag,
      days: "3-5",
      description: t('delivery.eu.desc'),
    },
    {
      region: t('delivery.uk'),
      flag: ukFlag,
      days: "5-7",
      description: t('delivery.uk.desc'),
    },
    {
      region: t('delivery.intl'),
      flag: worldFlag,
      days: "7-21",
      description: t('delivery.intl.desc'),
    },
  ];

  return (
    <section className="py-8 lg:py-12 bg-card/50">
      <div className="container">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Truck className="w-4 h-4" />
            <span className="text-sm font-medium">{t('delivery.badge')}</span>
          </div>
          <h2 className="font-steelfish text-4xl lg:text-5xl text-foreground mb-4 tracking-wide">
            {t('delivery.title')} <span className="text-primary">{t('delivery.title2')}</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            {t('delivery.description')}
          </p>
        </div>

        {/* Delivery Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {deliveryZones.map((zone) => (
            <div
              key={zone.region}
              className="bg-background border border-border rounded-2xl p-6 text-center hover:border-primary/50 transition-colors"
            >
              <div className="w-16 h-12 mx-auto mb-4 rounded-xl overflow-hidden">
                <img src={zone.flag} alt={zone.region} className="w-full h-full object-cover" />
              </div>
              <h3 className="font-steelfish text-2xl text-foreground mb-2 tracking-wide">
                {zone.region}
              </h3>
              <div className="flex items-center justify-center gap-2 text-primary mb-3">
                <Clock className="w-4 h-4" />
                <span className="font-bold text-xl">{zone.days} {t('delivery.days')}</span>
              </div>
              <p className="text-muted-foreground text-sm">{zone.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm max-w-xl mx-auto">
            {t('delivery.note')}
          </p>
        </div>
      </div>
    </section>
  );
};

export default DeliveryInfoSection;