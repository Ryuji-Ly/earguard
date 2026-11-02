import { Pressable, StyleSheet } from 'react-native';
import { Row } from '@/components/primitives/Row';
import { Text } from '@/components/primitives/Text';
import { touchTarget } from '@/theme';

interface AuthSwitchLinkProps {
  prompt: string;
  actionLabel: string;
  onPress: () => void;
  testID?: string;
}

// "No account yet? Create one": switches between the login and sign-up screens.
export function AuthSwitchLink({ prompt, actionLabel, onPress, testID }: AuthSwitchLinkProps) {
  return (
    <Row gap="xs" justify="center">
      <Text variant="subtitle">{prompt}</Text>
      <Pressable
        onPress={onPress}
        accessibilityRole="link"
        accessibilityLabel={actionLabel}
        testID={testID}
        style={({ pressed }) => [styles.link, pressed && styles.pressed]}
      >
        <Text variant="label" tone="primary">{actionLabel}</Text>
      </Pressable>
    </Row>
  );
}

const styles = StyleSheet.create({
  // Text-sized link, but with a full-size touch target.
  link: { minHeight: touchTarget, justifyContent: 'center' },
  pressed: { opacity: 0.6 },
});
