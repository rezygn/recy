import { Link } from "react-router-dom";
import { 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin,
  CreditCard,
  Shield,
  Lock
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { t } = useLanguage();
  
  const footerLinks = {
    products: [
      { name: "Research Chemicals", href: "/products" },
      { name: "Lab Equipment", href: "/equipment" },
      { name: "Analytical Reagents", href: "/reagents" },
      { name: "Biochemicals", href: "/biochemicals" },
      { name: "Supplements", href: "/supplements" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Contact", href: "/contact" },
      { name: "Careers", href: "/careers" },
      { name: "Blog", href: "/blog" },
      { name: "Press", href: "/press" },
    ],
    support: [
      { name: "FAQ", href: "/faq" },
      { name: "Shipping", href: "/shipping" },
      { name: "Returns", href: "/returns" },
      { name: "Safety Data Sheets", href: "/sds" },
      { name: "Terms of Service", href: "/terms" },
    ],
  };

  const socialLinks = [
    { icon: Facebook, href: "#", label: "Facebook" },
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Instagram, href: "#", label: "Instagram" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
  ];

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
          <div className="lg:col-span-2">
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <img src="/src/assets/logo.png" alt="rechemsback.com" className="h-12 w-auto" />
            </Link>
            <p className="text-primary-foreground/70 text-sm mb-6 max-w-sm">
              {t('footer.description')}
            </p>
            <div className="space-y-3">
              <a href="mailto:info@rechemsback.com" className="flex items-center gap-3 text-sm text-primary-foreground/70 hover:text-primary transition-colors">
                <Mail className="h-4 w-4" />
                info@rechemsback.com
              </a>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <MapPin className="h-4 w-4" />
                Amsterdam, Netherlands
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-steelfish text-xl tracking-wide mb-4">{t('footer.products')}</h4>
            <ul className="space-y-3">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-primary-foreground/70 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-steelfish text-xl tracking-wide mb-4">{t('footer.company')}</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-primary-foreground/70 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-steelfish text-xl tracking-wide mb-4">{t('footer.support')}</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <Link to={link.href} className="text-sm text-primary-foreground/70 hover:text-primary transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10">
        <div className="container py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-primary-foreground/60">
              © {new Date().getFullYear()} rechemsback.com. {t('footer.copyright')}
            </p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-primary-foreground/60">
                <CreditCard className="h-4 w-4" />
                <span className="text-xs">{t('footer.securePayment')}</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/60">
                <Shield className="h-4 w-4" />
                <span className="text-xs">{t('footer.sslProtected')}</span>
              </div>
              <div className="flex items-center gap-2 text-primary-foreground/60">
                <Lock className="h-4 w-4" />
                <span className="text-xs">{t('footer.privacyGuaranteed')}</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a key={social.label} href={social.href} aria-label={social.label} className="w-9 h-9 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;