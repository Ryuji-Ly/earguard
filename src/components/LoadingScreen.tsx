import { StyleSheet, View } from 'react-native';
import { Spinner } from '@/components/primitives/Spinner';
import { Text } from '@/components/primitives/Text';
import { colors, spacing } from '@/theme';

interface LoadingScreenProps {
  message: string;
  testID?: string;
}

// Full-screen loader, e.g. while the saved login is being checked at startup.
export function LoadingScreen({ message, testID }: LoadingScreenProps) {
  return (
    <View style={styles.base} testID={testID} accessibilityRole="progressbar" accessibilityLabel={message}>
      <Spinner size="large" />
      <Text variant="subtitle">{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: spacing.md, backgroundColor: colors.background },
});
