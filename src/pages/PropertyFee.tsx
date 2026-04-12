import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, CheckCircle } from 'lucide-react';

interface FeeItem {
  id: string;
  month: string;
  amount: number;
  status: 'unpaid' | 'paid';
}

const initialFees: FeeItem[] = [
  { id: '1', month: '2026年4月', amount: 350.5, status: 'unpaid' },
  { id: '2', month: '2026年3月', amount: 350.5, status: 'unpaid' },
  { id: '3', month: '2026年2月', amount: 350.5, status: 'paid' },
  { id: '4', month: '2026年1月', amount: 350.5, status: 'paid' },
];

export default function PropertyFee() {
  const navigate = useNavigate();
  const [fees, setFees] = useState<FeeItem[]>(initialFees);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const handlePay = () => {
    if (selectedIds.length === 0) return;
    setFees(prev =>
      prev.map(fee =>
        selectedIds.includes(fee.id) ? { ...fee, status: 'paid' } : fee
      )
    );
    setSelectedIds([]);
    alert('缴费成功！');
  };

  const totalAmount = fees
    .filter(f => selectedIds.includes(f.id))
    .reduce((sum, f) => sum + f.amount, 0);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-full max-w-[375px] mx-auto shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      {/* 顶部导航 */}
      <div className="bg-white px-4 py-3 flex items-center justify-between shadow-sm sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-bold text-gray-800">物业费查询与缴纳</h1>
        <div className="w-8"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="space-y-4">
          {fees.map(fee => (
            <div key={fee.id} className="bg-white rounded-xl p-4 shadow-sm flex items-center">
              {fee.status === 'unpaid' ? (
                <button
                  onClick={() => toggleSelect(fee.id)}
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${
                    selectedIds.includes(fee.id)
                      ? 'border-blue-500 bg-blue-500'
                      : 'border-gray-300'
                  }`}
                >
                  {selectedIds.includes(fee.id) && <CheckCircle size={16} className="text-white" />}
                </button>
              ) : (
                <div className="w-6 h-6 mr-4 flex items-center justify-center">
                  <CheckCircle size={24} className="text-green-500" />
                </div>
              )}
              
              <div className="flex-1">
                <p className="font-medium text-gray-800">{fee.month} 物业费</p>
                <p className="text-sm text-gray-500 mt-1">A区-1栋-1001室</p>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-gray-800">¥{fee.amount.toFixed(2)}</p>
                <p className={`text-xs mt-1 ${fee.status === 'paid' ? 'text-green-500' : 'text-red-500'}`}>
                  {fee.status === 'paid' ? '已缴费' : '未缴费'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 底部固定支付栏 */}
      <div className="bg-white border-t border-gray-100 px-4 py-3 pb-8 fixed bottom-0 w-full max-w-[375px] left-1/2 -translate-x-1/2 flex items-center justify-between">
        <div className="flex flex-col">
          <span className="text-xs text-gray-500">合计待支付</span>
          <span className="text-xl font-bold text-red-500">¥{totalAmount.toFixed(2)}</span>
        </div>
        <button
          onClick={handlePay}
          disabled={selectedIds.length === 0}
          className={`px-8 py-3 rounded-full font-medium text-white transition-colors ${
            selectedIds.length > 0
              ? 'bg-blue-600 hover:bg-blue-700'
              : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          立即缴费
        </button>
      </div>
    </div>
  );
}
