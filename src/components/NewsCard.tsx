import React from 'react'
import { openURL } from 'expo-linking'
import { StyleSheet } from 'react-native'
import { Avatar, Card, Title, Paragraph } from 'react-native-paper'
import Colours from '../styles/Colours'
import * as dt from '../utils/datetime'

const NewsCard = (props: Article) =>  {
  const author = props.author || props.source.name || props.source.id
  const { title, url, urlToImage, publishedAt, content} = props 
  // openURL(url)

  return (
    <Card style={styles.card}>
      <Card.Title 
        title={title}
        subtitle={`${author} • ${dt.getDate(publishedAt)}`} 
      />
      <Card.Cover 
        style={styles.coverContainer}
        source={{ uri: urlToImage }}
      />
      <Card.Content style={styles.content}>
        <Paragraph>
          {content}
        </Paragraph>
      </Card.Content>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    borderColor: Colours.RedVenetian, 
    margin: 1+'%',
    padding: 1+'%',
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

export default NewsCard