import React, { useState } from 'react';
import CommunitySettings from './communitySettings';
import CommunityEdit from './communityEdit';
import CommunityMembers from './communityMembers';
import { View, StyleSheet, Button } from 'react-native';

const SCREENS = {
  SETTINGS: 'settings',
  EDIT: 'edit',
  MEMBERS: 'members',
};

export default function CommunityInfoIndex() {
  const [screen, setScreen] = useState(SCREENS.SETTINGS);

  const renderScreen = () => {
    switch (screen) {
      case SCREENS.EDIT:
        return <CommunityEdit toSettings={() => setScreen(SCREENS.SETTINGS)} />;
      case SCREENS.MEMBERS:
        return <CommunityMembers toSettings={() => setScreen(SCREENS.SETTINGS)} />;
      case SCREENS.SETTINGS:
      default:
        return <CommunitySettings toMembers={() => setScreen(SCREENS.MEMBERS)} toEdit={() => setScreen(SCREENS.EDIT)} />;
    }
  };

  return (
    <View style={styles.content}>
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
});
