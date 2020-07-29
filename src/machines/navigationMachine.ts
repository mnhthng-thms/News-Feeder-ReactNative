import { Machine } from 'xstate'

/* @TODO: 
    This machine helps to faciliate data flow between TopTabBar and Header.
    When user switches tab, a message will be sent to this machine to update
    its context. The header hooks into this machine's state so that it can get
    the title string from this machine.  
*/

export default NavigationMachine 