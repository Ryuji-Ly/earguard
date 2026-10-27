import { Pressable, StyleSheet } from 'react-native';
import { Spinner } from '@/components/primitives/Spinner';
import { Text } from '@/components/primitives/Text';
import { colors, radius, spacing, touchTarget } from '@/theme';

interface StyledButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  isLoading?: boolean;
  disabled?: boolean;
  testID?: string;
}

export function StyledButton({
  label,
  onPress,
  variant = 'primary',
  isLoading = false,
  disabled = false,
  testID,
}: StyledButtonProps) {
  const isDisabled = isLoading || disabled;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        pressed && pressedStyles[variant],
        isDisabled && styles.disabled,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: isLoading }}
      testID={testID}
    >
      {isLoading ? (
        <Spinner size="small" />
      ) : (
        <Text variant="button" tone={variant === 'primary' ? 'inverse' : 'default'}>
          {label}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: touchTarget,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.pill,
  },
  primary: { backgroundColor: colors.primary },
  secondary: { backgroundColor: colors.surfaceRaised, borderWidth: 1, borderColor: colors.border },
  disabled: { opacity: 0.5 },
});

const pressedStyles = StyleSheet.create({
  primary: { backgroundColor: colors.primaryPressed },
  secondary: { backgroundColor: colors.border },
});
