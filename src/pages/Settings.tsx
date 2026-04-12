import { ChevronLeft, ChevronRight, UserCircle, BellRing, Lock, Shield, HelpCircle, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-full max-w-[375px] mx-auto shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      {/* 头部 */}
      <div className="bg-white flex items-center justify-between px-4 h-14 border-b border-gray-100 shrink-0 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-gray-800">系统设置</h1>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <button 
            onClick={() => navigate('/profile')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50"
          >
            <div className="flex items-center">
              <UserCircle size={20} className="text-blue-500 mr-3" />
              <span className="font-medium text-gray-800">个人信息</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50">
            <div className="flex items-center">
              <BellRing size={20} className="text-indigo-500 mr-3" />
              <span className="font-medium text-gray-800">新消息通知</span>
            </div>
            <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
              <input type="checkbox" name="toggle" id="toggle1" className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer border-blue-500 checked:right-0 checked:border-blue-500" defaultChecked/>
              <label htmlFor="toggle1" className="toggle-label block overflow-hidden h-6 rounded-full bg-blue-500 cursor-pointer"></label>
            </div>
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <Lock size={20} className="text-orange-500 mr-3" />
              <span className="font-medium text-gray-800">修改密码</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50">
            <div className="flex items-center">
              <Shield size={20} className="text-green-500 mr-3" />
              <span className="font-medium text-gray-800">隐私与安全</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50">
            <div className="flex items-center">
              <HelpCircle size={20} className="text-gray-500 mr-3" />
              <span className="font-medium text-gray-800">帮助与反馈</span>
            </div>
            <ChevronRight size={20} className="text-gray-400" />
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
            <div className="flex items-center">
              <span className="font-medium text-gray-800 ml-8">关于我们</span>
            </div>
            <span className="text-sm text-gray-400 mr-2">v1.0.0</span>
          </button>
        </div>

        <button className="w-full bg-white text-red-500 font-medium rounded-xl py-3.5 shadow-sm hover:bg-red-50 transition-colors mt-6 flex justify-center items-center">
          <LogOut size={20} className="mr-2" />
          退出登录
        </button>
      </div>
    </div>
  );
}
