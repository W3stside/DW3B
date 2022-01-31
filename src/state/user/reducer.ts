import { createReducer } from '@reduxjs/toolkit'
import { Theme, ThemeModes } from 'theme/styled'
import { updateVersion } from 'state/global/actions'
import { updateThemeMode, updateThemeAutoDetect } from './actions'

const currentTimestamp = () => new Date().getTime()

export interface UserState {
  theme: Theme
  timestamp: number
  // the timestamp of the last updateVersion action
  lastUpdateVersionTimestamp?: number
}

export const initialState: UserState = {
  theme: {
    mode: ThemeModes.LIGHT,
    autoDetect: false
  },
  timestamp: currentTimestamp()
}

export default createReducer(initialState, builder =>
  builder
    .addCase(updateVersion, state => {
      state.lastUpdateVersionTimestamp = currentTimestamp()
    })
    .addCase(updateThemeMode, (state, action) => {
      state.theme.mode = action.payload
      state.timestamp = currentTimestamp()
    })
    .addCase(updateThemeAutoDetect, (state, action) => {
      state.theme.autoDetect = action.payload
      state.timestamp = currentTimestamp()
    })
)
