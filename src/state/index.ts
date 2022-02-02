import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { save, load } from 'redux-localstorage-simple'

import user from 'state/user/reducer'
import { blockchain } from 'state/blockchain/reducer'
import { application } from 'state/application/reducer'
import { updateVersion } from 'state/global/actions'
import { transactions } from 'state/transactions/reducer'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists']

const store = configureStore({
  reducer: {
    application,
    blockchain,
    transactions,
    user
  },
  middleware: defaultMiddleware =>
    defaultMiddleware({
      thunk: true
    }).concat(save({ states: PERSISTED_KEYS })),
  preloadedState: load({ states: PERSISTED_KEYS })
})

store.dispatch(updateVersion())

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
