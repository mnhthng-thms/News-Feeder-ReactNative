import React from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'

const Tab = createMaterialTopTabNavigator()

const TopTabNavigator = ({ service }) => {
  return (
    <Tab.Navigator>
    </Tab.Navigator>
  )
}

export default TopTabNavigator

/* Reference: 
    https://github.com/mnhthng-thms/To-Do-List-App-ReactNative/blob/master/src/navigation/TabbedNavigator.js
    https://reactnavigation.org/docs/material-top-tab-navigator/
*/