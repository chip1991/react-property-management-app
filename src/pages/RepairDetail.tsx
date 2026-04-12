import { ChevronLeft, Wrench, Clock, MapPin, FileText, CheckCircle2, MoreHorizontal } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';

export default function RepairDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  // 模拟基于 id 的详情数据（生产环境中应通过 API 请求获取）
  const mockDetail = {
    id: id || 'RP2023100801',
    status: '处理中', // 待处理, 处理中, 已完成
    title: '主卧空调漏水',
    type: '家电维修',
    time: '2023-10-08 14:30',
    address: '1栋 1单元 1201室',
    desc: '空调内机持续滴水，已经影响到地板了，请尽快安排师傅上门查看。',
    images: [
      'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
    ],
    timeline: [
      { time: '2023-10-08 14:30', action: '提交报修申请', desc: '您的报修申请已提交，等待物业分派。', active: true },
      { time: '2023-10-08 15:00', action: '物业已接单', desc: '物业已指派维修工【张师傅】为您服务。', active: true },
      { time: '2023-10-08 15:30', action: '师傅已出发', desc: '维修师傅正在前往您的住处，预计10分钟后到达。', active: true },
      { time: '', action: '维修完成', desc: '等待师傅确认维修完成。', active: false },
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case '待处理': return 'text-orange-500 bg-orange-50 border-orange-200';
      case '处理中': return 'text-blue-500 bg-blue-50 border-blue-200';
      case '已完成': return 'text-green-500 bg-green-50 border-green-200';
      default: return 'text-gray-500 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-full max-w-[375px] mx-auto shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      {/* 头部 */}
      <div className="bg-white flex items-center justify-between px-4 h-14 border-b border-gray-100 shrink-0 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-gray-800">报修详情</h1>
        <button className="p-2 -mr-2 text-gray-600">
          <MoreHorizontal size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* 状态卡片 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-1">{mockDetail.title}</h2>
              <p className="text-sm text-gray-500">工单号：{mockDetail.id}</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(mockDetail.status)}`}>
              {mockDetail.status}
            </span>
          </div>

          <div className="space-y-3 pt-4 border-t border-gray-100">
            <div className="flex items-center text-sm">
              <Wrench className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
              <span className="text-gray-500 w-16">报修类型</span>
              <span className="text-gray-800">{mockDetail.type}</span>
            </div>
            <div className="flex items-center text-sm">
              <Clock className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
              <span className="text-gray-500 w-16">提交时间</span>
              <span className="text-gray-800">{mockDetail.time}</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="w-4 h-4 text-gray-400 mr-3 shrink-0" />
              <span className="text-gray-500 w-16">服务地址</span>
              <span className="text-gray-800">{mockDetail.address}</span>
            </div>
          </div>
        </div>

        {/* 问题描述 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center mb-3">
            <FileText className="w-5 h-5 text-blue-500 mr-2" />
            <h3 className="text-base font-bold text-gray-800">问题描述</h3>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-3 rounded-xl mb-3">
            {mockDetail.desc}
          </p>
          <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
            {mockDetail.images.map((img, idx) => (
              <img 
                key={idx} 
                src={img} 
                alt="问题照片" 
                className="w-20 h-20 object-cover rounded-xl shrink-0 border border-gray-100"
              />
            ))}
          </div>
        </div>

        {/* 进度追踪 */}
        <div className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <h3 className="text-base font-bold text-gray-800 mb-5">处理进度</h3>
          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 before:to-transparent">
            {mockDetail.timeline.map((item, idx) => (
              <div key={idx} className="relative flex items-start">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 z-10 ${
                  item.active ? 'bg-blue-500 text-white shadow-[0_0_0_4px_rgba(59,130,246,0.1)]' : 'bg-gray-200 text-gray-400'
                }`}>
                  {item.active ? <CheckCircle2 className="w-3 h-3" /> : <div className="w-2 h-2 rounded-full bg-white" />}
                </div>
                <div className="ml-4 flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h4 className={`text-sm font-bold ${item.active ? 'text-gray-800' : 'text-gray-400'}`}>{item.action}</h4>
                    {item.time && <span className="text-xs text-gray-400">{item.time}</span>}
                  </div>
                  <p className={`text-xs ${item.active ? 'text-gray-500' : 'text-gray-400'}`}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* 底部固定操作栏 */}
      {mockDetail.status !== '已完成' && (
        <div className="bg-white border-t border-gray-100 px-4 py-3 pb-8 fixed bottom-0 w-full max-w-[375px] left-1/2 -translate-x-1/2 flex gap-3">
          <button className="flex-1 bg-gray-100 text-gray-700 font-medium py-3 rounded-xl hover:bg-gray-200 transition-colors">
            催单
          </button>
          <button className="flex-1 bg-blue-600 text-white font-medium py-3 rounded-xl shadow-lg shadow-blue-200 hover:bg-blue-700 transition-colors">
            联系师傅
          </button>
        </div>
      )}
    </div>
  );
}