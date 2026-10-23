import { View, StyleSheet } from 'react-native';
import { colors, spacing } from '@/theme';

interface NavProps {
  children: React.ReactNode;
  // Extra bottom padding for the device's home indicator; the caller measures it.
  bottomInset?: number;
  testID?: string;
}

// Bottom navigation bar: lives in the thumb zone.
export function Nav({ children, bottomInset = 0, testID }: NavProps) {
  return (
    <View
      style={[styles.base, { paddingBottom: Math.max(bottomInset, spacing.sm) }]}
      accessibilityRole="tablist"
      testID={testID}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.sm,
  },
});
