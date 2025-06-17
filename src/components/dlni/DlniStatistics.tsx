import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Users,
  TrendingUp,
  Clock,
  MapPin,
  Activity,
  BarChart3,
  PieChart,
  Calendar,
} from "lucide-react";

interface StatItem {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  icon: React.ReactNode;
  color: string;
}

interface CrowdLevel {
  location: string;
  level: number;
  status: "منخفض" | "متوسط" | "مرتفع" | "مزدحم جداً";
  color: string;
}

const statistics: StatItem[] = [
  {
    label: "الزوار اليوم",
    value: "1.2M",
    change: "+5.2%",
    trend: "up",
    icon: <Users className="w-5 h-5" />,
    color: "text-[#4C3D8F]",
  },
  {
    label: "متوسط وقت الزيارة",
    value: "45 دقيقة",
    change: "+2 دقيقة",
    trend: "up",
    icon: <Clock className="w-5 h-5" />,
    color: "text-[#4C3D8F]",
  },
  {
    label: "الخدمات المستخدمة",
    value: "18,500",
    change: "+12%",
    trend: "up",
    icon: <Activity className="w-5 h-5" />,
    color: "text-[#4C3D8F]",
  },
  {
    label: "معدل الرضا",
    value: "98.5%",
    change: "+0.3%",
    trend: "up",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "text-[#4C3D8F]",
  },
];

const crowdLevels: CrowdLevel[] = [
  {
    location: "الروضة الشريفة",
    level: 85,
    status: "مزدحم جداً",
    color: "bg-[#4C3D8F]",
  },
  {
    location: "المسجد الرئيسي",
    level: 70,
    status: "مرتفع",
    color: "bg-[#4C3D8F]/80",
  },
  {
    location: "أماكن الوضوء",
    level: 45,
    status: "متوسط",
    color: "bg-[#4C3D8F]/60",
  },
  {
    location: "دورات المياه",
    level: 30,
    status: "منخفض",
    color: "bg-[#4C3D8F]/40",
  },
  {
    location: "مكاتب الإرشاد",
    level: 25,
    status: "منخفض",
    color: "bg-[#4C3D8F]/30",
  },
];

export function DlniStatistics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Statistics Overview */}
      <Card className="shadow-lg border-[#4C3D8F]/20 bg-white">
        <CardHeader className="bg-[#4C3D8F] text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3">
            <BarChart3 className="w-6 h-6" />
            إحصائيات المسجد النبوي
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4">
            {statistics.map((stat, index) => (
              <div
                key={index}
                className="p-4 bg-[#4C3D8F]/5 rounded-lg border border-[#4C3D8F]/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className={`${stat.color}`}>{stat.icon}</div>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      stat.trend === "up"
                        ? "text-[#4C3D8F] border-[#4C3D8F]"
                        : "text-[#4C3D8F]/60"
                    }`}
                  >
                    {stat.change}
                  </Badge>
                </div>
                <div className="text-2xl font-bold text-[#4C3D8F] mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-[#4C3D8F]/70">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-[#4C3D8F]/10 rounded-lg border border-[#4C3D8F]/20">
            <div className="flex items-center gap-2 text-[#4C3D8F] mb-2">
              <Calendar className="w-4 h-4" />
              <span className="font-medium">تحديث في الوقت الفعلي</span>
            </div>
            <div className="text-sm text-[#4C3D8F]/70">
              آخر تحديث:{" "}
              {new Date().toLocaleString("ar-SA", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Crowd Levels */}
      <Card className="shadow-lg border-[#4C3D8F]/20 bg-white">
        <CardHeader className="bg-[#4C3D8F] text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3">
            <PieChart className="w-6 h-6" />
            مستويات الازدحام الحالية
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {crowdLevels.map((crowd, index) => (
              <div key={index} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#4C3D8F]" />
                    <span className="font-medium text-[#4C3D8F]">
                      {crowd.location}
                    </span>
                  </div>
                  <Badge className={`text-white ${crowd.color} border-none`}>
                    {crowd.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-3">
                  <Progress
                    value={crowd.level}
                    className="flex-1 h-2"
                    style={{
                      background: "#4C3D8F20",
                    }}
                  />
                  <span className="text-sm font-medium text-[#4C3D8F] w-10">
                    {crowd.level}%
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-[#4C3D8F]/10 rounded-lg border border-[#4C3D8F]/20">
            <div className="text-center text-[#4C3D8F] text-sm">
              💡 نوصي بزيارة المناطق ذات الازدحام المنخفض أولاً
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
