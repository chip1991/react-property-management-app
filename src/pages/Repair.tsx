import { useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, Camera, Wrench, CheckCircle, Mic } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

type SpeechRecognitionAlternativeLike = { transcript: string };
type SpeechRecognitionResultLike = ArrayLike<SpeechRecognitionAlternativeLike> & { isFinal?: boolean };
type SpeechRecognitionResultsLike = ArrayLike<SpeechRecognitionResultLike>;
type SpeechRecognitionEventLike = { results?: SpeechRecognitionResultsLike; resultIndex?: number };
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

export default function Repair() {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [description, setDescription] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [voiceHint, setVoiceHint] = useState<string | null>(null);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const listeningRef = useRef(false);
  const silenceTimerRef = useRef<number | null>(null);
  const lastResultAtRef = useRef<number | null>(null);
  const finalTranscriptRef = useRef('');
  const interimTranscriptRef = useRef('');
  const lastFinalIndexRef = useRef(0);
  const stoppingForSilenceRef = useRef(false);

  const getSessionTranscript = useCallback(() => {
    return `${finalTranscriptRef.current}${interimTranscriptRef.current}`.trim();
  }, []);

  const resetSessionTranscript = useCallback(() => {
    finalTranscriptRef.current = '';
    interimTranscriptRef.current = '';
    lastFinalIndexRef.current = 0;
    lastResultAtRef.current = null;
    stoppingForSilenceRef.current = false;
  }, []);

  const setListening = useCallback((value: boolean) => {
    listeningRef.current = value;
    setIsListening(value);
  }, []);

  const appendDescription = useCallback((text: string) => {
    setDescription((prev) => (prev ? `${prev}\n${text}` : text));
  }, []);

  const commitSessionTranscript = useCallback(() => {
    const text = getSessionTranscript();
    if (text) {
      appendDescription(text);
    }
    resetSessionTranscript();
  }, [appendDescription, getSessionTranscript, resetSessionTranscript]);

  const promptFallback = useCallback(
    (promptText: string, hint?: string) => {
      if (hint) setVoiceHint(hint);
      const text = prompt(promptText);
      if (text) appendDescription(text);
    },
    [appendDescription]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      navigate(-1);
    }, 2000);
  };

  const clearSilenceTimer = useCallback(() => {
    if (silenceTimerRef.current != null) {
      window.clearInterval(silenceTimerRef.current);
      silenceTimerRef.current = null;
    }
  }, []);

  const startSilenceTimer = useCallback(() => {
    clearSilenceTimer();
    silenceTimerRef.current = window.setInterval(() => {
      if (!listeningRef.current) return;
      if (!lastResultAtRef.current) return;
      const silenceMs = Date.now() - lastResultAtRef.current;
      if (silenceMs < 3000) return;
      const text = getSessionTranscript();
      if (!text) return;
      if (!recognitionRef.current) return;

      stoppingForSilenceRef.current = true;
      try {
        recognitionRef.current.stop();
      } catch {
        setListening(false);
      }
    }, 200);
  }, [clearSilenceTimer, setListening, getSessionTranscript]);

  useEffect(() => {
    const w = window as unknown as {
      SpeechRecognition?: SpeechRecognitionCtorLike;
      webkitSpeechRecognition?: SpeechRecognitionCtorLike;
    };
    const SpeechRecognition = w.SpeechRecognition ?? w.webkitSpeechRecognition;
    if (!SpeechRecognition || !window.isSecureContext) return;

    const recognition = new SpeechRecognition();
    recognition.lang = 'zh-CN';
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: SpeechRecognitionEventLike) => {
      const results = event.results;
      if (!results || results.length === 0) return;

      lastResultAtRef.current = Date.now();
      setVoiceHint(null);
      startSilenceTimer();

      let currentInterim = '';
      for (let i = event.resultIndex ?? 0; i < results.length; i += 1) {
        const result = results[i];
        if (!result) continue;
        const transcript = result[0]?.transcript || '';

        if (result.isFinal) {
          if (i >= lastFinalIndexRef.current) {
            finalTranscriptRef.current += transcript;
            lastFinalIndexRef.current = i + 1;
          }
        } else {
          currentInterim += transcript;
        }
      }
      interimTranscriptRef.current = currentInterim;
      
      // 触发一次 state 更新以渲染 interim
      setDescription((prev) => prev);
    };

    recognition.onerror = (event: SpeechRecognitionErrorEventLike) => {
      clearSilenceTimer();
      setListening(false);
      resetSessionTranscript();
      if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
        promptFallback('麦克风权限被拒绝，请手动输入问题描述：', '权限被拒绝，请手动输入');
      } else {
        promptFallback('语音识别出错了，请手动输入：', '识别出错，请重试或手动输入');
      }
    };

    recognition.onend = () => {
      clearSilenceTimer();
      commitSessionTranscript();
      
      const shouldRestart = listeningRef.current && !stoppingForSilenceRef.current;
      if (shouldRestart) {
        try {
          recognition.start();
        } catch {
          setListening(false);
        }
      } else {
        setListening(false);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      clearSilenceTimer();
      recognition.stop();
      recognitionRef.current = null;
      setListening(false);
      lastResultAtRef.current = null;
      finalTranscriptRef.current = '';
      interimTranscriptRef.current = '';
      lastFinalIndexRef.current = 0;
      stoppingForSilenceRef.current = false;
    };
  }, [appendDescription, clearSilenceTimer, promptFallback, setListening, startSilenceTimer]);

  const handleVoiceInput = () => {
    setVoiceHint(null);

    if (!window.isSecureContext) {
      promptFallback('当前页面不在安全环境（HTTPS）下，无法使用语音识别，请输入问题描述：');
      return;
    }

    if (!recognitionRef.current) {
      promptFallback('当前浏览器不支持语音识别，请输入问题描述：');
      return;
    }

    if (listeningRef.current) {
      clearSilenceTimer();
      commitSessionTranscript();
      try {
        recognitionRef.current.stop();
      } finally {
        setListening(false);
      }
      return;
    }

    try {
      resetSessionTranscript();
      lastResultAtRef.current = Date.now();
      setListening(true);
      recognitionRef.current.start();
      startSilenceTimer();
    } catch (e: unknown) {
      clearSilenceTimer();
      setListening(false);
      const message =
        e instanceof Error && e.message.trim()
          ? `语音识别启动失败（${e.message}），已切换为文本输入。`
          : '语音识别启动失败，已切换为文本输入。';
      promptFallback('语音识别启动失败，请输入问题描述：', message);
    }
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
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">问题描述</label>
              <button
                type="button"
                onClick={handleVoiceInput}
                className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"
              >
                <Mic size={16} />
                {isListening ? '识别中…' : '语音输入'}
                {isListening && (
                  <div className="flex items-center gap-0.5 h-4 ml-1">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="w-[2px] bg-blue-600 rounded-full animate-voice-pulse"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                )}
              </button>
            </div>
            {voiceHint ? <div className="mb-2 text-xs text-red-500">{voiceHint}</div> : null}
            <textarea
              className={`w-full border border-gray-200 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors min-h-[120px] ${
                isListening ? 'bg-gray-100 text-gray-600 cursor-not-allowed' : 'bg-gray-50 focus:bg-white'
              }`}
              placeholder="请详细描述您遇到的问题，以便维修人员更好了解情况..."
              value={isListening ? `${description}\n${getSessionTranscript()}`.trim() : description}
              onChange={(e) => setDescription(e.target.value)}
              required
              readOnly={isListening}
            />
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
