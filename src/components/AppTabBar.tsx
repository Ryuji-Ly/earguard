import { router, usePathname, type Href } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Nav } from '@/components/primitives/Nav';
import { NavItem } from '@/components/primitives/NavItem';
import type { IconName } from '@/components/primitives/Icon';

interface TabDefinition {
  label: string;
  href: Href;
  path: string;
  icon: IconName;
  activeIcon: IconName;
  testID: string;
}

const tabs: TabDefinition[] = [
  { label: 'Meter', href: '/', path: '/', icon: 'pulse-outline', activeIcon: 'pulse', testID: 'tab-meter' },
  { label: 'Learn', href: '/learn', path: '/learn', icon: 'book-outline', activeIcon: 'book', testID: 'tab-learn' },
  { label: 'Profile', href: '/profile', path: '/profile', icon: 'person-outline', activeIcon: 'person', testID: 'tab-profile' },
];

export function AppTabBar() {
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  return (
    <Nav bottomInset={insets.bottom} testID="tab-bar">
      {tabs.map((tab) => {
        const isActive = pathname === tab.path;
        return (
          <NavItem
            key={tab.path}
            label={tab.label}
            icon={isActive ? tab.activeIcon : tab.icon}
            active={isActive}
            onPress={() => router.navigate(tab.href)}
            testID={tab.testID}
          />
        );
      })}
    </Nav>
  );
}
