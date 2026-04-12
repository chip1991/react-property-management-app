import { Home as HomeIcon, Users, CreditCard, Wrench, ChevronRight, Bell } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full w-full max-w-[375px] mx-auto bg-gray-50 overflow-y-auto pb-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      {/* 顶部欢迎区 */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 pt-10 pb-16 rounded-b-3xl text-white">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-xl font-bold">早上好，尊贵的业主</h1>
            <p className="text-sm text-blue-100 mt-1">幸福家园 A区</p>
          </div>
          <button onClick={() => navigate('/messages')} className="relative p-2 hover:bg-white/10 rounded-full transition-colors">
            <Bell size={24} />
            <span className="absolute top-1 right-2 w-2 h-2 bg-red-500 rounded-full border border-blue-500"></span>
          </button>
        </div>
      </div>

      <div className="px-4 -mt-10 space-y-4">
        {/* 我的房屋 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">我的房屋</h2>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/house')}
              className="flex items-center p-3 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white mr-3">
                <HomeIcon size={20} />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-800">房屋管理</p>
                <p className="text-xs text-gray-500 mt-0.5">绑定与解绑</p>
              </div>
            </button>
            <button 
              onClick={() => navigate('/family')}
              className="flex items-center p-3 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-white mr-3">
                <Users size={20} />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-800">家人管理</p>
                <p className="text-xs text-gray-500 mt-0.5">邀请家属入住</p>
              </div>
            </button>
          </div>
        </div>

        {/* 常用服务 */}
        <div className="bg-white rounded-2xl p-4 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 mb-4">常用服务</h2>
          <div className="space-y-3">
            <button 
              onClick={() => navigate('/property-fee')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                  <CreditCard size={20} />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">物业费查询与缴纳</p>
                  <p className="text-xs text-gray-500 mt-0.5">本月账单已出</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>

            <button 
              onClick={() => navigate('/repair')}
              className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mr-3">
                  <Wrench size={20} />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">报事报修</p>
                  <p className="text-xs text-gray-500 mt-0.5">一键呼叫维修人员</p>
                </div>
              </div>
              <ChevronRight size={20} className="text-gray-400" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
