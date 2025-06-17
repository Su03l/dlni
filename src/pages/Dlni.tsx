import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useDlniLocation } from "@/hooks/use-dlni-location";
import { useDlniNotification } from "@/hooks/use-dlni-notification";
import { PageType, ServiceType } from "@/types/dlni";
import { DlniHeader } from "@/components/dlni/DlniHeader";
import { DlniLocationPrompt } from "@/components/dlni/DlniLocationPrompt";
import { DlniNotification } from "@/components/dlni/DlniNotification";
import { DlniHomePage } from "@/components/dlni/DlniHomePage";
import { DlniMapPage } from "@/components/dlni/DlniMapPage";
import { DlniChatPage } from "@/components/dlni/DlniChatPage";
import { DlniSupportPage } from "@/components/dlni/DlniSupportPage";

export default function Dlni() {
  const [currentPage, setCurrentPage] = useState<PageType>("home");
  const [currentService, setCurrentService] = useState<ServiceType | null>(
    null,
  );
  const [showLocationPrompt, setShowLocationPrompt] = useState(true);

  const {
    userLocation,
    isLocationEnabled,
    locationError,
    requestLocationPermission,
    updateLocationDistances,
  } = useDlniLocation();

  const { notification, isVisible, showNotification } = useDlniNotification();

  useEffect(() => {
    if (isLocationEnabled) {
      setShowLocationPrompt(false);
      showNotification(
        "تم تحديد موقعك بنجاح! يمكنك الآن الحصول على إرشاد دقيق",
        "success",
      );
    }
  }, [isLocationEnabled, showNotification]);

  useEffect(() => {
    // Welcome message
    setTimeout(() => {
      showNotification(
        "مرحباً بك في دلّني! يرجى تفعيل خدمات الموقع للحصول على إرشاد دقيق",
        "welcome",
      );
    }, 1000);
  }, [showNotification]);

  const handleShowPage = (pageId: PageType) => {
    if (!isLocationEnabled && pageId !== "home") {
      showNotification(
        "يرجى تفعيل خدمات الموقع أولاً للحصول على إرشاد دقيق",
        "warning",
      );
      return;
    }
    setCurrentPage(pageId);
  };

  const handleShowMap = (serviceName: ServiceType) => {
    if (!isLocationEnabled) {
      showNotification(
        "يرجى تفعيل خدمات الموقع أولاً للحصول على المسافة الدقيقة",
        "warning",
      );
      return;
    }
    setCurrentService(serviceName);
    setCurrentPage("map");
  };

  const handleLocationPermission = () => {
    requestLocationPermission();
  };

  const handleDenyLocation = () => {
    setShowLocationPrompt(false);
    showNotification(
      "تم رفض الإذن. يمكنك تفعيل الموقع لاحقاً للحصول على إرشاد دقيق",
      "warning",
    );
  };

  return (
    <div className="min-h-screen bg-white dlni-fade-in" dir="rtl">
      {/* Location Permission Prompt */}
      {showLocationPrompt && (
        <DlniLocationPrompt
          onAllow={handleLocationPermission}
          onDeny={handleDenyLocation}
          error={locationError}
        />
      )}

      {/* Header */}
      <DlniHeader currentPage={currentPage} onShowPage={handleShowPage} />

      {/* Main Content */}
      <main className="pb-8">
        <div className="container max-w-6xl mx-auto px-4">
          {/* Home Page */}
          {currentPage === "home" && <DlniHomePage onShowMap={handleShowMap} />}

          {/* Map Page */}
          {currentPage === "map" && currentService && (
            <DlniMapPage
              service={currentService}
              userLocation={userLocation}
              updateLocationDistances={updateLocationDistances}
              onShowNotification={showNotification}
              onBackToHome={() => setCurrentPage("home")}
            />
          )}

          {/* Chat Page */}
          {currentPage === "chat" && (
            <DlniChatPage onShowNotification={showNotification} />
          )}

          {/* Support Page */}
          {currentPage === "support" && (
            <DlniSupportPage
              onShowNotification={showNotification}
              onShowChat={() => setCurrentPage("chat")}
            />
          )}
        </div>
      </main>

      {/* Notification */}
      {notification && (
        <DlniNotification
          message={notification.message}
          type={notification.type}
          isVisible={isVisible}
        />
      )}
    </div>
  );
}
