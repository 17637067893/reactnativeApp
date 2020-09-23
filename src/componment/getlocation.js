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
  class GetPosition extends React.Component{
      constructor(props){
          super(props)
          this.state={
              position:'北京'
          }
      }
      componentDidMount(){
          this.getLocation();
      }
      getLocation = async () => {
        await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        ]);
        
        await init({
          ios: "",
          android: "69a6e31587f3c2bacbfaeb4946c64f5f"
        });
        
        Geolocation.getCurrentPosition((val) => {
          this.setState({
            position:val.location.city
          })
        });
      }
      render(){
          return(
          <Text>{this.state.position}</Text> 
          );
      }
  }
  export default GetPosition