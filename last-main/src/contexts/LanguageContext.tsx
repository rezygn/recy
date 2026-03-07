import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'nl' | 'de';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// English translations
const en = {
  // Header
  'nav.products': 'Research Chemicals',
  'nav.safety': 'Safety',
  'nav.about': 'About',
  'nav.terms': 'Terms & Conditions',
  'language': 'Language',
  
  // Hero Section
  'hero.badge': 'Premium Quality Assured',
  'hero.title1': 'Your Reliable Source for',
  'hero.title2': 'Premium',
  'hero.title3': 'Research Chemicals',
  'hero.description': 'Premium compounds delivered straight to your letterbox. Anonymous packaging, airtight seals, and complete privacy guaranteed.',
  'hero.cta': 'Browse Products',
  
  // Account Page
  'account.memberSince': 'Member since',
  'account.continueShopping': 'Continue Shopping',
  'account.safetyGuidelines': 'Safety Guidelines',
  'hero.purity': 'Purity Tested',
  'hero.shipping': 'Fast Shipping',
  'hero.clients': 'Happy Clients',
  
  // Featured Products
  'featured.badge': 'Best Sellers',
  'featured.title': 'Featured',
  'featured.title2': 'Products',
  'featured.description': 'Discover our most popular research compounds, trusted by scientists worldwide.',
  'featured.viewAll': 'View All Products',
  'featured.viewProduct': 'View Product',
  'featured.addToCart': 'Add to Cart',
  'featured.purity': 'Purity',
  
  // Features Section
  'features.badge': 'Why Choose Us',
  'features.title': 'The Research',
  'features.title2': 'Advantage',
  'features.quality.title': 'Lab-Grade Purity',
  'features.quality.desc': 'All products undergo rigorous testing to ensure 99%+ purity levels.',
  'features.shipping.title': 'Discreet Shipping',
  'features.shipping.desc': 'Plain packaging with no identifying marks. Your privacy is our priority.',
  'features.support.title': 'Expert Support',
  'features.support.desc': '24/7 customer service with knowledgeable research specialists.',
  'features.secure.title': 'Secure Payment',
  'features.secure.desc': 'Anonymous cryptocurrency payments for complete transaction privacy.',
  
  // Delivery Section
  'delivery.badge': 'Worldwide Shipping',
  'delivery.title': 'Delivery',
  'delivery.title2': 'Information',
  'delivery.description': 'We ship discreetly to destinations worldwide with tracking included on all orders.',
  'delivery.eu': 'European Union',
  'delivery.eu.desc': 'Fast delivery across EU member states',
  'delivery.uk': 'United Kingdom',
  'delivery.uk.desc': 'Reliable shipping to all UK addresses',
  'delivery.intl': 'Internationally',
  'delivery.intl.desc': 'Worldwide shipping to all destinations',
  'delivery.days': 'Days',
  'delivery.note': 'All orders include tracking. Delivery times are estimates and may vary based on customs and local postal services.',
  
  // Crypto Section
  'crypto.badge': 'Secure Payment',
  'crypto.title': 'Pay with',
  'crypto.title2': 'Crypto',
  'crypto.description': 'We accept cryptocurrency payments for secure and anonymous transactions. Watch our tutorial to learn how.',
  'crypto.whyTitle': 'Why Cryptocurrency?',
  'crypto.privacy': 'Complete Privacy',
  'crypto.privacy.desc': 'No personal banking information required',
  'crypto.fast': 'Fast Processing',
  'crypto.fast.desc': 'Transactions confirmed within minutes',
  'crypto.secure': 'Ultra Secure',
  'crypto.secure.desc': 'Blockchain technology ensures safety',
  
  // Newsletter
  'newsletter.title': 'Stay',
  'newsletter.title2': 'Updated',
  'newsletter.description': 'Subscribe to receive updates on new products, special offers, and research news.',
  'newsletter.placeholder': 'Enter your email',
  'newsletter.cta': 'Subscribe',
  'newsletter.privacy': 'We respect your privacy. Unsubscribe at any time.',
  
  // Footer
  'footer.description': 'Your trusted source for high-quality research chemicals and laboratory supplies. Serving research institutions worldwide since 2020.',
  'footer.products': 'Products',
  'footer.company': 'Company',
  'footer.support': 'Support',
  'footer.copyright': 'All rights reserved.',
  'footer.securePayment': 'Secure Payment',
  'footer.sslProtected': 'SSL Protected',
  'footer.privacyGuaranteed': 'Privacy Guaranteed',
  
  // Auth
  'auth.welcomeBack': 'Welcome Back',
  'auth.createAccount': 'Create Account',
  'auth.signInDesc': 'Sign in to access your research account',
  'auth.signUpDesc': 'Join our research community',
  'auth.signIn': 'Sign In',
  'auth.signUp': 'Sign Up',
  'auth.firstName': 'First Name',
  'auth.lastName': 'Last Name',
  'auth.email': 'Email Address',
  'auth.password': 'Password',
  'auth.confirmPassword': 'Confirm Password',
  'auth.forgotPassword': 'Forgot password?',
  'auth.signingIn': 'Signing In...',
  'auth.creatingAccount': 'Creating Account...',
  'auth.terms': 'By creating an account, you agree to our',
  'auth.termsLink': 'Terms of Service',
  'auth.and': 'and',
  'auth.privacyLink': 'Privacy Policy',
  'auth.disclaimer': 'All products are sold strictly for research purposes only.',
  
  // Cart
  'cart.title': 'Shopping',
  'cart.title2': 'Cart',
  'cart.empty': 'Your cart is empty',
  'cart.emptyDesc': 'Looks like you haven\'t added any items to your cart yet.',
  'cart.reviewDesc': 'Review your items and proceed to checkout.',
  'cart.startShopping': 'Start Shopping',
  'cart.orderSummary': 'Order Summary',
  'cart.subtotal': 'Subtotal',
  'cart.shipping': 'Shipping',
  'cart.total': 'Total',
  'cart.proceed': 'Proceed to Checkout',
  'cart.minimumOrder': 'Minimum order of €50.00 required',
  'cart.moreNeeded': 'more needed',
  'cart.securePayment': 'Secure payment with cryptocurrency',
  'cart.free': 'FREE',
  
  // Checkout
  'checkout.title': 'SECURE',
  'checkout.title2': 'CHECKOUT',
  'checkout.freeShipping': 'Free shipping on orders over €100!',
  'checkout.evmDesc': 'We accept payments on any EVM-compatible blockchain network including Ethereum Mainnet, Arbitrum, Optimism, Polygon, Base, and BSC. Pay with ETH, USDT, USDC, DAI, or any ERC-20 token.',
  'checkout.contact': 'Contact Information',
  'checkout.phone': 'Phone Number (optional)',
  'checkout.shippingAddress': 'Shipping Address',
  'checkout.streetAddress': 'Street Address',
  'checkout.apartment': 'Apartment, suite, etc. (optional)',
  'checkout.city': 'City',
  'checkout.postalCode': 'Postal Code',
  'checkout.shippingMethod': 'Shipping Method',
  'checkout.businessDays': 'business days',
  'checkout.trackingIncluded': 'Tracking included',
  'checkout.paymentMethod': 'Payment Method',
  'checkout.evmAccepted': 'EVM Networks Accepted',
  'checkout.paymentConfirm': 'Once your payment is confirmed on-chain, you\'ll receive real-time updates on your order status via email.',
  'checkout.secureAnonymous': 'Secure & Anonymous Payment',
  'checkout.orderSummary': 'Order Summary',
  'checkout.placeOrder': 'Place Order',
  'checkout.sslEncrypted': 'SSL Encrypted Connection',
  'checkout.ethPayment': 'Ethereum Payment Only',
  'checkout.termsAgree': 'By placing this order, you agree to our',
  'checkout.termsConditions': 'Terms & Conditions',
  
  // About
  'about.title': 'ABOUT US',
  'about.intro': 'is an anonymous research chemical webshop founded by veterans from the scene. What started as a grassroots response to limited access has become a trusted source for researchers, chemists, and explorers worldwide.',
  'about.quality': 'We are rooted in Dutch quality: clean synthesis, consistent purity, and reliable service. Every product is handled with precision, and every order is shipped with care and discretion. No names. No compromise.',
  'about.privacy': 'Privacy First',
  'about.privacy.desc': 'Anonymous transactions and discreet shipping worldwide.',
  'about.dutchQuality': 'Dutch Quality',
  'about.dutchQuality.desc': 'Clean synthesis, consistent purity, and rigorous testing.',
  'about.community': 'Community Driven',
  'about.community.desc': 'Founded by veterans, trusted by researchers worldwide.',
  'about.harmReduction': 'Harm Reduction',
  'about.harmReduction.desc': 'Education and safety are at the core of everything we do.',
  'about.cryptoTitle': 'Cryptocurrency Payments',
  'about.cryptoSubtitle': 'Secure, Private, Decentralized',
  'about.cryptoDesc1': 'We exclusively accept cryptocurrency payments through the Ethereum Virtual Machine (EVM) ecosystem. This means you can pay using any EVM-compatible blockchain network, giving you the flexibility to choose the network with the lowest fees or fastest confirmation times.',
  'about.cryptoNetworks': 'Supported Networks:',
  'about.cryptoNetworksList': 'Ethereum Mainnet, Arbitrum One, Optimism, Polygon, Base, BNB Smart Chain (BSC), Avalanche C-Chain, and any other EVM-compatible network.',
  'about.cryptoTokens': 'Accepted Tokens:',
  'about.cryptoTokensList': 'ETH, WETH, USDT, USDC, DAI, BUSD, and most major ERC-20 tokens. If you prefer to pay with a different token, contact us and we\'ll accommodate your request.',
  'about.cryptoPrivacy': 'Our payment system is designed with privacy in mind. Cryptocurrency transactions provide an additional layer of anonymity compared to traditional payment methods. We never store your wallet addresses longer than necessary, and all transaction data is handled with the utmost discretion.',
  'about.philosophy': 'We believe access to information and substances should be a right, not a risk. Science should be free from stigma and prohibition.',
  'about.standFor': 'We stand for education, harm reduction, and the right to choose.',
  'about.slogan': 'Legalize all.',
  
  // Warning Banner
  'warning.text': 'For research purposes only. Must be 18+ to order.',
  
  // Safety
  'safety.title': 'Safety',
  'safety.title2': 'Information',
  
  // Terms
  'terms.title': 'Terms &',
  'terms.title2': 'Conditions',
  'terms.intro': 'Welcome to rechemsback.com, an online store specializing in the sale of research chemicals. These Terms and Conditions govern your use of the website and your purchases made through the Site. Please read these Terms carefully before accessing or using the Site.',
  'terms.agreement.title': 'Agreement to Terms',
  'terms.agreement.content': 'By using the Site, you agree to be bound by these Terms. If you do not accept these Terms, you must not access or use the Site.',
  'terms.age.title': 'Age Requirement',
  'terms.age.content': 'You must be at least 18 years of age to access this Site and purchase products from rechemsback.com. By using the Site, you confirm and warrant that you meet this age requirement.',
  'terms.products.title': 'Products',
  'terms.products.content': 'rechemsback.com supplies research chemicals for laboratory and research purposes only. These products are not intended for human or veterinary use. rechemsback.com assumes no responsibility for the misuse of any products purchased from the Site.',
  'terms.ordering.title': 'Ordering and Shipping',
  'terms.ordering.content': 'All orders are subject to product availability and acceptance by rechemsback.com. We reserve the right to decline or cancel any order at our sole discretion. We strive to ship orders within 2 business days of payment confirmation. While we offer international shipping, it is the customer\'s responsibility to ensure compliance with all local laws and import regulations. rechemsback.com will not be liable for customs delays, seizures, or legal issues resulting from your order.',
  'terms.payment.title': 'Payment',
  'terms.payment.content': 'rechemsback.com accepts cryptocurrency (Ethereum). Full payment is required at the time of purchase.',
  'terms.returns.title': 'Returns and Refunds',
  'terms.returns.content': 'We do not accept returns or issue refunds unless the item is damaged or defective upon arrival. In such cases, you must contact us within 7 days of receiving the item to arrange a return or refund. Please include clear evidence of the damage.',
  'terms.disclaimer.title': 'Disclaimer of Warranties and Liability',
  'terms.disclaimer.content': 'rechemsback.com provides no guarantees, express or implied, regarding the safety, effectiveness, or suitability of the products sold. We disclaim all liability for any injury, loss, or damage resulting from the use or misuse of any product.',
  'terms.indemnification.title': 'Indemnification',
  'terms.indemnification.content': 'You agree to indemnify, defend, and hold harmless rechemsback.com, its owners, employees, agents, and affiliates from any and all claims, losses, liabilities, costs, and expenses (including legal fees) arising from your use of the Site or products purchased from it.',
  'terms.governing.title': 'Governing Law and Jurisdiction',
  'terms.governing.content': 'These Terms shall be governed by and interpreted in accordance with the laws of The Netherlands. Any disputes arising under or in connection with these Terms shall be resolved exclusively in the courts of The Netherlands.',
  'terms.changes.title': 'Changes to Terms',
  'terms.changes.content': 'We may update or modify these Terms at any time without prior notice. Continued use of the Site following any changes constitutes your acceptance of the revised Terms.',
  'terms.researchDisclaimer': 'All products are sold strictly for research purposes only.',
  'terms.agreeCheckbox': 'I agree to the Terms & Conditions',
  'terms.readTerms': 'Read Terms & Conditions',
};

// Dutch translations
const nl: typeof en = {
  // Header
  'nav.products': 'Onderzoekschemicaliën',
  'nav.safety': 'Veiligheid',
  'nav.about': 'Over Ons',
  'nav.terms': 'Algemene Voorwaarden',
  'language': 'Taal',
  
  // Hero Section
  'hero.badge': 'Premium Kwaliteit Gegarandeerd',
  'hero.title1': 'Uw Betrouwbare Bron voor',
  'hero.title2': 'Premium',
  'hero.title3': 'Onderzoekschemicaliën',
  'hero.description': 'Premium verbindingen rechtstreeks in je brievenbus. Anonieme verpakking, luchtdichte afsluiting en volledige privacy gegarandeerd.',
  'hero.cta': 'Bekijk Producten',
  
  // Account Page
  'account.memberSince': 'Lid sinds',
  'account.continueShopping': 'Verder Winkelen',
  'account.safetyGuidelines': 'Veiligheidsrichtlijnen',
  'hero.purity': 'Zuiverheid Getest',
  'hero.shipping': 'Snelle Verzending',
  'hero.clients': 'Tevreden Klanten',
  
  // Featured Products
  'featured.badge': 'Bestsellers',
  'featured.title': 'Uitgelichte',
  'featured.title2': 'Producten',
  'featured.description': 'Ontdek onze meest populaire onderzoeksverbindingen, vertrouwd door wetenschappers wereldwijd.',
  'featured.viewAll': 'Bekijk Alle Producten',
  'featured.viewProduct': 'Bekijk Product',
  'featured.addToCart': 'In Winkelwagen',
  'featured.purity': 'Zuiverheid',
  
  // Features Section
  'features.badge': 'Waarom Wij',
  'features.title': 'Het Onderzoeks',
  'features.title2': 'Voordeel',
  'features.quality.title': 'Laboratoriumkwaliteit',
  'features.quality.desc': 'Alle producten ondergaan strenge tests om 99%+ zuiverheid te garanderen.',
  'features.shipping.title': 'Discrete Verzending',
  'features.shipping.desc': 'Neutrale verpakking zonder identificerende kenmerken. Uw privacy is onze prioriteit.',
  'features.support.title': 'Deskundige Ondersteuning',
  'features.support.desc': '24/7 klantenservice met deskundige onderzoeksspecialisten.',
  'features.secure.title': 'Veilige Betaling',
  'features.secure.desc': 'Anonieme cryptocurrency-betalingen voor volledige transactieprivacy.',
  
  // Delivery Section
  'delivery.badge': 'Wereldwijde Verzending',
  'delivery.title': 'Leverings',
  'delivery.title2': 'Informatie',
  'delivery.description': 'Wij verzenden discreet naar bestemmingen wereldwijd met tracking op alle bestellingen.',
  'delivery.eu': 'Europese Unie',
  'delivery.eu.desc': 'Snelle levering in alle EU-lidstaten',
  'delivery.uk': 'Verenigd Koninkrijk',
  'delivery.uk.desc': 'Betrouwbare verzending naar alle Britse adressen',
  'delivery.intl': 'Internationaal',
  'delivery.intl.desc': 'Wereldwijde verzending naar alle bestemmingen',
  'delivery.days': 'Dagen',
  'delivery.note': 'Alle bestellingen bevatten tracking. Levertijden zijn schattingen en kunnen variëren op basis van douane en lokale postdiensten.',
  
  // Crypto Section
  'crypto.badge': 'Veilige Betaling',
  'crypto.title': 'Betaal met',
  'crypto.title2': 'Crypto',
  'crypto.description': 'Wij accepteren cryptocurrency-betalingen voor veilige en anonieme transacties. Bekijk onze tutorial om te leren hoe.',
  'crypto.whyTitle': 'Waarom Cryptocurrency?',
  'crypto.privacy': 'Volledige Privacy',
  'crypto.privacy.desc': 'Geen persoonlijke bankgegevens vereist',
  'crypto.fast': 'Snelle Verwerking',
  'crypto.fast.desc': 'Transacties bevestigd binnen minuten',
  'crypto.secure': 'Ultra Veilig',
  'crypto.secure.desc': 'Blockchain-technologie garandeert veiligheid',
  
  // Newsletter
  'newsletter.title': 'Blijf',
  'newsletter.title2': 'Op de Hoogte',
  'newsletter.description': 'Abonneer om updates te ontvangen over nieuwe producten, speciale aanbiedingen en onderzoeksnieuws.',
  'newsletter.placeholder': 'Voer uw e-mail in',
  'newsletter.cta': 'Abonneren',
  'newsletter.privacy': 'Wij respecteren uw privacy. U kunt zich op elk moment afmelden.',
  
  // Footer
  'footer.description': 'Uw vertrouwde bron voor hoogwaardige onderzoekschemicaliën en laboratoriumbenodigdheden. Wij bedienen onderzoeksinstellingen wereldwijd sinds 2020.',
  'footer.products': 'Producten',
  'footer.company': 'Bedrijf',
  'footer.support': 'Ondersteuning',
  'footer.copyright': 'Alle rechten voorbehouden.',
  'footer.securePayment': 'Veilige Betaling',
  'footer.sslProtected': 'SSL Beveiligd',
  'footer.privacyGuaranteed': 'Privacy Gegarandeerd',
  
  // Auth
  'auth.welcomeBack': 'Welkom Terug',
  'auth.createAccount': 'Account Aanmaken',
  'auth.signInDesc': 'Log in om toegang te krijgen tot uw onderzoeksaccount',
  'auth.signUpDesc': 'Word lid van onze onderzoeksgemeenschap',
  'auth.signIn': 'Inloggen',
  'auth.signUp': 'Registreren',
  'auth.firstName': 'Voornaam',
  'auth.lastName': 'Achternaam',
  'auth.email': 'E-mailadres',
  'auth.password': 'Wachtwoord',
  'auth.confirmPassword': 'Bevestig Wachtwoord',
  'auth.forgotPassword': 'Wachtwoord vergeten?',
  'auth.signingIn': 'Inloggen...',
  'auth.creatingAccount': 'Account aanmaken...',
  'auth.terms': 'Door een account aan te maken, gaat u akkoord met onze',
  'auth.termsLink': 'Servicevoorwaarden',
  'auth.and': 'en',
  'auth.privacyLink': 'Privacybeleid',
  'auth.disclaimer': 'Alle producten worden uitsluitend verkocht voor onderzoeksdoeleinden.',
  
  // Cart
  'cart.title': 'Winkel',
  'cart.title2': 'wagen',
  'cart.empty': 'Uw winkelwagen is leeg',
  'cart.emptyDesc': 'Het lijkt erop dat u nog geen artikelen aan uw winkelwagen heeft toegevoegd.',
  'cart.reviewDesc': 'Bekijk uw items en ga door naar afrekenen.',
  'cart.startShopping': 'Begin met Winkelen',
  'cart.orderSummary': 'Besteloverzicht',
  'cart.subtotal': 'Subtotaal',
  'cart.shipping': 'Verzending',
  'cart.total': 'Totaal',
  'cart.proceed': 'Naar Afrekenen',
  'cart.minimumOrder': 'Minimale bestelling van €50,00 vereist',
  'cart.moreNeeded': 'meer nodig',
  'cart.securePayment': 'Veilige betaling met cryptocurrency',
  'cart.free': 'GRATIS',
  
  // Checkout
  'checkout.title': 'VEILIG',
  'checkout.title2': 'AFREKENEN',
  'checkout.freeShipping': 'Gratis verzending bij bestellingen boven €100!',
  'checkout.evmDesc': 'Wij accepteren betalingen op elk EVM-compatibel blockchain-netwerk, waaronder Ethereum Mainnet, Arbitrum, Optimism, Polygon, Base en BSC. Betaal met ETH, USDT, USDC, DAI of elk ERC-20 token.',
  'checkout.contact': 'Contactgegevens',
  'checkout.phone': 'Telefoonnummer (optioneel)',
  'checkout.shippingAddress': 'Verzendadres',
  'checkout.streetAddress': 'Straatnaam',
  'checkout.apartment': 'Appartement, suite, etc. (optioneel)',
  'checkout.city': 'Stad',
  'checkout.postalCode': 'Postcode',
  'checkout.shippingMethod': 'Verzendmethode',
  'checkout.businessDays': 'werkdagen',
  'checkout.trackingIncluded': 'Tracking inbegrepen',
  'checkout.paymentMethod': 'Betaalmethode',
  'checkout.evmAccepted': 'EVM Netwerken Geaccepteerd',
  'checkout.paymentConfirm': 'Zodra uw betaling on-chain is bevestigd, ontvangt u realtime updates over uw bestellingsstatus via e-mail.',
  'checkout.secureAnonymous': 'Veilige & Anonieme Betaling',
  'checkout.orderSummary': 'Besteloverzicht',
  'checkout.placeOrder': 'Bestelling Plaatsen',
  'checkout.sslEncrypted': 'SSL Versleutelde Verbinding',
  'checkout.ethPayment': 'Alleen Ethereum Betaling',
  'checkout.termsAgree': 'Door deze bestelling te plaatsen, gaat u akkoord met onze',
  'checkout.termsConditions': 'Algemene Voorwaarden',
  
  // About
  'about.title': 'OVER ONS',
  'about.intro': 'is een anonieme webshop voor onderzoekschemicaliën, opgericht door veteranen uit de scene. Wat begon als een grassroots reactie op beperkte toegang, is uitgegroeid tot een vertrouwde bron voor onderzoekers, chemici en ontdekkers wereldwijd.',
  'about.quality': 'Wij zijn geworteld in Nederlandse kwaliteit: schone synthese, consistente zuiverheid en betrouwbare service. Elk product wordt met precisie behandeld en elke bestelling wordt met zorg en discretie verzonden. Geen namen. Geen compromissen.',
  'about.privacy': 'Privacy Eerst',
  'about.privacy.desc': 'Anonieme transacties en discrete verzending wereldwijd.',
  'about.dutchQuality': 'Nederlandse Kwaliteit',
  'about.dutchQuality.desc': 'Schone synthese, consistente zuiverheid en strenge tests.',
  'about.community': 'Gemeenschapsgedreven',
  'about.community.desc': 'Opgericht door veteranen, vertrouwd door onderzoekers wereldwijd.',
  'about.harmReduction': 'Schadebeperking',
  'about.harmReduction.desc': 'Educatie en veiligheid staan centraal in alles wat we doen.',
  'about.cryptoTitle': 'Cryptocurrency Betalingen',
  'about.cryptoSubtitle': 'Veilig, Privé, Gedecentraliseerd',
  'about.cryptoDesc1': 'Wij accepteren uitsluitend cryptocurrency-betalingen via het Ethereum Virtual Machine (EVM) ecosysteem. Dit betekent dat u kunt betalen via elk EVM-compatibel blockchain-netwerk, waardoor u de flexibiliteit heeft om het netwerk te kiezen met de laagste kosten of snelste bevestigingstijden.',
  'about.cryptoNetworks': 'Ondersteunde Netwerken:',
  'about.cryptoNetworksList': 'Ethereum Mainnet, Arbitrum One, Optimism, Polygon, Base, BNB Smart Chain (BSC), Avalanche C-Chain en elk ander EVM-compatibel netwerk.',
  'about.cryptoTokens': 'Geaccepteerde Tokens:',
  'about.cryptoTokensList': 'ETH, WETH, USDT, USDC, DAI, BUSD en de meeste belangrijke ERC-20 tokens. Als u liever met een andere token betaalt, neem dan contact met ons op en we zullen aan uw verzoek voldoen.',
  'about.cryptoPrivacy': 'Ons betalingssysteem is ontworpen met privacy in gedachten. Cryptocurrency-transacties bieden een extra laag anonimiteit vergeleken met traditionele betaalmethoden. We slaan uw portemonnee-adressen nooit langer op dan nodig, en alle transactiegegevens worden met de grootste discretie behandeld.',
  'about.philosophy': 'Wij geloven dat toegang tot informatie en stoffen een recht moet zijn, geen risico. Wetenschap moet vrij zijn van stigma en verbod.',
  'about.standFor': 'Wij staan voor educatie, schadebeperking en het recht om te kiezen.',
  'about.slogan': 'Legaliseer alles.',
  
  // Warning Banner
  'warning.text': 'Alleen voor onderzoeksdoeleinden. U moet 18+ zijn om te bestellen.',
  
  // Safety
  'safety.title': 'Veiligheids',
  'safety.title2': 'Informatie',
  
  // Terms
  'terms.title': 'Algemene',
  'terms.title2': 'Voorwaarden',
  'terms.intro': 'Welkom bij rechemsback.com, een online winkel gespecialiseerd in de verkoop van onderzoekschemicaliën. Deze Algemene Voorwaarden zijn van toepassing op uw gebruik van de website en uw aankopen via de Site. Lees deze Voorwaarden zorgvuldig door voordat u de Site bezoekt of gebruikt.',
  'terms.agreement.title': 'Akkoord met Voorwaarden',
  'terms.agreement.content': 'Door de Site te gebruiken, gaat u akkoord met deze Voorwaarden. Als u deze Voorwaarden niet accepteert, mag u de Site niet bezoeken of gebruiken.',
  'terms.age.title': 'Leeftijdsvereiste',
  'terms.age.content': 'U moet minimaal 18 jaar oud zijn om toegang te krijgen tot deze Site en producten te kopen van rechemsback.com. Door de Site te gebruiken, bevestigt en garandeert u dat u aan deze leeftijdsvereiste voldoet.',
  'terms.products.title': 'Producten',
  'terms.products.content': 'rechemsback.com levert onderzoekschemicaliën uitsluitend voor laboratorium- en onderzoeksdoeleinden. Deze producten zijn niet bedoeld voor menselijk of veterinair gebruik. rechemsback.com aanvaardt geen verantwoordelijkheid voor misbruik van producten die van de Site zijn gekocht.',
  'terms.ordering.title': 'Bestellen en Verzenden',
  'terms.ordering.content': 'Alle bestellingen zijn onderworpen aan productbeschikbaarheid en acceptatie door rechemsback.com. Wij behouden ons het recht voor om elke bestelling naar eigen goeddunken te weigeren of te annuleren. Wij streven ernaar bestellingen binnen 2 werkdagen na betalingsbevestiging te verzenden. Hoewel wij internationale verzending aanbieden, is het de verantwoordelijkheid van de klant om naleving van alle lokale wetten en importregels te waarborgen. rechemsback.com is niet aansprakelijk voor douanevertragingen, inbeslagnames of juridische problemen als gevolg van uw bestelling.',
  'terms.payment.title': 'Betaling',
  'terms.payment.content': 'rechemsback.com accepteert cryptocurrency (Ethereum). Volledige betaling is vereist op het moment van aankoop.',
  'terms.returns.title': 'Retourzendingen en Terugbetalingen',
  'terms.returns.content': 'Wij accepteren geen retourzendingen en verstrekken geen terugbetalingen, tenzij het artikel bij aankomst beschadigd of defect is. In dergelijke gevallen moet u binnen 7 dagen na ontvangst contact met ons opnemen om een retour of terugbetaling te regelen. Voeg duidelijk bewijs van de schade bij.',
  'terms.disclaimer.title': 'Afwijzing van Garanties en Aansprakelijkheid',
  'terms.disclaimer.content': 'rechemsback.com biedt geen garanties, uitdrukkelijk of impliciet, met betrekking tot de veiligheid, effectiviteit of geschiktheid van de verkochte producten. Wij wijzen alle aansprakelijkheid af voor letsel, verlies of schade als gevolg van het gebruik of misbruik van enig product.',
  'terms.indemnification.title': 'Vrijwaring',
  'terms.indemnification.content': 'U gaat ermee akkoord rechemsback.com, haar eigenaren, werknemers, agenten en gelieerde ondernemingen te vrijwaren, verdedigen en schadeloos te stellen tegen alle claims, verliezen, aansprakelijkheden, kosten en uitgaven (inclusief juridische kosten) die voortvloeien uit uw gebruik van de Site of producten die ervan zijn gekocht.',
  'terms.governing.title': 'Toepasselijk Recht en Jurisdictie',
  'terms.governing.content': 'Deze Voorwaarden worden beheerst door en geïnterpreteerd in overeenstemming met de wetten van Nederland. Eventuele geschillen die voortvloeien uit of verband houden met deze Voorwaarden worden uitsluitend beslecht door de rechtbanken van Nederland.',
  'terms.changes.title': 'Wijzigingen in Voorwaarden',
  'terms.changes.content': 'Wij kunnen deze Voorwaarden te allen tijde bijwerken of wijzigen zonder voorafgaande kennisgeving. Voortgezet gebruik van de Site na eventuele wijzigingen houdt uw acceptatie van de herziene Voorwaarden in.',
  'terms.researchDisclaimer': 'Alle producten worden uitsluitend verkocht voor onderzoeksdoeleinden.',
  'terms.agreeCheckbox': 'Ik ga akkoord met de Algemene Voorwaarden',
  'terms.readTerms': 'Lees Algemene Voorwaarden',
};

// German translations
const de: typeof en = {
  // Header
  'nav.products': 'Forschungschemikalien',
  'nav.safety': 'Sicherheit',
  'nav.about': 'Über Uns',
  'nav.terms': 'AGB',
  'language': 'Sprache',
  
  // Hero Section
  'hero.badge': 'Premium Qualität Garantiert',
  'hero.title1': 'Ihre Zuverlässige Quelle für',
  'hero.title2': 'Premium',
  'hero.title3': 'Forschungschemikalien',
  'hero.description': 'Premium-Verbindungen direkt in Ihren Briefkasten. Anonyme Verpackung, luftdichte Versiegelung und vollständige Privatsphäre garantiert.',
  'hero.cta': 'Produkte Durchsuchen',
  
  // Account Page
  'account.memberSince': 'Mitglied seit',
  'account.continueShopping': 'Weiter Einkaufen',
  'account.safetyGuidelines': 'Sicherheitsrichtlinien',
  'hero.purity': 'Reinheit Getestet',
  'hero.shipping': 'Schneller Versand',
  'hero.clients': 'Zufriedene Kunden',
  
  // Featured Products
  'featured.badge': 'Bestseller',
  'featured.title': 'Ausgewählte',
  'featured.title2': 'Produkte',
  'featured.description': 'Entdecken Sie unsere beliebtesten Forschungsverbindungen, denen Wissenschaftler weltweit vertrauen.',
  'featured.viewAll': 'Alle Produkte Anzeigen',
  'featured.viewProduct': 'Produkt Anzeigen',
  'featured.addToCart': 'In den Warenkorb',
  'featured.purity': 'Reinheit',
  
  // Features Section
  'features.badge': 'Warum Wir',
  'features.title': 'Der Forschungs',
  'features.title2': 'Vorteil',
  'features.quality.title': 'Laborqualität',
  'features.quality.desc': 'Alle Produkte durchlaufen strenge Tests, um 99%+ Reinheit zu gewährleisten.',
  'features.shipping.title': 'Diskreter Versand',
  'features.shipping.desc': 'Neutrale Verpackung ohne identifizierende Merkmale. Ihre Privatsphäre ist unsere Priorität.',
  'features.support.title': 'Experten-Support',
  'features.support.desc': '24/7 Kundenservice mit sachkundigen Forschungsspezialisten.',
  'features.secure.title': 'Sichere Zahlung',
  'features.secure.desc': 'Anonyme Kryptowährungszahlungen für vollständige Transaktionsprivatsphäre.',
  
  // Delivery Section
  'delivery.badge': 'Weltweiter Versand',
  'delivery.title': 'Liefer',
  'delivery.title2': 'Informationen',
  'delivery.description': 'Wir versenden diskret an Ziele weltweit mit Tracking bei allen Bestellungen.',
  'delivery.eu': 'Europäische Union',
  'delivery.eu.desc': 'Schnelle Lieferung in alle EU-Mitgliedstaaten',
  'delivery.uk': 'Vereinigtes Königreich',
  'delivery.uk.desc': 'Zuverlässiger Versand an alle britischen Adressen',
  'delivery.intl': 'International',
  'delivery.intl.desc': 'Weltweiter Versand an alle Ziele',
  'delivery.days': 'Tage',
  'delivery.note': 'Alle Bestellungen beinhalten Tracking. Lieferzeiten sind Schätzungen und können je nach Zoll und lokalen Postdiensten variieren.',
  
  // Crypto Section
  'crypto.badge': 'Sichere Zahlung',
  'crypto.title': 'Zahlen mit',
  'crypto.title2': 'Krypto',
  'crypto.description': 'Wir akzeptieren Kryptowährungszahlungen für sichere und anonyme Transaktionen. Schauen Sie sich unser Tutorial an, um zu erfahren wie.',
  'crypto.whyTitle': 'Warum Kryptowährung?',
  'crypto.privacy': 'Vollständige Privatsphäre',
  'crypto.privacy.desc': 'Keine persönlichen Bankdaten erforderlich',
  'crypto.fast': 'Schnelle Verarbeitung',
  'crypto.fast.desc': 'Transaktionen innerhalb von Minuten bestätigt',
  'crypto.secure': 'Ultra Sicher',
  'crypto.secure.desc': 'Blockchain-Technologie gewährleistet Sicherheit',
  
  // Newsletter
  'newsletter.title': 'Bleiben Sie',
  'newsletter.title2': 'Informiert',
  'newsletter.description': 'Abonnieren Sie, um Updates zu neuen Produkten, Sonderangeboten und Forschungsnachrichten zu erhalten.',
  'newsletter.placeholder': 'Geben Sie Ihre E-Mail ein',
  'newsletter.cta': 'Abonnieren',
  'newsletter.privacy': 'Wir respektieren Ihre Privatsphäre. Sie können sich jederzeit abmelden.',
  
  // Footer
  'footer.description': 'Ihre vertrauenswürdige Quelle für hochwertige Forschungschemikalien und Laborzubehör. Wir bedienen Forschungseinrichtungen weltweit seit 2020.',
  'footer.products': 'Produkte',
  'footer.company': 'Unternehmen',
  'footer.support': 'Support',
  'footer.copyright': 'Alle Rechte vorbehalten.',
  'footer.securePayment': 'Sichere Zahlung',
  'footer.sslProtected': 'SSL Geschützt',
  'footer.privacyGuaranteed': 'Datenschutz Garantiert',
  
  // Auth
  'auth.welcomeBack': 'Willkommen Zurück',
  'auth.createAccount': 'Konto Erstellen',
  'auth.signInDesc': 'Melden Sie sich an, um auf Ihr Forschungskonto zuzugreifen',
  'auth.signUpDesc': 'Treten Sie unserer Forschungsgemeinschaft bei',
  'auth.signIn': 'Anmelden',
  'auth.signUp': 'Registrieren',
  'auth.firstName': 'Vorname',
  'auth.lastName': 'Nachname',
  'auth.email': 'E-Mail-Adresse',
  'auth.password': 'Passwort',
  'auth.confirmPassword': 'Passwort Bestätigen',
  'auth.forgotPassword': 'Passwort vergessen?',
  'auth.signingIn': 'Anmelden...',
  'auth.creatingAccount': 'Konto erstellen...',
  'auth.terms': 'Durch die Erstellung eines Kontos stimmen Sie unseren',
  'auth.termsLink': 'Nutzungsbedingungen',
  'auth.and': 'und',
  'auth.privacyLink': 'Datenschutzrichtlinie',
  'auth.disclaimer': 'Alle Produkte werden ausschließlich für Forschungszwecke verkauft.',
  
  // Cart
  'cart.title': 'Waren',
  'cart.title2': 'korb',
  'cart.empty': 'Ihr Warenkorb ist leer',
  'cart.emptyDesc': 'Es sieht so aus, als hätten Sie noch keine Artikel in Ihren Warenkorb gelegt.',
  'cart.startShopping': 'Einkauf Starten',
  'cart.orderSummary': 'Bestellübersicht',
  'cart.subtotal': 'Zwischensumme',
  'cart.shipping': 'Versand',
  'cart.total': 'Gesamt',
  'cart.proceed': 'Zur Kasse',
  'cart.minimumOrder': 'Mindestbestellung von €50,00 erforderlich',
  'cart.moreNeeded': 'mehr benötigt',
  'cart.securePayment': 'Sichere Zahlung mit Kryptowährung',
  'cart.free': 'KOSTENLOS',
  
  // Checkout
  'checkout.title': 'SICHERE',
  'checkout.title2': 'KASSE',
  'checkout.freeShipping': 'Kostenloser Versand bei Bestellungen über €100!',
  'checkout.evmDesc': 'Wir akzeptieren Zahlungen auf jedem EVM-kompatiblen Blockchain-Netzwerk, einschließlich Ethereum Mainnet, Arbitrum, Optimism, Polygon, Base und BSC. Zahlen Sie mit ETH, USDT, USDC, DAI oder jedem ERC-20 Token.',
  'checkout.contact': 'Kontaktinformationen',
  'checkout.phone': 'Telefonnummer (optional)',
  'checkout.shippingAddress': 'Lieferadresse',
  'checkout.streetAddress': 'Straße',
  'checkout.apartment': 'Wohnung, Suite, etc. (optional)',
  'checkout.city': 'Stadt',
  'checkout.postalCode': 'Postleitzahl',
  'checkout.shippingMethod': 'Versandmethode',
  'checkout.businessDays': 'Werktage',
  'checkout.trackingIncluded': 'Tracking inklusive',
  'checkout.paymentMethod': 'Zahlungsmethode',
  'checkout.evmAccepted': 'EVM Netzwerke Akzeptiert',
  'checkout.paymentConfirm': 'Sobald Ihre Zahlung on-chain bestätigt ist, erhalten Sie Echtzeit-Updates zu Ihrem Bestellstatus per E-Mail.',
  'checkout.secureAnonymous': 'Sichere & Anonyme Zahlung',
  'checkout.orderSummary': 'Bestellübersicht',
  'checkout.placeOrder': 'Bestellung Aufgeben',
  'checkout.sslEncrypted': 'SSL Verschlüsselte Verbindung',
  'checkout.ethPayment': 'Nur Ethereum Zahlung',
  'checkout.termsAgree': 'Mit der Aufgabe dieser Bestellung stimmen Sie unseren',
  'checkout.termsConditions': 'Allgemeinen Geschäftsbedingungen',
  
  // About
  'about.title': 'ÜBER UNS',
  'about.intro': 'ist ein anonymer Webshop für Forschungschemikalien, gegründet von Veteranen der Szene. Was als Graswurzelbewegung gegen eingeschränkten Zugang begann, ist zu einer vertrauenswürdigen Quelle für Forscher, Chemiker und Entdecker weltweit geworden.',
  'about.quality': 'Wir sind in niederländischer Qualität verwurzelt: saubere Synthese, konstante Reinheit und zuverlässiger Service. Jedes Produkt wird mit Präzision behandelt, und jede Bestellung wird mit Sorgfalt und Diskretion versendet. Keine Namen. Kein Kompromiss.',
  'about.privacy': 'Datenschutz Zuerst',
  'about.privacy.desc': 'Anonyme Transaktionen und diskreter Versand weltweit.',
  'about.dutchQuality': 'Niederländische Qualität',
  'about.dutchQuality.desc': 'Saubere Synthese, konstante Reinheit und strenge Tests.',
  'about.community': 'Gemeinschaftsgetrieben',
  'about.community.desc': 'Von Veteranen gegründet, von Forschern weltweit vertraut.',
  'about.harmReduction': 'Schadensminimierung',
  'about.harmReduction.desc': 'Bildung und Sicherheit stehen im Mittelpunkt unseres Handelns.',
  'about.cryptoTitle': 'Kryptowährungszahlungen',
  'about.cryptoSubtitle': 'Sicher, Privat, Dezentralisiert',
  'about.cryptoDesc1': 'Wir akzeptieren ausschließlich Kryptowährungszahlungen über das Ethereum Virtual Machine (EVM) Ökosystem. Das bedeutet, Sie können über jedes EVM-kompatible Blockchain-Netzwerk bezahlen, was Ihnen die Flexibilität gibt, das Netzwerk mit den niedrigsten Gebühren oder schnellsten Bestätigungszeiten zu wählen.',
  'about.cryptoNetworks': 'Unterstützte Netzwerke:',
  'about.cryptoNetworksList': 'Ethereum Mainnet, Arbitrum One, Optimism, Polygon, Base, BNB Smart Chain (BSC), Avalanche C-Chain und jedes andere EVM-kompatible Netzwerk.',
  'about.cryptoTokens': 'Akzeptierte Token:',
  'about.cryptoTokensList': 'ETH, WETH, USDT, USDC, DAI, BUSD und die meisten wichtigen ERC-20 Token. Wenn Sie lieber mit einem anderen Token bezahlen möchten, kontaktieren Sie uns und wir werden Ihrem Wunsch entsprechen.',
  'about.cryptoPrivacy': 'Unser Zahlungssystem ist mit Blick auf Datenschutz konzipiert. Kryptowährungstransaktionen bieten eine zusätzliche Anonymitätsebene im Vergleich zu herkömmlichen Zahlungsmethoden. Wir speichern Ihre Wallet-Adressen nie länger als nötig, und alle Transaktionsdaten werden mit größter Diskretion behandelt.',
  'about.philosophy': 'Wir glauben, dass der Zugang zu Informationen und Substanzen ein Recht sein sollte, kein Risiko. Wissenschaft sollte frei von Stigma und Verbot sein.',
  'about.standFor': 'Wir stehen für Bildung, Schadensminimierung und das Recht zu wählen.',
  'about.slogan': 'Legalisiert alles.',
  
  // Warning Banner
  'warning.text': 'Nur für Forschungszwecke. Sie müssen 18+ sein, um zu bestellen.',
  
  // Safety
  'safety.title': 'Sicherheits',
  'safety.title2': 'Informationen',
  
  // Terms
  'terms.title': 'Allgemeine',
  'terms.title2': 'Geschäftsbedingungen',
  'terms.intro': 'Willkommen bei rechemsback.com, einem Online-Shop, der sich auf den Verkauf von Forschungschemikalien spezialisiert hat. Diese Allgemeinen Geschäftsbedingungen regeln Ihre Nutzung der Website und Ihre Einkäufe über die Seite. Bitte lesen Sie diese Bedingungen sorgfältig durch, bevor Sie auf die Seite zugreifen oder sie nutzen.',
  'terms.agreement.title': 'Zustimmung zu den Bedingungen',
  'terms.agreement.content': 'Durch die Nutzung der Seite stimmen Sie diesen Bedingungen zu. Wenn Sie diese Bedingungen nicht akzeptieren, dürfen Sie die Seite nicht besuchen oder nutzen.',
  'terms.age.title': 'Altersanforderung',
  'terms.age.content': 'Sie müssen mindestens 18 Jahre alt sein, um auf diese Seite zuzugreifen und Produkte von rechemsback.com zu kaufen. Durch die Nutzung der Seite bestätigen und garantieren Sie, dass Sie diese Altersanforderung erfüllen.',
  'terms.products.title': 'Produkte',
  'terms.products.content': 'rechemsback.com liefert Forschungschemikalien ausschließlich für Labor- und Forschungszwecke. Diese Produkte sind nicht für den menschlichen oder veterinärmedizinischen Gebrauch bestimmt. rechemsback.com übernimmt keine Verantwortung für den Missbrauch von Produkten, die von der Seite gekauft wurden.',
  'terms.ordering.title': 'Bestellung und Versand',
  'terms.ordering.content': 'Alle Bestellungen unterliegen der Produktverfügbarkeit und der Annahme durch rechemsback.com. Wir behalten uns das Recht vor, jede Bestellung nach eigenem Ermessen abzulehnen oder zu stornieren. Wir bemühen uns, Bestellungen innerhalb von 2 Werktagen nach Zahlungsbestätigung zu versenden. Obwohl wir internationalen Versand anbieten, liegt es in der Verantwortung des Kunden, die Einhaltung aller lokalen Gesetze und Importvorschriften sicherzustellen. rechemsback.com haftet nicht für Zollverzögerungen, Beschlagnahmungen oder rechtliche Probleme, die sich aus Ihrer Bestellung ergeben.',
  'terms.payment.title': 'Zahlung',
  'terms.payment.content': 'rechemsback.com akzeptiert Kryptowährung (Ethereum). Die vollständige Zahlung ist zum Zeitpunkt des Kaufs erforderlich.',
  'terms.returns.title': 'Rücksendungen und Rückerstattungen',
  'terms.returns.content': 'Wir akzeptieren keine Rücksendungen und erstatten keine Rückerstattungen, es sei denn, der Artikel ist bei Ankunft beschädigt oder defekt. In solchen Fällen müssen Sie uns innerhalb von 7 Tagen nach Erhalt des Artikels kontaktieren, um eine Rücksendung oder Rückerstattung zu vereinbaren. Bitte fügen Sie eindeutige Beweise für den Schaden bei.',
  'terms.disclaimer.title': 'Haftungsausschluss',
  'terms.disclaimer.content': 'rechemsback.com gibt keine ausdrücklichen oder stillschweigenden Garantien hinsichtlich der Sicherheit, Wirksamkeit oder Eignung der verkauften Produkte. Wir lehnen jede Haftung für Verletzungen, Verluste oder Schäden ab, die aus der Verwendung oder dem Missbrauch eines Produkts resultieren.',
  'terms.indemnification.title': 'Freistellung',
  'terms.indemnification.content': 'Sie erklären sich damit einverstanden, rechemsback.com, seine Eigentümer, Mitarbeiter, Vertreter und verbundenen Unternehmen von allen Ansprüchen, Verlusten, Verbindlichkeiten, Kosten und Ausgaben (einschließlich Anwaltskosten) freizustellen, die sich aus Ihrer Nutzung der Seite oder der davon gekauften Produkte ergeben.',
  'terms.governing.title': 'Anwendbares Recht und Gerichtsstand',
  'terms.governing.content': 'Diese Bedingungen unterliegen den Gesetzen der Niederlande und werden in Übereinstimmung mit diesen ausgelegt. Alle Streitigkeiten, die sich aus oder im Zusammenhang mit diesen Bedingungen ergeben, werden ausschließlich vor den Gerichten der Niederlande beigelegt.',
  'terms.changes.title': 'Änderungen der Bedingungen',
  'terms.changes.content': 'Wir können diese Bedingungen jederzeit ohne vorherige Ankündigung aktualisieren oder ändern. Die fortgesetzte Nutzung der Seite nach etwaigen Änderungen gilt als Ihre Annahme der überarbeiteten Bedingungen.',
  'terms.researchDisclaimer': 'Alle Produkte werden ausschließlich für Forschungszwecke verkauft.',
  'terms.agreeCheckbox': 'Ich stimme den Allgemeinen Geschäftsbedingungen zu',
  'terms.readTerms': 'Allgemeine Geschäftsbedingungen lesen',
};

const translations = { en, nl, de };

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};