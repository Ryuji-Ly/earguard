import { StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '@/theme';

interface AppShellProps {
  children: React.ReactNode;
}

// Outermost wrapper: app background + top safe area (the tab bar handles the bottom inset).
export function AppShell({ children }: AppShellProps) {
  return (
    <SafeAreaView style={styles.base} edges={['top', 'left', 'right']}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  base: { flex: 1, backgroundColor: colors.background },
});
