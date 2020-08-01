import { Machine, assign } from 'xstate'
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
      lastQuery: {} as TopHeadlineQuery,
      lastResponse: {} as ArticlesOkResponse,
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
            /* - target: 'IDLE' */
            target: 'RESPONDED',
            actions: assign({
              lastResponse: (_, event) => event.data,
            })
          },
          onError: {
            /* - target: 'IDLE' */
            target: 'FAILURE'
          }
        }
      },
      'RESPONDED': {
        always: [
          {
            target: 'OK',
            cond: 'isResponseStatusOk',
          },
          {
            target: 'ERROR',
            cond: 'isResponseStatusError',
          }
        ],
      },
      'OK': {
        entry: assign<FetchMachineContext, FetchMachineEvent>({
          numPages: (context) =>
            Math.ceil(
              (context.lastResponse as ArticlesOkResponse).totalResults /
              ITEMS_PER_PAGE
            ),
          currentPage: (context) => context.lastQuery?.page || 1
        }),
        on: {
          'FETCH': {
            target: 'LOADING',
            actions: ['updateLastQuery']
          }
        }
      },
      'ERROR': {
        entry: assign<FetchMachineContext, FetchMachineEvent>({
          numPages: 0,
          currentPage: 0,
        }),
        on: {
          'FETCH': {
            target: 'LOADING',
            actions: ['updateLastQuery']
          }
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
      isResponseStatusOk: (context) => context.lastResponse.status == 'ok',
      // @ts-ignore
      isResponseStatusError: (context) => context.lastResponse.status == 'error'
    }
  }
)

export default fetchMachine

/* @Reference:
    API for querying about a country based on its ISO code:
      https://restcountries.eu/#api-endpoints-full-name
*/