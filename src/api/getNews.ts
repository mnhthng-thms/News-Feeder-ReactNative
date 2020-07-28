import * as F from 'fluture'
import { reduce, init } from 'ramda'

const API_KEY = 'e59ff3c812a940748dd88b74113f6e9d'
const DOMAIN_URL = 'https://newsapi.org/v2/'

const constructEndpoint = (q: Readonly<Query>) => {
  const query = {...q, apiKey: API_KEY }
  
  const _reducer = function (acc: string, key: keyof Query): string {
    if (key == 'kind') return `${query[key]}?${acc}`
      
    return `${acc}${key}=${query[key]}&` 
  }
  
  const queryPath = reduce (
    _reducer, 
    '', 
    Object.keys(query) as Array<keyof Query>
  )
  
  /* `init` returns everything except for the last element of the string */
  return init (`${DOMAIN_URL}${queryPath}`)
}

export {
  constructEndpoint
}
