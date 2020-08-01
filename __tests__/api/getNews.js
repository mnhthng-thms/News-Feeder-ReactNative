import { buildURLEndpoint, getFromURL } from '../../src/api/getNews'

/* @TODOs: 
    - [x] Test `buildURLEndpoint`
    - [ ] Test `getFromURL`
*/
const testSamples = [
  {
    kind: 'top-headlines', 
    q: 'covid 19',
    sortBy: 'popularity',
  }, 
  {
    kind: 'top-headlines', 
    country: 'au', 
    category: 'technology',
  }
]

describe('`getApi` module', () => {
  it('`buildURLEndpoint` behaves correctly #1', () => {
    const url = buildURLEndpoint(testSamples[0])
    expect(url).toMatch('https://newsapi.org/v2/top-headlines?q=covid%2019&sortBy=popularity&pageSize=100&apiKey=e59ff3c812a940748dd88b74113f6e9d')
  })
  
  it('`buildURLEndpoint` behaves correctly #2', () => {
    const url = buildURLEndpoint(testSamples[1])
    expect(url).toMatch('https://newsapi.org/v2/top-headlines?country=au&category=technology&pageSize=100&apiKey=e59ff3c812a940748dd88b74113f6e9d')
  })
  
})