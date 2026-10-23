import { View } from 'react-native';
import { Chip } from '@/components/Chip';
import { Row } from '@/components/primitives/Row';
import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';
import type { DemoReading } from '@/types/DemoReading';

interface DemoReadingPickerProps {
  readings: DemoReading[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function DemoReadingPicker({ readings, selectedId, onSelect }: DemoReadingPickerProps) {
  return (
    <Stack gap="sm">
      <Text size="sm" tone="muted">Try a typical festival spot</Text>
      <View accessibilityRole="radiogroup">
        <Row gap="sm" wrap>
          {readings.map((reading) => (
            <Chip
              key={reading.id}
              label={reading.label}
              selected={reading.id === selectedId}
              onPress={() => onSelect(reading.id)}
              testID={`demo-reading-${reading.id}`}
            />
          ))}
        </Row>
      </View>
    </Stack>
  );
}
