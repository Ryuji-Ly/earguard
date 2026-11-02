import { useEffect } from 'react';
import { router } from 'expo-router';
import { useSessionsStore } from '@/state/useSessionsStore';
import { Screen } from '@/components/primitives/Screen';
import { Stack } from '@/components/primitives/Stack';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SessionList } from '@/components/sessions/SessionList';

export default function HistoryScreen() {
  const { sessions, status, errorMessage, deletingId, deleteError, loadSessions, removeSession } = useSessionsStore();

  // Loaded once and cached in the store; pull down to fetch again.
  useEffect(() => {
    void loadSessions();
  }, [loadSessions]);

  return (
    <Screen
      padding="lg"
      refreshing={status === 'loading' && sessions.length > 0}
      onRefresh={() => loadSessions(true)}
      testID="history-screen"
    >
      <Stack gap="lg">
        <ScreenHeader title="History" subtitle="Your measured sessions, newest first." />
        <SessionList
          sessions={sessions}
          status={status}
          errorMessage={errorMessage}
          deletingId={deletingId}
          deleteError={deleteError}
          onRetry={() => loadSessions(true)}
          onDelete={removeSession}
          onStartMeasuring={() => router.navigate('/')}
        />
      </Stack>
    </Screen>
  );
}
