type Datetime = string    // ! more on this later
type PageSize = number    // 20 is default, 100 is maximum
type PageNumber = number  // natural number
type SourceId = string    // words need to be joined by '-'
type SearchKeyword = string 

type CountryCode = 'ae' | 'ar' | 'at' | 'au' | 'be' | 'bg' | 'br' | 'ca' | 'ch' 
                 | 'cn' | 'co' | 'cu' | 'cz' | 'de' | 'eg' | 'fr' | 'gb' | 'gr'
                 | 'hk' | 'hu' | 'id' | 'ie' | 'il' | 'in' | 'it' | 'jp' | 'kr' 
                 | 'lt' | 'lv' | 'ma' | 'mx' | 'my' | 'ng' | 'nl' | 'no' | 'nz' 
                 | 'ph' | 'pl' | 'pt' | 'ro' | 'rs' | 'ru' | 'sa' | 'se' | 'sg' 
                 | 'si' | 'sk' | 'th' | 'tr' | 'tw' | 'ua' | 'us' | 've' | 'za'

type LanguageCode = 'ar' | 'de' | 'en' | 'es' | 'fr' | 'he' | 'it' | 'nl' | 'no'
                    'pt' | 'ru' | 'se' | 'ud' | 'zh'        

type Category = 'business' | 'entertainment' | 'general' | 'health' 
              | 'science' | 'sports' | 'technology'

type SortCriteria = 'relevancy' | 'popularity' | 'publishedAt' 

type BaseSource = {
  id: SourceId | null, 
  name: string
}

type Query = EverythingQuery | TopHeadlineQuery | SourceQuery 

type Article = {
  title: string,
  source: BaseSource, 
  author: string, 
  description: string, 
  url: string, 
  urlToImage: string, 
  publishedAt: Datetime, 
  content: string
}

type Source = BaseSource & Omit<SourceQuery, 'kind'> & {
  description?: string, 
  url?: string
}

type SourceQuery = {
  kind: 'sources',
  category?: Category, 
  country?: CountryCode
  language?: LanguageCode
}

type BaseArticleQuery = {
  q?: SearchKeyword, 
  pageSize?: PageSize, 
  page?: PageNumber,
}

type EverythingQuery = BaseArticleQuery & {
  kind: 'everything',
  qInTitle?: string,  
  language?: LanguageCode,
  sources?: Array<SourceId>, 
  sortBy?: SortCriteria 
}

type TopHeadlineQuery = BaseArticleQuery & {
  kind: 'top-headlines',
  country?: CountryCode,
}

type BaseOkResponse = {
  status: 'ok',
  totalResults: number
}

type ArticlesOkResponse = BaseOkResponse & { articles: Array<Article> }
type SourcesOkResponse = BaseOkResponse & { articles: Array<Source> }

type OkResponse = ArticlesOkResponse | SourcesOkResponse

type ErrorResponse = {
  status: 'error',
  code: string, 
  message: string
}

type Response = OkResponse | ErrorResponse