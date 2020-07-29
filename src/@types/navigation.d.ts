import { 
  MaterialTopTabBarProps, 
  MaterialTopTabNavigationProp 
} from '@react-navigation/material-top-tabs'
import { RootProp } from '@react-navigation/native'

/* If a type definition file have `import` statement, it's not global anymore */

export type MaterialTopTabParamList = {
  AllNews: undefined, 
  Business: { category: 'Business' }, 
  Entertainment: { category: 'Entertainment' }, 
  Health: { category: 'Health' },
  Science: { category: 'Science' },
  Sports: { category: 'Sports' },
  Technology: { category: 'Technology' }
}

export type BusinessScreenProps = {
  route: RouteProp<MaterialTopTabParamList, 'Business'>, 
  navigation: MaterialTopTabNavigationProp<MaterialTopTabParamList, 'Business'>
}

export type EntertainmentScreenProps = {
  route: RouteProp<MaterialTopTabParamList, 'Entertainment'>, 
  navigation: MaterialTopTabNavigationProp<MaterialTopTabParamList, 'Entertainment'>
}

export type HealthScreenProps = {
  route: RouteProp<MaterialTopTabParamList, 'Health'>, 
  navigation: MaterialTopTabNavigationProp<MaterialTopTabParamList, 'Health'>
}

export type ScienceScreenProps = {
  route: RouteProp<MaterialTopTabParamList, 'Science'>, 
  navigation: MaterialTopTabNavigationProp<MaterialTopTabParamList, 'Science'>
}

export type SportsScreenProps = {
  route: RouteProp<MaterialTopTabParamList, 'Sports'>, 
  navigation: MaterialTopTabNavigationProp<MaterialTopTabParamList, 'Sports'>
}

export type TechnologyScreenProps = {
  route: RouteProp<MaterialTopTabParamList, 'Technology'>, 
  navigation: MaterialTopTabNavigationProp<MaterialTopTabParamList, 'Technology'>
}

export type NewsScreenProps = BusinessScreenProps | EntertainmentScreenProps 
                            | HealthScreenProps   | ScienceScreenProps
                            | SportsScreenProps   | TechnologyScreenProps