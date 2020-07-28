import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { List, Surface, DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import Colours from './src/styles/Colours'
import AllNewsScreen from './src/screens/AllNewsScreen'

export default function App () {

  return (
    <PaperProvider theme={theme}>
        <StatusBar style="auto" />
        <AllNewsScreen/>
    </PaperProvider>
  );
}

const theme = {
  ...DefaultTheme, 
  colors: {
    ...DefaultTheme.colors,
    primary: Colours.Purple1, 
    accent: Colours.LavenderLight
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
