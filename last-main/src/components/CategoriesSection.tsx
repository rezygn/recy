import { ArrowRight, FlaskConical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const categories = [
  {
    icon: FlaskConical,
    name: "Research Chemicals",
    description: "High-purity compounds for scientific research",
    count: "120+ products",
    color: "bg-primary/10 text-primary",
  },
];

const CategoriesSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-secondary">
      <div className="container">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <h2 className="font-steelfish text-4xl lg:text-5xl text-foreground mb-2 tracking-wide">
              Browse Categories
            </h2>
            <p className="text-muted-foreground">
              Find exactly what you need for your research
            </p>
          </div>
          <Button variant="outline" className="self-start sm:self-auto font-steelfish text-lg tracking-wide" asChild>
            <Link to="/about">
              Learn More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <Link
              key={category.name}
              to="/products"
              className="group p-6 bg-card rounded-2xl border border-border hover:border-primary hover:shadow-lg transition-all duration-300 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`w-14 h-14 rounded-2xl ${category.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
                  <category.icon className="h-7 w-7" />
                </div>
                <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
              </div>
              <h3 className="font-steelfish text-2xl text-foreground mb-2 group-hover:text-primary transition-colors tracking-wide">
                {category.name}
              </h3>
              <p className="text-muted-foreground text-sm mb-3">
                {category.description}
              </p>
              <span className="font-steelfish text-lg text-primary tracking-wide">
                {category.count}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
