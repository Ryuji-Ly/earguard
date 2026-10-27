import { TextInput, View, StyleSheet } from 'react-native';
import { Text } from './Text';
import { colors, radius, spacing, touchTarget, typography } from '@/theme';

interface InputFieldProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address';
  error?: string;
  testID?: string;
}

export function InputField({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
  testID,
}: InputFieldProps) {
  return (
    <View style={styles.container}>
      <Text variant="label">{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        style={[styles.input, error !== undefined && styles.inputError]}
        accessibilityLabel={label}
        testID={testID}
        autoCapitalize="none"
      />
      {error !== undefined && (
        <Text variant="subtitle" tone="danger" testID={testID !== undefined ? `${testID}-error` : undefined}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: spacing.xs },
  input: {
    minHeight: touchTarget,
    paddingHorizontal: spacing.md,
    borderRadius: radius.sm,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    color: colors.text,
    ...typography.body,
  },
  inputError: { borderColor: colors.danger },
});
