import { Card } from '@/components/primitives/Card';
import { Icon } from '@/components/primitives/Icon';
import { Row } from '@/components/primitives/Row';
import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';
import type { Tip } from '@/types/Tip';
import { colors } from '@/theme';

interface TipCardProps {
  tip: Tip;
  expanded: boolean;
  onToggle: () => void;
}

// Progressive disclosure: the summary first, the full explanation on tap.
export function TipCard({ tip, expanded, onToggle }: TipCardProps) {
  return (
    <Card onPress={onToggle} testID={`tip-${tip.id}`}>
      <Stack gap="sm">
        <Row gap="md" align="flex-start">
          <Icon name={tip.icon} size={24} color={colors.primary} />
          <Stack gap="xs" flex={1}>
            <Text weight="bold">{tip.title}</Text>
            <Text size="sm" tone="muted">{tip.summary}</Text>
          </Stack>
          <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={20} color={colors.textMuted} />
        </Row>
        {expanded && <Text testID={`tip-${tip.id}-body`}>{tip.body}</Text>}
      </Stack>
    </Card>
  );
}
