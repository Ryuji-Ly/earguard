import { StyleSheet, View } from 'react-native';
import { Row } from '@/components/primitives/Row';
import { Text } from '@/components/primitives/Text';
import { colors, radius, spacing } from '@/theme';

interface LevelBarProps {
  db: number;
  color: string;
}

const MIN_DB = 30;
const MAX_DB = 120;

// Visual only; the dB value and label next to it are what screen readers announce.
export function LevelBar({ db, color }: LevelBarProps) {
  const clamped = Math.min(Math.max(db, MIN_DB), MAX_DB);
  const percentage = ((clamped - MIN_DB) / (MAX_DB - MIN_DB)) * 100;

  return (
    <View style={styles.container} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
      <Row justify="space-between">
        <Text size="sm" tone="muted">{MIN_DB} dB</Text>
        <Text size="sm" tone="muted">{MAX_DB} dB</Text>
      </Row>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.xs, width: '100%' },
  track: {
    height: 12,
    borderRadius: radius.pill,
    backgroundColor: colors.surfaceRaised,
    overflow: 'hidden',
  },
  fill: { height: '100%', borderRadius: radius.pill },
});
