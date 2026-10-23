import { View, StyleSheet } from 'react-native';
import { Text, type TextTone } from './Text';
import { colors, radius, spacing } from '@/theme';

type BadgeVariant = 'default' | 'success' | 'warning' | 'error';

interface BadgeProps {
  label: string;
  variant?: BadgeVariant;
  testID?: string;
}

const toneByVariant: Record<BadgeVariant, TextTone> = {
  default: 'default',
  success: 'safe',
  warning: 'caution',
  error: 'danger',
};

export function Badge({ label, variant = 'default', testID }: BadgeProps) {
  return (
    <View style={[styles.base, styles[variant]]} testID={testID}>
      <Text size="sm" weight="bold" tone={toneByVariant[variant]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.sm + 2,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  default: {
    backgroundColor: colors.surfaceRaised,
  },
  success: {
    backgroundColor: colors.safeSoft,
  },
  warning: {
    backgroundColor: colors.cautionSoft,
  },
  error: {
    backgroundColor: colors.dangerSoft,
  },
});
