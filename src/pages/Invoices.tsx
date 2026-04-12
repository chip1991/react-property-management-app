import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Receipt, CheckCircle, Clock } from 'lucide-react';

interface InvoiceItem {
  id: string;
  title: string;
  amount: number;
  date: string;
  status: 'processing' | 'issued';
}

const initialInvoices: InvoiceItem[] = [
  { id: 'inv1', title: '2026年2月物业费发票', amount: 350.5, date: '2026-03-05 14:30:00', status: 'processing' },
  { id: 'inv2', title: '2026年1月物业费发票', amount: 350.5, date: '2026-02-05 10:15:00', status: 'issued' },
];

export default function Invoices() {
  const navigate = useNavigate();
  const [invoices] = useState<InvoiceItem[]>(initialInvoices);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-full max-w-[375px] mx-auto shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      {/* 顶部导航 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">我的发票</h1>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-20">
        {invoices.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">暂无发票记录</div>
        ) : (
          <div className="space-y-4">
            {invoices.map(invoice => (
              <div key={invoice.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 mr-3">
                    <Receipt size={20} />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{invoice.title}</p>
                    <p className="text-xs text-gray-500 mt-1">{invoice.date}</p>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end">
                  <p className="font-bold text-gray-800 mb-2">¥{invoice.amount.toFixed(2)}</p>
                  {invoice.status === 'issued' ? (
                    <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center">
                      <CheckCircle size={12} className="mr-1" /> 已开具
                    </span>
                  ) : (
                    <span className="text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded-full flex items-center">
                      <Clock size={12} className="mr-1" /> 处理中
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
