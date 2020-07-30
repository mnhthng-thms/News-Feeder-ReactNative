import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'

import Colours from './src/styles/Colours'
import TopTabNavigator from './src/navigation/TopTabNavigator'
import Header from './src/components/Header'
import { NavContext } from './src/contexts'

export default function App () {
  const [header, setHeader] = useState<string>('Headlines')

  return (
    <PaperProvider theme={theme}>
      <StatusBar style='light' />
      <NavContext.Provider value={{ header, setHeader }}>
        <Header/>
        <NavigationContainer>
          <TopTabNavigator />
        </NavigationContainer>
      </NavContext.Provider>
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
