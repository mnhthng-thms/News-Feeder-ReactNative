import { Machine, assign } from 'xstate'
import {
  NavMachineContext,
  NavMachineStateSchema,
  NavMachineEvent
} from '../@types/machines'

/* @TODO: 
    This machine helps to faciliate data flow between TopTabBar and Header.
    When user switches tab, a message will be sent to this machine to update
    its context. The header hooks into this machine's state so that it can get
    the title string from this machine.  
*/

/* @Reference: Machine type definition: 
    https://xstate.js.org/api/globals.html#machine
*/
const NavigationMachine = Machine<
  NavMachineContext,
  NavMachineStateSchema,
  NavMachineEvent
>(
  {
    id: 'NavigationMachine',
    initial: 'NORMAL',
    context: {
      header: 'NEWS FEEDER'
    },
    states: {
      NORMAL: {
        on: {
          UpdateHeader: {
            actions: ['setHeader']
          }
        }
      }
    }
  },
  {
    actions: {
      setHeader: assign({
        header: (_, event) => event.category
      })
    }
  }
)

export default NavigationMachine 