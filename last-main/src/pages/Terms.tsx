import { SnowAnimation } from '@/components/SnowAnimation';
import Header from '@/components/Header';
import WarningBanner from '@/components/WarningBanner';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { FileText } from 'lucide-react';

const Terms = () => {
  const { t } = useLanguage();

  const sections = [
    { title: t('terms.agreement.title'), content: t('terms.agreement.content') },
    { title: t('terms.age.title'), content: t('terms.age.content') },
    { title: t('terms.products.title'), content: t('terms.products.content') },
    { title: t('terms.ordering.title'), content: t('terms.ordering.content') },
    { title: t('terms.payment.title'), content: t('terms.payment.content') },
    { title: t('terms.returns.title'), content: t('terms.returns.content') },
    { title: t('terms.disclaimer.title'), content: t('terms.disclaimer.content') },
    { title: t('terms.indemnification.title'), content: t('terms.indemnification.content') },
    { title: t('terms.governing.title'), content: t('terms.governing.content') },
    { title: t('terms.changes.title'), content: t('terms.changes.content') },
  ];

  return (
    <div className="min-h-screen bg-background relative">
      <div className="fixed inset-0 hex-pattern pointer-events-none z-0 opacity-40" />
      <SnowAnimation />
      
      <WarningBanner />
      <Header />

      <main className="relative z-10 py-12">
        <div className="container max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-4">
              <FileText className="w-8 h-8 text-primary" />
            </div>
            <h1 className="font-steelfish text-5xl md:text-6xl text-foreground tracking-wide">
              {t('terms.title')} <span className="text-primary">{t('terms.title2')}</span>
            </h1>
            <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
              {t('terms.intro')}
            </p>
          </div>

          {/* Terms Content */}
          <div className="bg-card border border-border rounded-2xl p-8 space-y-8">
            {sections.map((section, index) => (
              <div key={index} className="space-y-3">
                <h2 className="font-steelfish text-2xl text-primary">{section.title}</h2>
                <p className="text-foreground/80 leading-relaxed">{section.content}</p>
              </div>
            ))}
          </div>

          {/* Research disclaimer */}
          <p className="text-xs text-muted-foreground text-center mt-6">
            {t('terms.researchDisclaimer')}
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;