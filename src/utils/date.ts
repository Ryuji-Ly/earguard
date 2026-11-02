// "Sat 1 Nov, 21:40" in the device's language. Shared formatting so dates look the same everywhere.
export function formatSessionDate(isoDate: string): string {
  const date = new Date(isoDate);
  const day = date.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
  const time = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });
  return `${day}, ${time}`;
}
