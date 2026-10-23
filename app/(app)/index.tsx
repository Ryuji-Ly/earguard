import { useMeterStore } from '@/state/useMeterStore';
import { Badge } from '@/components/primitives/Badge';
import { Screen } from '@/components/primitives/Screen';
import { Stack } from '@/components/primitives/Stack';
import { ScreenHeader } from '@/components/ScreenHeader';
import { DemoReadingPicker } from '@/components/meter/DemoReadingPicker';
import { SafeTimeCard } from '@/components/meter/SafeTimeCard';
import { SoundLevelGauge } from '@/components/meter/SoundLevelGauge';

export default function MeterScreen() {
  const { demoReadings, selectedDemoId, selectDemo } = useMeterStore();
  const selected = demoReadings.find((reading) => reading.id === selectedDemoId);

  return (
    <Screen padding="lg" testID="meter-screen">
      <Stack gap="lg">
        <ScreenHeader
          title="Sound meter"
          subtitle="How loud is it around you?"
          accessory={<Badge label="Demo" variant="warning" testID="demo-badge" />}
        />
        {selected !== undefined && (
          <>
            <SoundLevelGauge db={selected.db} />
            <SafeTimeCard db={selected.db} />
          </>
        )}
        <DemoReadingPicker readings={demoReadings} selectedId={selectedDemoId} onSelect={selectDemo} />
      </Stack>
    </Screen>
  );
}
