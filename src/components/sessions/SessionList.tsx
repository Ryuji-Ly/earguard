import { EmptyState } from '@/components/primitives/EmptyState';
import { Skeleton } from '@/components/primitives/Skeleton';
import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';
import { StyledButton } from '@/components/StyledButton';
import { SessionCard } from './SessionCard';
import { radius } from '@/theme';
import type { LoadStatus } from '@/types/LoadStatus';
import type { MeasurementSession } from '@/types/MeasurementSession';

interface SessionListProps {
  sessions: MeasurementSession[];
  status: LoadStatus;
  errorMessage?: string;
  deletingId?: string;
  deleteError?: string;
  onRetry: () => void;
  onDelete: (id: string) => void;
  onStartMeasuring: () => void;
}

// The history: loading, error, empty (new user) and filled states.
export function SessionList({
  sessions,
  status,
  errorMessage,
  deletingId,
  deleteError,
  onRetry,
  onDelete,
  onStartMeasuring,
}: SessionListProps) {
  // Sessions saved this visit are shown right away, even before the history has loaded.
  if ((status === 'idle' || status === 'loading') && sessions.length === 0) {
    return (
      <Stack gap="md" testID="sessions-loading">
        <Skeleton height={120} borderRadius={radius.md} />
        <Skeleton height={120} borderRadius={radius.md} />
        <Skeleton height={120} borderRadius={radius.md} />
      </Stack>
    );
  }

  if (status === 'error' && sessions.length === 0) {
    return (
      <EmptyState
        icon="cloud-offline-outline"
        title="Couldn't load your history"
        description={errorMessage ?? 'Check your connection and try again.'}
        action={<StyledButton label="Try again" onPress={onRetry} variant="secondary" testID="sessions-retry" />}
        testID="sessions-error"
      />
    );
  }

  if (sessions.length === 0) {
    return (
      <EmptyState
        icon="pulse-outline"
        title="No sessions yet"
        description="Measure live on the Meter tab. When you stop, the session is saved here."
        action={<StyledButton label="Start measuring" onPress={onStartMeasuring} testID="sessions-start" />}
        testID="sessions-empty"
      />
    );
  }

  return (
    <Stack gap="md" testID="sessions-list">
      {deleteError !== undefined && (
        <Text tone="danger" testID="sessions-delete-error">{deleteError}</Text>
      )}
      {sessions.map((session) => (
        <SessionCard
          key={session.id}
          session={session}
          isDeleting={session.id === deletingId}
          onDelete={() => onDelete(session.id)}
        />
      ))}
    </Stack>
  );
}
