import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Surface, Banner, List } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import Colours from '../styles/Colours'
import SearchBar from '../components/SearchBar'
import { NavContext } from '../contexts'

/* Reference for replacing Card.Cover: 
    https://github.com/callstack/react-native-paper/blob/212aa73715f157e1a77f8738859a608a543ba04c/src/components/Card/CardCover.tsx
*/

export default function AllNewsScreen () {
  const [visible, setVisible] = useState(true)
  const navigation = useNavigation()

  const navMachineHookPair = useContext(NavContext)
  const { send } = navMachineHookPair

  useEffect(() => {
    return navigation.addListener('tabPress', () => {
      send('UpdateHeader', { category : 'Headlines' })
    })
  }, [navigation])

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
    justifyContent: 'center', 
    alignItems: 'center',
    borderBottomEndRadius: 50,
    borderTopStartRadius: 50,
    borderBottomStartRadius: 10,
    borderTopEndRadius: 10,
    borderWidth: 0.5,
  },
}) 