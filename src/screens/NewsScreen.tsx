import React, { useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { NewsScreenProps } from '../@types/navigation'

const NewsScreen = ({ route, navigation }: NewsScreenProps) => {
  const { category } = route.params

  useEffect(() => {
    return navigation.addListener('tabPress', () => {
      console.log('Send a message to the navigation machine to update')
      console.log('Header title')
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