import { useState, useEffect, useCallback } from "react";
import { UserLocation, Location } from "@/types/dlni";
import { locationsData } from "@/lib/dlni-data";

export function useDlniLocation() {
  const [userLocation, setUserLocation] = useState<UserLocation | null>(null);
  const [isLocationEnabled, setIsLocationEnabled] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  const calculateDistance = useCallback(
    (lat1: number, lon1: number, lat2: number, lon2: number): number => {
      const R = 6371; // Radius of Earth in kilometers
      const dLat = ((lat2 - lat1) * Math.PI) / 180;
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
          Math.cos((lat2 * Math.PI) / 180) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c * 1000; // Convert to meters
      return Math.round(distance);
    },
    [],
  );

  const calculateDirection = useCallback(
    (lat1: number, lon1: number, lat2: number, lon2: number): string => {
      const dLon = ((lon2 - lon1) * Math.PI) / 180;
      const lat1Rad = (lat1 * Math.PI) / 180;
      const lat2Rad = (lat2 * Math.PI) / 180;

      const y = Math.sin(dLon) * Math.cos(lat2Rad);
      const x =
        Math.cos(lat1Rad) * Math.sin(lat2Rad) -
        Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);

      let bearing = (Math.atan2(y, x) * 180) / Math.PI;
      bearing = (bearing + 360) % 360;

      const directions = [
        "شمالاً",
        "شمال شرق",
        "شرقاً",
        "جنوب شرق",
        "جنوباً",
        "جنوب غرب",
        "غرباً",
        "شمال غرب",
      ];
      const index = Math.round(bearing / 45) % 8;
      return directions[index];
    },
    [],
  );

  const updateLocationDistances = useCallback(
    (locations: Location[]): Location[] => {
      if (!userLocation) return locations;

      return locations
        .map((location) => ({
          ...location,
          distance: calculateDistance(
            userLocation.lat,
            userLocation.lng,
            location.lat,
            location.lng,
          ),
          direction: calculateDirection(
            userLocation.lat,
            userLocation.lng,
            location.lat,
            location.lng,
          ),
        }))
        .sort((a, b) => a.distance - b.distance);
    },
    [userLocation, calculateDistance, calculateDirection],
  );

  const requestLocationPermission = useCallback(() => {
    if (!navigator.geolocation) {
      setLocationError("خدمات الموقع غير متوفر�� في متصفحك");
      return;
    }

    setLocationError(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setIsLocationEnabled(true);
      },
      (error) => {
        let errorMessage = "";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorMessage =
              "تم رفض الإذن للوصول للموقع. يرجى تفعيل خدمات الموقع للحصول على إرشاد دقيق.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "معلومات الموقع غير متوفرة حالياً.";
            break;
          case error.TIMEOUT:
            errorMessage = "انتهت مهلة تحديد الموقع.";
            break;
          default:
            errorMessage = "حدث خطأ في تحديد الموقع.";
            break;
        }
        setLocationError(errorMessage);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      },
    );
  }, []);

  return {
    userLocation,
    isLocationEnabled,
    locationError,
    requestLocationPermission,
    updateLocationDistances,
    calculateDistance,
    calculateDirection,
  };
}
