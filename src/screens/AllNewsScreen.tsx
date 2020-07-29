import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Surface, Searchbar, ToggleButton } from 'react-native-paper'
import Colours from '../styles/Colours'

/* Reference for replacing Card.Cover: 
    https://github.com/callstack/react-native-paper/blob/212aa73715f157e1a77f8738859a608a543ba04c/src/components/Card/CardCover.tsx
*/

export default function AllNewsScreen () {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'checked' | 'unchecked' | undefined>('checked')
  
  const _filterOnPressed = () => {
    setFilterStatus(filterStatus === 'checked' ? 'unchecked' : 'checked')
  }
  return (
    <Surface style={styles.container}>
      <View style={styles.searchBar}>
        <Searchbar
          style={styles.searchField}
          value={searchQuery}
          onChangeText={txt => setSearchQuery(txt)}
        />
        <Surface style={styles.filterContainer}>
        <ToggleButton 
          style={[
            styles.filterToggler,
            filterStatus === 'checked' && styles.filterTogglerOnChecked 
          ]}
          icon='filter'
          size={28}
          value='filter'
          { ...filterStatus === 'checked' ? 
            { color: Colours.White } : 
            { color: Colours.Sapphire } 
          }
          status={filterStatus}
          onPress={_filterOnPressed}
        />
        </Surface>
      </View>
      <Surface style={styles.body}>
        <Text>
          All News displayed here
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
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between', 
    alignItems: 'center',
    borderColor: Colours.RedVenetian,
    margin: 1 + '%',
  },
  searchField: {
    flex: 7,
    borderRadius: 15,
    borderColor: Colours.Purple1,
    borderWidth: 2,
  }, 
  filterContainer: {
    flex: 1,
    marginHorizontal: 1+'%',
    height: 92+'%',
    width: 100+'%',
    borderRadius: 10,
  },
  filterToggler: {
    height: 100+'%',
    width: 100+'%',
    borderColor: Colours.Purple1,
    borderWidth: 2,
    borderRadius: 10,
  }, 
  filterTogglerOnChecked: {
    backgroundColor: Colours.Sapphire,
    borderColor: Colours.Sapphire,
  }, 
  body: {
    flex: 9,
    borderBottomEndRadius: 50,
    borderTopStartRadius: 50,
    borderBottomStartRadius: 10,
    borderTopEndRadius: 10,
    borderWidth: 0.5,
  },
}) 