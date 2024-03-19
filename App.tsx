import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import store from './src/Redux/store/AppStore';
import AppContainer from './src/Navigation/MainNavigation';

const App = () => {
  return (
    <Provider store={store}>
      <AppContainer />
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
