import { initializeApp } from 'firebase-admin/app'

initializeApp()

export { createUserRecord } from './user'
export { api } from './http'
export { addToIndex, updateIndex, deleteFromIndex } from './search'
