import { useState } from 'react';
import { ChevronLeft, ChevronRight, FlaskConical } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

// Product images
import img3fa from '@/assets/products/3fa.png';
import img4homet from '@/assets/products/4homet.png';
import imgLsd from '@/assets/products/lsd.png';
import img2fdck from '@/assets/products/2fdck.png';
import imgDck from '@/assets/products/dck.png';

const featuredProducts = [
  { id: 1, name: '3-FA', category: 'Amphetamines', price: 34.90, purity: '≥98%', image: img3fa },
  { id: 2, name: '4-HO-MET', category: 'Tryptamines', price: 20.00, purity: '≥98%', image: img4homet },
  { id: 11, name: '1P-LSD 100mcg', category: 'Blotters', price: 5.00, purity: '≥99%', image: imgLsd },
  { id: 13, name: '2F-DCK', category: 'Dissociatives', price: 33.50, purity: '≥98%', image: img2fdck },
  { id: 22, name: 'DCK', category: 'Dissociatives', price: 39.75, purity: '≥98%', image: imgDck },
];

const FeaturedProducts = () => {
  const [current, setCurrent] = useState(0);
  const { t } = useLanguage();

  const prev = () => setCurrent((c) => (c > 0 ? c - 1 : c));
  const next = () => setCurrent((c) => (c < featuredProducts.length - 1 ? c + 1 : c));

  const product = featuredProducts[current];

  return (
    <section className="pt-4 pb-12 bg-background">
      <div className="text-center mb-8">
        <h2 className="font-steelfish text-4xl text-foreground mb-2 tracking-wide">
          {t('featured.title')} <span className="text-primary">{t('featured.title2')}</span>
        </h2>
        <p className="text-muted-foreground text-sm">{t('featured.description')}</p>
      </div>

      <div className="flex items-center justify-center gap-4 px-4">
        {/* Left Arrow */}
        <button
          onClick={prev}
          disabled={current === 0}
          className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Single Product Card */}
        <Link
          to={`/product/${product.id}`}
          className="group w-[320px] bg-card border border-border rounded-xl overflow-hidden hover:border-primary/50 hover:shadow-xl transition-all"
        >
          {/* Square Image */}
          <div className="relative aspect-square bg-muted/50 flex items-center justify-center overflow-hidden">
            {product.image ? (
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <FlaskConical className="w-16 h-16 opacity-20" />
            )}
            <span className="absolute top-3 right-3 text-sm px-3 py-1 bg-green-500 text-white rounded font-medium">
              {product.purity}
            </span>
          </div>

          {/* Info */}
          <div className="p-4">
            <h3 className="font-steelfish text-2xl text-foreground group-hover:text-primary transition-colors truncate">
              {product.name}
            </h3>
            <span className="text-xs text-muted-foreground uppercase">{product.category}</span>
            
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
              <div>
                <span className="font-steelfish text-3xl text-primary">€{product.price.toFixed(2)}</span>
                <span className="text-xs text-muted-foreground ml-2">per 1G</span>
              </div>
              <span className="px-4 py-2 rounded-lg text-sm font-medium bg-primary text-primary-foreground">
                {t('featured.viewProduct')}
              </span>
            </div>
          </div>
        </Link>

        {/* Right Arrow */}
        <button
          onClick={next}
          disabled={current === featuredProducts.length - 1}
          className="w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-all"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {featuredProducts.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? 'bg-primary w-6' : 'bg-muted-foreground/30 w-2'
            }`}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;