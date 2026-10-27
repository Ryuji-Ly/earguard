import { useLocalSearchParams } from 'expo-router';
import { Screen } from '@/components/primitives/Screen';
import { Stack } from '@/components/primitives/Stack';
import { Text } from '@/components/primitives/Text';

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  console.log('Detail screen opened for item:', id);

  return (
    <Screen padding="lg">
      <Stack gap="md">
        <Text variant="title">Item Detail</Text>
        <Text variant="subtitle">ID: {id}</Text>
        <Text>Implement getItemById() in your itemService and render your data here.</Text>
      </Stack>
    </Screen>
  );
}

