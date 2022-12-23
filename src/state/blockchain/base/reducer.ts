import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ConnectionType } from 'blockchain/connectors'

export interface BlockchainState {
  readonly blockNumber: { readonly [chainId: number]: number }
  readonly chainId: number | null
  readonly chainConnectivityWarning: boolean
  readonly implements3085: boolean
  selectedWalletBackfilled: boolean
  selectedWallet?: ConnectionType
}

export type BlockNumberState = {
  chainId: number
  blockNumber: number
}

const initialState: BlockchainState = {
  blockNumber: {},
  chainId: null,
  chainConnectivityWarning: false,
  implements3085: false,
  selectedWalletBackfilled: false,
  selectedWallet: undefined
}

const blockchainSlice = createSlice({
  name: 'blockchain',
  initialState,
  reducers: {
    updateSelectedWallet(state, { payload: { wallet } }) {
      state.selectedWallet = wallet
      state.selectedWalletBackfilled = true
    },
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
  setImplements3085,
  updateSelectedWallet
} = blockchainSlice.actions
export default blockchainSlice.reducer
