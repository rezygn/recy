import { SnowAnimation } from '@/components/SnowAnimation';
import Header from '@/components/Header';
import WarningBanner from '@/components/WarningBanner';
import Footer from '@/components/Footer';
import { ShoppingCart, FlaskConical, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import anonymousShippingImg from '@/assets/anonymous-shipping.png';
import freeShippingBanner from '@/assets/free-shipping-products-banner.png';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';

// Product images
import img3fa from '@/assets/products/3fa.png';
import img4homet from '@/assets/products/4homet.png';
import img7aaf from '@/assets/products/7aaf.png';
import imgAbpvp from '@/assets/products/abpvp.png';
import imgNeppowder from '@/assets/products/neppowder.png';
import imgNoopept from '@/assets/products/noopept.png';
import imgSgt507 from '@/assets/products/sgt507.png';
import img2methylap237 from '@/assets/products/2methylap237.png';
import img2mmc from '@/assets/products/2mmc.png';
import img2fdck from '@/assets/products/2fdck.png';
import imgLsd from '@/assets/products/lsd.png';
import img2fdckPowder from '@/assets/products/2fdck-powder.png';
import img3mmc from '@/assets/products/3mmc.png';
import imgApbSuccinate from '@/assets/products/apbsuccinate.png';
import img6cladba from '@/assets/products/6cladba.png';
import imgApcyp from '@/assets/products/apcyp.png';
import imgAdbb from '@/assets/products/adbb.png';
import imgAlphaphip from '@/assets/products/alphaphip.png';
import imgDck from '@/assets/products/dck.png';
import imgJwh210 from '@/assets/products/jwh210.png';
import img3cmcPowder from '@/assets/products/product-image-1.png';
import imgMdphp from '@/assets/products/product-image-2.png';
import imgNep from '@/assets/products/product-image-3.png';
import img4mpd from '@/assets/products/product-image-4.png';
import img4fmph from '@/assets/products/product-image-5.png';
import imgBkb2p from '@/assets/products/product-image-6.png';
import imgMeai from '@/assets/products/product-image-7.png';
import imgBpma from '@/assets/products/product-image-8.png';

const categories = ['All', 'Cathinones', 'Tryptamines', 'Amphetamines', 'Cannabinoids', 'Dissociatives', 'Pellets', 'Blotters'];

const products = [
  { 
    id: 1, 
    name: '3-FA', 
    category: 'Amphetamines',
    price: 34.90, 
    purity: '≥98%', 
    inStock: true,
    image: img3fa,
    description: '3-Fluoroamphetamine (3-FA) is a potent stimulant research chemical from the substituted amphetamine family.',
    formula: 'C₉H₁₂FN',
    weight: '153.20 g/mol'
  },
  { 
    id: 2, 
    name: '4-HO-MET', 
    category: 'Tryptamines',
    price: 20.00,
    purity: '≥98%', 
    inStock: true,
    image: img4homet,
    description: 'Metocin (4-HO-MET) is a synthetic tryptamine compound structurally related to psilocin.',
    formula: 'C₁₃H₁₈N₂O',
    weight: '218.3 g/mol'
  },
  { 
    id: 3, 
    name: '7-AAF', 
    category: 'Cannabinoids',
    price: 32.00, 
    purity: '≥98%', 
    inStock: true,
    image: img7aaf,
    description: 'Research-grade cannabinoid compound for analytical and forensic studies.',
    formula: 'C₂₁H₃₀O₂',
    weight: '314.46 g/mol'
  },
  { 
    id: 4, 
    name: 'AB-PVP', 
    category: 'Cathinones',
    price: 30.50, 
    purity: '≥98%', 
    inStock: true,
    image: imgAbpvp,
    description: 'Synthetic cathinone research chemical for laboratory analysis.',
    formula: 'C₁₅H₂₁NO',
    weight: '231.33 g/mol'
  },
  { 
    id: 5, 
    name: 'BKB-2P', 
    category: 'Cathinones',
    price: 25.00, 
    purity: '≥98%', 
    inStock: true,
    image: imgBkb2p,
    description: 'Novel cathinone derivative for research purposes.',
    formula: 'C₁₂H₁₅NO',
    weight: '189.25 g/mol'
  },
  { 
    id: 6, 
    name: 'BPMA', 
    category: 'Amphetamines',
    price: 19.00, 
    purity: '≥98%', 
    inStock: true,
    image: imgBpma,
    description: 'Substituted amphetamine research compound.',
    formula: 'C₁₀H₁₅N',
    weight: '149.23 g/mol'
  },
  { 
    id: 7, 
    name: 'MEAI', 
    category: 'Amphetamines',
    price: 20.00, 
    purity: '≥98%', 
    inStock: true,
    image: imgMeai,
    description: '5-Methoxy-2-aminoindane research compound.',
    formula: 'C₁₀H₁₃NO',
    weight: '163.22 g/mol'
  },
  { 
    id: 8, 
    name: 'NEP Powder', 
    category: 'Cathinones',
    price: 18.00, 
    purity: '≥98%', 
    inStock: true,
    image: imgNep,
    description: 'N-Ethylpentedrone (NEP) crystalline chunks.',
    formula: 'C₁₃H₁₉NO',
    weight: '205.30 g/mol'
  },
  { 
    id: 9, 
    name: 'Noopept 20mg', 
    category: 'Pellets',
    price: 23.50, 
    purity: '≥99%', 
    inStock: true,
    image: imgNoopept,
    description: 'Nootropic research pellets, 20mg per pellet.',
    formula: 'C₁₇H₂₂N₂O₄',
    weight: '318.37 g/mol'
  },
  { 
    id: 10, 
    name: 'SGT-507', 
    category: 'Cannabinoids',
    price: 28.00, 
    purity: '≥98%', 
    inStock: true,
    image: imgSgt507,
    description: 'Synthetic cannabinoid research compound.',
    formula: 'C₂₂H₂₄N₂O₃',
    weight: '368.43 g/mol'
  },
  { 
    id: 11, 
    name: '1P-LSD 100mcg', 
    category: 'Blotters',
    price: 5.00, 
    purity: '≥99%', 
    inStock: true,
    image: imgLsd,
    description: '1-Propionyl-LSD blotter paper, 100mcg per blotter.',
    formula: 'C₂₃H₂₉N₃O₂',
    weight: '379.50 g/mol'
  },
  { 
    id: 12, 
    name: '2-MMC', 
    category: 'Cathinones',
    price: 12.00, 
    purity: '≥98%', 
    inStock: true,
    image: img2mmc,
    description: '2-Methylmethcathinone research standard.',
    formula: 'C₁₁H₁₅NO',
    weight: '177.24 g/mol'
  },
  { 
    id: 13, 
    name: '2F-DCK', 
    category: 'Dissociatives',
    price: 33.50, 
    purity: '≥98%', 
    inStock: true,
    image: img2fdck,
    description: '2-Fluorodeschloroketamine crystalline solid.',
    formula: 'C₁₃H₁₆FNO',
    weight: '221.27 g/mol'
  },
  { 
    id: 14, 
    name: '2F-DCK Powder', 
    category: 'Dissociatives',
    price: 12.80, 
    purity: '≥98%', 
    inStock: true,
    image: img2fdckPowder,
    description: '2-Fluorodeschloroketamine fine powder form.',
    formula: 'C₁₃H₁₆FNO',
    weight: '221.27 g/mol'
  },
  { 
    id: 15, 
    name: '3-CMC', 
    category: 'Cathinones',
    price: 12.00, 
    purity: '≥98%', 
    inStock: true,
    image: img3mmc,
    description: '3-Chloromethcathinone crystalline form.',
    formula: 'C₁₀H₁₂ClNO',
    weight: '197.66 g/mol'
  },
  { 
    id: 16, 
    name: '3-CMC Powder', 
    category: 'Cathinones',
    price: 12.00, 
    purity: '≥98%', 
    inStock: true,
    image: img3cmcPowder,
    description: '3-Chloromethcathinone fine powder.',
    formula: 'C₁₀H₁₂ClNO',
    weight: '197.66 g/mol'
  },
  { 
    id: 17, 
    name: '6-APB Succinate', 
    category: 'Amphetamines',
    price: 32.25, 
    purity: '≥98%', 
    inStock: true,
    image: imgApbSuccinate,
    description: '6-APB succinate salt form.',
    formula: 'C₁₁H₁₃NO',
    weight: '175.23 g/mol'
  },
  { 
    id: 18, 
    name: '6-CL-ADBA', 
    category: 'Cannabinoids',
    price: 33.00, 
    purity: '≥98%', 
    inStock: true,
    image: img6cladba,
    description: 'Synthetic cannabinoid research compound.',
    formula: 'C₂₁H₂₂ClN₃O₃',
    weight: '399.87 g/mol'
  },
  { 
    id: 19, 
    name: 'A-PCYP', 
    category: 'Cathinones',
    price: 28.00, 
    purity: '≥98%', 
    inStock: true,
    image: imgApcyp,
    description: 'Alpha-Pyrrolidinopentiocyclohexanone.',
    formula: 'C₁₆H₂₃NO',
    weight: '261.36 g/mol'
  },
  { 
    id: 20, 
    name: 'ADB-B', 
    category: 'Cannabinoids',
    price: 42.75, 
    purity: '≥98%', 
    inStock: true,
    image: imgAdbb,
    description: 'ADB-BUTINACA indazole-based cannabinoid.',
    formula: 'C₂₀H₂₈N₄O₂',
    weight: '356.46 g/mol'
  },
  { 
    id: 21, 
    name: 'Alpha-PHiP', 
    category: 'Cathinones',
    price: 45.00, 
    purity: '≥98%', 
    inStock: true,
    image: imgAlphaphip,
    description: 'α-Pyrrolidinoisohexanophenone (a-PHiP).',
    formula: 'C₁₆H₂₃NO',
    weight: '245.36 g/mol'
  },
  { 
    id: 22, 
    name: 'DCK', 
    category: 'Dissociatives',
    price: 39.75, 
    purity: '≥98%', 
    inStock: true,
    image: imgDck,
    description: 'Deschloroketamine crystalline solid.',
    formula: 'C₁₃H₁₇NO',
    weight: '203.28 g/mol'
  },
  { 
    id: 23, 
    name: 'MDPHP Powder', 
    category: 'Cathinones',
    price: 34.25, 
    purity: '≥98%', 
    inStock: true,
    image: imgMdphp,
    description: 'MDPHP free base powder form.',
    formula: 'C₁₇H₂₃NO₂',
    weight: '275.37 g/mol'
  },
  { 
    id: 28, 
    name: '4F-MPH', 
    category: 'Amphetamines',
    price: 22.00, 
    purity: '≥98%', 
    inStock: true,
    image: img4fmph,
    description: '4-Fluoromethylphenidate.',
    formula: 'C₁₄H₁₉FNO₂',
    weight: '251.30 g/mol'
  },
  { 
    id: 29, 
    name: 'JWH-210', 
    category: 'Cannabinoids',
    price: 14.95, 
    purity: '≥98%', 
    inStock: true,
    image: imgJwh210,
    description: 'High-purity synthetic cannabinoid for advanced laboratory research. CAS: 824959-81-1. For forensic, analytical, or pharmacological research only.',
    formula: 'C₂₆H₂₇NO',
    weight: '369.508 g/mol'
  },
  { 
    id: 30, 
    name: '4-MPD', 
    category: 'Cathinones',
    price: 22.00, 
    purity: '≥98%', 
    inStock: true,
    image: img4mpd,
    description: '4-Methylpentedrone stimulant research compound.',
    formula: 'C₁₂H₁₇NO',
    weight: '191.27 g/mol'
  },
];

const Products = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter(product => {
    const matchesCategory = activeCategory === 'All' || product.category === activeCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      <SnowAnimation />
      <WarningBanner />
      <Header />

      <main className="relative z-10">
        {/* Hero */}
        <section className="py-10 md:py-14 bg-gradient-to-b from-primary/5 to-transparent">
          <div className="container text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <FlaskConical className="w-8 h-8 text-primary" />
              <h1 className="font-steelfish text-5xl md:text-6xl text-foreground tracking-wide">
                RESEARCH CATALOG
              </h1>
            </div>
            <p className="text-muted-foreground max-w-lg mx-auto text-sm mb-6">
              Premium research-grade compounds with laboratory-verified purity ≥98%. For scientific investigation only.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search compounds..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
              />
            </div>
          </div>
        </section>

        {/* Categories Bar - Not sticky */}
        <section className="bg-background border-b border-border">
          <div className="container py-4">
            {/* Categories */}
            <div className="flex gap-2 overflow-x-auto pb-1 justify-center flex-wrap">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted/50 text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Free Shipping Banner */}
        <div className="w-full overflow-hidden relative z-20 -mt-14">
          <div className="animate-marquee flex">
            <img src={freeShippingBanner} alt="Free shipping on orders above 100€" className="h-40 md:h-52 w-auto" />
            <img src={freeShippingBanner} alt="Free shipping on orders above 100€" className="h-40 md:h-52 w-auto" />
            <img src={freeShippingBanner} alt="Free shipping on orders above 100€" className="h-40 md:h-52 w-auto" />
            <img src={freeShippingBanner} alt="Free shipping on orders above 100€" className="h-40 md:h-52 w-auto" />
          </div>
        </div>

        {/* Products Grid - 2 per row */}
        <section className="-mt-8 pb-8">
          <div className="container max-w-4xl">
            <p className="text-xs text-muted-foreground mb-4 text-center">
              Showing {filteredProducts.length} compounds
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <Link
                  to={`/product/${product.id}`}
                  key={product.id}
                  className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square bg-muted/50 flex items-center justify-center overflow-hidden">
                    {product.image ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-muted-foreground">
                        <FlaskConical className="w-12 h-12 mb-2 opacity-30" />
                        <span className="text-[10px] opacity-50">Image coming soon</span>
                      </div>
                    )}
                    
                    {/* Purity Badge */}
                    <span className="absolute top-2 right-2 text-[10px] px-2 py-1 bg-green-500/90 text-white rounded font-medium">
                      {product.purity}
                    </span>

                    {/* Out of Stock Overlay */}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                        <span className="text-sm font-medium text-muted-foreground">Out of Stock</span>
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-steelfish text-lg text-foreground tracking-wide leading-tight">
                          {product.name}
                        </h3>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                          {product.category}
                        </span>
                      </div>
                    </div>

                    <p className="text-[11px] text-muted-foreground leading-relaxed line-clamp-2">
                      {product.description}
                    </p>

                    {/* Chemical Info */}
                    <div className="flex gap-3 text-[10px] text-muted-foreground">
                      <span>{product.formula}</span>
                      <span>{product.weight}</span>
                    </div>

                    {/* Price & Action */}
                    <div className="flex items-center justify-between pt-3 border-t border-border">
                      <div className="flex items-baseline gap-2">
                        <span className="font-steelfish text-2xl text-primary">
                          €{product.price.toFixed(2)}
                        </span>
                        <span className="text-xs text-muted-foreground">per 1G</span>
                      </div>
                      <span className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-primary text-primary-foreground group-hover:bg-primary/90 transition-all">
                        View Details
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground">No compounds found matching your criteria.</p>
              </div>
            )}
          </div>
        </section>

        {/* Disclaimer */}
        <section className="border-t border-border bg-muted/20">
          <div className="container py-6 text-center">
            <p className="text-[10px] text-muted-foreground max-w-2xl mx-auto">
              ⚠️ All products are strictly intended for scientific investigation only and are NOT for human or animal consumption. 
              Always wear appropriate PPE (gloves, lab coat, goggles) when handling research chemicals.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Products;
