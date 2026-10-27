import { Pressable, StyleSheet } from 'react-native';
import { Icon, type IconName } from './Icon';
import { Text } from './Text';
import { colors, spacing, touchTarget } from '@/theme';

interface NavItemProps {
  label: string;
  onPress: () => void;
  active?: boolean;
  icon?: IconName;
  testID?: string;
}

export function NavItem({ label, onPress, active = false, icon, testID }: NavItemProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.base, pressed && styles.pressed]}
      accessibilityRole="tab"
      accessibilityLabel={label}
      accessibilityState={{ selected: active }}
      testID={testID}
    >
      {icon !== undefined && (
        <Icon name={icon} size={24} color={active ? colors.primary : colors.textMuted} />
      )}
      <Text variant="label" tone={active ? 'primary' : 'muted'}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flex: 1,
    minHeight: touchTarget,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  pressed: { opacity: 0.7 },
});
