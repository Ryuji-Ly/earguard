import { useMeterStore } from '@/state/useMeterStore';
import { Badge } from '@/components/primitives/Badge';
import { Screen } from '@/components/primitives/Screen';
import { Stack } from '@/components/primitives/Stack';
import { ScreenHeader } from '@/components/ScreenHeader';
import { DemoReadingPicker } from '@/components/meter/DemoReadingPicker';
import { LiveMeterControl } from '@/components/meter/LiveMeterControl';
import { SafeTimeCard } from '@/components/meter/SafeTimeCard';
import { SoundLevelGauge } from '@/components/meter/SoundLevelGauge';
import { SoundLevelGaugeSkeleton } from '@/components/meter/SoundLevelGaugeSkeleton';

export default function MeterScreen() {
  const { mode, demoReadings, selectedDemoId, micStatus, liveDb, selectDemo, startLive, stopLive } = useMeterStore();
  const isLive = mode === 'live';
  const selected = demoReadings.find((reading) => reading.id === selectedDemoId);
  const db = isLive ? liveDb : selected?.db;

  return (
    <Screen padding="lg" testID="meter-screen">
      <Stack gap="lg">
        <ScreenHeader
          title="Sound meter"
          subtitle="How loud is it around you?"
          accessory={
            isLive
              ? <Badge label="Live" variant="success" testID="live-badge" />
              : <Badge label="Demo" variant="warning" testID="demo-badge" />
          }
        />
        {db !== undefined ? (
          <>
            <SoundLevelGauge db={db} />
            <SafeTimeCard db={db} />
          </>
        ) : (
          isLive && <SoundLevelGaugeSkeleton />
        )}
        <LiveMeterControl status={micStatus} onStart={startLive} onStop={stopLive} />
        {!isLive && (
          <DemoReadingPicker readings={demoReadings} selectedId={selectedDemoId} onSelect={selectDemo} />
        )}
      </Stack>
    </Screen>
  );
}
