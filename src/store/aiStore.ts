import { create } from 'zustand';

interface AiState {
  isAiOperating: boolean;
  intent: string | null;
  startOperation: (intent?: string) => void;
  stopOperation: () => void;
}

export const useAiStore = create<AiState>((set) => ({
  isAiOperating: false,
  intent: null,
  startOperation: (intent?: string) => set({ isAiOperating: true, intent: intent || null }),
  stopOperation: () => set({ isAiOperating: false, intent: null }),
}));
