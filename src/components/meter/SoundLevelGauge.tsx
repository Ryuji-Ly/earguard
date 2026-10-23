import { View } from 'react-native';
import { Card } from '@/components/primitives/Card';
import { Icon } from '@/components/primitives/Icon';
import { Row } from '@/components/primitives/Row';
import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';
import { LevelBar } from './LevelBar';
import { levelStyle } from './levelStyle';
import { getLevelInfo } from '@/utils/exposure';

interface SoundLevelGaugeProps {
  db: number;
}

export function SoundLevelGauge({ db }: SoundLevelGaugeProps) {
  const info = getLevelInfo(db);
  const style = levelStyle[info.level];
  const rounded = Math.round(db);

  return (
    <Card variant={style.card} testID="sound-level-gauge">
      <Stack gap="md" align="center">
        <View
          accessible
          accessibilityRole="text"
          accessibilityLabel={`${rounded} decibels, ${info.label}. ${info.description}`}
          accessibilityLiveRegion="polite"
        >
          <Stack gap="sm" align="center">
            <Row gap="sm" align="flex-end">
              <Text size="display" weight="bold" testID="sound-level-value">{rounded}</Text>
              <Text size="xl" tone="muted">dB</Text>
            </Row>
            <Row gap="sm">
              <Icon name={style.icon} size={22} color={style.color} />
              <Text size="lg" weight="bold" tone={style.tone} testID="sound-level-label">
                {info.label}
              </Text>
            </Row>
            <Text align="center" tone="muted">{info.description}</Text>
          </Stack>
        </View>
        <LevelBar db={db} color={style.color} />
      </Stack>
    </Card>
  );
}
