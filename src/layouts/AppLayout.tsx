import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { Home, Mic, User, X } from 'lucide-react';
import { useAudioStore } from '../store/audioStore';

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { play, stop, hasPlayed } = useAudioStore();

  const handleAIMicClick = () => {
    // 如果当前在 AI 页面，点击红色 X 则退出到首页并停止音频
    if (location.pathname === '/ai') {
      stop();
      navigate('/');
    } else {
      // 否则进入 AI 页面，并触发播放
      navigate('/ai');
      if (!hasPlayed) {
        play();
      }
    }
  };

  return (
    <div className="relative w-full max-w-[375px] mx-auto h-screen bg-gray-50 flex flex-col shadow-[0_0_20px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* 页面内容区 */}
      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>

      {/* 底部导航栏 */}
      <nav className="absolute bottom-0 w-full h-16 bg-white border-t border-gray-200 flex items-center justify-around px-4 z-50">
        <button 
          onClick={() => navigate('/')}
          className={`flex flex-col items-center gap-1 ${
            location.pathname === '/' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <Home className="w-6 h-6" />
          <span className="text-[10px]">首页</span>
        </button>

        {/* 突出的中心按钮 (AI) */}
        <div className="relative -top-5">
          <button 
            onClick={handleAIMicClick}
            className={`w-14 h-14 rounded-full flex items-center justify-center text-white shadow-lg transition-transform active:scale-95 ${
              location.pathname === '/ai' 
                ? 'bg-[#FF6B6B] hover:bg-[#ff5252]' // AI 页面内为红色关闭按钮
                : 'bg-gradient-to-tr from-blue-500 to-blue-400 hover:from-blue-600 hover:to-blue-500' // 其他页面为蓝色麦克风
            }`}
          >
            {location.pathname === '/ai' ? (
              <X className="w-7 h-7" strokeWidth={2.5} />
            ) : (
              <>
                <Mic className="w-7 h-7 relative z-10" />
                <div className="absolute inset-0 rounded-full border-2 border-blue-400 animate-ping opacity-20"></div>
              </>
            )}
          </button>
        </div>

        <button 
          onClick={() => navigate('/mine')}
          className={`flex flex-col items-center gap-1 ${
            location.pathname === '/mine' ? 'text-blue-600' : 'text-gray-500'
          }`}
        >
          <User className="w-6 h-6" />
          <span className="text-[10px]">我的</span>
        </button>
      </nav>
    </div>
  );
}
