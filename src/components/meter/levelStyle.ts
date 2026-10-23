import type { IconName } from '@/components/primitives/Icon';
import type { TextTone } from '@/components/primitives/Text';
import type { SoundLevel } from '@/types/SoundLevel';
import { colors } from '@/theme';

type CardVariant = 'safe' | 'caution' | 'danger';

interface LevelStyle {
  card: CardVariant;
  tone: TextTone;
  color: string;
  icon: IconName;
}

// Every level gets a colour AND an icon + label, so meaning never depends on colour alone.
export const levelStyle: Record<SoundLevel, LevelStyle> = {
  quiet: { card: 'safe', tone: 'safe', color: colors.safe, icon: 'checkmark-circle' },
  moderate: { card: 'safe', tone: 'safe', color: colors.safe, icon: 'checkmark-circle' },
  loud: { card: 'caution', tone: 'caution', color: colors.caution, icon: 'alert-circle' },
  dangerous: { card: 'danger', tone: 'danger', color: colors.danger, icon: 'warning' },
};
