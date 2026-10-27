import { Redirect, Tabs } from 'expo-router';
import { useAuthStore } from '@/state/useAuthStore';
import { AppTabBar } from '@/components/AppTabBar';
import { LoadingScreen } from '@/components/LoadingScreen';

export default function AppLayout() {
  const isRestoring = useAuthStore((state) => state.isRestoring);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  // Wait for the saved-session check, otherwise a logged-in user would flash to /login.
  if (isRestoring) return <LoadingScreen message="Loading…" testID="session-loading" />;
  if (!isAuthenticated) return <Redirect href="/login" />;

  return <Tabs tabBar={() => <AppTabBar />} screenOptions={{ headerShown: false }} />;
}
