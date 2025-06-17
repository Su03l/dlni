import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Phone,
  ShieldAlert,
  Ambulance,
  AlertTriangle,
  MapPin,
  Clock,
} from "lucide-react";

interface EmergencyContact {
  name: string;
  number: string;
  description: string;
  type: "emergency" | "info" | "security";
}

const emergencyContacts: EmergencyContact[] = [
  {
    name: "الطوارئ العامة",
    number: "911",
    description: "للحالات الطارئة العامة",
    type: "emergency",
  },
  {
    name: "الإسعاف",
    number: "997",
    description: "للحالات الطبية الطارئة",
    type: "emergency",
  },
  {
    name: "أمن المسجد النبوي",
    number: "014-8454444",
    description: "أمن وحراسة المسجد النبوي",
    type: "security",
  },
  {
    name: "الاستعلامات",
    number: "014-8455555",
    description: "معلومات عامة عن المسجد النبوي",
    type: "info",
  },
  {
    name: "مكتب المفقودات",
    number: "014-8456666",
    description: "للإبلاغ عن الأشياء المفقودة",
    type: "info",
  },
];

const typeStyles = {
  emergency: {
    bgColor: "bg-[#4C3D8F]/10",
    borderColor: "border-[#4C3D8F]/30",
    iconColor: "text-[#4C3D8F]",
    buttonColor: "bg-[#4C3D8F] hover:bg-[#4C3D8F]/90",
  },
  security: {
    bgColor: "bg-[#4C3D8F]/10",
    borderColor: "border-[#4C3D8F]/30",
    iconColor: "text-[#4C3D8F]",
    buttonColor: "bg-[#4C3D8F] hover:bg-[#4C3D8F]/90",
  },
  info: {
    bgColor: "bg-[#4C3D8F]/10",
    borderColor: "border-[#4C3D8F]/30",
    iconColor: "text-[#4C3D8F]",
    buttonColor: "bg-[#4C3D8F] hover:bg-[#4C3D8F]/90",
  },
};

const typeIcons = {
  emergency: <Ambulance className="w-5 h-5" />,
  security: <ShieldAlert className="w-5 h-5" />,
  info: <Phone className="w-5 h-5" />,
};

export function DlniEmergencyCard() {
  const handleCall = (number: string, name: string) => {
    if (confirm(`هل تريد الاتصال بـ ${name}؟\nالرقم: ${number}`)) {
      window.location.href = `tel:${number}`;
    }
  };

  return (
    <Card className="mb-8 border-[#4C3D8F]/20 shadow-lg bg-white">
      <CardHeader className="bg-[#4C3D8F] text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-3">
          <AlertTriangle className="w-6 h-6" />
          أرقام الطوارئ والاتصال السريع
        </CardTitle>
        <p className="text-white/90 text-sm">
          في حالة الطوارئ أو الحاجة لمساعدة سريعة
        </p>
      </CardHeader>

      <CardContent className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {emergencyContacts.map((contact, index) => {
            const styles = typeStyles[contact.type];
            return (
              <div
                key={index}
                className={`p-4 rounded-lg border-2 ${styles.bgColor} ${styles.borderColor} transition-all duration-300 hover:shadow-md`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className={`${styles.iconColor}`}>
                    {typeIcons[contact.type]}
                  </div>
                  <Badge
                    variant="outline"
                    className="text-xs text-[#4C3D8F] border-[#4C3D8F]"
                  >
                    {contact.type === "emergency"
                      ? "طوارئ"
                      : contact.type === "security"
                        ? "أمن"
                        : "معلومات"}
                  </Badge>
                </div>

                <h3 className="font-bold text-[#4C3D8F] mb-2 text-lg">
                  {contact.name}
                </h3>

                <p className="text-sm text-[#4C3D8F]/70 mb-4 leading-relaxed">
                  {contact.description}
                </p>

                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#4C3D8F]" />
                    <span className="font-mono text-[#4C3D8F] font-medium">
                      {contact.number}
                    </span>
                  </div>

                  <Button
                    onClick={() => handleCall(contact.number, contact.name)}
                    className={`w-full ${styles.buttonColor} text-white font-medium transition-all duration-300 hover:scale-105`}
                    size="sm"
                  >
                    <Phone className="w-4 h-4 ml-2" />
                    اتصال الآن
                  </Button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-[#4C3D8F]/10 rounded-lg border border-[#4C3D8F]/20">
          <div className="flex items-center gap-2 text-[#4C3D8F] mb-2">
            <Clock className="w-4 h-4" />
            <span className="font-medium">خدمة متاحة 24/7</span>
          </div>
          <p className="text-sm text-[#4C3D8F]/70">
            جميع أرقام الطوارئ متاحة على مدار الساعة لخدمتكم
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
