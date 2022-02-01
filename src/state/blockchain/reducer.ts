import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface BlockchainState {
  readonly blockNumber: { readonly [chainId: number]: number }
  readonly chainId: number | null
  readonly chainConnectivityWarning: boolean
  readonly implements3085: boolean
}

export type BlockNumberState = {
  chainId: number
  blockNumber: number
}

const initialState: BlockchainState = {
  blockNumber: {},
  chainId: null,
  chainConnectivityWarning: false,
  implements3085: false
}

const blockchainSlice = createSlice({
  name: 'blockchain',
  initialState,
  reducers: {
    updateChainId(state, action: PayloadAction<number | null>) {
      state.chainId = action.payload
    },
    updateBlockNumber(state, { payload: { chainId, blockNumber } }: PayloadAction<BlockNumberState>) {
      if (typeof state.blockNumber[chainId] !== 'number') {
        state.blockNumber[chainId] = blockNumber
      } else {
        state.blockNumber[chainId] = Math.max(blockNumber, state.blockNumber[chainId])
      }
    },
    setImplements3085(state, action: PayloadAction<boolean>) {
      state.implements3085 = action.payload
    },
    setChainConnectivityWarning(state, action: PayloadAction<boolean>) {
      state.chainConnectivityWarning = action.payload
    }
  }
})

export const {
  updateBlockNumber,
  updateChainId,
  setChainConnectivityWarning,
  setImplements3085
} = blockchainSlice.actions
export const blockchain = blockchainSlice.reducer
