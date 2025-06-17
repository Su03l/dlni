import { cn } from "@/lib/utils";
import { NotificationConfig } from "@/types/dlni";
import {
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
  Navigation,
  Heart,
  Star,
} from "lucide-react";

interface DlniNotificationProps {
  message: string;
  type: NotificationConfig["type"];
  isVisible: boolean;
}

export function DlniNotification({
  message,
  type,
  isVisible,
}: DlniNotificationProps) {
  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5" />;
      case "error":
        return <AlertCircle className="w-5 h-5" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5" />;
      case "navigation":
        return <Navigation className="w-5 h-5" />;
      case "dua":
        return <Heart className="w-5 h-5" />;
      case "welcome":
        return <Star className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getStyles = () => {
    switch (type) {
      case "success":
        return "bg-green-600 text-white";
      case "error":
        return "bg-red-600 text-white";
      case "warning":
        return "bg-amber-600 text-white";
      case "navigation":
        return "bg-blue-600 text-white";
      case "dua":
        return "bg-amber-700 text-white";
      case "welcome":
        return "bg-[#4C3D8F] text-white";
      default:
        return "bg-green-700 text-white";
    }
  };

  return (
    <div
      className={cn(
        "fixed top-4 left-4 right-4 md:right-4 md:left-auto md:w-80 z-50",
        "rounded-lg shadow-xl p-4 flex items-start gap-3",
        "transform transition-all duration-300 ease-in-out",
        getStyles(),
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
      )}
    >
      <div className="flex-shrink-0 mt-0.5">{getIcon()}</div>
      <div className="flex-1 text-sm leading-relaxed whitespace-pre-line">
        {message}
      </div>
    </div>
  );
}
