import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Camera,
  MapPin,
  Eye,
  Headphones,
} from "lucide-react";

interface TourStop {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  videoUrl?: string;
  audioUrl?: string;
  duration: string;
  highlights: string[];
}

const tourStops: TourStop[] = [
  {
    id: "entrance",
    title: "المدخل الرئيسي",
    description:
      "مدخل المسجد النبوي الشريف الرئيسي مع العمارة الإسلامية الرائعة",
    imageUrl: "/images/masjid-nabawi-entrance.jpg",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    duration: "3 دقائق",
    highlights: [
      "العمارة الإسلامية الحديثة",
      "المآذن الشامخة",
      "الزخارف والنقوش",
    ],
  },
  {
    id: "main-hall",
    title: "المسجد الرئيسي",
    description: "القاعة الرئيسية للمسجد النبوي الشريف",
    imageUrl: "/images/masjid-nabawi-interior.jpg",
    videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    duration: "5 دقائق",
    highlights: [
      "السجاد الأخضر الفاخر",
      "الأعمدة الرخامية",
      "المكيفات المركزية",
    ],
  },
  {
    id: "rawdah",
    title: "الروضة الشريفة",
    description: "الروضة الشريفة - روضة من رياض الجنة",
    imageUrl: "/images/rawdah-sharifa.jpg",
    videoUrl: "https://www.youtube.com/embed/2Vv-BfVoq4g",
    duration: "7 دقائق",
    highlights: ["السجاد الأخضر المميز", "الأجواء الروحانية", "المكان المبارك"],
  },
];

export function DlniVirtualTour() {
  const [currentStop, setCurrentStop] = useState(tourStops[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedTab, setSelectedTab] = useState("360");

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleMuteToggle = () => {
    setIsMuted(!isMuted);
  };

  return (
    <Card className="mt-8 shadow-lg border-[#4C3D8F]/20 bg-white">
      <CardHeader className="bg-[#4C3D8F] text-white rounded-t-lg">
        <CardTitle className="flex items-center gap-3">
          <Camera className="w-6 h-6" />
          الجولة الافتراضية للمسجد النبوي
        </CardTitle>
        <p className="text-indigo-100 text-sm">
          استكشف المسجد النبوي الشريف من خلال جولة افتراضية تفاعلية
        </p>
      </CardHeader>

      <CardContent className="p-6">
        <Tabs
          value={selectedTab}
          onValueChange={setSelectedTab}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="360">جولة 360°</TabsTrigger>
            <TabsTrigger value="photos">معرض الصور</TabsTrigger>
            <TabsTrigger value="audio">الجولة الصوتية</TabsTrigger>
          </TabsList>

          <TabsContent value="360" className="space-y-4">
            <div className="relative bg-gray-900 rounded-lg overflow-hidden h-96 group">
              {currentStop.videoUrl ? (
                <div className="relative w-full h-full">
                  <iframe
                    src={`${currentStop.videoUrl}?autoplay=0&controls=1&rel=0&modestbranding=1`}
                    title={currentStop.title}
                    className="w-full h-full border-0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                  <div className="absolute top-2 left-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                    فيديو مباشر
                  </div>
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={currentStop.imageUrl}
                    alt={currentStop.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                </div>
              )}

              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-3">
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-3">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handlePlayPause}
                      className="text-white hover:bg-white/20"
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4" />
                      ) : (
                        <Play className="w-4 h-4" />
                      )}
                    </Button>

                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={handleMuteToggle}
                      className="text-white hover:bg-white/20"
                    >
                      {isMuted ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>

                  <div className="text-center">
                    <h4 className="font-semibold">{currentStop.title}</h4>
                    <p className="text-xs text-gray-300">
                      {currentStop.duration}
                    </p>
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                  >
                    <Maximize className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="absolute top-4 right-4 space-y-2">
                {tourStops.map((stop, index) => (
                  <button
                    key={stop.id}
                    onClick={() => setCurrentStop(stop)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      currentStop.id === stop.id
                        ? "bg-white"
                        : "bg-white/50 hover:bg-white/70"
                    }`}
                    title={stop.title}
                  />
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h4 className="text-xl font-semibold text-purple-800">
                  {currentStop.title}
                </h4>
                <p className="text-gray-600">{currentStop.description}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Eye className="w-4 h-4" />
                  <span>المدة: {currentStop.duration}</span>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-semibold text-gray-800">النقاط المميزة:</h5>
                <ul className="space-y-2">
                  {currentStop.highlights.map((highlight, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-2 text-sm text-gray-600"
                    >
                      <MapPin className="w-3 h-3 text-purple-500" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-2">
              {tourStops.map((stop) => (
                <Card
                  key={stop.id}
                  className={`min-w-48 cursor-pointer transition-all hover:shadow-md ${
                    currentStop.id === stop.id ? "ring-2 ring-purple-500" : ""
                  }`}
                  onClick={() => setCurrentStop(stop)}
                >
                  <CardContent className="p-3">
                    <div className="aspect-video bg-gray-200 rounded mb-2 overflow-hidden">
                      <img
                        src={stop.imageUrl}
                        alt={stop.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h6 className="text-sm font-medium text-gray-800 truncate">
                      {stop.title}
                    </h6>
                    <p className="text-xs text-gray-500">{stop.duration}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="photos" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Card className="hover:shadow-lg transition-shadow group">
                <CardContent className="p-4">
                  <div className="aspect-video bg-blue-50 rounded mb-3 overflow-hidden flex items-center justify-center">
                    <div className="text-center text-blue-600">
                      <div className="w-16 h-16 mx-auto mb-2 bg-blue-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path
                            fillRule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-sm">المسجد النبوي من الخارج</p>
                    </div>
                  </div>
                  <h5 className="font-semibold text-blue-800 mb-2">
                    المسجد النبوي الشريف
                  </h5>
                  <p className="text-sm text-gray-600">
                    منظر خارجي رائع للمسجد النبوي الشريف
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow group">
                <CardContent className="p-4">
                  <div className="aspect-video bg-green-50 rounded mb-3 overflow-hidden flex items-center justify-center">
                    <div className="text-center text-green-600">
                      <div className="w-16 h-16 mx-auto mb-2 bg-green-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-sm">القبة الخضراء</p>
                    </div>
                  </div>
                  <h5 className="font-semibold text-blue-800 mb-2">
                    القبة الخضراء المباركة
                  </h5>
                  <p className="text-sm text-gray-600">
                    القبة الخضراء المقدسة فوق قبر الرسول ﷺ
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow group">
                <CardContent className="p-4">
                  <div className="aspect-video bg-purple-50 rounded mb-3 overflow-hidden flex items-center justify-center">
                    <div className="text-center text-purple-600">
                      <div className="w-16 h-16 mx-auto mb-2 bg-purple-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-sm">داخل المسجد</p>
                    </div>
                  </div>
                  <h5 className="font-semibold text-blue-800 mb-2">
                    داخل المسجد النبوي
                  </h5>
                  <p className="text-sm text-gray-600">
                    المساحة الداخلية الواسعة مع السجاد الأخضر
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow group">
                <CardContent className="p-4">
                  <div className="aspect-video bg-indigo-50 rounded mb-3 overflow-hidden flex items-center justify-center">
                    <div className="text-center text-indigo-600">
                      <div className="w-16 h-16 mx-auto mb-2 bg-indigo-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5zM9 9a1 1 0 112 0v4a1 1 0 11-2 0V9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-sm">المسجد ليلاً</p>
                    </div>
                  </div>
                  <h5 className="font-semibold text-blue-800 mb-2">
                    المسجد النبوي ليلاً
                  </h5>
                  <p className="text-sm text-gray-600">
                    إضاءة ليلية ساحرة تبرز جمال المعمار
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow group">
                <CardContent className="p-4">
                  <div className="aspect-video bg-teal-50 rounded mb-3 overflow-hidden flex items-center justify-center">
                    <div className="text-center text-teal-600">
                      <div className="w-16 h-16 mx-auto mb-2 bg-teal-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.083 9h1.946c.089-1.546.383-2.97.837-4.118A6.004 6.004 0 004.083 9zM10 2a8 8 0 100 16 8 8 0 000-16zm0 2c-.076 0-.232.032-.465.262-.238.234-.497.623-.737 1.182-.389.907-.673 2.142-.766 3.556h3.936c-.093-1.414-.377-2.649-.766-3.556-.24-.56-.5-.948-.737-1.182C10.232 4.032 10.076 4 10 4zm3.971 5c-.089-1.546-.383-2.97-.837-4.118A6.004 6.004 0 0115.917 9h-1.946zm-2.003 2H8.032c.093 1.414.377 2.649.766 3.556.24.56.5.948.737 1.182.233.23.389.262.465.262.076 0 .232-.032.465-.262.238-.234.498-.623.737-1.182.389-.907.673-2.142.766-3.556zm1.166 4.118c.454-1.147.748-2.572.837-4.118h1.946a6.004 6.004 0 01-2.783 4.118zm-6.268 0C6.412 13.97 6.118 12.546 6.03 11H4.083a6.004 6.004 0 002.783 4.118z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-sm">منظر جوي</p>
                    </div>
                  </div>
                  <h5 className="font-semibold text-blue-800 mb-2">
                    منظر جوي للمدينة
                  </h5>
                  <p className="text-sm text-gray-600">
                    منظر جوي شامل للمسجد والمنطقة المحيطة
                  </p>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-shadow group">
                <CardContent className="p-4">
                  <div className="aspect-video bg-emerald-50 rounded mb-3 overflow-hidden flex items-center justify-center">
                    <div className="text-center text-emerald-600">
                      <div className="w-16 h-16 mx-auto mb-2 bg-emerald-100 rounded-full flex items-center justify-center">
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                      <p className="text-sm">الروضة الشريفة</p>
                    </div>
                  </div>
                  <h5 className="font-semibold text-blue-800 mb-2">
                    الروضة الشريفة
                  </h5>
                  <p className="text-sm text-gray-600">
                    الروضة الشريفة - روضة من رياض الجنة
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="audio" className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-6 text-center">
              <Headphones className="w-16 h-16 text-purple-500 mx-auto mb-4" />
              <h4 className="text-xl font-semibold text-gray-800 mb-2">
                الجولة الصوتية
              </h4>
              <p className="text-gray-600 mb-4">
                استمع إلى شرح مفصل عن المسجد النبوي الشريف بصوت مقرئين مشهورين
              </p>
              <Badge className="bg-purple-600 text-white">
                قريباً - تحت التطوير
              </Badge>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
