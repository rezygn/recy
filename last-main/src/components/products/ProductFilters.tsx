import { useState } from 'react';
import { ChevronDown, ChevronUp, Beaker, Pill, FlaskConical, Droplets, Brain, Leaf, Sparkles, Wind, Store, Euro, LucideIcon } from 'lucide-react';

const categoryIcons: Record<string, LucideIcon> = {
  'Blotter': Beaker,
  'Pellet': Pill,
  'Powder': FlaskConical,
  'Liquid': Droplets,
  'Research Chemicals': Brain,
  'Smartshop': Sparkles,
  'Supplements': Leaf,
  'Poppers': Wind,
  'Headshop': Store,
};

const categoryColors: Record<string, string> = {
  'Blotter': 'bg-teal/20 text-teal border-teal/30',
  'Pellet': 'bg-orange/20 text-orange border-orange/30',
  'Powder': 'bg-cyan/20 text-cyan border-cyan/30',
  'Liquid': 'bg-primary/20 text-primary border-primary/30',
  'Research Chemicals': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  'Smartshop': 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30',
  'Supplements': 'bg-green-500/20 text-green-400 border-green-500/30',
  'Poppers': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
  'Headshop': 'bg-amber-500/20 text-amber-400 border-amber-500/30',
};

interface FilterSection {
  title: string;
  items: string[];
  isExpanded: boolean;
}

export const ProductFilters = () => {
  const [filters, setFilters] = useState<FilterSection[]>([
    {
      title: 'RC Type',
      items: ['Blotter', 'Pellet', 'Powder', 'Liquid'],
      isExpanded: false,
    },
    {
      title: 'Categories',
      items: ['Research Chemicals', 'Smartshop', 'Supplements', 'Poppers', 'Headshop'],
      isExpanded: true,
    },
    {
      title: 'Purity Level',
      items: ['99%+', '98-99%', '95-98%', 'Standard'],
      isExpanded: false,
    },
    {
      title: 'Price Range',
      items: ['Under €10', '€10 - €25', '€25 - €50', 'Over €50'],
      isExpanded: false,
    },
  ]);

  const toggleFilter = (index: number) => {
    setFilters((prev) =>
      prev.map((filter, i) =>
        i === index ? { ...filter, isExpanded: !filter.isExpanded } : filter
      )
    );
  };

  return (
    <aside className="w-full lg:w-72 shrink-0">
      <div className="royal-frame p-6 hover-glow">
        <div className="corner-decor">
          <h2 className="font-steelfish text-2xl text-primary mb-6 tracking-wide">
            Filters
          </h2>
        </div>

        <div className="space-y-4 mt-8">
          {/* Active Filters Badge */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="glass-card px-3 py-1 text-xs text-primary rounded-full flex items-center gap-1 shimmer-border">
              Blotter <button className="ml-1 hover:text-destructive">×</button>
            </span>
          </div>

          {filters.map((filter, index) => (
            <div
              key={filter.title}
              className="border-b border-border/50 pb-4 last:border-0"
            >
              <button
                onClick={() => toggleFilter(index)}
                className="w-full flex items-center justify-between py-2 group"
              >
                <span className="font-steelfish text-lg text-primary tracking-wide group-hover:text-teal-dark transition-colors">
                  {filter.title}
                </span>
                <span className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center group-hover:bg-teal-light transition-colors">
                  {filter.isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-primary" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-primary" />
                  )}
                </span>
              </button>

              {filter.isExpanded && (
                <div className="mt-3 space-y-2 animate-fade-in">
                  {filter.items.map((item) => {
                    const Icon = categoryIcons[item];
                    const colorClass = categoryColors[item] || 'bg-muted text-foreground border-border';
                    
                    return (
                      <div
                        key={item}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-[1.02] hover:shadow-md ${colorClass}`}
                      >
                        {Icon && <Icon className="w-4 h-4 shrink-0" />}
                        <span className="font-medium text-sm">{item}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Clear All Button */}
        <button className="mt-6 w-full py-3 border-2 border-primary/30 text-primary rounded-xl hover:bg-primary/5 transition-all duration-300 font-medium hover:border-primary hover:shadow-glow">
          Clear All Filters
        </button>
      </div>
    </aside>
  );
};