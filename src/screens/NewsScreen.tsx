import React, { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { NewsScreenProps } from '../@types/navigation'

const NewsScreen = (props: NewsScreenProps & { navMachineSend: Function }) => {
  const { navigation, route, navMachineSend } = props
  const { category } = route.params

  useEffect(() => {
    return navigation.addListener('tabPress', () => {
      navMachineSend('UpdateHeader', { category })
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