import { Card } from '@/components/primitives/Card';
import { Icon } from '@/components/primitives/Icon';
import { Row } from '@/components/primitives/Row';
import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';
import { formatDuration, safeListeningMinutes } from '@/utils/exposure';
import { colors } from '@/theme';

interface SafeTimeCardProps {
  db: number;
}

export function SafeTimeCard({ db }: SafeTimeCardProps) {
  const minutes = safeListeningMinutes(db);
  const value = minutes === undefined ? 'No daily limit' : formatDuration(minutes);

  return (
    <Card testID="safe-time-card">
      <Row gap="md">
        <Icon name="time-outline" size={28} color={colors.primary} />
        <Stack gap="none" flex={1}>
          <Text variant="subtitle">Safe time at this level, without earplugs</Text>
          <Text variant="heading" testID="safe-time-value">{value}</Text>
        </Stack>
      </Row>
    </Card>
  );
}
