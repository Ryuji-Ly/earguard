import { View, Pressable, StyleSheet } from 'react-native';
import { colors, radius, spacing } from '@/theme';

interface CardProps {
  children: React.ReactNode;
  onPress?: () => void;
  variant?: 'default' | 'safe' | 'caution' | 'danger';
  testID?: string;
}

export function Card({ children, onPress, variant = 'default', testID }: CardProps) {
  if (onPress !== undefined) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.base, styles[variant], pressed && styles.pressed]}
        accessibilityRole="button"
        testID={testID}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={[styles.base, styles[variant]]} testID={testID}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.surface,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  default: {},
  safe: { backgroundColor: colors.safeSoft, borderColor: colors.safe },
  caution: { backgroundColor: colors.cautionSoft, borderColor: colors.caution },
  danger: { backgroundColor: colors.dangerSoft, borderColor: colors.danger },
  pressed: { opacity: 0.8 },
});
