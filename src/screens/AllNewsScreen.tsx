// @ts-nocheck
import React, { useState, useContext, useEffect, useCallback, useLayoutEffect } from 'react'
import { StyleSheet, View } from 'react-native'
import { Surface, Banner, ActivityIndicator } from 'react-native-paper'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { interpret } from 'xstate'
import { useService } from '@xstate/react'

import Colours from '../styles/Colours'
import { NavContext } from '../contexts'
import { FetchMachineContext } from '../@types/machines'
import fetchMachine from '../machines/fetchMachine'
import NewsCard from '../components/NewsCard'
import SearchBar from '../components/SearchBar'

console.disableYellowBox = true
const fetchService = interpret(fetchMachine)
fetchService.start()

fetchService
  .onTransition(state => console.log('STATE: ', state))
  .onEvent(event => console.log('EVENT: ', event))

export default function AllNewsScreen () {
  const [fetchMState, fetchMSend] = useService(fetchService)

  const [articles, setArticles] = useState<Article[]>([])
  const [isThisScreenLoading, setThisScreenLoading] = useState(false)
  const [isErrorBannerVisible, setErrorBannerVisible] = useState(false)
  const [errorBannerMessage, setErrorBannerMessage] = useState('')

  const navigation = useNavigation()
  const { setHeader } = useContext(NavContext)

  const defaultQuery: Readonly<TopHeadlineQuery> = {
    kind: 'top-headlines',
    country: 'au',
    sortBy: 'popularity'
  }

  const _getFromContext = (prop: keyof FetchMachineContext) => fetchMState.context[prop]
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
  const _bannerActionDefaultOnPress = () => {
    setErrorBannerVisible('false')
  }

  /* @TODO:
    When user switches to this tab, the header title will be changed to `HEADLINES`
  */
  useEffect(() => {
    // @ts-ignore
    return navigation.addListener('tabPress', () => {
      setHeader('Headlines')
    })
  }, [navigation])

  /* @TODO: 
    When this component mounts for the first time, fetch Top-Headlines articles
    and store them in `context.lastResponse`
  */
  useLayoutEffect(() => {
    fetchMSend('FETCH', { query: defaultQuery })
  }, [])

  useEffect(() => {
    /* @Notes: 
        (Q) Why isn't a `switch-case` appropriate here? 
        (A) Because this code block while be evaluated periodically
    */

    if (fetchMState.value == 'OK') {
      setArticles(_getFromContext('lastResponse')['articles'])
    }
    if (fetchMState.value == 'LOADING') {
      setThisScreenLoading(true)
    }
    if (fetchMState.value == 'OK') {
      setThisScreenLoading(false)
    }
    if (fetchMState.value == 'ERROR') {
      setErrorBannerVisible(true)
    }
    if (fetchMState.value == 'FAILURE') {
      setErrorBannerVisible(true)
    }
  }, [fetchMState])

  return (
    <Surface style={styles.container}>
      <SearchBar />
      <Banner
        visible={isErrorBannerVisible}
        style={styles.errorBanner}
        actions={[
          (fetchMState.value == 'FAILURE') && {
            label: 'RETRY',
            onPress: () => {
              _bannerActionDefaultOnPress()
              fetchMSend('RETRY')
            }
          },
          (fetchMState.value == 'ERROR') && {
            label: 'CLOSE',
            onPress: _bannerActionDefaultOnPress
          }
        ]}
      >
        {errorBannerMessage}
      </Banner>
      <View style={styles.body}>
        {isThisScreenLoading && (
          <ActivityIndicator
            style={styles.spinnerContainer}
            animating={isThisScreenLoading}
            color={Colours.Purple1}
            size={48}
          />
        )}
        <FlatList
          data={articles}
          renderItem={_itemRenderer}
          keyExtractor={(item, index) => `${index}-${item.url}`}
        />
      </View>
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
  spinnerContainer: {
    alignSelf: 'center',
    paddingVertical: 10
  },
  errorBanner: {
    backgroundColor: Colours.LavenderLight,
    elevation: 8,
  },
  body: {
    flex: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

/* @Reference: for replacing Card.Cover:
    https://github.com/callstack/react-native-paper/blob/212aa73715f157e1a77f8738859a608a543ba04c/src/components/Card/CardCover.tsx
*/