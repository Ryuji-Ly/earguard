import { ScrollView, View, StyleSheet } from 'react-native';
import { colors, spacing } from '@/theme';

type ScreenPadding = 'none' | 'sm' | 'md' | 'lg';

interface ScreenProps {
  children: React.ReactNode;
  padding?: ScreenPadding;
  scrollable?: boolean;
  testID?: string;
}

export function Screen({ children, padding = 'md', scrollable = true, testID }: ScreenProps) {
  if (!scrollable) {
    return (
      <View style={[styles.container, paddingStyles[padding]]} testID={testID}>
        {children}
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.scroll}
      contentContainerStyle={[styles.content, paddingStyles[padding]]}
      testID={testID}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scroll: { flex: 1, backgroundColor: colors.background },
  container: { flex: 1, backgroundColor: colors.background },
  content: { flexGrow: 1 },
});

const paddingStyles = StyleSheet.create({
  none: { padding: spacing.none },
  sm: { padding: spacing.sm },
  md: { padding: spacing.md },
  lg: { padding: spacing.lg },
});
