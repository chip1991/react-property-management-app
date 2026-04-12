import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, FileText, CheckCircle } from 'lucide-react';

interface BillItem {
  id: string;
  title: string;
  date: string;
  amount: number;
  invoiced: boolean;
}

const initialBills: BillItem[] = [
  { id: 'b1', title: '2026年3月物业费', date: '2026-03-01 10:00:00', amount: 350.5, invoiced: false },
  { id: 'b2', title: '2026年2月物业费', date: '2026-02-01 10:20:00', amount: 350.5, invoiced: true },
  { id: 'b3', title: '2026年1月物业费', date: '2026-01-02 09:15:00', amount: 350.5, invoiced: true },
];

export default function Bills() {
  const navigate = useNavigate();
  const [bills, setBills] = useState<BillItem[]>(initialBills);

  const applyInvoice = (id: string) => {
    setBills(prev => prev.map(b => b.id === id ? { ...b, invoiced: true } : b));
    alert('发票申请已提交！可以在我的发票查看。');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-full max-w-[375px] mx-auto shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      {/* 顶部导航 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">我的账单</h1>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-20">
        <div className="space-y-4">
          {bills.map(bill => (
            <div key={bill.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mr-3">
                  <FileText size={20} />
                </div>
                <div>
                  <p className="font-medium text-gray-800">{bill.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{bill.date}</p>
                </div>
              </div>
              <div className="text-right flex flex-col items-end">
                <p className="font-bold text-gray-800 mb-2">¥{bill.amount.toFixed(2)}</p>
                {bill.invoiced ? (
                  <span className="text-xs text-green-600 bg-green-50 px-2 py-1 rounded-full flex items-center">
                    <CheckCircle size={12} className="mr-1" /> 已开票
                  </span>
                ) : (
                  <button
                    onClick={() => applyInvoice(bill.id)}
                    className="text-xs text-blue-600 border border-blue-500 px-3 py-1 rounded-full hover:bg-blue-50 transition-colors"
                  >
                    申请开票
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
