import React from 'react';
import { View, StyleSheet } from 'react-native';

import { SettingItem } from '@/components/SettingItem';

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
  return (
    <View style={styles.container}>
      <SettingItem
        icon="person-outline"
        title="My Account"
        onPress={onMyAccount}
      />
      <SettingItem
        icon="color-palette-outline"
        title="Appearance"
        onPress={onAppearance}
      />
      <SettingItem
        icon="shield-checkmark-outline"
        title="Permissions"
        onPress={onPermissions}
      />
      <SettingItem
        icon="lock-closed-outline"
        title="Privacy & Safety"
        onPress={onPrivacySafety}
      />
      <SettingItem
        icon="card-outline"
        title="Billing"
        onPress={onBilling}
      />
      <SettingItem
        icon="help-circle-outline"
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