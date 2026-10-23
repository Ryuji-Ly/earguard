import { StyleSheet, View } from 'react-native';
import { Icon } from '@/components/primitives/Icon';
import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';
import { colors, radius } from '@/theme';

interface AuthHeaderProps {
  title: string;
  subtitle: string;
}

export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
  return (
    <Stack gap="sm" align="center">
      <View style={styles.logo}>
        <Icon name="ear" size={36} color={colors.textInverse} />
      </View>
      <Text size="xl" weight="bold" align="center" accessibilityRole="header">
        {title}
      </Text>
      <Text align="center" tone="muted">{subtitle}</Text>
    </Stack>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 64,
    height: 64,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
