import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { MapPin, Check, X } from "lucide-react";

interface DlniLocationPromptProps {
  onAllow: () => void;
  onDeny: () => void;
  error?: string | null;
}

export function DlniLocationPrompt({
  onAllow,
  onDeny,
  error,
}: DlniLocationPromptProps) {
  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-8 text-center">
          <div className="w-20 h-20 bg-[#4C3D8F] rounded-full flex items-center justify-center mx-auto mb-6">
            <MapPin className="w-10 h-10 text-white" />
          </div>

          <h3 className="text-xl font-bold text-[#4C3D8F] mb-4">
            تفعيل خدمات الموقع
          </h3>

          <p className="text-gray-600 mb-6 leading-relaxed">
            لتقديم إرشاد دقيق وحساب المسافات الصحيحة، نحتاج للوصول إلى موقعك
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              onClick={onAllow}
              className="bg-green-600 hover:bg-green-700 text-white px-6"
            >
              <Check className="w-4 h-4 ml-2" />
              السماح بالوصول
            </Button>
            <Button
              onClick={onDeny}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50 px-6"
            >
              <X className="w-4 h-4 ml-2" />
              عدم السماح
            </Button>
          </div>

          {error && (
            <Alert className="mt-6 border-red-200 bg-red-50">
              <AlertDescription className="text-red-600 text-sm">
                {error}
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
