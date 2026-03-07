import { useState } from 'react';

const TABS = ['Spotlights', 'Sales', 'New', 'Bestsellers'];

export const ProductTabs = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      {TABS.map((tab, index) => (
        <button
          key={tab}
          onClick={() => setActiveTab(index)}
          className={`relative px-6 py-3 font-steelfish text-lg tracking-wide transition-all duration-300 rounded-xl ${
            activeTab === index
              ? 'text-primary'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          {tab}
          {activeTab === index && (
            <>
              <span className="absolute bottom-0 left-2 right-2 h-0.5 gradient-teal rounded-full" />
              <span className="absolute inset-0 bg-primary/5 rounded-xl -z-10" />
            </>
          )}
        </button>
      ))}
    </div>
  );
};