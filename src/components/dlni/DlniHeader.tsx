import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { PageType } from "@/types/dlni";
import { Home, MessageCircle, HeadphonesIcon, Building2 } from "lucide-react";

interface DlniHeaderProps {
  currentPage: PageType;
  onShowPage: (page: PageType) => void;
}

export function DlniHeader({ currentPage, onShowPage }: DlniHeaderProps) {
  return (
    <header className="bg-[#4C3D8F] text-white shadow-xl">
      <div className="container max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-bold font-serif">دلّني</h1>
              <p className="text-white/90 text-sm">دليل المسجد النبوي الشريف</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex gap-2 flex-wrap">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShowPage("home")}
              className={cn(
                "text-white hover:bg-white/20 transition-all duration-300",
                currentPage === "home" && "bg-white/20",
              )}
            >
              <Home className="w-4 h-4 ml-2" />
              الرئيسية
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShowPage("chat")}
              className={cn(
                "text-white hover:bg-white/20 transition-all duration-300",
                currentPage === "chat" && "bg-white/20",
              )}
            >
              <MessageCircle className="w-4 h-4 ml-2" />
              المساعد
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onShowPage("support")}
              className={cn(
                "text-white hover:bg-white/20 transition-all duration-300",
                currentPage === "support" && "bg-white/20",
              )}
            >
              <HeadphonesIcon className="w-4 h-4 ml-2" />
              الدعم
            </Button>
          </nav>
        </div>
      </div>
    </header>
  );
}
