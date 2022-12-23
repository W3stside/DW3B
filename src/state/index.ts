import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { save, load } from 'redux-localstorage-simple'

// Normal
import { user } from 'state/user/reducer'
import { window } from 'state/window/reducer'
import { modalsAndPopups } from 'state/modalsAndPopups/reducer'
import { updateVersion } from 'state/global/actions'
// Blockchain
import blockchainBase from 'state/blockchain/base/reducer'
import blockchainConnection from 'state/blockchain/connection/reducer'

import blockchainTransactions from 'state/blockchain/transactions/reducer'
import { blockchainMulticall } from 'state/blockchain/multicall/reducer'

export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector

const PERSISTED_KEYS: string[] = ['user', 'transactions', 'lists']

const store = configureStore({
  reducer: {
    blockchainBase,
    modalsAndPopups,
    blockchainMulticall,
    blockchainTransactions,
    blockchainConnection,
    user,
    window
  },
  middleware: defaultMiddleware =>
    defaultMiddleware({
      thunk: true
    }).concat(save({ states: PERSISTED_KEYS })),
  preloadedState: load({ states: PERSISTED_KEYS, disableWarnings: process.env.NODE_ENV === 'test' })
})

store.dispatch(updateVersion())

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
