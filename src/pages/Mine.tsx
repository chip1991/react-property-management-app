import { User, FileText, Wrench, MessageSquare, Settings, ChevronRight, Receipt } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Mine() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full w-full max-w-[375px] mx-auto bg-gray-50 overflow-y-auto pb-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      {/* 个人资料头部 */}
      <button 
        onClick={() => navigate('/profile')}
        className="bg-white px-6 pt-12 pb-6 flex items-center shadow-sm w-full text-left hover:bg-gray-50 transition-colors"
      >
        <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border-2 border-white shadow-md">
          <User size={32} />
        </div>
        <div className="ml-4 flex-1">
          <h1 className="text-xl font-bold text-gray-800">张三</h1>
          <div className="flex items-center mt-1">
            <span className="text-xs bg-blue-50 text-blue-600 px-2 py-0.5 rounded-full border border-blue-100">
              A区-1栋-1001室
            </span>
          </div>
        </div>
        <ChevronRight size={20} className="text-gray-400" />
      </button>

      <div className="px-4 mt-4 space-y-4">
        {/* 服务记录 */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <button 
            onClick={() => navigate('/bills')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center text-green-500 mr-3">
                <FileText size={18} />
              </div>
              <span className="font-medium text-gray-800">我的账单</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button 
            onClick={() => navigate('/invoices')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-indigo-500 mr-3">
                <Receipt size={18} />
              </div>
              <span className="font-medium text-gray-800">我的发票</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>

          <button 
            onClick={() => navigate('/repair-records')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-500 mr-3">
                <Wrench size={18} />
              </div>
              <span className="font-medium text-gray-800">报修记录</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        </div>

        {/* 系统设置 */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <button 
            onClick={() => navigate('/messages')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 mr-3">
                <MessageSquare size={18} />
              </div>
              <span className="font-medium text-gray-800">消息通知</span>
            </div>
            <div className="flex items-center">
              <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full mr-2">3</span>
              <ChevronRight size={20} className="text-gray-400" />
            </div>
          </button>
          
          <button 
            onClick={() => navigate('/settings')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 mr-3">
                <Settings size={18} />
              </div>
              <span className="font-medium text-gray-800">系统设置</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
