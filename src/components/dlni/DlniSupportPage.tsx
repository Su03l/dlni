import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NotificationConfig } from "@/types/dlni";
import {
  Phone,
  MessageCircle,
  Search,
  Send,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

interface DlniSupportPageProps {
  onShowNotification: (message: string, type: string) => void;
  onShowChat: () => void;
}

interface LostItemForm {
  itemName: string;
  itemDescription: string;
  contactInfo: string;
  locationLost: string;
}

export function DlniSupportPage({
  onShowNotification,
  onShowChat,
}: DlniSupportPageProps) {
  const [showLostForm, setShowLostForm] = useState(false);
  const [lostForm, setLostForm] = useState<LostItemForm>({
    itemName: "",
    itemDescription: "",
    contactInfo: "",
    locationLost: "",
  });

  const handleSubmitLostItem = (e: React.FormEvent) => {
    e.preventDefault();

    if (!lostForm.itemName || !lostForm.contactInfo) {
      onShowNotification("يرجى ملء جميع الحقول المطلوبة", "error");
      return;
    }

    // Here you would typically send the data to your backend
    onShowNotification("تم إرسال بلاغ المفقودات بنجاح", "success");
    setLostForm({
      itemName: "",
      itemDescription: "",
      contactInfo: "",
      locationLost: "",
    });
    setShowLostForm(false);
  };

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent(
      "السلام عليكم، أحتاج مساعدة في المسجد النبوي الشريف",
    );
    const phoneNumber = "966123456789"; // رقم الواتساب
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  return (
    <div className="py-8 animate-in fade-in duration-700">
      {/* Page Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-[#4C3D8F] mb-4 font-serif">
          الدعم والمساعدة
        </h2>
        <p className="text-lg text-[#4C3D8F]/70 max-w-2xl mx-auto leading-relaxed">
          نحن هنا لمساعدتك في أي استفسار أو مشكلة تواجهها داخل المسجد النبوي
          الشريف
        </p>
      </div>

      {/* Support Options */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-[#4C3D8F] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Phone className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#4C3D8F] mb-4 font-serif">
              اتصل بنا
            </h3>
            <p className="text-[#4C3D8F]/70 mb-6 leading-relaxed">
              تواصل معنا مباشرة عبر الواتساب للحصول على المساعدة الفورية
            </p>
            <Button
              onClick={handleWhatsAppContact}
              className="bg-[#4C3D8F] hover:bg-[#4C3D8F]/90 w-full"
            >
              <Phone className="w-4 h-4 ml-2" />
              اتصل بنا عبر واتساب
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-[#4C3D8F] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <MessageCircle className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#4C3D8F] mb-4 font-serif">
              دردشة مباشرة
            </h3>
            <p className="text-[#4C3D8F]/70 mb-6 leading-relaxed">
              تحدث مع فريق الدعم عبر الدردشة المباشرة
            </p>
            <Button
              onClick={onShowChat}
              className="bg-[#4C3D8F] hover:bg-[#4C3D8F]/90 w-full"
            >
              ابدأ المحادثة
            </Button>
          </CardContent>
        </Card>

        <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
          <CardContent className="p-8 text-center">
            <div className="w-20 h-20 bg-[#4C3D8F] rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
              <Search className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-[#4C3D8F] mb-4 font-serif">
              الأشياء المفقودة
            </h3>
            <p className="text-[#4C3D8F]/70 mb-6 leading-relaxed">
              أبلغ عن الأشياء المفقودة أو ابحث عن المفقودات
            </p>
            <Button
              onClick={() => setShowLostForm(!showLostForm)}
              className="bg-[#4C3D8F] hover:bg-[#4C3D8F]/90 w-full"
            >
              <Search className="w-4 h-4 ml-2" />
              الإبلاغ عن مفقود
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Lost Items Form */}
      {showLostForm && (
        <Card className="mb-8 bg-white border-[#4C3D8F]/20">
          <CardHeader>
            <CardTitle className="text-[#4C3D8F] font-serif">
              نموذج الإبلاغ عن الأشياء المفقودة
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitLostItem} className="space-y-6">
              <div>
                <Label
                  htmlFor="item-name"
                  className="text-[#4C3D8F] font-medium"
                >
                  اسم الشيء المفقود *
                </Label>
                <Input
                  id="item-name"
                  value={lostForm.itemName}
                  onChange={(e) =>
                    setLostForm({ ...lostForm, itemName: e.target.value })
                  }
                  placeholder="مثل: محفظة، مفاتيح، هاتف محمول..."
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label
                  htmlFor="item-description"
                  className="text-[#4C3D8F] font-medium"
                >
                  وصف تفصيلي للشيء المفقود
                </Label>
                <Textarea
                  id="item-description"
                  value={lostForm.itemDescription}
                  onChange={(e) =>
                    setLostForm({
                      ...lostForm,
                      itemDescription: e.target.value,
                    })
                  }
                  placeholder="اللون، الحجم، العلامة التجارية، أي علامات مميزة..."
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div>
                <Label
                  htmlFor="contact-info"
                  className="text-[#4C3D8F] font-medium"
                >
                  معلومات التواصل *
                </Label>
                <Input
                  id="contact-info"
                  value={lostForm.contactInfo}
                  onChange={(e) =>
                    setLostForm({ ...lostForm, contactInfo: e.target.value })
                  }
                  placeholder="رقم الهاتف أو البريد الإلكتروني"
                  className="mt-2"
                  required
                />
              </div>

              <div>
                <Label
                  htmlFor="location-lost"
                  className="text-[#4C3D8F] font-medium"
                >
                  المكان المتوقع فقدان الشيء فيه
                </Label>
                <Input
                  id="location-lost"
                  value={lostForm.locationLost}
                  onChange={(e) =>
                    setLostForm({ ...lostForm, locationLost: e.target.value })
                  }
                  placeholder="مثل: الروضة الشريفة، دورات المياه، مكان الوضوء..."
                  className="mt-2"
                />
              </div>

              <div className="flex gap-4">
                <Button
                  type="submit"
                  className="bg-[#4C3D8F] hover:bg-[#4C3D8F]/90 flex-1"
                >
                  <Send className="w-4 h-4 ml-2" />
                  إرسال البلاغ
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowLostForm(false)}
                  className="flex-1 border-[#4C3D8F] text-[#4C3D8F] hover:bg-[#4C3D8F]/10"
                >
                  إلغاء
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Quick Help */}
      <Card className="bg-[#4C3D8F]/5 border-[#4C3D8F]/20">
        <CardContent className="p-8">
          <h3 className="text-2xl font-bold text-[#4C3D8F] mb-6 text-center font-serif">
            مساعدة سريعة
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <HelpCircle className="w-12 h-12 text-[#4C3D8F] mx-auto mb-4" />
              <h4 className="font-semibold text-[#4C3D8F] mb-2">
                الأسئلة الشائعة
              </h4>
              <p className="text-sm text-[#4C3D8F]/70">
                اطلع على الأسئلة الأكثر شيوعاً والإجابات المفيدة
              </p>
            </div>
            <div className="text-center">
              <Phone className="w-12 h-12 text-[#4C3D8F] mx-auto mb-4" />
              <h4 className="font-semibold text-[#4C3D8F] mb-2">خط المساعدة</h4>
              <p className="text-sm text-[#4C3D8F]/70">
                للطوارئ: 911 | للاستعلامات: 014-8455555
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
