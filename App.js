
import React from 'react';
import {
  SafeAreaView,
  StatusBar,
  ScrollView
} from 'react-native';
import IndexPage from './src/pages/index'
const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
          <IndexPage></IndexPage>
      </SafeAreaView>
    </>
  );
};


export default App;
