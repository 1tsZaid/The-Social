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
        return <CommunityEdit />;
      case SCREENS.MEMBERS:
        return <CommunityMembers />;
      case SCREENS.SETTINGS:
      default:
        return <CommunitySettings />;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <Button title="Settings" onPress={() => setScreen(SCREENS.SETTINGS)} />
        <Button title="Edit" onPress={() => setScreen(SCREENS.EDIT)} />
        <Button title="Members" onPress={() => setScreen(SCREENS.MEMBERS)} />
      </View>
      <View style={styles.content}>
        {renderScreen()}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  nav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 10,
  },
  content: {
    flex: 1,
  },
});
