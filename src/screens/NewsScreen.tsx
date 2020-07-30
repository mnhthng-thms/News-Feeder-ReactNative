import React, { useEffect, useContext } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { NewsScreenProps } from '../@types/navigation'
import { NavContext } from '../contexts'

const NewsScreen = (props: NewsScreenProps) => {
  const { setHeader } = useContext(NavContext)
  const { navigation, route } = props
  const { category } = route.params

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

export default NewsScreen