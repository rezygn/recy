import { Star, Heart } from 'lucide-react';
import { useState } from 'react';

interface ProductCardProps {
  discount?: number;
}

export const ProductCard = ({ discount }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <div
      className="royal-frame group overflow-hidden hover-glow cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount Badge */}
      {discount && (
        <div className="absolute top-3 left-3 z-10">
          <span className="gradient-teal text-primary-foreground px-3 py-1 text-sm font-bold rounded-full shadow-glow">
            -{discount}%
          </span>
        </div>
      )}

      {/* Favorite Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsFavorited(!isFavorited);
        }}
        className={`absolute top-3 right-3 z-10 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
          isFavorited
            ? 'bg-primary text-primary-foreground shadow-glow'
            : 'bg-card/80 text-muted-foreground hover:bg-primary/10 hover:text-primary'
        }`}
      >
        <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
      </button>

      {/* Product Image Area */}
      <div className="relative h-48 bg-gradient-to-br from-secondary to-muted overflow-hidden">
        <div className="absolute inset-0 hex-pattern opacity-50" />
        
        {/* Placeholder Pattern */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={`molecule-float transition-transform duration-500 ${isHovered ? 'scale-110' : ''}`}>
            <div className="w-20 h-20 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
              <span className="text-3xl">🧪</span>
            </div>
          </div>
        </div>

        {/* Hover Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent transition-opacity duration-300 ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Product Info */}
      <div className="p-5 space-y-3">
        <h3 className="font-steelfish text-xl text-foreground tracking-wide line-clamp-2 group-hover:text-primary transition-colors">
          Product Name Here
        </h3>

        <p className="text-muted-foreground text-sm">Category Name</p>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              className={`w-4 h-4 ${
                star <= 4 ? 'text-orange fill-orange' : 'text-muted-foreground/30'
              }`}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">(24)</span>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          <span className="text-sm text-muted-foreground">From</span>
          <span className="font-steelfish text-2xl text-primary">€ 12,95</span>
        </div>

        {/* Select Options Button */}
        <button className="w-full mt-3 py-3 border-2 border-primary text-primary rounded-xl font-medium transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:shadow-glow group-hover:border-primary">
          <span className="relative z-10">Select options</span>
        </button>
      </div>

      {/* Bottom Glow Effect on Hover */}
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 gradient-teal transition-opacity duration-300 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
      />
    </div>
  );
};