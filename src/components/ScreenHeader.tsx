import { Row } from '@/components/primitives/Row';
import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';

interface ScreenHeaderProps {
  title: string;
  subtitle?: string;
  accessory?: React.ReactNode;
}

export function ScreenHeader({ title, subtitle, accessory }: ScreenHeaderProps) {
  return (
    <Row justify="space-between" align="flex-start" gap="md">
      <Stack gap="none" flex={1}>
        <Text size="xl" weight="bold" accessibilityRole="header">{title}</Text>
        {subtitle !== undefined && <Text tone="muted">{subtitle}</Text>}
      </Stack>
      {accessory}
    </Row>
  );
}
