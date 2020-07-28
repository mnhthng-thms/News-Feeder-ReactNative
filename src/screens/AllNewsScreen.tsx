import React from 'react'
import { StyleSheet } from 'react-native'
import { Avatar, Card, Title, Paragraph } from 'react-native-paper'
import { BorderlessButton, TouchableOpacity } from 'react-native-gesture-handler'
import Colours from '../styles/Colours'
import * as dt from '../utils/datetime'

export default function AllNewsScreen () {
  return (
    <Card style={styles.card}>
      <BorderlessButton>
        <Card.Title
          title='Using Babel transforms to inject analytics code at Build Time'
          subtitle={`Heap.io at ${dt.getDate('2020-07-06T17:46:47Z')}`}
        />
      </BorderlessButton>
      <TouchableOpacity
        activeOpacity={0.8}
      >
        <Card.Cover
          style={styles.coverContainer}
          source={{ uri: 'https://heap.io/wp-content/uploads/2020/06/Heap-Engineering-Header-1024x538.png' }}
        />
      </TouchableOpacity>
      <BorderlessButton>
        <Card.Content style={styles.content}>
          <Paragraph>
            In late 2018, we decided to add first-class support for React Native in Heap. This meant bringing Heap’s autocapture philosophy to the React Native platform: installing Heap on a React Native app sho… [+11404 chars]
        </Paragraph>
        </Card.Content>
      </BorderlessButton>
    </Card>
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