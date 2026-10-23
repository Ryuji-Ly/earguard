import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '@/state/useAuthStore';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { DemoCredentials } from '@/components/auth/DemoCredentials';
import { LoginForm } from '@/components/auth/LoginForm';
import { Screen } from '@/components/primitives/Screen';
import { Stack } from '@/components/primitives/Stack';

export default function LoginScreen() {
  const [error, setError] = useState<string | undefined>(undefined);
  const { login, isLoading, demoCredentials } = useAuthStore();

  const handleLogin = async (email: string, password: string) => {
    setError(undefined);
    try {
      await login(email, password);
      router.replace('/');
    } catch {
      setError('Login failed. Check your email and password.');
    }
  };

  return (
    <Screen padding="lg" testID="login-screen">
      <View style={styles.container}>
        <Stack gap="lg">
          <AuthHeader title="EarGuard" subtitle="Enjoy the music, keep your hearing." />
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
          {demoCredentials !== undefined && (
            <DemoCredentials email={demoCredentials.email} password={demoCredentials.password} />
          )}
        </Stack>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', width: '100%', maxWidth: 420, alignSelf: 'center' },
});
