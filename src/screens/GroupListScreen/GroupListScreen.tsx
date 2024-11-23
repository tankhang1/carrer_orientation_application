import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {AppHeader, AppView} from '@components';

const GroupListScreen = () => {
  return (
    <React.Fragment>
      <AppView>
        <AppHeader title="Nhóm" />
      </AppView>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({});
export default GroupListScreen;
