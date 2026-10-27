import { Card } from '@/components/primitives/Card';
import { Skeleton } from '@/components/primitives/Skeleton';
import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';
import { radius } from '@/theme';

// Shown for the moment between "microphone started" and the first measurement.
export function SoundLevelGaugeSkeleton() {
  return (
    <Card testID="sound-level-gauge-loading">
      <Stack gap="md" align="center">
        <Skeleton width={140} height={64} borderRadius={radius.md} />
        <Text variant="subtitle">Listening…</Text>
        <Skeleton height={8} borderRadius={radius.pill} />
      </Stack>
    </Card>
  );
}
