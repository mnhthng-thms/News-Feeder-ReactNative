// @ts-nocheck
import React, { useState, useContext, useEffect, useCallback, useLayoutEffect } from 'react'
import { StyleSheet, Text } from 'react-native'
import { Surface } from 'react-native-paper'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { interpret } from 'xstate'
import { useService } from '@xstate/react'

import { NavContext } from '../contexts'
import { FetchMachineContext } from '../@types/machines'
import fetchMachine from '../machines/fetchMachine'
import NewsCard from '../components/NewsCard'
import SearchBar from '../components/SearchBar'

console.disableYellowBox = true
const fetchService = interpret(fetchMachine)
fetchService.start()

fetchService.subscribe((state) => console.log(state))

export default function AllNewsScreen () {
  const [fetchMState, fetchMSend] = useService(fetchService)
  const _getFromContext = (prop: keyof FetchMachineContext) => fetchMState.context[prop]

  const [articles, setArticles] = useState<Article[]>([])
  const [isThisScreenLoading, setIsThisScreenLoading] = useState(true)

  const navigation = useNavigation()
  const { setHeader } = useContext(NavContext)

  const defaultQuery: Readonly<TopHeadlineQuery> = {
    kind: 'top-headlines',
    country: 'au',
    sortBy: 'popularity'
  }

  /* @TODO: 
    When this component mounts for the first time, fetch Top-Headlines articles
    and store them in `context.lastResponse`
  */
  useLayoutEffect(() => {
    fetchMSend('FETCH', { query: defaultQuery })
  }, [])

  useEffect(() => {
    if (_getFromContext('lastResponse')) {
      setArticles(_getFromContext('lastResponse')['articles'])
    }
  }, [fetchMState])

  useEffect(() => {
    // @ts-ignore
    return navigation.addListener('tabPress', () => {
      setHeader('Headlines')
    })
  }, [navigation])

  const _itemRenderer = useCallback(({ item }) => {
    const { author, source, url, title, urlToImage, publishedAt, content } = item
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
  }, [fetchMState])

  return (
    <Surface style={styles.container}>
      <SearchBar />
      <Surface style={styles.body}>
        <FlatList 
          data={articles}
          renderItem={_itemRenderer}
        />
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
    paddingHorizontal: 5,
    elevation: 7
  },
}) 

/* @Reference: for replacing Card.Cover: 
    https://github.com/callstack/react-native-paper/blob/212aa73715f157e1a77f8738859a608a543ba04c/src/components/Card/CardCover.tsx
*/