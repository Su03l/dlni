import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Location, UserLocation } from "@/types/dlni";
import { MapPin, Navigation, Locate } from "lucide-react";

interface DlniSimpleMapProps {
  userLocation: UserLocation | null;
  locations: Location[];
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
  onNavigate: (location: Location) => void;
}

export function DlniSimpleMap({
  userLocation,
  locations,
  selectedLocation,
  onLocationSelect,
  onNavigate,
}: DlniSimpleMapProps) {
  const [mapStyle, setMapStyle] = useState<"satellite" | "street">("street");

  // Create a simple visual representation without external map library
  const renderSimpleMap = () => {
    // Calculate bounds for visualization
    const allPoints = [...(userLocation ? [userLocation] : []), ...locations];

    if (allPoints.length === 0) return null;

    const minLat = Math.min(...allPoints.map((p) => p.lat));
    const maxLat = Math.max(...allPoints.map((p) => p.lat));
    const minLng = Math.min(...allPoints.map((p) => p.lng));
    const maxLng = Math.max(...allPoints.map((p) => p.lng));

    const latRange = maxLat - minLat || 0.001;
    const lngRange = maxLng - minLng || 0.001;

    return (
      <div className="relative w-full h-96 bg-slate-100 rounded-lg border-2 border-blue-300 overflow-hidden shadow-lg">
        {/* Background pattern */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(0deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "15px 15px",
          }}
        />

        {/* Mosque illustration */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 text-blue-200 opacity-50">
          <svg width="60" height="60" viewBox="0 0 100 100" fill="currentColor">
            <circle cx="50" cy="30" r="8" />
            <rect x="20" y="40" width="60" height="35" rx="5" />
            <rect x="15" y="75" width="70" height="5" />
            <circle cx="25" cy="35" r="3" />
            <circle cx="75" cy="35" r="3" />
            <rect x="23" y="35" width="4" height="15" />
            <rect x="73" y="35" width="4" height="15" />
            <polygon points="30,40 70,40 60,25 40,25" />
          </svg>
        </div>

        {/* Control buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
          <Button
            size="sm"
            variant={mapStyle === "street" ? "default" : "outline"}
            onClick={() => setMapStyle("street")}
            className="text-xs"
          >
            شارع
          </Button>
          <Button
            size="sm"
            variant={mapStyle === "satellite" ? "default" : "outline"}
            onClick={() => setMapStyle("satellite")}
            className="text-xs"
          >
            قمر صناعي
          </Button>
        </div>

        {/* User location */}
        {userLocation && (
          <div
            className="absolute w-6 h-6 bg-blue-500 rounded-full border-3 border-white shadow-xl z-20 transform -translate-x-3 -translate-y-3"
            style={{
              left: `${((userLocation.lng - minLng) / lngRange) * 100}%`,
              top: `${100 - ((userLocation.lat - minLat) / latRange) * 100}%`,
            }}
            title="موقعك الحالي"
          >
            <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-75"></div>
            <div className="absolute inset-1 bg-white rounded-full"></div>
            <div className="absolute inset-2 bg-blue-600 rounded-full"></div>
          </div>
        )}

        {/* Service locations */}
        {locations.map((location, index) => (
          <div
            key={`${location.name}-${index}`}
            className={`absolute w-5 h-5 rounded-full border-2 border-white shadow-xl cursor-pointer transform -translate-x-2.5 -translate-y-2.5 z-10 ${
              selectedLocation === location
                ? "bg-blue-500 scale-150 animate-pulse"
                : "bg-purple-500 hover:scale-125"
            } transition-all duration-300`}
            style={{
              left: `${((location.lng - minLng) / lngRange) * 100}%`,
              top: `${100 - ((location.lat - minLat) / latRange) * 100}%`,
            }}
            onClick={() => onLocationSelect(location)}
            title={`${location.name} - ${location.distance}م`}
          >
            <div className="absolute inset-0.5 bg-white rounded-full opacity-70"></div>
          </div>
        ))}

        {/* Selected location info */}
        {selectedLocation && (
          <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-green-600" />
                <div>
                  <h4 className="font-semibold text-sm">
                    {selectedLocation.name}
                  </h4>
                  <p className="text-xs text-gray-600">
                    {selectedLocation.distance} متر -{" "}
                    {selectedLocation.direction}
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => onNavigate(selectedLocation)}
                className="bg-green-600 hover:bg-green-700"
              >
                <Navigation className="w-3 h-3 mr-1" />
                توجه
              </Button>
            </div>
          </div>
        )}

        {/* Legend */}
        <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 text-xs">
          <div className="space-y-1">
            {userLocation && (
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>موقعك</span>
              </div>
            )}
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <span>الخدمات</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>مختار</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {renderSimpleMap()}

      {/* Quick location buttons */}
      <div className="flex gap-2 flex-wrap">
        {locations.slice(0, 3).map((location, index) => (
          <Button
            key={index}
            variant="outline"
            size="sm"
            onClick={() => onLocationSelect(location)}
            className={
              selectedLocation === location
                ? "border-green-500 text-green-700"
                : ""
            }
          >
            <MapPin className="w-3 h-3 mr-1" />
            {location.name} ({location.distance}م)
          </Button>
        ))}
      </div>
    </div>
  );
}
