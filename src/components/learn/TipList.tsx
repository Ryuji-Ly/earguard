import { EmptyState } from '@/components/primitives/EmptyState';
import { Skeleton } from '@/components/primitives/Skeleton';
import { Stack } from '@/components/primitives/Stack';
import { StyledButton } from '@/components/StyledButton';
import { TipCard } from './TipCard';
import type { Tip } from '@/types/Tip';

interface TipListProps {
  tips: Tip[];
  status: 'idle' | 'loading' | 'loaded' | 'error';
  expandedTipId: string | undefined;
  onToggle: (id: string) => void;
  onRetry: () => void;
}

export function TipList({ tips, status, expandedTipId, onToggle, onRetry }: TipListProps) {
  if (status === 'idle' || status === 'loading') {
    return (
      <Stack gap="md" testID="tips-loading">
        <Skeleton height={72} borderRadius={14} />
        <Skeleton height={72} borderRadius={14} />
        <Skeleton height={72} borderRadius={14} />
      </Stack>
    );
  }

  if (status === 'error') {
    return (
      <EmptyState
        icon="cloud-offline-outline"
        title="Couldn't load tips"
        description="Check your connection and try again."
        action={<StyledButton label="Try again" onPress={onRetry} variant="secondary" testID="tips-retry" />}
        testID="tips-error"
      />
    );
  }

  if (tips.length === 0) {
    return <EmptyState icon="book-outline" title="No tips yet" testID="tips-empty" />;
  }

  return (
    <Stack gap="md" testID="tips-list">
      {tips.map((tip) => (
        <TipCard
          key={tip.id}
          tip={tip}
          expanded={tip.id === expandedTipId}
          onToggle={() => onToggle(tip.id)}
        />
      ))}
    </Stack>
  );
}
