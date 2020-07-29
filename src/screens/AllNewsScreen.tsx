import React, { useState } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Surface, Banner, List } from 'react-native-paper'
import Colours from '../styles/Colours'
import SearchBar from '../components/SearchBar'
import { setStatusBarNetworkActivityIndicatorVisible } from 'expo-status-bar'

/* Reference for replacing Card.Cover: 
    https://github.com/callstack/react-native-paper/blob/212aa73715f157e1a77f8738859a608a543ba04c/src/components/Card/CardCover.tsx
*/

export default function AllNewsScreen () {
  const [visible, setVisible] = useState(true)

  return (
    <Surface style={styles.container}>
      <SearchBar/>   
       
      <Surface style={styles.body}>
        <Text>
          All News displayed here
      </Text>
      </Surface>
    </Surface>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  
  body: {
    flex: 9,
    borderBottomEndRadius: 50,
    borderTopStartRadius: 50,
    borderBottomStartRadius: 10,
    borderTopEndRadius: 10,
    borderWidth: 0.5,
  },
}) 