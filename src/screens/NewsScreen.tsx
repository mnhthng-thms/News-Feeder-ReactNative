// @ts-nocheck
import React, { useState, useLayoutEffect, useCallback, useEffect, useContext } from 'react'
import { StyleSheet, View } from 'react-native'
import { Surface, Banner, ActivityIndicator } from 'react-native-paper'
import { FlatList } from 'react-native-gesture-handler'
import { useNavigation } from '@react-navigation/native'
import { interpret } from 'xstate'
import { useMachine } from '@xstate/react'
import { NewsScreenProps } from '../@types/navigation'

import Colours from '../styles/Colours'
import { NavContext } from '../contexts'
import { FetchMachineContext } from '../@types/machines'
import fetchMachine from '../machines/fetchMachine'
import NewsCard from '../components/NewsCard'

console.disableYellowBox = true

export default function NewsScreen (props: NewsScreenProps) {
  const [fetchMState, fetchMSend] = useMachine(fetchMachine)

  const [articles, setArticles] = useState<Article[]>([])
  const [isThisScreenLoading, setThisScreenLoading] = useState(false)
  const [isErrorBannerVisible, setErrorBannerVisible] = useState(false)
  const [errorBannerMessage, setErrorBannerMessage] = useState('')

  const { setHeader } = useContext(NavContext)
  const { navigation, route } = props
  const { category } = route.params

  const defaultQuery: Readonly<TopHeadlineQuery> = {
    kind: 'top-headlines',
    country: 'au',
    category: category.toLowerCase() as Category,
    sortBy: 'publishedAt'
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
    When user switches to this tab, the header title will be changed to its 
    category name
  */
  useEffect(() => {
    return navigation.addListener('tabPress', () => {
      setHeader(category)
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
      setErrorBannerMessage(_getFromContext('lastResponse')['message'])
    }
    if (fetchMState.value == 'FAILURE') {
      setErrorBannerVisible(true)
      setErrorBannerMessage('Something went wrong! Please retry!')
    }
  }, [fetchMState])


  return (
    <Surface style={styles.container}>
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

