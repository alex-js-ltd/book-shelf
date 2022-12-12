import { Book, ListItem } from '../types'

type FormData = {
  email: string
  password: string
}

type Config = {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE'
  token: string
  data?: ListItem
}

type Loading = Book & {
  loadingBook: boolean
}

function isLoading(valueToTest: any) {
  return (
    valueToTest &&
    typeof valueToTest === 'object' &&
    'loadingBook' in valueToTest &&
    typeof valueToTest['loadingBook'] === 'boolean'
  )
}

function isFinished(valueToTest: any) {
  return (
    valueToTest &&
    typeof valueToTest === 'object' &&
    'finishDate' in valueToTest &&
    typeof valueToTest['finishDate'] === 'number'
  )
}

export { isLoading, isFinished }

export type { FormData, Config, Loading }
