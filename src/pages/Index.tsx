import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { Building2, MapPin, MessageCircle } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="shadow-2xl border-0">
          <CardHeader className="text-center bg-[#4C3D8F] text-white rounded-t-lg">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-10 h-10" />
            </div>
            <CardTitle className="text-3xl font-bold font-serif mb-2">
              مرحباً بك في دلّني
            </CardTitle>
            <p className="text-white/90 text-lg">
              دليل المسجد النبوي الشريف التفاعلي
            </p>
          </CardHeader>

          <CardContent className="p-8">
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-2xl font-semibold text-[#4C3D8F] mb-4 font-serif">
                  خدمات التطبيق
                </h2>
                <p className="text-[#4C3D8F]/70 leading-relaxed mb-8">
                  احصل على إرشاد دقيق داخل المسجد النبوي الشريف مع حساب المسافات
                  الصحيحة وخدمات شاملة
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div className="text-center p-4 bg-white border border-[#4C3D8F]/20 rounded-lg">
                  <MapPin className="w-8 h-8 text-[#4C3D8F] mx-auto mb-2" />
                  <h3 className="font-medium text-[#4C3D8F]">خرائط تفاعلية</h3>
                  <p className="text-sm text-[#4C3D8F]/70">
                    مواقع دقيقة مع المسافات
                  </p>
                </div>
                <div className="text-center p-4 bg-white border border-[#4C3D8F]/20 rounded-lg">
                  <MessageCircle className="w-8 h-8 text-[#4C3D8F] mx-auto mb-2" />
                  <h3 className="font-medium text-[#4C3D8F]">مساعد ذكي</h3>
                  <p className="text-sm text-[#4C3D8F]/70">
                    إجابات فورية على استفساراتك
                  </p>
                </div>
                <div className="text-center p-4 bg-white border border-[#4C3D8F]/20 rounded-lg">
                  <Building2 className="w-8 h-8 text-[#4C3D8F] mx-auto mb-2" />
                  <h3 className="font-medium text-[#4C3D8F]">خدمات شاملة</h3>
                  <p className="text-sm text-[#4C3D8F]/70">
                    جميع الخدمات في مكان واحد
                  </p>
                </div>
              </div>

              <div className="text-center">
                <Link to="/dlni">
                  <Button
                    size="lg"
                    className="bg-[#4C3D8F] hover:bg-[#4C3D8F]/90 text-white px-8 py-6 text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                  >
                    <Building2 className="w-6 h-6 ml-3" />
                    ادخل إلى التطبيق
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
