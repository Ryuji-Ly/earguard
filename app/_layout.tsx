import { Inter_400Regular } from '@expo-google-fonts/inter/400Regular';
import { Inter_600SemiBold } from '@expo-google-fonts/inter/600SemiBold';
import { Inter_700Bold } from '@expo-google-fonts/inter/700Bold';
import { useFonts } from 'expo-font';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AppShell } from '@/components/AppShell';
import { useAuthStore } from '@/state/useAuthStore';

export default function RootLayout() {
  // Keys become the font family names used in theme.fontFamily.
  const [fontsLoaded] = useFonts({ Inter_400Regular, Inter_600SemiBold, Inter_700Bold });
  const restoreSession = useAuthStore((state) => state.restoreSession);

  // Once at startup: pick up a login saved on this device (runs in the browser/app, not during pre-rendering).
  useEffect(() => {
    void restoreSession();
  }, [restoreSession]);

  // Native: wait for the fonts so text never renders in the wrong font.
  // Web: render right away (the page is pre-rendered); the browser swaps the font in when loaded.
  if (!fontsLoaded && Platform.OS !== 'web') {
    return undefined;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <AppShell>
        <Slot />
      </AppShell>
    </SafeAreaProvider>
  );
}
