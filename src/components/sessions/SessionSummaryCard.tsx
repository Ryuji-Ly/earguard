import { Card } from '@/components/primitives/Card';
import { Icon, type IconName } from '@/components/primitives/Icon';
import { Row } from '@/components/primitives/Row';
import { Spinner } from '@/components/primitives/Spinner';
import { Stack } from '@/components/primitives/Stack';
import { Text, type TextTone } from '@/components/primitives/Text';
import { StyledButton } from '@/components/StyledButton';
import { SessionStats } from './SessionStats';
import { colors } from '@/theme';
import type { SaveStatus } from '@/state/useSessionsStore';
import type { NewMeasurementSession } from '@/types/MeasurementSession';

interface SessionSummaryCardProps {
  session: NewMeasurementSession;
  saveStatus: SaveStatus;
  saveError?: string;
  minSeconds: number;
  onRetry: () => void;
}

interface StatusContent {
  title: string;
  icon: IconName | undefined; // undefined: show a spinner instead
  tone: TextTone;
  color: string;
}

// Status is shown with an icon/spinner and words, never with colour alone.
const statusContent: Record<SaveStatus, StatusContent> = {
  saving: { title: 'Saving session…', icon: undefined, tone: 'muted', color: colors.textMuted },
  saved: { title: 'Session saved', icon: 'checkmark-circle', tone: 'safe', color: colors.safe },
  error: { title: 'Not saved', icon: 'cloud-offline', tone: 'caution', color: colors.caution },
  tooShort: { title: 'Too short to save', icon: 'information-circle', tone: 'muted', color: colors.textMuted },
};

// Shown on the Meter tab after you stop measuring: what the session added up to.
export function SessionSummaryCard({ session, saveStatus, saveError, minSeconds, onRetry }: SessionSummaryCardProps) {
  const content = statusContent[saveStatus];

  return (
    <Card testID="session-summary">
      <Stack gap="md">
        <Row gap="sm">
          {content.icon === undefined ? <Spinner /> : <Icon name={content.icon} size={22} color={content.color} />}
          <Text variant="heading" tone={content.tone} testID="session-summary-status">{content.title}</Text>
        </Row>
        <SessionStats session={session} testID="session-summary-stats" />
        {saveStatus === 'tooShort' && (
          <Text variant="subtitle">Sessions shorter than {minSeconds} seconds aren't kept.</Text>
        )}
        {saveStatus === 'error' && (
          <Stack gap="sm">
            {saveError !== undefined && <Text testID="session-summary-error">{saveError}</Text>}
            <StyledButton label="Try again" onPress={onRetry} variant="secondary" testID="session-retry-button" />
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
