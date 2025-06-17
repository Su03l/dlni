import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChatMessage } from "@/types/dlni";
import { chatResponses } from "@/lib/dlni-data";
import { Bot, Send, User } from "lucide-react";

interface DlniChatPageProps {
  onShowNotification: (message: string, type: string) => void;
}

const quickQuestions = [
  "أين أقرب دورة مياه؟",
  "كيف أصل للروضة الشريفة؟",
  "أين مياه زمزم؟",
  "كيف أبدأ الطواف؟",
  "أين أجد مكان السعي؟",
  "أين يمكنني الحلاقة؟",
  "مواقيت الصلاة",
  "أحتاج مساعدة طبية",
];

export function DlniChatPage({ onShowNotification }: DlniChatPageProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      text: "السلام عليكم ورحمة الله وبركاته، أهلاً وسهلاً بك في المسجد النبوي الشريف. كيف يمكنني مساعدتك اليوم؟",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addMessage = (text: string, sender: "user" | "bot") => {
    const newMessage: ChatMessage = {
      text,
      sender,
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const sendMessage = (message?: string) => {
    const text = message || inputValue.trim();
    if (!text) return;

    addMessage(text, "user");
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const response =
        chatResponses[text] || "شكراً لك على سؤالك. هل يمكنك توضيح أكثر؟";
      addMessage(response, "bot");
      setIsTyping(false);

      // Show additional guidance for location questions
      if (text.includes("أين")) {
        setTimeout(() => {
          addMessage(
            "يمكنني إرشادك بدقة إلى الموقع المطلوب. اختر الخدمة من الصفحة الرئيسية للحصول على المسافة الدقيقة.",
            "bot",
          );
        }, 1000);
      }
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="py-8 animate-in fade-in duration-700">
      <Card className="h-[600px] flex flex-col">
        <CardHeader className="bg-[#4C3D8F] text-white rounded-t-lg">
          <CardTitle className="flex items-center gap-3">
            <Bot className="w-6 h-6" />
            مساعد دلّني
          </CardTitle>
          <p className="text-white/90">هل تحتاج إلى مساعدة؟ اسألني أي شيء</p>
        </CardHeader>

        <CardContent className="flex-1 flex flex-col p-0">
          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] md:max-w-[60%] rounded-2xl px-4 py-3 ${
                    message.sender === "user"
                      ? "bg-[#4C3D8F] text-white rounded-br-sm"
                      : "bg-[#4C3D8F]/10 text-[#4C3D8F] rounded-bl-sm"
                  }`}
                >
                  <div className="flex items-start gap-2">
                    {message.sender === "bot" && (
                      <Bot className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    )}
                    {message.sender === "user" && (
                      <User className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    )}
                    <p className="text-sm leading-relaxed whitespace-pre-line">
                      {message.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-[#4C3D8F]/10 text-[#4C3D8F] rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4" />
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Questions */}
            {messages.length === 1 && (
              <div className="space-y-3">
                <p className="text-sm text-gray-600 font-medium">
                  أسئلة سريعة:
                </p>
                <div className="flex flex-wrap gap-2">
                  {quickQuestions.map((question, index) => (
                    <Badge
                      key={index}
                      variant="outline"
                      className="cursor-pointer text-xs hover:bg-green-50 hover:border-green-300 transition-colors py-2 px-3"
                      onClick={() => sendMessage(question)}
                    >
                      {question}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="border-t p-6">
            <div className="flex gap-3">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="اكتب رسالتك هنا..."
                className="flex-1 text-right"
                dir="rtl"
              />
              <Button
                onClick={() => sendMessage()}
                disabled={!inputValue.trim() || isTyping}
                size="icon"
                className="bg-green-600 hover:bg-green-700"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
