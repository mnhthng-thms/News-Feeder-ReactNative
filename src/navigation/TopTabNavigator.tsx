import React from 'react'
import { StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import { MaterialTopTabParamList } from '../@types/navigation'
import { ActivityIndicator } from 'react-native-paper'
import NewsScreen from '../screens/NewsScreen'
import AllNews from '../screens/AllNewsScreen'
import {
  Ionicons,
  FontAwesome,
  MaterialCommunityIcons,
  Fontisto,
  FontAwesome5
} from '@expo/vector-icons'
import Colours from '../styles/Colours'

const Tab = createMaterialTopTabNavigator<MaterialTopTabParamList>()

const TopTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='AllNews'
      lazy={true}
      lazyPlaceholder={() => (<ActivityIndicator animating={true} />)}
      tabBarOptions={{
        style: styles.topNavBar,
        inactiveTintColor: Colours.Sapphire,
        pressColor: Colours.Purple1,
        iconStyle: styles.iconContainer,
        showIcon: true,
        showLabel: false,
        pressOpacity: 0.8,
        indicatorStyle: styles.tabIndicator
      }}
    >
      <Tab.Screen
        name='AllNews'
        component={AllNews}
        options={{
          tabBarIcon: ({ focused }) => {
            return focused ?
              (<Fontisto name='fire' size={24} color={Colours.White} />) :
              (<FontAwesome name='home' size={26} color={Colours.Purple1} />)
          }
        }}
      />
      <Tab.Screen
        name='Business'
        component={NewsScreen}
        initialParams={{ category: 'Business' }}
        options={{
          tabBarIcon: ({ focused }) => {
            const color = focused ? Colours.White : Colours.Purple1
            return (<MaterialCommunityIcons name='finance' size={26} color={color} />)
          }
        }}
      />
      <Tab.Screen
        name='Entertainment'
        component={NewsScreen}
        initialParams={{ category: 'Entertainment' }}
        options={{
          tabBarIcon: ({ focused }) => {
            const color = focused ? Colours.White : Colours.Purple1
            return (
              <FontAwesome5
                name='magic'
                style={styles.iconContainer}
                size={22}
                color={color}
              />
            )
          }
        }}
      />
      <Tab.Screen
        name='Technology'
        component={NewsScreen}
        initialParams={{ category: 'Technology' }}
        options={{
          tabBarIcon: ({ focused }) => {
            const color = focused ? Colours.White : Colours.Purple1
            return (
              <MaterialCommunityIcons
                style={styles.iconContainer}
                name='cellphone-link'
                size={24}
                color={color}
              />
            )
          }
        }}
      />
      <Tab.Screen
        name='Sports'
        component={NewsScreen}
        initialParams={{ category: 'Sports' }}
        options={{
          tabBarIcon: ({ focused }) => {
            const color = focused ? Colours.White : Colours.Purple1
            return (<Ionicons name='md-football' size={26} color={color} />)
          }
        }}
      />
      <Tab.Screen
        name='Health'
        component={NewsScreen}
        initialParams={{ category: 'Health' }}
        options={{
          tabBarIcon: ({ focused }) => {
            const color = focused ? Colours.White : Colours.Purple1
            return (<Fontisto name='pulse' size={20} color={color} />)
          }
        }}
      />
      <Tab.Screen
        name='Science'
        component={NewsScreen}
        initialParams={{ category: 'Science' }}
        options={{
          tabBarIcon: ({ focused }) => {
            const color = focused ? Colours.White : Colours.Purple1
            return (<Fontisto name='laboratory' size={24} color={color} />)
          }
        }}
      />
    </Tab.Navigator>
  )
}

const styles = StyleSheet.create({
  tabIndicator: {
    borderWidth: 2,
    borderRadius: 2,
    borderColor: Colours.White
  },
  topNavBar: {
    backgroundColor: Colours.Sapphire,
    borderBottomWidth: 2,
    borderBottomColor: Colours.Purple1
  },
  iconContainer: {
    alignSelf: 'center',
    justifyContent: 'flex-end'
  }
})

export default TopTabNavigator

/* @Reference:
    https://github.com/mnhthng-thms/To-Do-List-App-ReactNative/blob/master/src/navigation/TabbedNavigator.js
    https://reactnavigation.org/docs/material-top-tab-navigator/
*/