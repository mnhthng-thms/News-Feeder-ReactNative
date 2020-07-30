import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Surface, Searchbar, ToggleButton, Portal, Dialog, Button } from 'react-native-paper'
import Colours from '../styles/Colours'


export default function SearchBar () {
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'checked' | 'unchecked' | undefined>('unchecked')
  const _isFilterChecked = () => filterStatus === 'checked'
  const _filterOnPressed = () => {
    setFilterStatus(_isFilterChecked() ? 'unchecked' : 'checked')
  }

  return (
    <>
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
              _isFilterChecked() && styles.filterTogglerOnChecked
            ]}
            icon='filter'
            size={28}
            value='filter'
            {...filterStatus === 'checked' ?
              { color: Colours.White } :
              { color: Colours.Sapphire }
            }
            status={filterStatus}
            onPress={_filterOnPressed}
          />
        </Surface>
      </View>
      <Portal>
        <Dialog
          visible={_isFilterChecked()}
          onDismiss={_filterOnPressed}
        >
          <Dialog.Title>
            Filter Result
          </Dialog.Title>
          <Dialog.Content>

          </Dialog.Content>
          <Dialog.Actions>
            <Button
              mode='text'
              labelStyle={{
                fontSize: 15,
                fontWeight: 'bold'
              }}
              dark={true}
              onPress={_filterOnPressed}
            >
              Apply
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  )
}

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: Colours.RedVenetian,
    marginLeft: 2 + '%',
    marginRight: 1 + '%',
    marginVertical: 2 + '%'
  },
  searchField: {
    flex: 7,
    borderRadius: 15,
    borderColor: Colours.Purple1,
    borderWidth: 2,
    marginRight: 2,
  },
  filterContainer: {
    flex: 1,
    marginHorizontal: 1 + '%',
    height: 95 + '%',
    width: 100 + '%',
    borderRadius: 10,
  },
  filterToggler: {
    height: 100 + '%',
    width: 100 + '%',
    borderColor: Colours.Purple1,
    borderWidth: 2,
    borderRadius: 10,
  },
  filterTogglerOnChecked: {
    backgroundColor: '#423663',
    borderColor: '#4A3D6E',
  },
  bannerContainer: {
    margin: 2 + '%',
    borderColor: Colours.Purple1,
    borderBottomEndRadius: 10,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 30,
    borderTopEndRadius: 30,
    elevation: 5
  }
}) 
