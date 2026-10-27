import { View, Image, StyleSheet } from 'react-native';
import { Text } from './Text';
import { colors, radius } from '@/theme';

interface AvatarProps {
  uri?: string;
  name?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function Avatar({ uri, name, size = 'md' }: AvatarProps) {
  const initials = name
    ? name.split(' ').map((part) => part[0]).join('').toUpperCase().slice(0, 2)
    : '?';

  if (uri !== undefined) {
    return <Image source={{ uri }} style={[styles.base, styles[size]]} />;
  }

  return (
    <View style={[styles.base, styles[size], styles.fallback]}>
      <Text variant="label" tone="inverse">{initials}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  base: { borderRadius: radius.pill, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  fallback: { backgroundColor: colors.primary },
  sm: { width: 32, height: 32 },
  md: { width: 48, height: 48 },
  lg: { width: 72, height: 72 },
});
