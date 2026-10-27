import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Redirect } from 'expo-router';
import { useAuthStore } from '@/state/useAuthStore';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { DemoCredentials } from '@/components/auth/DemoCredentials';
import { LoginForm } from '@/components/auth/LoginForm';
import { Screen } from '@/components/primitives/Screen';
import { Stack } from '@/components/primitives/Stack';

export default function LoginScreen() {
  const [error, setError] = useState<string | undefined>(undefined);
  const { login, isLoading, isAuthenticated, demoCredentials } = useAuthStore();

  const handleLogin = async (email: string, password: string) => {
    setError(undefined);
    try {
      // On success the store sets isAuthenticated, and the Redirect below takes over.
      await login(email, password);
    } catch (loginError) {
      // The service throws user-friendly messages (wrong password vs. no connection).
      setError(loginError instanceof Error ? loginError.message : 'Login failed. Please try again.');
    }
  };

  // Already logged in (e.g. saved session): skip the login screen.
  if (isAuthenticated) return <Redirect href="/" />;

  return (
    <Screen padding="lg" testID="login-screen">
      <View style={styles.container}>
        <Stack gap="lg">
          <AuthHeader title="EarGuard" subtitle="Enjoy the music, keep your hearing." />
          <LoginForm onSubmit={handleLogin} isLoading={isLoading} error={error} />
          <DemoCredentials email={demoCredentials.email} password={demoCredentials.password} />
        </Stack>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', width: '100%', maxWidth: 420, alignSelf: 'center' },
});
