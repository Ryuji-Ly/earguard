import { Row } from '@/components/primitives/Row';
import { Stack } from '@/components/primitives/Stack';
import { Text, type TextTone } from '@/components/primitives/Text';
import { classifyDose, formatDose, formatDuration, type DoseLevel } from '@/utils/exposure';
import type { NewMeasurementSession } from '@/types/MeasurementSession';

interface SessionStatsProps {
  session: NewMeasurementSession;
  testID?: string;
}

const doseTone: Record<DoseLevel, TextTone> = {
  low: 'safe',
  high: 'caution',
  over: 'danger',
};

// Duration, average and dose side by side. Used on the Meter tab and in the history.
export function SessionStats({ session, testID }: SessionStatsProps) {
  return (
    <Row gap="md" align="flex-start" justify="space-between" testID={testID}>
      <Stat label="Duration" value={formatDuration(session.durationSeconds / 60)} />
      <Stat label="Average" value={`${Math.round(session.averageDb)} dB`} />
      <Stat
        label="Daily dose"
        value={formatDose(session.dosePercent)}
        tone={doseTone[classifyDose(session.dosePercent)]}
        testID={testID !== undefined ? `${testID}-dose` : undefined}
      />
    </Row>
  );
}

interface StatProps {
  label: string;
  value: string;
  tone?: TextTone;
  testID?: string;
}

function Stat({ label, value, tone = 'default', testID }: StatProps) {
  return (
    <Stack gap="xs" flex={1}>
      <Text variant="subtitle">{label}</Text>
      <Text variant="heading" tone={tone} testID={testID}>{value}</Text>
    </Stack>
  );
}
