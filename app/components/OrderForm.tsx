// components/OrderForm.tsx
"use client";

import { submitOrder } from "@/app/actions";
import { useState } from "react";
import { X, ShoppingCart } from "lucide-react";

export default function OrderForm({ productId }: { productId: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<string | null>(null);

  async function handleSubmit(formData: FormData) {
    const result = await submitOrder(formData);
    if (result.success) {
      setStatus("شكراً لك! تم استلام طلبك بنجاح.");
    }
  }

  const toggleModal = () => {
    setIsOpen(!isOpen);
    setStatus(null);
  };

  return (
    <>
      <button 
        onClick={toggleModal}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl shadow-lg transition transform hover:-translate-y-1 flex items-center justify-center gap-3 text-lg"
      >
        <ShoppingCart className="w-6 h-6" />
        <span>اطلب الآن - الدفع عند الاستلام</span>
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={toggleModal}
          ></div>

          <div dir="rtl" className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg p-6 md:p-8 animate-popup">
            <button 
              onClick={toggleModal}
              className="absolute top-4 left-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="font-bold text-2xl mb-6 text-gray-800 text-center">إتمام الطلب</h3>
            
            {status ? (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-3xl">✓</div>
                <p className="text-xl font-semibold text-green-700">{status}</p>
              </div>
            ) : (
              <form action={handleSubmit} className="space-y-4 text-right">
                <input type="hidden" name="productId" value={productId} />
                
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">الاسم الكامل</label>
                  <input name="name" required type="text" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-right bg-gray-50" placeholder="الاسم واللقب" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">البريد الإلكتروني (اختياري)</label>
                  <input name="email" type="email" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-right bg-gray-50" placeholder="email@exemple.com" />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">رقم الهاتف <span className="text-red-500">*</span></label>
                  <input name="phone" required type="tel"  dir="ltr" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-right bg-gray-50" placeholder="06 00 00 00 00" style={{ textAlign: 'right' }} />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">عنوان التوصيل</label>
                  <textarea name="address" required rows={3} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-right bg-gray-50" placeholder="المدينة، الحي، رقم المنزل..." />
                </div>

                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition duration-200 shadow-md mt-2 text-lg">
                  تأكيد الطلب الآن
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}