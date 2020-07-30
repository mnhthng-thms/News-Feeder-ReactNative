// @ts-nocheck
import React, { useState, useContext, useEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Surface } from 'react-native-paper'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { NavContext } from '../contexts'
import { useMachine } from '@xstate/react'

import NewsCard from '../components/NewsCard'
import fetchMachine from '../machines/fetchMachine'
import Colours from '../styles/Colours'
import SearchBar from '../components/SearchBar'

/* @Reference for replacing Card.Cover: 
    https://github.com/callstack/react-native-paper/blob/212aa73715f157e1a77f8738859a608a543ba04c/src/components/Card/CardCover.tsx
*/

export default function AllNewsScreen () {
  const navigation = useNavigation()
  const { setHeader } = useContext(NavContext)
  const [ fetchMState, fetchMSend ] = useMachine(fetchMachine)

  const defaultQuery: TopHeadlineQuery = {
    kind: 'top-headlines', 
    country: 'au', 
    sortBy: 'publishedAt'
  }

  useEffect(() => {
    fetchMSend('FETCH', { query: defaultQuery })  
  }, [])

  useEffect(() => {
    // @ts-ignore
    return navigation.addListener('tabPress', () => {
      setHeader('Headlines')
    })
    
  }, [navigation])

  return (
    <Surface style={styles.container}>
      <SearchBar />
      <Surface style={styles.body}>
        {/* <FlatList 
          data={fetchMState.context.lastResponse.articles}
          renderItem={({item}) => {
            const { author, source, url, title, 
                    urlToImage, publishedAt, content } = item
            return (
              <NewsCard 
                author={author}
                source={source}
                url={url}
                title={title}
                urlToImage={urlToImage}
                publishedAt={publishedAt}
                content={content}
              />
            )
          }}
        /> */}
        <Text>
          {}
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
    margin: 15
  },
}) 