
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  PermissionsAndroid
} from 'react-native';

import { init,
  Geolocation} from 'react-native-amap-geolocation'
import GetPosition from './pages/getlocation'
// let getLocation = async () => {
//   await PermissionsAndroid.requestMultiple([
//     PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//     PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
//   ]);
  
//   await init({
//     ios: "",
//     android: "69a6e31587f3c2bacbfaeb4946c64f5f"
//   });
  
//   Geolocation.getCurrentPosition((val) => {
//     console.log(val);
//   });
// }
// getLocation();
const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView>
          <GetPosition></GetPosition>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};


export default App;
