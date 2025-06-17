export interface Location {
  id?: string;
  name: string;
  description?: string;
  distance: number;
  direction: string;
  lat: number;
  lng: number;
  floor?: string;
  capacity?: string;
  features?: string[];
  openingHours?: string;
  crowdLevel?: string;
}

export interface UserLocation {
  lat: number;
  lng: number;
}

export interface NotificationConfig {
  message: string;
  type:
    | "info"
    | "success"
    | "error"
    | "warning"
    | "dua"
    | "navigation"
    | "welcome";
}

export interface LostItemForm {
  itemName: string;
  itemDescription: string;
  contactInfo: string;
  locationLost: string;
}

export type ServiceType =
  | "دورات المياه"
  | "أماكن الوضوء"
  | "الطواف"
  | "السعي"
  | "مكاتب الإرشاد"
  | "الحلاقة"
  | "مكاتب الأمانات"
  | "مخارج الطوارئ"
  | "مياه زمزم"
  | "الروضة الشريفة"
  | "ذوي الاحتياجات الخاصة"
  | "المطاعم والكافيتريات"
  | "الصيدليات"
  | "مواقف السيارات"
  | "أماكن الراحة"
  | "مراكز الطوارئ الطبية"
  | "مكاتب المفقودات"
  | "أماكن الهدايا والتذكارات"
  | "خدمات الترجمة"
  | "مراكز الاستعلامات";

export type PageType = "home" | "map" | "chat" | "support";

export interface ChatMessage {
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}
