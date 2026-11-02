import { useState } from 'react';
import { InputField } from '@/components/primitives/InputField';
import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';
import { StyledButton } from '@/components/StyledButton';

// Supabase's default minimum; checked here too so the user gets instant feedback.
const MIN_PASSWORD_LENGTH = 6;

interface RegisterFormProps {
  onSubmit: (name: string, email: string, password: string) => void;
  isLoading: boolean;
  error?: string;
}

export function RegisterForm({ onSubmit, isLoading, error }: RegisterFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const passwordTooShort = password.length > 0 && password.length < MIN_PASSWORD_LENGTH;
  const canSubmit = name.trim() !== '' && email.trim() !== '' && password.length >= MIN_PASSWORD_LENGTH;

  return (
    <Stack gap="md">
      <InputField
        label="Name"
        value={name}
        onChangeText={setName}
        placeholder="How should we call you?"
        autoCapitalize="words"
        testID="register-name-input"
      />
      <InputField
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        keyboardType="email-address"
        testID="register-email-input"
      />
      <InputField
        label="Password"
        value={password}
        onChangeText={setPassword}
        placeholder={`At least ${MIN_PASSWORD_LENGTH} characters`}
        secureTextEntry
        error={passwordTooShort ? `Use at least ${MIN_PASSWORD_LENGTH} characters.` : undefined}
        testID="register-password-input"
      />
      {error !== undefined && (
        <Text tone="danger" testID="register-error">{error}</Text>
      )}
      <StyledButton
        label="Create account"
        onPress={() => onSubmit(name, email, password)}
        isLoading={isLoading}
        disabled={!canSubmit}
        testID="register-button"
      />
    </Stack>
  );
}
