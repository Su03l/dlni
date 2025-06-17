import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Location, UserLocation } from "@/types/dlni";
import {
  Navigation,
  MapPin,
  Clock,
  Footprints,
  RotateCcw,
  StopCircle,
  CheckCircle,
} from "lucide-react";

interface DlniNavigationProps {
  userLocation: UserLocation | null;
  destination: Location;
  onNavigationComplete: () => void;
  onStopNavigation: () => void;
}

interface NavigationStep {
  instruction: string;
  distance: number;
  direction: string;
  icon: React.ReactNode;
}

export function DlniNavigation({
  userLocation,
  destination,
  onNavigationComplete,
  onStopNavigation,
}: DlniNavigationProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [remainingDistance, setRemainingDistance] = useState(
    destination.distance,
  );
  const [estimatedTime, setEstimatedTime] = useState(
    Math.ceil(destination.distance / 60), // 60 meters per minute walking speed
  );
  const [isNavigating, setIsNavigating] = useState(true);

  const navigationSteps: NavigationStep[] = [
    {
      instruction: `توجه ${destination.direction} نحو ${destination.name}`,
      distance: Math.floor(destination.distance * 0.8),
      direction: destination.direction,
      icon: <Footprints className="w-5 h-5" />,
    },
    {
      instruction: "استمر في المسير للأمام",
      distance: Math.floor(destination.distance * 0.15),
      direction: "للأمام",
      icon: <Navigation className="w-5 h-5" />,
    },
    {
      instruction: `وصلت إلى ${destination.name}`,
      distance: 0,
      direction: "وصول",
      icon: <CheckCircle className="w-5 h-5" />,
    },
  ];

  useEffect(() => {
    if (!isNavigating) return;

    const interval = setInterval(() => {
      setRemainingDistance((prev) => {
        const newDistance = Math.max(0, prev - Math.random() * 8 - 3);

        if (newDistance <= 5) {
          setCurrentStep(navigationSteps.length - 1);
          setTimeout(() => {
            onNavigationComplete();
            setIsNavigating(false);
          }, 2000);
        } else if (newDistance <= destination.distance * 0.2) {
          setCurrentStep(1);
        }

        return newDistance;
      });

      setEstimatedTime((prev) => Math.max(0, prev - 0.1));
    }, 2000);

    return () => clearInterval(interval);
  }, [
    isNavigating,
    destination.distance,
    navigationSteps.length,
    onNavigationComplete,
  ]);

  const progress =
    ((destination.distance - remainingDistance) / destination.distance) * 100;

  return (
    <Card className="mb-6 border-green-200 shadow-lg">
      <CardHeader className="bg-[#4C3D8F] text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-3">
          <Navigation className="w-6 h-6" />
          الملاحة إلى {destination.name}
        </CardTitle>
      </CardHeader>

      <CardContent className="p-6">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-sm mb-2">
            <span>تقدم الرحلة</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Current step */}
        <div className="bg-green-50 rounded-lg p-4 mb-4 border-r-4 border-green-500">
          <div className="flex items-center gap-3 mb-2">
            {navigationSteps[currentStep]?.icon}
            <h4 className="font-semibold text-green-800">
              {navigationSteps[currentStep]?.instruction}
            </h4>
          </div>

          {remainingDistance > 5 && (
            <div className="text-sm text-gray-600">
              المسافة المتبقية: {Math.round(remainingDistance)} متر
            </div>
          )}
        </div>

        {/* Navigation info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <Clock className="w-5 h-5 mx-auto mb-2 text-blue-600" />
            <div className="text-sm font-medium">الوقت المتبقي</div>
            <div className="text-lg font-bold text-blue-800">
              {Math.ceil(estimatedTime)} دقيقة
            </div>
          </div>

          <div className="text-center p-3 bg-amber-50 rounded-lg">
            <MapPin className="w-5 h-5 mx-auto mb-2 text-amber-600" />
            <div className="text-sm font-medium">المسافة الإجمالية</div>
            <div className="text-lg font-bold text-amber-800">
              {destination.distance} متر
            </div>
          </div>

          <div className="text-center p-3 bg-green-50 rounded-lg">
            <RotateCcw className="w-5 h-5 mx-auto mb-2 text-green-600" />
            <div className="text-sm font-medium">الاتجاه</div>
            <div className="text-lg font-bold text-green-800">
              {destination.direction}
            </div>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button
            onClick={onStopNavigation}
            variant="outline"
            className="flex-1"
          >
            <StopCircle className="w-4 h-4 mr-2" />
            إيقاف الملاحة
          </Button>

          <Button
            onClick={() =>
              window.open(
                `https://www.google.com/maps/dir/${userLocation?.lat},${userLocation?.lng}/${destination.lat},${destination.lng}`,
                "_blank",
              )
            }
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            <MapPin className="w-4 h-4 mr-2" />
            فتح في خرائط جوجل
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
