import { createReducer } from '@reduxjs/toolkit'
import { Theme } from 'theme/styled'
import { updateVersion } from '../global/actions'
import { updateTheme } from './actions'

const currentTimestamp = () => new Date().getTime()

export interface UserState {
  theme: Theme
  timestamp: number
  // the timestamp of the last updateVersion action
  lastUpdateVersionTimestamp?: number
}

export const initialState: UserState = {
  theme: Theme.LIGHT,
  timestamp: currentTimestamp()
}

export default createReducer(initialState, builder =>
  builder
    .addCase(updateVersion, state => {
      state.lastUpdateVersionTimestamp = currentTimestamp()
    })
    .addCase(updateTheme, (state, action) => {
      state.theme = action.payload.theme
      state.timestamp = currentTimestamp()
    })
)
