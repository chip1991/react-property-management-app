import { useCallback, useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pause, Square, MessageSquare } from 'lucide-react';
import { useAiStore } from '../store/aiStore';

type SpeechRecognitionAlternativeLike = { transcript: string };
type SpeechRecognitionResultLike = ArrayLike<SpeechRecognitionAlternativeLike>;
type SpeechRecognitionResultsLike = ArrayLike<SpeechRecognitionResultLike>;
type SpeechRecognitionEventLike = { results?: SpeechRecognitionResultsLike };
type SpeechRecognitionErrorEventLike = { error?: string };

type SpeechRecognitionLike = {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorEventLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
};

type SpeechRecognitionCtorLike = new () => SpeechRecognitionLike;

export default function AI() {
  const { startOperation } = useAiStore();
  const [aiState, setAiState] = useState<'userSpeaking' | 'aiThinking' | 'aiSpeaking'>('userSpeaking');
  const [userTranscript, setUserTranscript] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null);

  const speakReply = useCallback(
    (text: string, intent: string) => {
      setAiState('aiSpeaking');

      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'zh-CN';
        utterance.onend = () => {
          setAiState('userSpeaking');
          if (intent && intent !== 'none' && intent !== 'error') {
            startOperation(intent);
          }
        };
        synthesisRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      } else {
        setTimeout(() => {
          setAiState('userSpeaking');
          if (intent && intent !== 'none' && intent !== 'error') {
            startOperation(intent);
          }
        }, 2000);
      }
    },
    [startOperation]
  );

  const handleUserInput = useCallback(
    async (text: string) => {
      setUserTranscript(text);
      setAiResponse('');
      setAiState('aiThinking');
      try {
        const apiUrl = import.meta.env.VITE_QWEN_API_URL || 'https://integrate.api.nvidia.com/v1/chat/completions';
        const modelId = import.meta.env.VITE_QWEN_MODEL_ID || 'qwen/qwen3.5-397b-a17b';

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_QWEN_API_KEY}`
          },
          body: JSON.stringify({
            model: modelId,
            messages: [
              {
                role: 'system',
                content:
                  '你是一个智能助手。请根据用户的输入，返回JSON格式。包含"reply"(确认回复的话)和"intent"(动作标识，如"repair", "navigate"等，如果没有特殊动作则为"none")。仅返回JSON，直接返回纯JSON字符串。'
              },
              {
                role: 'user',
                content: text
              }
            ],
            response_format: { type: 'json_object' }
          })
        });

        const data = (await response.json()) as { choices?: Array<{ message?: { content?: string } }> };
        const content = data.choices?.[0]?.message?.content;
        if (!content) throw new Error('Empty response or invalid API key');
        const jsonStr = content.replace(/```json\n?|\n?```/g, '').trim();
        const parsed = JSON.parse(jsonStr) as { reply?: string; intent?: string };

        const replyText = parsed.reply || '好的。';
        setAiResponse(replyText);
        speakReply(replyText, parsed.intent || 'none');
      } catch (error) {
        console.error('API Error:', error);
        const errorMsg = '抱歉，我遇到了一些问题。';
        setAiResponse(errorMsg + ' (' + (error instanceof Error ? error.message : String(error)) + ')');
        speakReply(errorMsg, 'error');
      }
    },
    [speakReply]
  );

  useEffect(() => {
    const w = window as unknown as {
      SpeechRecognition?: SpeechRecognitionCtorLike;
      webkitSpeechRecognition?: SpeechRecognitionCtorLike;
    };
    const SpeechRecognition = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.lang = 'zh-CN';
      recognition.continuous = false;
      recognition.interimResults = false;

      recognition.onresult = (event: SpeechRecognitionEventLike) => {
        const text = event.results?.[0]?.[0]?.transcript;
        if (text) {
          setUserTranscript(text);
          handleUserInput(text);
        }
      };

      recognition.onerror = (event: SpeechRecognitionErrorEventLike) => {
        console.error('Speech recognition error', event.error);
      };
      
      recognition.onend = () => {
        // Automatically handled by state changes
      };

      recognitionRef.current = recognition;
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (err) {
          void err;
        }
      }
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, [handleUserInput]);

  useEffect(() => {
    if (aiState === 'userSpeaking') {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.start();
        } catch (err) {
          void err;
        }
      }
    } else {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.stop();
        } catch (err) {
          void err;
        }
      }
    }
  }, [aiState]);

  const handlePause = () => {
    if (aiState === 'aiSpeaking') {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
      setAiState('userSpeaking');
    }
  };

  const handleMockInput = () => {
    const text = prompt('请输入模拟语音文本：');
    if (text) {
      setUserTranscript(text);
      handleUserInput(text);
    }
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
      <div className="relative w-full mt-4 px-6 flex flex-col items-center justify-center gap-3">
        {userTranscript && (
          <div className="w-full max-w-[320px] flex flex-col gap-2">
            <div className="w-full rounded-xl bg-white/10 px-4 py-2 text-center">
              <p className="text-xs text-gray-300 truncate">你说：{userTranscript}</p>
            </div>
            {aiResponse && (
              <div className="w-full rounded-xl bg-blue-500/20 border border-blue-500/30 px-4 py-2 text-center">
                <p className="text-xs text-blue-100 line-clamp-3">AI：{aiResponse}</p>
              </div>
            )}
          </div>
        )}
        {/* 模拟输入按钮，用于不支持语音或不想说话时测试 */}
        <button
          onClick={handleMockInput}
          className="w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          title="模拟语音输入"
        >
          <MessageSquare className="w-5 h-5 text-white" />
        </button>
      </div>

    </div>
  );
}