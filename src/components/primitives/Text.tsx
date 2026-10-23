import { Text as RNText, StyleSheet } from 'react-native';
import { colors, fontSize, lineHeight } from '@/theme';

export type TextTone = 'default' | 'muted' | 'inverse' | 'primary' | 'safe' | 'caution' | 'danger';

interface TextProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'display';
  weight?: 'normal' | 'medium' | 'bold';
  tone?: TextTone;
  align?: 'left' | 'center' | 'right';
  numberOfLines?: number;
  accessibilityRole?: 'header' | 'text';
  testID?: string;
}

export function Text({
  children,
  size = 'md',
  weight = 'normal',
  tone = 'default',
  align = 'left',
  numberOfLines,
  accessibilityRole,
  testID,
}: TextProps) {
  return (
    <RNText
      style={[styles.base, styles[size], styles[weight], styles[tone], { textAlign: align }]}
      numberOfLines={numberOfLines}
      accessibilityRole={accessibilityRole}
      testID={testID}
    >
      {children}
    </RNText>
  );
}

const styles = StyleSheet.create({
  base: {
    color: colors.text,
  },
  sm: { fontSize: fontSize.sm, lineHeight: lineHeight.sm },
  md: { fontSize: fontSize.md, lineHeight: lineHeight.md },
  lg: { fontSize: fontSize.lg, lineHeight: lineHeight.lg },
  xl: { fontSize: fontSize.xl, lineHeight: lineHeight.xl },
  display: { fontSize: fontSize.display, lineHeight: lineHeight.display },
  normal: { fontWeight: '400' },
  medium: { fontWeight: '500' },
  bold: { fontWeight: '700' },
  default: { color: colors.text },
  muted: { color: colors.textMuted },
  inverse: { color: colors.textInverse },
  primary: { color: colors.primary },
  safe: { color: colors.safe },
  caution: { color: colors.caution },
  danger: { color: colors.danger },
});
