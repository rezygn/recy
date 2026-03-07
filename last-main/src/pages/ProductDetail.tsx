import { useParams, Link } from 'react-router-dom';
import { SnowAnimation } from '@/components/SnowAnimation';
import Header from '@/components/Header';
import WarningBanner from '@/components/WarningBanner';
import Footer from '@/components/Footer';
import { ArrowLeft, FlaskConical, Shield, Truck, Clock, Minus, Plus, ShoppingCart, Heart, Share2, Check, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import anonymousShippingImg from '@/assets/anonymous-shipping.png';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useCart } from '@/contexts/CartContext';


// Product images
import img3fa from '@/assets/products/3fa.png';
import img4homet from '@/assets/products/4homet.png';
import img7aaf from '@/assets/products/7aaf.png';
import imgAbpvp from '@/assets/products/abpvp.png';
import imgNeppowder from '@/assets/products/neppowder.png';
import imgNoopept from '@/assets/products/noopept.png';
import imgSgt507 from '@/assets/products/sgt507.png';
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
    weight: '153.20 g/mol',
    fullDescription: '3-Fluoroamphetamine (3-FA) is a synthetic substituted amphetamine with the molecular formula C₉H₁₂FN. As a fluorinated derivative of amphetamine, it has been the subject of various pharmacological studies examining its potential mechanisms of action. This compound is provided exclusively for in-vitro research, forensic analysis, and analytical reference purposes.',
    appearance: 'White to off-white crystalline powder',
    solubility: 'Soluble in methanol, ethanol, DMSO',
    storage: 'Store in cool, dry place. Keep away from light.',
    cas: '1626-67-9'
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
    weight: '218.3 g/mol',
    fullDescription: '4-Hydroxy-N-methyl-N-ethyltryptamine (4-HO-MET), also known as Metocin, is a synthetic indole alkaloid molecule of the tryptamine class. It is the 4-hydroxyl analog of MET and is structurally related to naturally occurring compounds such as psilocin. This material is provided for forensic, analytical, and research applications only.',
    appearance: 'Off-white to tan powder',
    solubility: 'Soluble in methanol, DMSO',
    storage: 'Store at -20°C. Protect from light and moisture.',
    cas: '77872-41-4'
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
    weight: '314.46 g/mol',
    fullDescription: '7-AAF is a synthetic cannabinoid research chemical intended for forensic, toxicological, and analytical research applications. This compound is supplied as a certified reference standard for use in analytical method development and validation.',
    appearance: 'White crystalline powder',
    solubility: 'Soluble in acetonitrile, methanol',
    storage: 'Store at -20°C in sealed container.',
    cas: 'N/A'
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
    weight: '231.33 g/mol',
    fullDescription: 'AB-PVP is a synthetic cathinone derivative that has been used as an analytical reference standard. It belongs to the pyrrolidinophenone class of compounds. Intended for forensic and research purposes only.',
    appearance: 'White to off-white powder',
    solubility: 'Soluble in methanol, chloroform',
    storage: 'Store in a cool, dry place away from light.',
    cas: 'N/A'
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
    weight: '189.25 g/mol',
    fullDescription: 'BKB-2P is a novel synthetic cathinone research chemical provided for in-vitro research and forensic applications. This compound is intended for use as an analytical reference standard.',
    appearance: 'White crystalline powder',
    solubility: 'Soluble in methanol, DMSO',
    storage: 'Store at room temperature in sealed container.',
    cas: 'N/A'
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
    weight: '149.23 g/mol',
    fullDescription: 'BPMA is a substituted amphetamine derivative intended for analytical and forensic research. It serves as a reference standard for analytical method development.',
    appearance: 'White powder',
    solubility: 'Soluble in methanol',
    storage: 'Store in cool, dry place.',
    cas: 'N/A'
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
    weight: '163.22 g/mol',
    fullDescription: '5-Methoxy-2-aminoindane (MEAI) is a synthetic aminoindane derivative that has been the subject of pharmacological research. This compound is provided for research, forensic, and analytical purposes only.',
    appearance: 'Off-white to tan powder',
    solubility: 'Soluble in methanol, ethanol',
    storage: 'Store at -20°C away from light.',
    cas: '132741-81-2'
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
    weight: '205.30 g/mol',
    fullDescription: 'N-Ethylpentedrone (NEP) is a synthetic cathinone compound of the phenethylamine and amphetamine classes. This material is intended for in-vitro research and forensic applications.',
    appearance: 'White crystalline chunks',
    solubility: 'Soluble in methanol, water',
    storage: 'Store in sealed container at room temperature.',
    cas: '779974-89-9'
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
    weight: '318.37 g/mol',
    fullDescription: 'Noopept (N-phenylacetyl-L-prolylglycine ethyl ester) is a synthetic nootropic molecule that has been studied for its potential cognitive-enhancing properties. These pellets contain 20mg of pharmaceutical-grade Noopept for research purposes.',
    appearance: 'White pressed pellets',
    solubility: 'Soluble in water, ethanol',
    storage: 'Store in cool, dry place.',
    cas: '157115-85-0'
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
    weight: '368.43 g/mol',
    fullDescription: 'SGT-507 is a synthetic cannabinoid intended for forensic and toxicological research. It serves as an analytical reference standard for method development and validation.',
    appearance: 'White to off-white powder',
    solubility: 'Soluble in acetonitrile, methanol',
    storage: 'Store at -20°C in sealed container.',
    cas: 'N/A'
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
    weight: '379.50 g/mol',
    fullDescription: '1-Propionyl-lysergic acid diethylamide (1P-LSD) is a semi-synthetic compound of the lysergamide class. Each blotter contains precisely 100μg of 1P-LSD. Intended exclusively for analytical and forensic research.',
    appearance: 'Printed blotter paper',
    solubility: 'N/A',
    storage: 'Store at -20°C. Protect from light and moisture.',
    cas: 'N/A'
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
    weight: '177.24 g/mol',
    fullDescription: '2-Methylmethcathinone (2-MMC) is a synthetic cathinone and positional isomer of mephedrone (4-MMC). This compound is provided as an analytical reference standard for forensic and research applications.',
    appearance: 'White crystalline powder',
    solubility: 'Soluble in methanol, water',
    storage: 'Store in cool, dry place.',
    cas: 'N/A'
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
    weight: '221.27 g/mol',
    fullDescription: '2-Fluorodeschloroketamine (2F-DCK) is a dissociative anesthetic research chemical of the arylcyclohexylamine class. It is an analog of ketamine with a fluorine substitution. Provided for forensic and analytical research only.',
    appearance: 'White crystalline solid',
    solubility: 'Soluble in methanol, chloroform',
    storage: 'Store at room temperature in sealed container.',
    cas: 'N/A'
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
    weight: '221.27 g/mol',
    fullDescription: '2-Fluorodeschloroketamine (2F-DCK) in fine powder form. This dissociative anesthetic research chemical is provided for analytical and forensic purposes.',
    appearance: 'White fine powder',
    solubility: 'Soluble in methanol, chloroform',
    storage: 'Store at room temperature in sealed container.',
    cas: 'N/A'
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
    weight: '197.66 g/mol',
    fullDescription: '3-Chloromethcathinone (3-CMC) is a synthetic cathinone research chemical that serves as a positional isomer of 4-CMC. Intended for forensic and analytical research applications.',
    appearance: 'White to off-white crystals',
    solubility: 'Soluble in methanol, water',
    storage: 'Store in cool, dry place.',
    cas: 'N/A'
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
    weight: '197.66 g/mol',
    fullDescription: '3-Chloromethcathinone (3-CMC) in fine powder form. This synthetic cathinone is provided for forensic and analytical research applications.',
    appearance: 'White fine powder',
    solubility: 'Soluble in methanol, water',
    storage: 'Store in cool, dry place.',
    cas: 'N/A'
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
    weight: '175.23 g/mol',
    fullDescription: '6-(2-aminopropyl)benzofuran succinate (6-APB Succinate) is a synthetic compound of the phenethylamine and amphetamine classes. The succinate salt form provides improved stability. Intended for research purposes only.',
    appearance: 'Off-white to tan powder',
    solubility: 'Soluble in water, methanol',
    storage: 'Store at room temperature away from light.',
    cas: 'N/A'
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
    weight: '399.87 g/mol',
    fullDescription: '6-CL-ADBA is a synthetic cannabinoid research chemical intended for forensic and toxicological applications. Serves as an analytical reference standard.',
    appearance: 'White powder',
    solubility: 'Soluble in acetonitrile',
    storage: 'Store at -20°C.',
    cas: 'N/A'
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
    weight: '261.36 g/mol',
    fullDescription: 'α-Pyrrolidinopentiothiophenone (A-PCYP) is a synthetic stimulant of the cathinone and pyrrolidine classes. Provided for forensic and research applications only.',
    appearance: 'White to off-white powder',
    solubility: 'Soluble in methanol',
    storage: 'Store in cool, dry place.',
    cas: 'N/A'
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
    weight: '356.46 g/mol',
    fullDescription: 'ADB-BUTINACA (ADB-B) is a synthetic cannabinoid of the indazole carboxamide class. Intended for forensic, toxicological, and analytical research.',
    appearance: 'White crystalline powder',
    solubility: 'Soluble in acetonitrile, methanol',
    storage: 'Store at -20°C in sealed container.',
    cas: 'N/A'
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
    weight: '245.36 g/mol',
    fullDescription: 'α-Pyrrolidinoisohexanophenone (α-PHiP) is a synthetic cathinone stimulant of the pyrrolidine class. This compound is provided for forensic and analytical research purposes.',
    appearance: 'White crystalline powder',
    solubility: 'Soluble in methanol, chloroform',
    storage: 'Store at room temperature.',
    cas: 'N/A'
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
    weight: '203.28 g/mol',
    fullDescription: 'Deschloroketamine (DCK) is a dissociative anesthetic research chemical of the arylcyclohexylamine class. It is structurally related to ketamine but lacks the chlorine atom. Provided for forensic and analytical research only.',
    appearance: 'White crystalline solid',
    solubility: 'Soluble in methanol, chloroform',
    storage: 'Store at room temperature.',
    cas: 'N/A'
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
    weight: '275.37 g/mol',
    fullDescription: '3,4-Methylenedioxy-α-pyrrolidinohexanophenone (MDPHP) is a synthetic stimulant of the cathinone class. This free base powder is intended for research and forensic applications.',
    appearance: 'Off-white powder',
    solubility: 'Soluble in methanol, DMSO',
    storage: 'Store in cool, dry place.',
    cas: 'N/A'
  },
  { 
    id: 24, 
    name: 'N-Ethylpentedrone', 
    category: 'Cathinones',
    price: 14.00, 
    purity: '≥98%', 
    inStock: true,
    image: imgNeppowder,
    description: 'NEP crystalline chunks.',
    formula: 'C₁₃H₁₉NO',
    weight: '205.30 g/mol',
    fullDescription: 'N-Ethylpentedrone (NEP) is a synthetic cathinone compound provided in crystalline chunk form. Intended for in-vitro research and forensic applications.',
    appearance: 'White crystalline chunks',
    solubility: 'Soluble in methanol, water',
    storage: 'Store in sealed container.',
    cas: '779974-89-9'
  },
  { 
    id: 25, 
    name: '5-MAPB', 
    category: 'Amphetamines',
    price: 49.00, 
    purity: '≥98%', 
    inStock: true,
    description: '5-(2-methylaminopropyl)benzofuran.',
    formula: 'C₁₂H₁₅NO',
    weight: '189.25 g/mol',
    fullDescription: '5-(2-Methylaminopropyl)benzofuran (5-MAPB) is a synthetic entactogenic compound of the phenethylamine and amphetamine classes. Provided for research and analytical purposes only.',
    appearance: 'Off-white to tan powder',
    solubility: 'Soluble in methanol, DMSO',
    storage: 'Store at room temperature away from light.',
    cas: 'N/A'
  },
  { 
    id: 26, 
    name: '3-FEA', 
    category: 'Amphetamines',
    price: 17.85, 
    purity: '≥98%', 
    inStock: true,
    description: '3-Fluoroethamphetamine.',
    formula: 'C₁₀H₁₄FN',
    weight: '167.22 g/mol',
    fullDescription: '3-Fluoroethamphetamine (3-FEA) is a synthetic fluorinated amphetamine derivative. This compound is intended for research and analytical applications.',
    appearance: 'White crystalline powder',
    solubility: 'Soluble in methanol, ethanol',
    storage: 'Store in cool, dry place.',
    cas: 'N/A'
  },
  { 
    id: 27, 
    name: '2-FMA', 
    category: 'Amphetamines',
    price: 14.75, 
    purity: '≥98%', 
    inStock: true,
    description: '2-Fluoromethamphetamine.',
    formula: 'C₁₀H₁₄FN',
    weight: '167.22 g/mol',
    fullDescription: '2-Fluoromethamphetamine (2-FMA) is a synthetic fluorinated methamphetamine analog that has been studied for its pharmacological properties. Intended for research and forensic purposes only.',
    appearance: 'White crystalline powder',
    solubility: 'Soluble in methanol, water',
    storage: 'Store in cool, dry place away from light.',
    cas: 'N/A'
  },
  { 
    id: 28, 
    name: '4F-MPH', 
    category: 'Amphetamines',
    price: 22.00, 
    purity: '≥98%', 
    inStock: true,
    description: '4-Fluoromethylphenidate.',
    formula: 'C₁₄H₁₉FNO₂',
    weight: '251.30 g/mol',
    fullDescription: '4-Fluoromethylphenidate (4F-MPH) is a piperidine-based stimulant compound that is a fluorinated derivative of methylphenidate. This material is intended for forensic and research applications only.',
    appearance: 'White crystalline powder',
    solubility: 'Soluble in methanol, water',
    storage: 'Store at room temperature.',
    cas: 'N/A'
  },
];

const bulkPricing = [
  { quantity: '1G', multiplier: 1 },
  { quantity: '2G', multiplier: 1.9 },
  { quantity: '3G', multiplier: 2.75 },
  { quantity: '4G', multiplier: 3.5 },
  { quantity: '5G', multiplier: 4.2 },
  { quantity: '10G', multiplier: 8 },
  { quantity: '15G', multiplier: 11.5 },
  { quantity: '20G', multiplier: 14.5 },
  { quantity: '25G', multiplier: 17.5 },
];

const ProductDetail = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [amount, setAmount] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const { addToCart } = useCart();

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-steelfish text-4xl text-foreground mb-4">Product Not Found</h1>
          <Link to="/products" className="text-primary hover:underline">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const currentPrice = (product.price * bulkPricing[selectedQuantity].multiplier).toFixed(2);

  const handleAddToCart = () => {
    if (!product) return;

    // Add to Global Context
    // This function inside CartContext will handle saving it and showing the Toast
    addToCart(product, selectedQuantity, amount, bulkPricing);
  };


  return (
    <div className="min-h-screen bg-background">
      <SnowAnimation />
      <WarningBanner />
      <Header />

      <main className="relative z-10 py-8">
        <div className="container max-w-6xl">
          {/* Breadcrumb */}
          <Link to="/products" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Products
          </Link>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Product Image Carousel */}
            <div className="space-y-4">
              <Carousel className="w-full" opts={{ loop: true }}>
                <CarouselContent>
                  {/* Slide 1: Product Image */}
                  <CarouselItem>
                    <div className="relative aspect-square bg-gradient-to-br from-secondary to-muted rounded-2xl border border-border overflow-hidden">
                      <div className="absolute inset-0 hex-pattern opacity-50" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        {product.image ? (
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="molecule-float">
                            <div className="w-32 h-32 rounded-2xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                              <FlaskConical className="w-16 h-16 text-primary" />
                            </div>
                          </div>
                        )}
                      </div>
                      
                      {/* Purity Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-green-500 text-white px-4 py-2 text-sm font-bold rounded-full">
                          {product.purity}
                        </span>
                      </div>

                      {/* Favorite & Share */}
                      <div className="absolute top-4 right-4 flex gap-2">
                        <button
                          onClick={() => setIsFavorited(!isFavorited)}
                          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                            isFavorited
                              ? 'bg-primary text-primary-foreground shadow-glow'
                              : 'bg-card/80 text-muted-foreground hover:bg-primary/10 hover:text-primary'
                          }`}
                        >
                          <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                        </button>
                        <button className="w-10 h-10 rounded-full bg-card/80 text-muted-foreground hover:bg-primary/10 hover:text-primary flex items-center justify-center transition-all">
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </CarouselItem>

                  {/* Slide 2: Anonymous Shipping Image */}
                  <CarouselItem>
                    <div className="relative aspect-square bg-white rounded-2xl border border-border overflow-hidden flex items-center justify-center">
                      <img 
                        src={anonymousShippingImg} 
                        alt="Anonymous Shipping"
                        className="w-full h-full object-contain p-6"
                      />
                    </div>
                  </CarouselItem>
                </CarouselContent>
                <CarouselPrevious className="left-4" />
                <CarouselNext className="right-4" />
              </Carousel>

              {/* Carousel Dots */}
              <div className="flex justify-center gap-2 mt-3">
                <span className="w-2.5 h-2.5 rounded-full bg-foreground/60"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-foreground/30"></span>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3">
                <div className="flex flex-col items-center gap-2 p-3 bg-muted/30 rounded-xl border border-border">
                  <Shield className="w-5 h-5 text-primary" />
                  <span className="text-xs text-muted-foreground text-center">Lab Verified</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 bg-muted/30 rounded-xl border border-border">
                  <Truck className="w-5 h-5 text-primary" />
                  <span className="text-xs text-muted-foreground text-center">Discreet Ship</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 bg-muted/30 rounded-xl border border-border">
                  <Clock className="w-5 h-5 text-primary" />
                  <span className="text-xs text-muted-foreground text-center">Fast Delivery</span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Header */}
              <div>
                <span className="text-xs font-medium text-primary uppercase tracking-wider">{product.category}</span>
                <h1 className="font-steelfish text-4xl md:text-5xl text-foreground tracking-wide mt-1">{product.name}</h1>
                <p className="text-muted-foreground mt-2">{product.description}</p>
              </div>

              {/* Specifications */}
              <div className="grid grid-cols-2 gap-4 p-4 bg-muted/30 rounded-xl border border-border">
                <div>
                  <span className="text-xs text-muted-foreground">Purity</span>
                  <p className="text-sm font-medium text-foreground">{product.purity}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Formula</span>
                  <p className="text-sm font-medium text-foreground">{product.formula}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">Mol. Weight</span>
                  <p className="text-sm font-medium text-foreground">{product.weight}</p>
                </div>
                <div>
                  <span className="text-xs text-muted-foreground">CAS</span>
                  <p className="text-sm font-medium text-foreground">{product.cas}</p>
                </div>
              </div>

              {/* Quantity Selection */}
              <div>
                <label className="text-sm font-medium text-foreground mb-3 block">Select Quantity</label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {bulkPricing.map((tier, index) => {
                    // Calculate discount percentage: compare price per gram vs 1g base
                    const grams = parseInt(tier.quantity);
                    const pricePerGram = (product.price * tier.multiplier) / grams;
                    const basePricePerGram = product.price * bulkPricing[0].multiplier;
                    const discountPercent = Math.round((1 - pricePerGram / basePricePerGram) * 100);
                    
                    return (
                      <button
                        key={tier.quantity}
                        onClick={() => setSelectedQuantity(index)}
                        className={`relative py-3 px-3 rounded-lg text-sm font-medium transition-all ${
                          selectedQuantity === index
                            ? 'bg-primary text-primary-foreground shadow-glow'
                            : 'bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground border border-border'
                        }`}
                      >
                        {discountPercent > 0 && (
                          <span className="absolute -top-2 -right-1 bg-destructive text-destructive-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-md">
                            -{discountPercent}%
                          </span>
                        )}
                        {tier.quantity}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3">
                <span className="font-steelfish text-4xl text-primary">€{currentPrice}</span>
                <span className="text-sm text-muted-foreground">for {bulkPricing[selectedQuantity].quantity}</span>
              </div>

              {/* Amount & Add to Cart */}
              <div className="flex gap-4">
                <div className="flex items-center gap-3 bg-muted/50 rounded-xl border border-border px-3">
                  <button
                    onClick={() => setAmount(Math.max(1, amount - 1))}
                    className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-medium">{amount}</span>
                  <button
                    onClick={() => setAmount(amount + 1)}
                    className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                
                <Button
                  onClick={handleAddToCart}
                  disabled={!product.inStock}
                  className="flex-1 py-6 text-lg font-medium gradient-teal hover:opacity-90 transition-opacity"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>

              {/* Stock Status */}
              <div className="flex items-center gap-2">
                {product.inStock ? (
                  <>
                    <Check className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-green-500">In Stock - Ready to ship</span>
                  </>
                ) : (
                  <span className="text-sm text-destructive">Currently out of stock</span>
                )}
              </div>
            </div>
          </div>

          {/* Full Description & Details */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h2 className="font-steelfish text-2xl text-foreground">Description</h2>
              <p className="text-muted-foreground leading-relaxed">{product.fullDescription}</p>
            </div>
            
            <div className="space-y-4">
              <h2 className="font-steelfish text-2xl text-foreground">Product Details</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Appearance</span>
                  <span className="text-foreground">{product.appearance}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Solubility</span>
                  <span className="text-foreground">{product.solubility}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Storage</span>
                  <span className="text-foreground text-right max-w-[200px]">{product.storage}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-border">
                  <span className="text-muted-foreground">Purity</span>
                  <span className="text-foreground">{product.purity}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bulk Pricing Table */}
          <div className="mt-12">
            <h2 className="font-steelfish text-2xl text-foreground mb-4">Bulk Pricing</h2>
            <div className="overflow-x-auto">
              <table className="w-full border border-border rounded-xl overflow-hidden">
                <thead>
                  <tr className="bg-muted/50">
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Quantity</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Price</th>
                    <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">Per Gram</th>
                  </tr>
                </thead>
                <tbody>
                  {bulkPricing.map((tier, index) => {
                    const tierPrice = (product.price * tier.multiplier).toFixed(2);
                    const grams = parseFloat(tier.quantity);
                    const perGram = (Number(tierPrice) / grams).toFixed(2);
                    
                    return (
                      <tr key={tier.quantity} className={`border-t border-border ${selectedQuantity === index ? 'bg-primary/10' : ''}`}>
                        <td className="py-3 px-4 text-sm text-foreground font-medium">{tier.quantity}</td>
                        <td className="py-3 px-4 text-sm text-primary font-bold">€{tierPrice}</td>
                        <td className="py-3 px-4 text-sm text-muted-foreground">€{perGram}/g</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 p-6 bg-destructive/10 border border-destructive/20 rounded-xl">
            <h3 className="font-steelfish text-lg text-destructive mb-2">Research Use Only</h3>
            <p className="text-sm text-muted-foreground">
              This product is sold exclusively for legitimate research purposes. It is not intended for human or veterinary use, food additives, household chemicals, or any other inappropriate applications. Purchasers must be 18 years or older and agree to our terms of service.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetail;
