import React from 'react'
import { openURL } from 'expo-linking'
import { StyleSheet } from 'react-native'
import { Avatar, Card, Title, Paragraph } from 'react-native-paper'
import { BorderlessButton, TouchableOpacity } from 'react-native-gesture-handler'
import Colours from '../styles/Colours'
import * as dt from '../utils/datetime'

const altImageURL: string = [
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?',
  'ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9',
  '&auto=format&fit=crop&w=350&q=80'
].join('')

const NewsCard = (props: Article) => {
  const author = props.author || props.source.name || props.source.id
  const { title, url, urlToImage, publishedAt, content } = props

  /* @Reference for replacing Card.Cover: 
    https://github.com/callstack/react-native-paper/blob/212aa73715f157e1a77f8738859a608a543ba04c/src/components/Card/CardCover.tsx
  */
  return (
    <Card style={styles.card}>
      <BorderlessButton
        onPress={() => openURL(url)}
      >
        <Card.Title
          title={title}
          subtitle={`${author} • ${dt.getDate(publishedAt)}`}
        />
      </BorderlessButton>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => openURL(url)}
      >
        <Card.Cover
          style={styles.coverContainer}
          source={{ uri: urlToImage || altImageURL }}
        />
      </TouchableOpacity>
      <BorderlessButton
        onPress={() => openURL(url)}
      >
        <Card.Content style={styles.content}>
          <Paragraph
            style={styles.paragraphTxt}
          >
            {content}
          </Paragraph>
        </Card.Content>
      </BorderlessButton>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colours.White,
    borderBottomEndRadius: 15,
    borderTopStartRadius: 15,
    borderBottomStartRadius: 9,
    borderTopEndRadius: 9,
    margin: 1 + '%',
    padding: 1 + '%',
    elevation: 3
  },
  coverContainer: {
    borderBottomEndRadius: 50,
    borderTopStartRadius: 50,
    borderBottomStartRadius: 10,
    borderTopEndRadius: 10,
  },
  content: {
    paddingTop: 3
  },
  paragraphTxt: {
    textAlign: 'justify'
  }
})

export default NewsCard