import { create } from 'zustand';
import { getTips } from '@/services/tipService';
import type { Tip } from '@/types/Tip';

type LoadStatus = 'idle' | 'loading' | 'loaded' | 'error';

interface TipsState {
  tips: Tip[];
  status: LoadStatus;
  expandedTipId: string | undefined;
  loadTips: () => Promise<void>;
  toggleTip: (id: string) => void;
}

export const useTipsStore = create<TipsState>((set, get) => ({
  tips: [],
  status: 'idle',
  expandedTipId: undefined,
  loadTips: async () => {
    // Cached: only fetch once per session, revisiting the tab reuses the stored tips.
    if (get().status === 'loaded' || get().status === 'loading') return;
    set({ status: 'loading' });
    try {
      const tips = await getTips();
      set({ tips, status: 'loaded' });
    } catch {
      set({ status: 'error' });
    }
  },
  toggleTip: (id) => set({ expandedTipId: get().expandedTipId === id ? undefined : id }),
}));
