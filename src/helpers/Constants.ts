/* @Reference:  
    https://github.com/callstack/react-native-paper/blob/master/src/constants.ts
*/

import { Platform, Dimensions, StatusBar } from 'react-native'

// @ts-ignore
const window = Dimensions.get('window')

export const SCREEN_WIDTH = window.width
export const SCREEN_HEIGHT = window.height

/* @TODO: for iPhone models since iPhone X, it's `true`
          otherwise, it's false
*/
const hasNotch = SCREEN_WIDTH > 736 && !(Platform.isTV)

export const STATUS_BAR_HEIGHT = Platform.select({
  android: StatusBar.currentHeight || 0,
  ios: hasNotch ? 44 : 20
}) as number