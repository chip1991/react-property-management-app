import { useState } from 'react';
import { ChevronLeft, Camera, Wrench, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Repair() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };

  if (submitted) {
    return (
      <div className="flex flex-col min-h-screen bg-gray-50 items-center justify-center p-6 w-full max-w-[375px] mx-auto shadow-[0_0_20px_rgba(0,0,0,0.5)]">
        <CheckCircle size={64} className="text-green-500 mb-4" />
        <h2 className="text-xl font-bold text-gray-800 mb-2">提交成功</h2>
        <p className="text-gray-500 text-center">
          您的报修申请已提交，维修人员将尽快与您联系。
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-full max-w-[375px] mx-auto shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      {/* 头部 */}
      <div className="bg-white flex items-center justify-between px-4 h-14 border-b border-gray-100 shrink-0 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-gray-800">报事报修</h1>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="bg-white rounded-xl p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">报修类型</label>
            <div className="grid grid-cols-3 gap-2">
              {['水管报修', '电路维修', '门窗维修', '家电维修', '公共设施', '其他'].map((type, index) => (
                <button
                  key={type}
                  type="button"
                  className={`py-2 px-1 text-sm rounded-lg border ${
                    index === 0 ? 'bg-blue-50 border-blue-200 text-blue-600' : 'border-gray-200 text-gray-600 bg-gray-50'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">问题描述</label>
            <textarea
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors min-h-[120px]"
              placeholder="请详细描述您遇到的问题，以便维修人员更好了解情况..."
              required
            ></textarea>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">上传图片 (选填)</label>
            <div className="flex gap-2">
              <button type="button" className="w-20 h-20 bg-gray-50 border border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:bg-gray-100 transition-colors">
                <Camera size={24} className="mb-1" />
                <span className="text-xs">添加图片</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-sm">
            <label className="block text-sm font-medium text-gray-700 mb-2">联系方式</label>
            <input
              type="tel"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
              placeholder="请输入您的手机号码"
              defaultValue="13800138000"
              required
            />
            <div className="mt-3">
               <label className="block text-sm font-medium text-gray-700 mb-2">预约时间</label>
               <input
                type="datetime-local"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-medium rounded-xl py-3.5 mt-6 shadow-sm hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <Wrench size={18} className="mr-2" />
            提交申请
          </button>
        </form>
      </div>
    </div>
  );
}
