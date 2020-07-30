import { EventObject, StateSchema, DoneEventObject } from 'xstate'

/* In this case, using `interface` is semantically more precise than using `type` */

export interface FetchMachineContext {
  lastQuery: TopHeadlineQuery | undefined,
  lastResponse: ArticlesOkResponse | ErrorResponse | undefined,
  numPages: number, 
  currentPage: number
}

export interface FetchMachineStateSchema extends StateSchema {
  states: {
    'IDLE': {},
    'LOADING': {},
    'RESPONDED': {
      states: {
        'OK': {}, 
        'ERROR': {}
      }
    },
    'FAILURE': {}
  }
}

export interface FetchMachineEvent extends EventObject extends DoneEventObject  {
  type: 'FETCH' | 'RETRY', 
  query?: TopHeadlineQuery
}