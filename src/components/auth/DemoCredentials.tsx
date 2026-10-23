import { Card } from '@/components/primitives/Card';
import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';

interface DemoCredentialsProps {
  email: string;
  password: string;
}

// Shown on the login screen while login is mocked, so testers don't need the README.
export function DemoCredentials({ email, password }: DemoCredentialsProps) {
  return (
    <Card testID="demo-credentials">
      <Stack gap="sm">
        <Text size="sm" weight="bold">Demo account</Text>
        <Text size="sm" tone="muted">Email: {email}</Text>
        <Text size="sm" tone="muted">Password: {password}</Text>
      </Stack>
    </Card>
  );
}
