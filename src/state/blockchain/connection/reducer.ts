import { createSlice } from '@reduxjs/toolkit'
import { ConnectionType } from 'blockchain/connectors'

export interface ConnectionState {
  errorByConnectionType: Record<ConnectionType, string | undefined>
}

export const initialState: ConnectionState = {
  errorByConnectionType: {
    [ConnectionType.INJECTED]: undefined,
    [ConnectionType.WALLET_CONNECT]: undefined,
    [ConnectionType.NETWORK]: undefined,
    [ConnectionType.GNOSIS_SAFE]: undefined
  }
}

const connectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    updateConnectionError(
      state,
      { payload: { connectionType, error } }: { payload: { connectionType: ConnectionType; error: string | undefined } }
    ) {
      state.errorByConnectionType[connectionType] = error
    }
  }
})

export const { updateConnectionError } = connectionSlice.actions
export default connectionSlice.reducer
