import type { Tip } from '@/types/Tip';
import { mockTips } from '@/services/mock/tips';

// Static content for the PWA. Swap the body for a backend query later; callers stay the same.
export async function getTips(): Promise<Tip[]> {
  return mockTips;
}
