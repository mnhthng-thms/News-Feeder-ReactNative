import { compose, prop, reduce, init } from 'ramda'
import axios, { AxiosError } from 'axios'

const API_KEY = 'e59ff3c812a940748dd88b74113f6e9d'
const DOMAIN_URL = 'https://newsapi.org/v2/'
const PAGE_SIZE = 100

const buildURLEndpoint = (query: Query) => {
  const request = {...query, pageSize: PAGE_SIZE, apiKey: API_KEY }
  
  const _reducer = function (acc: string, key: keyof Query): string {
    if (key == 'kind') return `${request[key]}?${acc}`
      
    return `${acc}${key}=${request[key]}&` 
  }
  
  const queryPath = reduce (
    _reducer, 
    '', 
    Object.keys(request) as Array<keyof Query>
  )
  
  /* `init` returns everything except for the last element of the string */
  return compose (encodeURI, init) (`${DOMAIN_URL}${queryPath}`)
}

const getFromURL = (url: string) => {
  const _getErrorCode = (err: AxiosError) => err.response?.status
  return axios.get(url).then(prop('data'))
}

export {
  buildURLEndpoint,
  getFromURL,
}
