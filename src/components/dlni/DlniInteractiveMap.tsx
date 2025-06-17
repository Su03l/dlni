import { useEffect, useRef } from "react";
import L from "leaflet";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Location, UserLocation } from "@/types/dlni";
import { Navigation, MapPin, Route } from "lucide-react";
import "leaflet/dist/leaflet.css";

// Fix for default markers in react-leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom icons
const userIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const destinationIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const serviceIcon = new L.Icon({
  iconUrl:
    "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface DlniInteractiveMapProps {
  userLocation: UserLocation | null;
  locations: Location[];
  selectedLocation: Location | null;
  onLocationSelect: (location: Location) => void;
  onNavigate: (location: Location) => void;
  routePath?: [number, number][];
}

function MapController({
  userLocation,
  locations,
  selectedLocation,
}: {
  userLocation: UserLocation | null;
  locations: Location[];
  selectedLocation: Location | null;
}) {
  const map = useMap();

  useEffect(() => {
    if (userLocation && locations.length > 0) {
      const bounds = L.latLngBounds([
        [userLocation.lat, userLocation.lng],
        ...locations.map((loc) => [loc.lat, loc.lng]),
      ]);
      map.fitBounds(bounds, { padding: [20, 20] });
    } else if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 18);
    } else if (locations.length > 0) {
      const bounds = L.latLngBounds(locations.map((loc) => [loc.lat, loc.lng]));
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [map, userLocation, locations, selectedLocation]);

  return null;
}

export function DlniInteractiveMap({
  userLocation,
  locations,
  selectedLocation,
  onLocationSelect,
  onNavigate,
  routePath = [],
}: DlniInteractiveMapProps) {
  // Default center - Medina coordinates
  const center: [number, number] = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [24.4683, 39.6116];

  return (
    <div className="w-full h-96 relative rounded-lg overflow-hidden border-2 border-green-200">
      <MapContainer
        center={center}
        zoom={17}
        className="w-full h-full"
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController
          userLocation={userLocation}
          locations={locations}
          selectedLocation={selectedLocation}
        />

        {/* User location marker */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={userIcon}
          >
            <Popup>
              <div className="text-center p-2">
                <MapPin className="w-4 h-4 mx-auto mb-2 text-blue-600" />
                <strong>موقعك الحالي</strong>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Service location markers */}
        {locations.map((location, index) => (
          <Marker
            key={`${location.name}-${index}`}
            position={[location.lat, location.lng]}
            icon={selectedLocation === location ? destinationIcon : serviceIcon}
            eventHandlers={{
              click: () => onLocationSelect(location),
            }}
          >
            <Popup>
              <div className="p-3 min-w-48">
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-green-600" />
                  <strong className="text-green-800">{location.name}</strong>
                </div>

                {userLocation && (
                  <div className="space-y-2 mb-3">
                    <div className="text-sm">
                      <strong>المسافة:</strong> {location.distance} متر
                    </div>
                    <div className="text-sm">
                      <strong>الاتجاه:</strong> {location.direction}
                    </div>
                  </div>
                )}

                <Button
                  onClick={() => onNavigate(location)}
                  size="sm"
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Navigation className="w-4 h-4 mr-2" />
                  ابدأ الملاحة
                </Button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Route path */}
        {routePath.length > 0 && (
          <Polyline
            positions={routePath}
            color="#059669"
            weight={4}
            opacity={0.8}
          />
        )}
      </MapContainer>

      {/* Map legend */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border">
        <h4 className="font-semibold text-sm mb-2 text-green-800">
          مفتاح الخريطة
        </h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span>موقعك الحالي</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span>مواقع الخدمات</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span>الوجهة المحددة</span>
          </div>
          <div className="flex items-center gap-2">
            <Route className="w-3 h-3 text-green-600" />
            <span>مسار الملاحة</span>
          </div>
        </div>
      </div>
    </div>
  );
}
