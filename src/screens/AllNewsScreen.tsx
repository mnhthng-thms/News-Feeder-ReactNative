import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { BorderlessButton, TouchableOpacity } from 'react-native-gesture-handler'
import Colours from '../styles/Colours'
import * as dt from '../utils/datetime'

/* Reference for replacing Card.Cover: 
    https://github.com/callstack/react-native-paper/blob/212aa73715f157e1a77f8738859a608a543ba04c/src/components/Card/CardCover.tsx
*/

export default function AllNewsScreen () {
  return (
    <View style={styles.card}>
      <Text style={styles.content}>
        All News displayed here
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    borderColor: Colours.RedVenetian,
    margin: 1 + '%',
    padding: 1 + '%',
    elevation: 3
  },
  coverContainer: {
    borderBottomEndRadius: 50,
    borderTopStartRadius: 50,
    borderBottomStartRadius: 10,
    borderTopEndRadius: 10,
    borderWidth: 0.5,
  },
  content: {
    paddingTop: 3
  }
}) 