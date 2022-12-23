import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type WindowSize = { width?: number; height?: number; ar?: number } | null
export interface WindowState {
  sizes: WindowSize
}

export const initialState: WindowState = {
  sizes: null
}
const windowSlice = createSlice({
  name: 'window',
  initialState,
  reducers: {
    updateWindowSize(state, action: PayloadAction<WindowSize>) {
      state.sizes = action.payload
    }
  }
})
export const { updateWindowSize } = windowSlice.actions
export const window = windowSlice.reducer
