import type { Tip } from '@/types/Tip';

export const mockTips: Tip[] = [
  {
    id: 'earplugs',
    title: 'Wear earplugs from the start',
    summary: 'Musician earplugs lower the volume without muffling the music.',
    body: 'Filtered (musician) earplugs reduce sound by about 15–25 dB evenly across frequencies, so the music still sounds clear. Put them in before you reach the stage: damage starts before it feels painful.',
    icon: 'ear',
  },
  {
    id: 'distance',
    title: 'Keep your distance from speakers',
    summary: 'Doubling your distance lowers the level by roughly 6 dB.',
    body: 'Sound drops quickly with distance. Moving from right in front of a speaker stack to a few metres back can cut your exposure time a lot, and you will still hear everything.',
    icon: 'walk',
  },
  {
    id: 'breaks',
    title: 'Take quiet breaks',
    summary: 'Give your ears 10 minutes of rest every hour.',
    body: 'Your ears recover better with regular quiet breaks. Head to a chill zone, the food area or outside the main stage area for a while, especially after a loud set.',
    icon: 'time',
  },
  {
    id: 'ringing',
    title: 'Ringing ears are a warning',
    summary: 'Tinnitus or muffled hearing after a show means you went too far.',
    body: 'A ringing or muffled feeling means your inner ear was overloaded. It often fades within a day, but repeated overload can cause permanent hearing loss. If it lasts longer than 24 hours, see a doctor.',
    icon: 'warning',
  },
  {
    id: 'recovery',
    title: 'Rest your ears the next day',
    summary: 'Avoid loud music and headphones after a festival day.',
    body: 'After a loud day your ears need time to recover. Skip loud headphones the next day and give your hearing a quiet evening.',
    icon: 'moon',
  },
];
