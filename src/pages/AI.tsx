import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Square } from 'lucide-react';
import { useAudioStore } from '../store/audioStore';

export default function AI() {
  const { isPlaying, stop, play } = useAudioStore();
  
  // 移除 idle，默认直接进入 userSpeaking (正在聆听) 状态
  const [aiState, setAiState] = useState<'userSpeaking' | 'aiThinking' | 'aiSpeaking'>('userSpeaking');

  // 为了演示全流程，模拟从用户说话 -> 思考 -> AI说话 的状态流转
  useEffect(() => {
    let timer1: ReturnType<typeof setTimeout>;
    let timer2: ReturnType<typeof setTimeout>;

    if (aiState === 'userSpeaking') {
      // 模拟用户说话 3 秒后，进入 AI 思考状态
      timer1 = setTimeout(() => {
        setAiState('aiThinking');
      }, 3000);
    } else if (aiState === 'aiThinking') {
      // 模拟 AI 思考 2.5 秒后，进入 AI 说话状态并播放音频
      timer2 = setTimeout(() => {
        setAiState('aiSpeaking');
        play();
      }, 2500);
    }

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, [aiState, play]);

  // 与实际音频播放状态联动
  useEffect(() => {
    if (isPlaying && aiState !== 'aiSpeaking') {
      setAiState('aiSpeaking');
    } else if (!isPlaying && aiState === 'aiSpeaking') {
      // 播放结束后恢复到聆听状态
      setAiState('userSpeaking');
    }
  }, [isPlaying, aiState]);

  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  const handlePause = () => {
    if (isPlaying) {
      stop();
    }
    // 暂停后恢复到聆听状态
    setAiState('userSpeaking');
  };

  return (
    <div 
      className="flex flex-col items-center justify-between h-full w-full max-w-[375px] mx-auto bg-black text-white relative overflow-hidden font-sans pt-12 pb-8 shadow-[0_0_20px_rgba(0,0,0,0.5)]" 
    >
      {/* SVG Gooey 滤镜，用于实现 AI 思考状态下的流体粘连效果 */}
      <svg style={{ position: 'absolute', width: 0, height: 0 }} aria-hidden="true">
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 35 -15" 
              result="goo" 
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* 核心动画区域：占屏幕大比例，绝对居中 */}
      <div className="relative flex-1 flex flex-col items-center justify-center w-full max-h-[50%] mt-8">
        <AnimatePresence mode="wait">
          
          {/* 状态 1: 用户说话 (巨大的中心白圆) */}
          {aiState === 'userSpeaking' && (
            <motion.div
              key="breathing-circle"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0, transition: { duration: 0.3 } }}
              className="relative flex items-center justify-center w-full"
            >
              {/* 几乎占据屏幕宽度的纯白实心大圆 */}
              <div className={`w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-white relative z-10 animate-breathe-circle`}></div>
            </motion.div>
          )}

          {/* 状态 2: AI 思考中 (高级流体云朵) */}
          {aiState === 'aiThinking' && (
            <motion.div
              key="thinking-cloud"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0, transition: { duration: 0.3 } }}
              className="relative w-full h-64 flex items-center justify-center"
              style={{ filter: "url('#goo')" }}
            >
              <motion.div className="absolute w-40 h-40 bg-white rounded-full animate-orb-morph" />
              <motion.div className="absolute w-28 h-28 bg-white rounded-full animate-orbit" />
              <motion.div className="absolute w-24 h-24 bg-white rounded-full animate-orbit-reverse" />
            </motion.div>
          )}

          {/* 状态 3: AI 说话中 (4个大圆点并排) */}
          {aiState === 'aiSpeaking' && (
            <motion.div 
              key="ai-dots"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.3 } }}
              className="flex items-center justify-center gap-6 w-full h-32"
            >
              {[1, 2, 3, 4].map((i) => (
                <div 
                  key={`large-${i}`} 
                  className="w-14 bg-white rounded-full animate-spectrum-wave-large"
                  style={{ animationDelay: `${i * 0.2}s`, animationDuration: '0.8s' }}
                />
              ))}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* 状态提示区 (Status Area) & 暂停按钮 - 处于绝对固定的同一水平高度 */}
      <div className="relative h-20 mt-4 w-full px-8">
        
        {/* 控制按钮 - 带有 iOS 风格的物理平滑移动 (使用 layout 属性) 
            高度自始至终固定在 top-0 (垂直不跳动)
            在 userSpeaking 阶段：左侧 8
            在 aiThinking / aiSpeaking 阶段：移动到正中央 (left-1/2 -translate-x-1/2)
        */}
        <motion.button 
          layout
          onClick={(e) => { e.stopPropagation(); handlePause(); }} 
          className={`absolute w-12 h-12 flex items-center justify-center rounded-full border-2 border-white/50 hover:bg-white/10 transition-colors z-30 top-0 ${
            aiState === 'userSpeaking' 
              ? 'left-8' 
              : 'left-1/2 -translate-x-1/2'
          }`}
          transition={{
            type: 'spring',
            stiffness: 400,
            damping: 30,
            mass: 1.2
          }}
        >
          {aiState === 'aiSpeaking' ? (
            <Square className="w-5 h-5 text-white fill-white" />
          ) : (
            <Pause className="w-5 h-5 text-white fill-white" />
          )}
        </motion.button>

        {/* 状态提示组件 - 分离各阶段逻辑 */}
        <div className="w-full h-full relative">
          <AnimatePresence>
            
            {/* 第一阶段：用户说话中 (小点起伏 + Listening)
                整体包裹在一个绝对定位的容器中，高度为 12 (48px，与控制按钮一致)，确保它们与左侧控制按钮在同一水平线上完全对齐
            */}
            {aiState === 'userSpeaking' && (
              <motion.div 
                key="user-dots-state"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="absolute inset-x-0 top-0 h-12 flex flex-col items-center justify-center" 
              >
                <div className="flex items-end justify-center gap-2 mb-1 h-6">
                  {[1, 2, 3, 4].map((i) => (
                    <div 
                      key={`small-${i}`} 
                      className="w-2 bg-white rounded-full animate-spectrum-wave-small"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
                <p className="text-gray-400 text-sm font-medium leading-none">Listening</p>
              </motion.div>
            )}

            {/* 第三阶段：AI 说话中 (Tap to interrupt)
                单独放置在控制按钮 (h-12) 之下，垂直向下偏移以出现在居中控制按钮的正下方
            */}
            {aiState === 'aiSpeaking' && (
              <motion.div 
                key="ai-speaking-text"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10, transition: { duration: 0.2 } }}
                className="absolute inset-x-0 top-14 flex flex-col items-center justify-center" 
              >
                <p className="text-gray-400 text-sm font-medium">Tap to interrupt</p>
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>

      {/* 底部按钮区 (仅保留退出/关闭) */}
      <div className="relative w-full h-20 mt-4 px-6 flex items-center justify-center">
        {/* 居中关闭按钮 (纯白X，红色背景) */}
      </div>

    </div>
  );
}