import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Redirect, router } from 'expo-router';
import { useAuthStore } from '@/state/useAuthStore';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthSwitchLink } from '@/components/auth/AuthSwitchLink';
import { RegisterForm } from '@/components/auth/RegisterForm';
import { Screen } from '@/components/primitives/Screen';
import { Stack } from '@/components/primitives/Stack';

export default function RegisterScreen() {
  const [error, setError] = useState<string | undefined>(undefined);
  const { register, isLoading, isAuthenticated } = useAuthStore();

  const handleRegister = async (name: string, email: string, password: string) => {
    setError(undefined);
    try {
      // On success the store sets isAuthenticated, and the Redirect below takes over.
      await register(name, email, password);
    } catch (registerError) {
      setError(registerError instanceof Error ? registerError.message : 'Could not create the account.');
    }
  };

  if (isAuthenticated) return <Redirect href="/" />;

  return (
    <Screen padding="lg" testID="register-screen">
      <View style={styles.container}>
        <Stack gap="lg">
          <AuthHeader title="Create account" subtitle="Track your sound exposure across festivals." />
          <RegisterForm onSubmit={handleRegister} isLoading={isLoading} error={error} />
          <AuthSwitchLink
            prompt="Already have an account?"
            actionLabel="Log in"
            onPress={() => router.replace('/login')}
            testID="go-to-login"
          />
        </Stack>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', width: '100%', maxWidth: 420, alignSelf: 'center' },
});
