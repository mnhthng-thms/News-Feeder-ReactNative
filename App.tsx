import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { useMachine } from '@xstate/react'

import Colours from './src/styles/Colours'
import NavigationMachine from './src/machines/navigationMachine'
import TopTabNavigator from './src/navigation/TopTabNavigator'
import Header from './src/components/Header'
import { NavContext } from './src/contexts'

export default function App () {
  const [navMachineState, navMachineSend] = useMachine(NavigationMachine)
  
  return (
    <PaperProvider theme={theme}>
      <StatusBar style='light'/>
      <NavContext.Provider value={{state: navMachineState, send: navMachineSend}}>
      <Header/>
      <NavigationContainer>
        <TopTabNavigator/>
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
