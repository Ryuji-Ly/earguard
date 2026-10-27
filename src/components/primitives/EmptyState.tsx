import { View, StyleSheet } from 'react-native';
import { Icon, type IconName } from './Icon';
import { Text } from './Text';
import { colors, spacing } from '@/theme';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: IconName;
  action?: React.ReactNode;
  testID?: string;
}

export function EmptyState({ title, description, icon, action, testID }: EmptyStateProps) {
  return (
    <View style={styles.base} testID={testID}>
      {icon !== undefined && <Icon name={icon} size={40} color={colors.textMuted} />}
      <Text variant="heading" align="center">{title}</Text>
      {description !== undefined && <Text variant="subtitle" align="center">{description}</Text>}
      {action !== undefined && <View style={styles.action}>{action}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  base: { alignItems: 'center', justifyContent: 'center', gap: spacing.sm, padding: spacing.lg },
  action: { marginTop: spacing.sm },
});
