import { useState } from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { Card } from '@/components/primitives/Card';
import { Icon } from '@/components/primitives/Icon';
import { Row } from '@/components/primitives/Row';
import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';
import { StyledButton } from '@/components/StyledButton';
import { SessionStats } from './SessionStats';
import { colors, touchTarget } from '@/theme';
import { formatSessionDate } from '@/utils/date';
import type { MeasurementSession } from '@/types/MeasurementSession';

interface SessionCardProps {
  session: MeasurementSession;
  isDeleting: boolean;
  onDelete: () => void;
}

// One past session in the history. Deleting asks for confirmation inside the card first.
export function SessionCard({ session, isDeleting, onDelete }: SessionCardProps) {
  // Purely local UI (is the confirmation open?), so useState instead of the store.
  const [confirming, setConfirming] = useState(false);
  const testID = `session-${session.id}`;

  return (
    <Card testID={testID}>
      <Stack gap="md">
        <Row justify="space-between">
          <Text variant="label" testID={`${testID}-date`}>{formatSessionDate(session.startedAt)}</Text>
          {!confirming && (
            <Pressable
              onPress={() => setConfirming(true)}
              style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel="Delete session"
              testID={`${testID}-delete`}
            >
              <Icon name="trash-outline" size={20} color={colors.textMuted} />
            </Pressable>
          )}
        </Row>
        <SessionStats session={session} />
        {confirming && (
          <Stack gap="sm" testID={`${testID}-confirm`}>
            <Text>Delete this session? This can't be undone.</Text>
            <Row gap="sm">
              <Stack flex={1}>
                <StyledButton label="Cancel" onPress={() => setConfirming(false)} variant="secondary" testID={`${testID}-cancel`} />
              </Stack>
              <Stack flex={1}>
                <StyledButton label="Delete" onPress={onDelete} variant="danger" isLoading={isDeleting} testID={`${testID}-confirm-delete`} />
              </Stack>
            </Row>
          </Stack>
        )}
      </Stack>
    </Card>
  );
}

const styles = StyleSheet.create({
  iconButton: { minWidth: touchTarget, minHeight: touchTarget, alignItems: 'center', justifyContent: 'center' },
  pressed: { opacity: 0.6 },
});
