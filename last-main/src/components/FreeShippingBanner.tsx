import bannerImage from '@/assets/free-shipping-banner.png';

const FreeShippingBanner = () => {
  return (
    <div className="w-full overflow-hidden -mt-20 md:-mt-28 relative z-20">
      <div className="animate-marquee flex">
        <img src={bannerImage} alt="Free shipping on orders above 100€" className="h-40 md:h-52 w-auto" />
        <img src={bannerImage} alt="Free shipping on orders above 100€" className="h-40 md:h-52 w-auto" />
        <img src={bannerImage} alt="Free shipping on orders above 100€" className="h-40 md:h-52 w-auto" />
        <img src={bannerImage} alt="Free shipping on orders above 100€" className="h-40 md:h-52 w-auto" />
      </div>
    </div>
  );
};

export default FreeShippingBanner;
