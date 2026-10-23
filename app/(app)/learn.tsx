import { useEffect } from 'react';
import { useTipsStore } from '@/state/useTipsStore';
import { Screen } from '@/components/primitives/Screen';
import { Stack } from '@/components/primitives/Stack';
import { ScreenHeader } from '@/components/ScreenHeader';
import { TipList } from '@/components/learn/TipList';

export default function LearnScreen() {
  const { tips, status, expandedTipId, loadTips, toggleTip } = useTipsStore();

  useEffect(() => {
    loadTips();
  }, [loadTips]);

  return (
    <Screen padding="lg" testID="learn-screen">
      <Stack gap="lg">
        <ScreenHeader title="Protect your hearing" subtitle="Quick tips for your next festival." />
        <TipList
          tips={tips}
          status={status}
          expandedTipId={expandedTipId}
          onToggle={toggleTip}
          onRetry={loadTips}
        />
      </Stack>
    </Screen>
  );
}
