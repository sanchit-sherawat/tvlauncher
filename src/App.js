import React, { useState } from 'react';
import { View, Text, Button, TextInput, StyleSheet, NativeModules, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import LauncherScreen from './LaucnherScreen/LauncherScreen';

const { AdminModule } = NativeModules;

export default function App() {
  const [packageName, setPackageName] = useState('');

  const enableAdmin = () => {
    AdminModule.enableAdmin()
      .then(() => Alert.alert("Admin Enabled"))
      .catch(err => Alert.alert("Error", err.message));
  };

  const launchApp = () => {
    AdminModule.launchApp(packageName)
      .then(() => Alert.alert("App Launched"))
      .catch(err => Alert.alert("Error", err.message));
  };

  const disableApp = () => {
    AdminModule.disableApp(packageName)
      .then((successMessage) => {
        Alert.alert(successMessage);
      })
      .catch((errorMessage) => {
        Alert.alert("Error", errorMessage);
      });
  };

  return (
   <NavigationContainer>
    <LauncherScreen />
    {/* <Text>hello world gefhrhtyjheytjytjyrju</Text> */}
  </NavigationContainer>
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // width:100
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
    width: '80%',
  },
  button: {
    marginTop: 20,
  },
});
