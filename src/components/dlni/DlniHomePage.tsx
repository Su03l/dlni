import { Card, CardContent } from "@/components/ui/card";
import { ServiceType } from "@/types/dlni";
import { DlniWeatherPrayer } from "./DlniWeatherPrayer";
import { DlniEmergencyCard } from "./DlniEmergencyCard";
import { DlniStatistics } from "./DlniStatistics";
import {
  Bath,
  Hand,
  RotateCcw,
  Footprints,
  Info,
  Scissors,
  Archive,
  DoorOpen,
  Droplets,
  Star,
  Accessibility,
  Utensils,
  Pill,
  Car,
  Armchair,
  Ambulance,
  Search,
  Gift,
  Languages,
  HelpCircle,
} from "lucide-react";

interface DlniHomePageProps {
  onShowMap: (service: ServiceType) => void;
}

// All services combined in one array
const allServices: Array<{
  name: ServiceType;
  icon: React.ReactNode;
  description: string;
}> = [
  {
    name: "دورات المياه",
    icon: <Bath className="w-8 h-8" />,
    description: "العثور على أقرب دورات المياه مع المسافة الدقيقة",
  },
  {
    name: "أماكن الوضوء",
    icon: <Hand className="w-8 h-8" />,
    description: "مواقع أماكن الوضوء المتاحة",
  },
  {
    name: "مياه زمزم",
    icon: <Droplets className="w-8 h-8" />,
    description: "نقاط توزيع وتعبئة مياه زمزم",
  },
  {
    name: "الروضة الشريفة",
    icon: <Star className="w-8 h-8" />,
    description: "الوصول إلى الروضة الشريفة",
  },
  {
    name: "الطواف",
    icon: <RotateCcw className="w-8 h-8" />,
    description: "مداخل ومناطق الطواف حول الكعبة",
  },
  {
    name: "السعي",
    icon: <Footprints className="w-8 h-8" />,
    description: "مسار السعي بين الصفا والمروة",
  },
  {
    name: "مكاتب الإرشاد",
    icon: <Info className="w-8 h-8" />,
    description: "مكاتب المعلومات والإرشاد",
  },
  {
    name: "الحلاقة",
    icon: <Scissors className="w-8 h-8" />,
    description: "أماكن الحلاقة للرجال والنساء",
  },
  {
    name: "مكاتب الأمانات",
    icon: <Archive className="w-8 h-8" />,
    description: "حفظ الأمانات والمتعلقات",
  },
  {
    name: "مخارج الطوارئ",
    icon: <DoorOpen className="w-8 h-8" />,
    description: "مواقع مخارج الطوارئ",
  },
  {
    name: "ذوي الاحتياجات الخاصة",
    icon: <Accessibility className="w-8 h-8" />,
    description: "المرافق المخصصة للمعاقين",
  },
  {
    name: "المطاعم والكافيتريات",
    icon: <Utensils className="w-8 h-8" />,
    description: "أماكن تناول الطعام والمشروبات",
  },
  {
    name: "الصيدليات",
    icon: <Pill className="w-8 h-8" />,
    description: "الصيدليات والخدمات الطبية",
  },
  {
    name: "مواقف السيارات",
    icon: <Car className="w-8 h-8" />,
    description: "مواقف السيارات والحافلات",
  },
  {
    name: "أماكن الراحة",
    icon: <Armchair className="w-8 h-8" />,
    description: "صالات الراحة والاستراحات",
  },
  {
    name: "مراكز الطوارئ الطبية",
    icon: <Ambulance className="w-8 h-8" />,
    description: "الخدمات الطبية الطارئة",
  },
  {
    name: "مكاتب المفقودات",
    icon: <Search className="w-8 h-8" />,
    description: "الإبلاغ عن الأشياء المفقودة",
  },
  {
    name: "أماكن الهدايا والتذكارات",
    icon: <Gift className="w-8 h-8" />,
    description: "متاجر الهدايا الإسلامية",
  },
  {
    name: "خدمات الترجمة",
    icon: <Languages className="w-8 h-8" />,
    description: "مترجمين لمساعدة الحجاج",
  },
  {
    name: "مراكز الاستعلامات",
    icon: <HelpCircle className="w-8 h-8" />,
    description: "الحصول على المعلومات",
  },
];

export function DlniHomePage({ onShowMap }: DlniHomePageProps) {
  return (
    <div className="py-8 animate-in fade-in duration-700">
      {/* Welcome Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#4C3D8F] mb-4 font-serif">
          دلّني إلى...
        </h2>
        <p className="text-lg text-[#4C3D8F]/70 max-w-2xl mx-auto leading-relaxed">
          اختر الخدمة التي تبحث عنها واحصل على التوجيه الدقيق مع المسافة الصحيحة
          داخل المسجد النبوي الشريف
        </p>
      </div>

      {/* All Services */}
      <div className="mb-12">
        <h3 className="text-2xl font-bold text-[#4C3D8F] mb-6 text-center font-serif">
          خدمات المسجد النبوي الشريف
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {allServices.map((service) => (
            <Card
              key={service.name}
              className="group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 border-[#4C3D8F]/20 hover:border-[#4C3D8F]/40 bg-white"
              onClick={() => onShowMap(service.name)}
            >
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-[#4C3D8F] rounded-full flex items-center justify-center mx-auto mb-4 text-white group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  {service.icon}
                </div>
                <h3 className="text-lg font-semibold text-[#4C3D8F] mb-3 font-serif">
                  {service.name}
                </h3>
                <p className="text-sm text-[#4C3D8F]/70 leading-relaxed">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Weather and Prayer Times */}
      <DlniWeatherPrayer />

      {/* Statistics */}
      <DlniStatistics />

      {/* Emergency Card */}
      <DlniEmergencyCard />
    </div>
  );
}
