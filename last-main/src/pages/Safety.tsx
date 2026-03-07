import { AlertTriangle, User, PawPrint, Leaf, Skull } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SnowAnimation } from "@/components/SnowAnimation";
import WarningBanner from "@/components/WarningBanner";

const warnings = [
  {
    icon: User,
    title: "Not For Human Consumption",
    description: "These compounds are strictly for in-vitro research, forensic analysis, and reagent testing. Consumption may result in serious injury, hospitalization, or death."
  },
  {
    icon: PawPrint,
    title: "Not For Animal Use",
    description: "These substances must not be administered to animals under any circumstances. Keep all compounds secured and away from pets and livestock."
  },
  {
    icon: Leaf,
    title: "Environmental Safety",
    description: "Do not release into the environment. Improper disposal may contaminate water sources and harm ecosystems. Follow local hazardous waste disposal regulations."
  },
  {
    icon: Skull,
    title: "Health Risks",
    description: "Exposure or ingestion may cause unpredictable effects including organ damage, cardiovascular complications, neurological harm, addiction, and fatal overdose."
  }
];

const Safety = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <SnowAnimation />
      <WarningBanner />
      <Header />
      
      <main className="relative z-10">
        <section className="py-16 md:py-24">
          <div className="container">
            <div className="max-w-3xl mx-auto">
              <div className="text-center mb-12">
                <div className="w-20 h-20 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
                  <AlertTriangle className="h-10 w-10 text-destructive" />
                </div>
                
                <h1 className="font-steelfish text-5xl md:text-7xl text-foreground mb-4 tracking-tight uppercase">
                  Safety & <span className="text-destructive">Warnings</span>
                </h1>
                
                <p className="text-muted-foreground max-w-xl mx-auto">
                  All products sold are intended for legitimate scientific research purposes only. 
                  Please read and understand the following warnings before purchasing.
                </p>
              </div>

              <div className="space-y-4">
                {warnings.map((warning, index) => (
                  <div key={index} className="bg-card border border-destructive/20 rounded-xl p-6 flex gap-5">
                    <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0">
                      <warning.icon className="h-6 w-6 text-destructive" />
                    </div>
                    <div>
                      <h3 className="font-steelfish text-xl text-foreground uppercase tracking-wide mb-2">
                        {warning.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {warning.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 bg-card border border-warning/30 rounded-xl p-6 text-center">
                <p className="text-sm text-muted-foreground">
                  By purchasing from this website, you confirm you are at least 18 years old and agree to use 
                  all products solely for lawful research purposes. The buyer assumes full responsibility 
                  for compliance with all applicable laws.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Safety;
