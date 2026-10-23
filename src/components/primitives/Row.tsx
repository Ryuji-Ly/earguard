import { View, StyleSheet } from 'react-native';
import { spacing } from '@/theme';

interface RowProps {
  children: React.ReactNode;
  gap?: 'none' | 'sm' | 'md' | 'lg';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch';
  justify?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
  wrap?: boolean;
}

export function Row({
  children,
  gap = 'none',
  align = 'center',
  justify = 'flex-start',
  wrap = false,
}: RowProps) {
  return (
    <View
      style={[
        styles.base,
        gapStyles[gap],
        { alignItems: align, justifyContent: justify },
        wrap && styles.wrap,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { flexDirection: 'row' },
  wrap: { flexWrap: 'wrap' },
});

const gapStyles = StyleSheet.create({
  none: { gap: spacing.none },
  sm: { gap: spacing.sm },
  md: { gap: spacing.md },
  lg: { gap: spacing.lg },
});
