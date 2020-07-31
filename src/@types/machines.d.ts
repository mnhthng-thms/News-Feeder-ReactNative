import { EventObject, StateSchema, DoneEventObject } from 'xstate'

/* In this case, using `interface` is semantically more precise than using `type` */

export interface FetchMachineContext {
  lastQuery: TopHeadlineQuery,
  lastResponse: ArticlesOkResponse | ErrorResponse,
  numPages: number, 
  currentPage: number
}

export interface FetchMachineStateSchema extends StateSchema {
  states: {
    'IDLE': {},
    'LOADING': {},
    'RESPONDED': {},
    'FAILURE': {}
  }
}

export interface FetchMachineEvent extends EventObject extends DoneEventObject  {
  type: 'FETCH' | 'RETRY' | 'PREPARE', 
  query?: TopHeadlineQuery
}