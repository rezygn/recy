import { AlertTriangle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const WarningBanner = () => {
  const { t } = useLanguage();
  
  return (
    <div className="w-full bg-primary py-2.5 px-4">
      <div className="container flex items-center justify-center gap-2 text-sm text-primary-foreground">
        <AlertTriangle className="h-4 w-4 flex-shrink-0" />
        <span className="font-medium">
          {t('warning.text')}
        </span>
      </div>
    </div>
  );
};

export default WarningBanner;