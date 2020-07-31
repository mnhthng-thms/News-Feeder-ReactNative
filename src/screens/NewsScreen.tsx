// @ts-nocheck
import React, { useEffect, useContext } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { NewsScreenProps } from '../@types/navigation'
import { NavContext } from '../contexts'
import { interpret } from 'xstate'
import { useService } from '@xstate/react'

import { FetchMachineContext } from '../@types/machines'
import fetchMachine from '../machines/fetchMachine'
import NewsCard from '../components/NewsCard'

console.disableYellowBox = true
const fetchService = interpret(fetchMachine)
fetchService.start()

export default function NewsScreen (props: NewsScreenProps) {
  const { setHeader } = useContext(NavContext)
  const { navigation, route } = props
  const { category } = route.params

  const [fetchMState, fetchMSend] = useService(fetchService)
  const _getFromContext = (prop: keyof FetchMachineContext) => fetchMState.context[prop]

  const [articles, setArticles] = useState<Article[]>([])
  const [isThisScreenLoading, setIsThisScreenLoading] = useState(true)

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

  const defaultQuery: Readonly<TopHeadlineQuery> = {
    kind: 'top-headlines',
    category: category.toLowerCase(),
    sortBy: 'publishedAt'
  }

  useEffect(() => {
    return navigation.addListener('tabPress', () => {
      setHeader(category)
    })
  }, [navigation])

  return (
    <View style={styles.container}>
      <Text>
        Bootstrapping {category} Screen
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

