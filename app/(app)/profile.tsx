import { router } from 'expo-router';
import { useAuthStore } from '@/state/useAuthStore';
import { useMeterStore } from '@/state/useMeterStore';
import { Screen } from '@/components/primitives/Screen';
import { Stack } from '@/components/primitives/Stack';
import { ScreenHeader } from '@/components/ScreenHeader';
import { StyledButton } from '@/components/StyledButton';
import { ProfileCard } from '@/components/profile/ProfileCard';

export default function ProfileScreen() {
  const { user, logout } = useAuthStore();
  const stopLive = useMeterStore((state) => state.stopLive);

  const handleLogout = async () => {
    // Release the microphone so it doesn't keep listening after logging out.
    stopLive();
    await logout();
    router.replace('/login');
  };

  return (
    <Screen padding="lg" testID="profile-screen">
      <Stack gap="lg">
        <ScreenHeader title="Profile" />
        {user !== undefined && <ProfileCard name={user.name} email={user.email} />}
        <StyledButton label="Log out" onPress={handleLogout} variant="secondary" testID="logout-button" />
      </Stack>
    </Screen>
  );
}
