import React, { useContext } from 'react'
import { Appbar } from 'react-native-paper'
import Colours from '../styles/Colours'
import { STATUS_BAR_HEIGHT } from '../helpers/Constants'

import { NavContext } from '../contexts'

export default function Header () {
  const { header } = useContext(NavContext)

  return (
    <Appbar.Header
        statusBarHeight={STATUS_BAR_HEIGHT}
        style={{
          backgroundColor: Colours.Sapphire,
          height: STATUS_BAR_HEIGHT * 1.618, 
          paddingBottom: STATUS_BAR_HEIGHT * 0.1,
          alignItems: 'flex-end'
        }}
      >
        <Appbar.Content 
          titleStyle={{
            fontWeight: 'bold', 
            letterSpacing: 0.5
          }}
          title={header.toUpperCase()}
        />
      </Appbar.Header>
  )
}
