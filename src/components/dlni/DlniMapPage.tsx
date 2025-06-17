import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ServiceType, UserLocation, Location } from "@/types/dlni";
import { locationsData, duasData } from "@/lib/dlni-data";
import { ArrowRight, MapPin, Navigation, Map } from "lucide-react";
import { DlniRealMap } from "./DlniRealMap";
import { DlniNavigation } from "./DlniNavigation";

interface DlniMapPageProps {
  service: ServiceType;
  userLocation: UserLocation | null;
  updateLocationDistances: (locations: Location[]) => Location[];
  onShowNotification: (message: string, type: string) => void;
  onBackToHome: () => void;
}

export function DlniMapPage({
  service,
  userLocation,
  updateLocationDistances,
  onShowNotification,
  onBackToHome,
}: DlniMapPageProps) {
  const [locations, setLocations] = useState<Location[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null,
  );
  const [isNavigating, setIsNavigating] = useState(false);
  const [routePath, setRoutePath] = useState<[number, number][]>([]);

  useEffect(() => {
    const serviceLocations = locationsData[service] || [];
    const updatedLocations = updateLocationDistances(serviceLocations);
    setLocations(updatedLocations);

    // Show dua if available
    if (duasData[service]) {
      setTimeout(() => {
        onShowNotification(duasData[service], "dua");
      }, 1000);
    }
  }, [service, updateLocationDistances, onShowNotification]);

  const handleNavigate = (location: Location) => {
    if (!userLocation) {
      onShowNotification(
        "يرجى تفعيل خدمات الموقع للحصول على التوجيه",
        "warning",
      );
      return;
    }

    setSelectedLocation(location);
    setIsNavigating(true);

    // Create a simple route path (straight line for demo)
    const path: [number, number][] = [
      [userLocation.lat, userLocation.lng],
      [location.lat, location.lng],
    ];
    setRoutePath(path);

    onShowNotification(`بدأت الملاحة إلى ${location.name}`, "navigation");
  };

  const handleLocationSelect = (location: Location) => {
    setSelectedLocation(location);
  };

  const handleNavigationComplete = () => {
    setIsNavigating(false);
    setRoutePath([]);
    if (selectedLocation) {
      onShowNotification(`وصلت إلى ${selectedLocation.name}`, "success");
    }
  };

  const handleStopNavigation = () => {
    setIsNavigating(false);
    setRoutePath([]);
    onShowNotification("تم إيقاف الملاحة", "info");
  };

  return (
    <div className="py-8 animate-in fade-in duration-700">
      <Card className="mb-8 bg-white border-[#4C3D8F]/20">
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <CardTitle className="text-2xl text-[#4C3D8F] font-serif">
                {service} - المواقع القريبة
              </CardTitle>
              <p className="text-[#4C3D8F]/70 mt-2">
                تعرّف على أقرب المواقع للخدمة المختارة مع المسافة الدقيقة
              </p>
            </div>
            <Button
              onClick={onBackToHome}
              variant="outline"
              className="text-[#4C3D8F] border-[#4C3D8F]/30 hover:bg-[#4C3D8F]/10"
            >
              <ArrowRight className="w-4 h-4 ml-2" />
              العودة للرئيسية
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-4">
            <h3 className="text-lg font-semibold text-[#4C3D8F]">
              الخريطة التفاعلية
            </h3>
            <p className="text-sm text-[#4C3D8F]/70">
              اضغط على أي موقع لعرض التفاصيل والتوجيه
            </p>
          </div>

          {/* Interactive Map */}
          <DlniRealMap
            locations={locations}
            userLocation={userLocation}
            selectedLocation={selectedLocation}
            routePath={routePath}
            onLocationSelect={handleLocationSelect}
          />

          {/* Navigation */}
          {isNavigating && selectedLocation && (
            <DlniNavigation
              destination={selectedLocation}
              onComplete={handleNavigationComplete}
              onStop={handleStopNavigation}
            />
          )}
        </CardContent>
      </Card>

      {/* Locations List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {locations.length > 0 ? (
          locations.map((location, index) => (
            <Card
              key={location.id}
              className={`cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white border border-[#4C3D8F]/20 ${
                selectedLocation?.id === location.id
                  ? "ring-2 ring-[#4C3D8F]"
                  : ""
              }`}
              onClick={() => handleLocationSelect(location)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-[#4C3D8F]" />
                    <h4 className="font-semibold text-[#4C3D8F]">
                      {location.name}
                    </h4>
                  </div>
                  {index === 0 && (
                    <Badge className="bg-[#4C3D8F] text-white hover:bg-[#4C3D8F]">
                      الأقرب
                    </Badge>
                  )}
                </div>

                <p className="text-sm text-[#4C3D8F]/70 mb-4">
                  {location.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-[#4C3D8F]">
                    المسافة: {location.distance}م
                  </span>
                  <Button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleNavigate(location);
                    }}
                    size="sm"
                    disabled={!userLocation}
                    className="bg-[#4C3D8F] hover:bg-[#4C3D8F]/90 text-white"
                  >
                    <Navigation className="w-4 h-4 ml-2" />
                    توجه
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <Map className="w-16 h-16 text-[#4C3D8F]/30 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[#4C3D8F] mb-2">
              لا توجد مواقع متاحة
            </h3>
            <p className="text-[#4C3D8F]/70">
              لم يتم العثور على مواقع لهذه الخدمة حالياً
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
