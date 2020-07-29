import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { NewsScreenProps } from '../@types/navigation'

const NewsScreen = ({ route }: NewsScreenProps) => {
  const { category } = route.params

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