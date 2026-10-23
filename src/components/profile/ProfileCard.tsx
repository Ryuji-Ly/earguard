import { Avatar } from '@/components/primitives/Avatar';
import { Card } from '@/components/primitives/Card';
import { Row } from '@/components/primitives/Row';
import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';

interface ProfileCardProps {
  name: string;
  email: string;
}

export function ProfileCard({ name, email }: ProfileCardProps) {
  return (
    <Card testID="profile-card">
      <Row gap="md">
        <Avatar name={name} />
        <Stack gap="none" flex={1}>
          <Text size="lg" weight="bold" testID="profile-name">{name}</Text>
          <Text size="sm" tone="muted" testID="profile-email">{email}</Text>
        </Stack>
      </Row>
    </Card>
  );
}
