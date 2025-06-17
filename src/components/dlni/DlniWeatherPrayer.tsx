import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Sun,
  Cloud,
  CloudRain,
  Thermometer,
  Wind,
  Droplets,
  Clock,
  Building2,
} from "lucide-react";

interface WeatherData {
  temperature: number;
  condition: "sunny" | "cloudy" | "rainy";
  humidity: number;
  windSpeed: number;
  description: string;
}

interface PrayerTime {
  name: string;
  time: string;
  isNext: boolean;
}

const weatherIcons = {
  sunny: <Sun className="w-6 h-6 text-yellow-500" />,
  cloudy: <Cloud className="w-6 h-6 text-gray-500" />,
  rainy: <CloudRain className="w-6 h-6 text-blue-500" />,
};

export function DlniWeatherPrayer() {
  const [is24Hour, setIs24Hour] = useState(true);
  const [weather, setWeather] = useState<WeatherData>({
    temperature: 28,
    condition: "sunny",
    humidity: 45,
    windSpeed: 12,
    description: "صافي ومشمس",
  });

  const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([
    { name: "الفجر", time: "05:15", isNext: false },
    { name: "الشروق", time: "06:42", isNext: false },
    { name: "الظهر", time: "12:30", isNext: true },
    { name: "العصر", time: "15:45", isNext: false },
    { name: "المغرب", time: "18:20", isNext: false },
    { name: "العشاء", time: "19:50", isNext: false },
  ]);

  const [currentTime, setCurrentTime] = useState(new Date());

  const formatTime = (timeString: string) => {
    if (is24Hour) return timeString;

    const [hours, minutes] = timeString.split(":").map(Number);
    const period = hours >= 12 ? "م" : "ص";
    const displayHours = hours === 0 ? 12 : hours > 12 ? hours - 12 : hours;
    return `${displayHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${period}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    // Update next prayer time based on current time
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();

    const updatedPrayerTimes = prayerTimes.map((prayer) => {
      const [hours, minutes] = prayer.time.split(":").map(Number);
      const prayerMinutes = hours * 60 + minutes;
      return {
        ...prayer,
        isNext: prayerMinutes > currentMinutes,
      };
    });

    // Find the next prayer
    const nextPrayerIndex = updatedPrayerTimes.findIndex((p) => p.isNext);
    if (nextPrayerIndex !== -1) {
      updatedPrayerTimes.forEach((p, i) => {
        p.isNext = i === nextPrayerIndex;
      });
    }

    setPrayerTimes(updatedPrayerTimes);
  }, [currentTime]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Weather Card */}
      <Card className="shadow-lg border-[#4C3D8F]/20 bg-white">
        <CardHeader className="bg-[#4C3D8F] text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3">
            {weatherIcons[weather.condition]}
            حالة الطقس في المدينة المنورة
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#4C3D8F]">
                {weather.temperature}°
              </div>
              <div className="text-sm text-[#4C3D8F]/70">
                {weather.description}
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Droplets className="w-4 h-4 text-[#4C3D8F]" />
                <span className="text-[#4C3D8F]/70">
                  الرطوبة: {weather.humidity}%
                </span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Wind className="w-4 h-4 text-[#4C3D8F]" />
                <span className="text-[#4C3D8F]/70">
                  الرياح: {weather.windSpeed} كم/س
                </span>
              </div>
            </div>
          </div>

          <div className="bg-[#4C3D8F]/10 rounded-lg p-3 text-center border border-[#4C3D8F]/20">
            <Clock className="w-5 h-5 mx-auto mb-2 text-[#4C3D8F]" />
            <div className="text-lg font-semibold text-[#4C3D8F]">
              {currentTime.toLocaleTimeString("ar-SA", {
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </div>
            <div className="text-sm text-[#4C3D8F]/70">
              {currentTime.toLocaleDateString("ar-SA", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prayer Times Card */}
      <Card className="shadow-lg border-[#4C3D8F]/20 bg-white">
        <CardHeader className="bg-[#4C3D8F] text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3 mb-4">
            <Building2 className="w-6 h-6" />
            مواقيت الصلاة
          </CardTitle>
          <div className="flex items-center justify-center gap-4 bg-white/10 rounded-lg px-6 py-4 border border-white/20 max-w-sm mx-auto">
            <span
              className={`text-sm font-medium transition-all duration-200 whitespace-nowrap min-w-[50px] text-center ${!is24Hour ? "text-white font-bold" : "text-white/60"}`}
            >
              12 ساعة
            </span>
            <div className="relative">
              <Switch
                id="time-format"
                checked={is24Hour}
                onCheckedChange={setIs24Hour}
                className="h-5 w-9 data-[state=checked]:bg-white/40 data-[state=unchecked]:bg-white/20 [&>span]:h-4 [&>span]:w-4 [&>span]:data-[state=checked]:translate-x-4 [&>span]:data-[state=unchecked]:translate-x-0"
              />
            </div>
            <span
              className={`text-sm font-medium transition-all duration-200 whitespace-nowrap min-w-[50px] text-center ${is24Hour ? "text-white font-bold" : "text-white/60"}`}
            >
              24 ساعة
            </span>
          </div>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-3">
            {prayerTimes.map((prayer, index) => (
              <div
                key={prayer.name}
                className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                  prayer.isNext
                    ? "bg-[#4C3D8F]/10 border-2 border-[#4C3D8F]/30"
                    : "bg-white border border-[#4C3D8F]/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      prayer.isNext ? "bg-[#4C3D8F]" : "bg-[#4C3D8F]/30"
                    }`}
                  ></div>
                  <span
                    className={`font-medium ${
                      prayer.isNext
                        ? "text-[#4C3D8F] font-bold"
                        : "text-[#4C3D8F]/70"
                    }`}
                  >
                    {prayer.name}
                  </span>
                  {prayer.isNext && (
                    <Badge className="bg-[#4C3D8F] text-white">القادمة</Badge>
                  )}
                </div>
                <span
                  className={`font-mono text-lg ${
                    prayer.isNext
                      ? "text-[#4C3D8F] font-bold"
                      : "text-[#4C3D8F]/70"
                  }`}
                >
                  {formatTime(prayer.time)}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-4 p-3 bg-[#4C3D8F]/10 rounded-lg border border-[#4C3D8F]/20">
            <div className="text-center text-[#4C3D8F] text-sm">
              🕌 أوقات الصلاة في المسجد النبوي الشريف
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
