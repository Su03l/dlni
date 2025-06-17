import { useEffect, useRef } from "react";
import { Location, UserLocation } from "@/types/dlni";
import { MapPin, Navigation2 } from "lucide-react";

interface DlniRealMapProps {
  userLocation: UserLocation | null;
  locations: Location[];
  selectedLocation: Location | null;
  routePath?: [number, number][];
  onLocationSelect: (location: Location) => void;
}

export function DlniRealMap({
  userLocation,
  locations,
  selectedLocation,
  routePath = [],
  onLocationSelect,
}: DlniRealMapProps) {
  const mapRef = useRef<any>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Add Leaflet CSS
    const leafletCSS = document.createElement("link");
    leafletCSS.rel = "stylesheet";
    leafletCSS.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    leafletCSS.integrity =
      "sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=";
    leafletCSS.crossOrigin = "";
    document.head.appendChild(leafletCSS);

    // Dynamically import Leaflet to avoid SSR issues
    setTimeout(() => {
      import("leaflet").then((L) => {
        if (mapInstanceRef.current) {
          mapInstanceRef.current.remove();
        }

        if (!mapRef.current) return;

        // Initialize map centered on Masjid an-Nabawi
        const map = L.map(mapRef.current, {
          center: [24.4683, 39.6115],
          zoom: 17,
          zoomControl: true,
          scrollWheelZoom: true,
          dragging: true,
          tap: true,
          doubleClickZoom: true,
          boxZoom: true,
          keyboard: true,
          attributionControl: true,
        });

        // Add OpenStreetMap tiles
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 19,
        }).addTo(map);

        // Custom icons
        const userIcon = L.divIcon({
          className: "custom-user-marker",
          html: `<div style="
          width: 20px;
          height: 20px;
          background: #4C3D8F;
          border: 3px solid white;
          border-radius: 50%;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          animation: pulse 2s infinite;
        "></div>`,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });

        const locationIcon = L.divIcon({
          className: "custom-location-marker",
          html: `<div style="
          width: 16px;
          height: 16px;
          background: #4C3D8F;
          border: 2px solid white;
          border-radius: 50%;
          box-shadow: 0 1px 4px rgba(0,0,0,0.3);
        "></div>`,
          iconSize: [16, 16],
          iconAnchor: [8, 8],
        });

        const selectedIcon = L.divIcon({
          className: "custom-selected-marker",
          html: `<div style="
          width: 24px;
          height: 24px;
          background: #4C3D8F;
          border: 4px solid white;
          border-radius: 50%;
          box-shadow: 0 3px 12px rgba(76, 61, 143, 0.5);
          animation: bounce 1s infinite;
        "></div>`,
          iconSize: [24, 24],
          iconAnchor: [12, 12],
        });

        // Add user location marker
        if (userLocation) {
          L.marker([userLocation.lat, userLocation.lng], {
            icon: userIcon,
          }).addTo(map).bindPopup(`
            <div style="text-align: center; direction: rtl; font-family: 'Cairo', sans-serif;">
              <strong>موقعك الحالي</strong>
            </div>
          `);
        }

        // Add location markers
        locations.forEach((location) => {
          const isSelected = selectedLocation?.id === location.id;
          const marker = L.marker([location.lat, location.lng], {
            icon: isSelected ? selectedIcon : locationIcon,
          }).addTo(map);

          marker.bindPopup(`
          <div style="text-align: center; direction: rtl; font-family: 'Cairo', sans-serif; min-width: 200px;">
            <strong style="color: #4C3D8F; font-size: 16px;">${location.name}</strong>
            <br/>
            <small style="color: #666; margin-top: 5px; display: block;">
              ${location.description || "انقر للتوجه إلى هذا الموقع"}
            </small>
            ${location.distance ? `<br/><span style="color: #4C3D8F; font-weight: bold;">المسافة: ${location.distance}م</span>` : ""}
          </div>
        `);

          marker.on("click", () => {
            onLocationSelect(location);
          });
        });

        // Add route path if provided
        if (routePath.length > 1) {
          L.polyline(routePath, {
            color: "#4C3D8F",
            weight: 4,
            opacity: 0.8,
            dashArray: "10, 10",
          }).addTo(map);
        }

        // Fit map to show all markers
        if (locations.length > 0) {
          const group = new L.featureGroup([
            ...(userLocation
              ? [L.marker([userLocation.lat, userLocation.lng])]
              : []),
            ...locations.map((loc) => L.marker([loc.lat, loc.lng])),
          ]);
          map.fitBounds(group.getBounds().pad(0.1));
        }

        mapInstanceRef.current = map;

        // Force map to resize after initialization
        setTimeout(() => {
          if (map) {
            map.invalidateSize();
          }
        }, 100);
      });
    }, 100);

    // Add pulse animation CSS
    const style = document.createElement("style");
    style.textContent = `
      @keyframes pulse {
        0% { transform: scale(1); opacity: 1; }
        50% { transform: scale(1.2); opacity: 0.7; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes bounce {
        0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
        40% { transform: translateY(-10px); }
        60% { transform: translateY(-5px); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
      if (document.head.contains(style)) {
        document.head.removeChild(style);
      }
      if (document.head.contains(leafletCSS)) {
        document.head.removeChild(leafletCSS);
      }
    };
  }, [userLocation, locations, selectedLocation, routePath, onLocationSelect]);

  return (
    <div className="relative">
      {/* Map Container */}
      <div
        ref={mapRef}
        className="w-full h-96 rounded-lg border-2 border-[#4C3D8F]/20 shadow-lg relative overflow-hidden"
        style={{
          minHeight: "400px",
          height: "400px",
          width: "100%",
          position: "relative",
          zIndex: 0,
        }}
      />

      {/* Legend */}
      <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg border border-[#4C3D8F]/20">
        <h4 className="font-semibold text-sm mb-2 text-[#4C3D8F]">
          مفتاح الخريطة
        </h4>
        <div className="space-y-2 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#4C3D8F] rounded-full border-2 border-white shadow"></div>
            <span>موقعك</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-[#4C3D8F] rounded-full border border-white"></div>
            <span>المواقع المتاحة</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#4C3D8F] rounded-full border-2 border-white shadow-lg"></div>
            <span>الموقع المحدد</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-1 bg-[#4C3D8F] opacity-80"
              style={{ borderStyle: "dashed" }}
            ></div>
            <span>مسار الملاحة</span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg p-2 shadow-lg border border-[#4C3D8F]/20">
        <div className="text-xs text-[#4C3D8F] text-center">
          <MapPin className="w-4 h-4 mx-auto mb-1" />
          <div>المسجد النبوي الشريف</div>
        </div>
      </div>
    </div>
  );
}
