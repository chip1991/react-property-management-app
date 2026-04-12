import { ChevronLeft, Filter, Wrench, CheckCircle, Clock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function RepairRecords() {
  const navigate = useNavigate();

  const mockRecords = [
    {
      id: 'REP-20240410-001',
      title: '水管漏水报修',
      status: '已完成',
      date: '2024-04-10 14:30',
      description: '厨房下水管漏水，需要紧急维修。',
      type: '水管报修'
    },
    {
      id: 'REP-20240412-005',
      title: '客厅灯泡不亮',
      status: '处理中',
      date: '2024-04-12 09:15',
      description: '客厅顶灯闪烁几次后不亮了，可能是灯泡坏了。',
      type: '电路维修'
    },
    {
      id: 'REP-20240411-003',
      title: '大门锁芯卡涩',
      status: '待分配',
      date: '2024-04-11 18:20',
      description: '入户大门钥匙插入困难，需要加润滑油或更换锁芯。',
      type: '门窗维修'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-full max-w-[375px] mx-auto shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      {/* 头部 */}
      <div className="bg-white flex items-center justify-between px-4 h-14 border-b border-gray-100 shrink-0 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-gray-800">报修记录</h1>
        <button className="p-2 -mr-2 text-gray-600">
          <Filter size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mockRecords.map((record) => (
          <div 
            key={record.id} 
            className="bg-white rounded-xl shadow-sm p-4 cursor-pointer hover:shadow-md transition-shadow active:scale-[0.98]"
            onClick={() => navigate(`/repair-detail/${record.id}`)}
          >
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${
                  record.type === '水管报修' ? 'bg-blue-100 text-blue-600' :
                  record.type === '电路维修' ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600'
                }`}>
                  <Wrench size={16} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-800">{record.title}</h3>
                  <p className="text-xs text-gray-500 mt-0.5">{record.date}</p>
                </div>
              </div>
              <span className={`text-xs px-2 py-1 rounded-full flex items-center ${
                record.status === '已完成' ? 'bg-green-50 text-green-600' :
                record.status === '处理中' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
              }`}>
                {record.status === '已完成' ? <CheckCircle size={12} className="mr-1" /> : <Clock size={12} className="mr-1" />}
                {record.status}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 line-clamp-2 bg-gray-50 p-3 rounded-lg">
              {record.description}
            </p>
            
            <div className="mt-3 flex justify-between items-center">
              <span className="text-xs text-gray-400">单号: {record.id}</span>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium px-3 py-1 bg-blue-50 rounded-lg">
                查看详情
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
