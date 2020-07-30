import { Machine, assign, DoneEventObject } from 'xstate'
import {
  FetchMachineContext,
  FetchMachineStateSchema,
  FetchMachineEvent
} from '../@types/machines'
import { getFromURL, buildURLEndpoint } from '../api/getNews'

const ITEMS_PER_PAGE = 100

const fetchMachine = Machine<
  FetchMachineContext,
  FetchMachineStateSchema,
  FetchMachineEvent
>(
  {
    id: 'FetchMachine',
    initial: 'IDLE',
    context: {
      lastQuery: undefined,
      lastResponse: undefined,
      currentPage: 0,
      numPages: 0
    },
    states: {
      'IDLE': {
        on: {
          'FETCH': {
            target: 'LOADING',
            actions: ['updateLastQuery']
          }
        }
      },
      'LOADING': {
        invoke: {
          id: 'getData',
          src: (context) => getFromURL(buildURLEndpoint(context.lastQuery as Query)),
          onDone: {
            target: 'RESPONDED',
            actions: assign({
              lastResponse: (_, event) => event.data,
            })
          },
          onError: {
            target: 'FAILURE'
          }
        }
      },
      'RESPONDED': {
        states: {
          /* @Reference: https://github.com/davidkpiano/xstate/issues/965 */
          'OK': { type: 'final' as const },
          'ERROR': { type: 'final' as const }
        }, 
        always: [
          {
            target: '.OK',
            cond: 'isResponseStatusOk',
            actions: assign<FetchMachineContext,FetchMachineEvent>({
              // @ts-ignore
              numPages: (context) => Math.ceil(context.lastResponse.totalResults / ITEMS_PER_PAGE),
              currentPage: (context) => context.lastQuery?.page || 1
            })
          },
          {
            target: '.ERROR',
            cond: 'isResponseStatusError',
            // @ts-ignore
            actions: assign<FetchMachineContext,FetchMachineEvent>({
              numPages: 0,
              currentPage: 0,
            })
          }
        ],
        on: {
          'FETCH': {
            target: 'LOADING',
            actions: ['updateLastQuery']
          },
        }
      },
      'FAILURE': {
        on: {
          'RETRY': 'LOADING'
        }
      }
    }
  },
  {
    actions: {
      updateLastQuery: assign<FetchMachineContext, FetchMachineEvent>({
        // @ts-ignore
        lastQuery: (_, event) => event.query
      })
    },
    guards: {
      // @ts-ignore
      isResponseStatusOk: (_, event) => event.data.status === 'ok',
      // @ts-ignore
      isResponseStatusError: (_, event) => event.data.status === 'error'
    }
  }
)

export default fetchMachine

/* @Reference:
    API for querying about a country based on its ISO code:
      https://restcountries.eu/#api-endpoints-full-name
*/