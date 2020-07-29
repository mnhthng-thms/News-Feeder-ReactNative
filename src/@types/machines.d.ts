import { EventObject } from 'xstate'

/* In this case, using `interface` is semantically more precise than using `type` */

export interface NavMachineContext {
  header: string
}

export interface NavMachineStateSchema {
  states: {
    'NORMAL': {}
  }
}

export interface NavMachineEvent extends EventObject {
  type: 'UpdateHeader',
  category: string
}