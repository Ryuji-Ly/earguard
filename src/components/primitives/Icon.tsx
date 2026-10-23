import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet } from 'react-native';
import { colors } from '@/theme';

export type IconName = React.ComponentProps<typeof Ionicons>['name'];

interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
}

// Decorative by default: the label next to the icon carries the meaning for screen readers.
export function Icon({ name, size = 24, color = colors.text }: IconProps) {
  return (
    <Ionicons
      name={name}
      size={size}
      color={color}
      style={styles.base}
      accessibilityElementsHidden
      importantForAccessibility="no"
    />
  );
}

const styles = StyleSheet.create({
  base: {},
});
