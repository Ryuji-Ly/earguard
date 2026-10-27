import { Card } from '@/components/primitives/Card';
import { Icon, type IconName } from '@/components/primitives/Icon';
import { Row } from '@/components/primitives/Row';
import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';
import { StyledButton } from '@/components/StyledButton';
import { colors } from '@/theme';
import type { MicrophoneError, MicrophoneStatus } from '@/types/Microphone';

interface LiveMeterControlProps {
  status: MicrophoneStatus;
  onStart: () => void;
  onStop: () => void;
}

interface ErrorContent {
  icon: IconName;
  title: string;
  message: string;
  canRetry: boolean;
}

// One message per failure, so the user knows what happened and what to do next.
const errorContent: Record<MicrophoneError, ErrorContent> = {
  denied: {
    icon: 'mic-off',
    title: 'Microphone blocked',
    message: "Allow microphone access in your browser's site settings, then try again. Demo readings are shown meanwhile.",
    canRetry: true,
  },
  unavailable: {
    icon: 'mic-off',
    title: 'No microphone found',
    message: 'The microphone could not be started. Check that no other app is using it, then try again.',
    canRetry: true,
  },
  unsupported: {
    icon: 'information-circle',
    title: 'Live measuring not supported',
    message: 'This browser cannot measure sound. Use the demo spots below to see how loud festivals get.',
    canRetry: false,
  },
};

export function LiveMeterControl({ status, onStart, onStop }: LiveMeterControlProps) {
  if (status === 'listening') {
    return (
      <Stack gap="sm">
        <StyledButton label="Stop measuring" onPress={onStop} variant="secondary" testID="live-stop-button" />
        <Text variant="subtitle" align="center" testID="live-estimate-note">
          Estimate: phone microphones aren't calibrated, so treat values as a guide.
        </Text>
      </Stack>
    );
  }

  if (status === 'idle' || status === 'requesting') {
    return (
      <StyledButton
        label="Measure live"
        onPress={onStart}
        isLoading={status === 'requesting'}
        testID="live-start-button"
      />
    );
  }

  const content = errorContent[status];
  return (
    <Card variant="caution" testID="mic-error">
      <Stack gap="md">
        <Row gap="sm">
          <Icon name={content.icon} size={22} color={colors.caution} />
          <Text variant="heading" tone="caution">{content.title}</Text>
        </Row>
        <Text testID="mic-error-message">{content.message}</Text>
        {content.canRetry && (
          <StyledButton label="Try again" onPress={onStart} variant="secondary" testID="live-retry-button" />
        )}
      </Stack>
    </Card>
  );
}
