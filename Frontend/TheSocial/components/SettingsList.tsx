import React from 'react';
import { View, StyleSheet } from 'react-native';

import { SettingItem } from '@/components/SettingItem';
import { useThemeColor } from '@/hooks/useThemeColor';

interface SettingsListProps {
  onMyAccount: () => void;
  onAppearance: () => void;
  onPermissions: () => void;
  onPrivacySafety: () => void;
  onBilling: () => void;
  onSupport: () => void;
}

export const SettingsList: React.FC<SettingsListProps> = ({
  onMyAccount,
  onAppearance,
  onPermissions,
  onPrivacySafety,
  onBilling,
  onSupport,
}) => {
  const blueColor = useThemeColor({}, 'blue');
  const magentaColor = useThemeColor({}, 'magenta');
  const greenColor = useThemeColor({}, 'green');
  const goldColor = useThemeColor({}, 'gold');
  const purpleColor = useThemeColor({}, 'purple');
  const silverColor = useThemeColor({}, 'silver');

  return (
    <View style={styles.container}>
      <SettingItem
        icon="person-sharp"
        color={blueColor}
        title="My Account"
        onPress={onMyAccount}
      />
      <SettingItem
        icon="color-palette"
        color={magentaColor}
        title="Appearance"
        onPress={onAppearance}
      />
      <SettingItem
        icon="shield-checkmark"
        color={greenColor}
        title="Permissions"
        onPress={onPermissions}
      />
      <SettingItem
        icon="lock-closed"
        color={goldColor}
        title="Privacy & Safety"
        onPress={onPrivacySafety}
      />
      <SettingItem
        icon="card"
        color={purpleColor}
        title="Billing"
        onPress={onBilling}
      />
      <SettingItem
        icon="help-circle"
        color={silverColor}
        title="Support"
        onPress={onSupport}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 24,
    paddingTop: 32,
    paddingBottom: 16,
  },
});