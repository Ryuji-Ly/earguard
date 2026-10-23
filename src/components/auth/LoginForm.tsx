import { useState } from 'react';
import { InputField } from '@/components/primitives/InputField';
import { Stack } from '@/components/primitives/Stack';
import { StyledButton } from '@/components/StyledButton';

interface LoginFormProps {
  onSubmit: (email: string, password: string) => void;
  isLoading: boolean;
  error?: string;
}

export function LoginForm({ onSubmit, isLoading, error }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Stack gap="md">
      <InputField
        label="Email"
        value={email}
        onChangeText={setEmail}
        placeholder="you@example.com"
        keyboardType="email-address"
        testID="email-input"
      />
      <InputField
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        testID="password-input"
        error={error}
      />
      <StyledButton
        label="Log in"
        onPress={() => onSubmit(email, password)}
        isLoading={isLoading}
        disabled={email === '' || password === ''}
        testID="login-button"
      />
    </Stack>
  );
}
