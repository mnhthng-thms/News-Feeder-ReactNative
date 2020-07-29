import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { DefaultTheme, Provider as PaperProvider, Appbar } from 'react-native-paper'
import Colours from './src/styles/Colours'
import { NavigationContainer } from '@react-navigation/native'
import TopTabNavigator from './src/navigation/TopTabNavigator'
import { STATUS_BAR_HEIGHT } from './src/helpers/Constants'

export default function App () {

  return (
    <PaperProvider theme={theme}>
      <StatusBar style='light'/>
      <Appbar.Header
        statusBarHeight={STATUS_BAR_HEIGHT}
        style={{
          backgroundColor: Colours.Sapphire,
          height: STATUS_BAR_HEIGHT * 1.618, 
          paddingBottom: STATUS_BAR_HEIGHT * 0.1,
          alignItems: 'flex-end'
        }}
      >
        <Appbar.Content 
          titleStyle={{
            fontWeight: 'bold', 
            letterSpacing: 0.5
          }}
          title={'HEADLINES'}
        />
      </Appbar.Header>
      <NavigationContainer>
        <TopTabNavigator />
      </NavigationContainer>
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
