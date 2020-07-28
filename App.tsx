import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { constructEndpoint } from './src/api/getNews'

export default function App() {
  
  const query: (Readonly<Query>) = {
    kind: 'everything',
    q: 'web-development',
    sortBy: 'popularity',
    sources: [
      'bbc.com', 
      'cnn.com'
    ]
  }

  return (
    <View style={styles.container}>
      <Text>{constructEndpoint(query)}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
