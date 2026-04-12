import { ChevronLeft, Camera, Edit2, User, Phone, MapPin, CreditCard } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Profile() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col h-full bg-gray-50 w-full max-w-[375px] mx-auto shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      {/* 头部 */}
      <div className="bg-white flex items-center justify-between px-4 h-14 border-b border-gray-100 shrink-0 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-gray-800">个人信息</h1>
        <button className="p-2 -mr-2 text-blue-600 font-medium">
          保存
        </button>
      </div>

      <div className="flex-1 overflow-y-auto pb-6">
        {/* 头像区 */}
        <div className="bg-white flex flex-col items-center justify-center py-8 border-b border-gray-100">
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 border-4 border-white shadow-md overflow-hidden">
              <User size={48} />
            </div>
            <button className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white border-2 border-white shadow-sm hover:bg-blue-600 transition-colors">
              <Camera size={14} />
            </button>
          </div>
          <p className="mt-4 text-sm text-gray-500">点击更换头像</p>
        </div>

        {/* 基本信息 */}
        <div className="px-4 mt-4 space-y-4">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-50 flex justify-between items-center">
              <h2 className="text-sm font-bold text-gray-800 flex items-center">
                <User size={16} className="text-blue-500 mr-2" />
                基本资料
              </h2>
              <button className="text-blue-500 text-xs flex items-center hover:text-blue-600">
                <Edit2 size={12} className="mr-1" />
                编辑
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 w-20">姓名</span>
                <input type="text" className="flex-1 text-sm text-gray-800 text-right focus:outline-none" defaultValue="张三" />
              </div>
              <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                <span className="text-sm text-gray-500 w-20">性别</span>
                <select className="flex-1 text-sm text-gray-800 text-right focus:outline-none bg-transparent appearance-none dir-rtl">
                  <option>男</option>
                  <option>女</option>
                  <option>保密</option>
                </select>
              </div>
              <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                <span className="text-sm text-gray-500 w-20">出生日期</span>
                <input type="date" className="flex-1 text-sm text-gray-800 text-right focus:outline-none bg-transparent" defaultValue="1990-01-01" />
              </div>
            </div>
          </div>

          {/* 联系方式 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-50 flex justify-between items-center">
              <h2 className="text-sm font-bold text-gray-800 flex items-center">
                <Phone size={16} className="text-green-500 mr-2" />
                联系方式
              </h2>
              <button className="text-blue-500 text-xs flex items-center hover:text-blue-600">
                <Edit2 size={12} className="mr-1" />
                编辑
              </button>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 w-20">手机号码</span>
                <div className="flex-1 flex justify-end items-center">
                  <input type="tel" className="text-sm text-gray-800 text-right focus:outline-none" defaultValue="13800138000" readOnly />
                  <span className="ml-2 text-[10px] bg-green-50 text-green-600 px-1.5 py-0.5 rounded border border-green-100">已验证</span>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                <span className="text-sm text-gray-500 w-20">电子邮箱</span>
                <input type="email" className="flex-1 text-sm text-gray-800 text-right focus:outline-none" placeholder="请输入邮箱" defaultValue="zhangsan@example.com" />
              </div>
            </div>
          </div>

          {/* 业主信息 */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-50 flex justify-between items-center">
              <h2 className="text-sm font-bold text-gray-800 flex items-center">
                <MapPin size={16} className="text-orange-500 mr-2" />
                业主信息
              </h2>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 w-20">当前住址</span>
                <span className="flex-1 text-sm text-gray-800 text-right">幸福家园 A区-1栋-1001室</span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                <span className="text-sm text-gray-500 w-20">身份类型</span>
                <span className="flex-1 text-sm text-blue-600 font-medium text-right">户主</span>
              </div>
              <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                <span className="text-sm text-gray-500 w-20">证件号码</span>
                <div className="flex-1 flex justify-end items-center text-gray-800 text-sm">
                  <CreditCard size={14} className="mr-1 text-gray-400" />
                  <span>310101********1234</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
