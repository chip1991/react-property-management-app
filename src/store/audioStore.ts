import { create } from 'zustand';

interface AudioState {
  audio: HTMLAudioElement | null;
  isPlaying: boolean;
  initAudio: () => void;
  play: () => void;
  pause: () => void;
  toggle: () => void;
  stop: () => void;
}

// 欢迎语音频地址，你可以把你的欢迎语音频文件（比如 welcome.mp3）放到 public 目录下，然后修改下面的名字
const AUDIO_URL = '/welcome.mp3';

export const useAudioStore = create<AudioState>((set, get) => ({
  audio: null,
  isPlaying: false,

  initAudio: () => {
    if (get().audio) return;
    
    const audio = new Audio(AUDIO_URL);
    audio.loop = false; // 取消循环播放，只播放一次
    
    // 监听原生音频事件，同步状态
    audio.addEventListener('play', () => set({ isPlaying: true }));
    audio.addEventListener('pause', () => set({ isPlaying: false }));
    audio.addEventListener('ended', () => set({ isPlaying: false }));
    
    set({ audio });
  },

  play: () => {
    const { audio, initAudio } = get();
    if (!audio) {
      initAudio();
      get().audio?.play().catch(console.error);
    } else {
      audio.play().catch(console.error);
    }
  },

  pause: () => {
    const { audio } = get();
    if (audio) {
      audio.pause();
    }
  },

  toggle: () => {
    const { isPlaying, play, pause } = get();
    if (isPlaying) {
      pause();
    } else {
      play();
    }
  },

  stop: () => {
    const { audio } = get();
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
      set({ isPlaying: false });
    }
  }
}));
