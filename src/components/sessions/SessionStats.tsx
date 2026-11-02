import { StyleSheet, View } from 'react-native';
import { Icon, type IconName } from '@/components/primitives/Icon';
import { Row } from '@/components/primitives/Row';
import { Stack } from '@/components/primitives/Stack';
import { Text, type TextTone } from '@/components/primitives/Text';
import { colors } from '@/theme';
import { classifyDose, formatDose, formatDurationShort, type DoseLevel } from '@/utils/exposure';
import type { NewMeasurementSession } from '@/types/MeasurementSession';

interface SessionStatsProps {
  session: NewMeasurementSession;
  testID?: string;
}

interface DoseStyle {
  tone: TextTone;
  color: string;
  // A high dose also gets an icon, so the meaning never depends on colour alone.
  icon: IconName | undefined;
  description: string;
}

const doseStyle: Record<DoseLevel, DoseStyle> = {
  low: { tone: 'safe', color: colors.safe, icon: undefined, description: 'within the safe limit' },
  high: { tone: 'caution', color: colors.caution, icon: 'alert-circle', description: 'more than half the daily limit' },
  over: { tone: 'danger', color: colors.danger, icon: 'warning', description: 'over the daily limit' },
};

// Duration, average and dose side by side. Used on the Meter tab and in the history.
export function SessionStats({ session, testID }: SessionStatsProps) {
  const dose = doseStyle[classifyDose(session.dosePercent)];

  return (
    <Row gap="md" align="flex-start" justify="space-between" testID={testID}>
      <Stat label="Duration" value={formatDurationShort(session.durationSeconds)} />
      <Stat label="Average" value={`${Math.round(session.averageDb)} dB`} />
      <Stat
        label="Daily dose"
        value={formatDose(session.dosePercent)}
        tone={dose.tone}
        icon={dose.icon}
        iconColor={dose.color}
        accessibilityLabel={`Daily dose ${formatDose(session.dosePercent)}, ${dose.description}`}
        testID={testID !== undefined ? `${testID}-dose` : undefined}
      />
    </Row>
  );
}

interface StatProps {
  label: string;
  value: string;
  tone?: TextTone;
  icon?: IconName;
  iconColor?: string;
  accessibilityLabel?: string;
  testID?: string;
}

function Stat({ label, value, tone = 'default', icon, iconColor, accessibilityLabel, testID }: StatProps) {
  return (
    <View style={styles.stat} accessible accessibilityLabel={accessibilityLabel ?? `${label} ${value}`}>
      <Stack gap="xs">
        <Text variant="subtitle">{label}</Text>
        <Row gap="xs">
          <Text variant="heading" tone={tone} testID={testID}>{value}</Text>
          {icon !== undefined && <Icon name={icon} size={18} color={iconColor ?? colors.text} />}
        </Row>
      </Stack>
    </View>
  );
}

const styles = StyleSheet.create({
  stat: { flex: 1 },
});
