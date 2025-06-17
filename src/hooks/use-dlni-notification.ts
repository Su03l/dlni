import { useState, useCallback } from "react";
import { NotificationConfig } from "@/types/dlni";

export function useDlniNotification() {
  const [notification, setNotification] = useState<NotificationConfig | null>(
    null,
  );
  const [isVisible, setIsVisible] = useState(false);

  const showNotification = useCallback(
    (message: string, type: NotificationConfig["type"] = "info") => {
      setNotification({ message, type });
      setIsVisible(true);

      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setNotification(null), 300);
      }, 5000);
    },
    [],
  );

  const hideNotification = useCallback(() => {
    setIsVisible(false);
    setTimeout(() => setNotification(null), 300);
  }, []);

  return {
    notification,
    isVisible,
    showNotification,
    hideNotification,
  };
}
