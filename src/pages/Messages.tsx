import { ChevronLeft, Settings, Circle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Messages() {
  const navigate = useNavigate();

  const mockMessages = [
    {
      id: 1,
      title: '物业费缴纳提醒',
      content: '尊敬的业主，您本月的物业费已出账单，请及时缴纳以免影响正常服务。',
      date: '今天 09:30',
      isRead: false,
      type: 'bill'
    },
    {
      id: 2,
      title: '报修进度更新',
      content: '您的报修单 REP-20240410-001 已经分配给维修工李师傅，他将很快与您联系。',
      date: '昨天 15:20',
      isRead: true,
      type: 'repair'
    },
    {
      id: 3,
      title: '小区停水通知',
      content: '因供水管道维修，预计将于明天上午9:00至下午2:00停水，请提前做好蓄水准备。',
      date: '星期二 10:00',
      isRead: true,
      type: 'notice'
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 w-full max-w-[375px] mx-auto shadow-[0_0_20px_rgba(0,0,0,0.5)]">
      {/* 头部 */}
      <div className="bg-white flex items-center justify-between px-4 h-14 border-b border-gray-100 shrink-0 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="p-2 -ml-2 text-gray-600">
          <ChevronLeft size={24} />
        </button>
        <h1 className="text-lg font-medium text-gray-800">消息通知</h1>
        <button className="p-2 -mr-2 text-gray-600">
          <Settings size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {mockMessages.map((message) => (
          <div key={message.id} className={`bg-white rounded-xl shadow-sm p-4 cursor-pointer hover:bg-gray-50 transition-colors ${!message.isRead ? 'border-l-4 border-blue-500' : 'border-l-4 border-transparent'}`}>
            <div className="flex justify-between items-start mb-2">
              <div className="flex items-center">
                {!message.isRead && <Circle size={8} className="text-blue-500 fill-current mr-2" />}
                <h3 className={`font-medium ${!message.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                  {message.title}
                </h3>
              </div>
              <span className="text-xs text-gray-400 whitespace-nowrap ml-4">{message.date}</span>
            </div>
            <p className="text-sm text-gray-600 line-clamp-2">
              {message.content}
            </p>
          </div>
        ))}

        <div className="text-center py-6">
          <p className="text-gray-400 text-sm flex items-center justify-center">
            <CheckCircle size={16} className="mr-2" />
            已无更多消息
          </p>
        </div>
      </div>
    </div>
  );
}
