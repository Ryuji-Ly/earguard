import { Redirect, Tabs } from 'expo-router';
import { useAuthStore } from '@/state/useAuthStore';
import { AppTabBar } from '@/components/AppTabBar';

export default function AppLayout() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) return <Redirect href="/login" />;

  return <Tabs tabBar={() => <AppTabBar />} screenOptions={{ headerShown: false }} />;
}
