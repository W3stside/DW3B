import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { SafeMultisigTransactionResponse } from '@gnosis.pm/safe-service-client'

type WithChainId = { chainId: number }
type WithData = { data?: any }
type WithChainIdAndHash = WithChainId & { hash: string }
export interface SerializableTransactionReceipt {
  to: string
  from: string
  contractAddress: string
  transactionIndex: number
  blockHash: string
  transactionHash: string
  blockNumber: number
  status?: number
}

export type ReplacementType = 'speedup' | 'cancel'

export type AddTransactionParams = WithChainId &
  WithData &
  Pick<TransactionDetails, 'hash' | 'hashType' | 'from' | 'approval' | 'presign' | 'summary' | 'safeTransaction'>

export enum HashType {
  ETHEREUM_TX = 'ETHEREUM_TX',
  GNOSIS_SAFE_TX = 'GNOSIS_SAFE_TX'
}

export interface TransactionDetails {
  hash: string // The hash of the transaction, normally Ethereum one, but not necessarily
  hashType: HashType // Transaction hash: could be Ethereum tx, or for multisigs could be some kind of hash identifying the order (i.e. Gnosis Safe)
  transactionHash?: string // Transaction hash. For EOA this field is immediately available, however, other wallets go through a process of offchain signing before the transactionHash is available

  // Params using for polling handling
  addedTime: number // Used to determine the polling frequency
  lastCheckedBlockNumber?: number

  // Basic data
  from: string
  summary?: string
  confirmedTime?: number
  receipt?: SerializableTransactionReceipt // Ethereum transaction receipt
  data?: any // any attached data type

  // Operations
  approval?: { tokenAddress: string; spender: string }
  presign?: { orderId: string }

  // Wallet specific
  safeTransaction?: SafeMultisigTransactionResponse // Gnosis Safe transaction info
  replacementType?: ReplacementType // if the user cancelled or speedup the tx it will be reflected here
}

export interface EnhancedTransactionState {
  [chainId: number]: {
    [txHash: string]: TransactionDetails
  }
}

export const initialState: EnhancedTransactionState = {}

const now = () => new Date().getTime()

function updateBlockNumber(tx: TransactionDetails, blockNumber: number) {
  if (!tx.lastCheckedBlockNumber) {
    tx.lastCheckedBlockNumber = blockNumber
  } else {
    tx.lastCheckedBlockNumber = Math.max(blockNumber, tx.lastCheckedBlockNumber)
  }
}

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    addTransaction(
      transactions,
      {
        payload: { chainId, from, hash, hashType, approval, summary, presign, safeTransaction, data }
      }: PayloadAction<AddTransactionParams>
    ) {
      if (transactions[chainId]?.[hash]) {
        console.warn('[state::enhancedTransactions] Attempted to add existing transaction', hash)
        // Unknown transaction. Do nothing!
        return
      }
      const txs = transactions[chainId] ?? {}
      txs[hash] = {
        hash,
        transactionHash: hashType === HashType.ETHEREUM_TX ? hash : undefined,
        hashType,
        addedTime: now(),
        from,
        summary,
        data,

        // Operations
        approval,
        presign,
        safeTransaction
      }
      transactions[chainId] = txs
    },
    clearAllTransactions(transactions, { payload: chainId }: PayloadAction<number>) {
      if (!transactions[chainId]) return
      transactions[chainId] = {}
    },

    checkedTransaction(
      transactions,
      { payload: { chainId, hash, blockNumber } }: PayloadAction<WithChainIdAndHash & { blockNumber: number }>
    ) {
      const tx = transactions[chainId]?.[hash]
      if (!tx) {
        return
      }
      updateBlockNumber(tx, blockNumber)
    },

    finalizeTransaction(
      transactions,
      {
        payload: { hash, chainId, receipt }
      }: PayloadAction<WithChainIdAndHash & { receipt: SerializableTransactionReceipt }>
    ) {
      const tx = transactions[chainId]?.[hash]
      if (!tx) {
        return
      }
      tx.receipt = receipt
      tx.confirmedTime = now()
    },

    replaceTransaction(
      transactions,
      {
        payload: { chainId, oldHash, newHash, type }
      }: PayloadAction<WithChainId & { oldHash: string; newHash: string; type: ReplacementType }>
    ) {
      if (!transactions[chainId]?.[oldHash]) {
        console.error('Attempted to replace an unknown transaction.')
        return
      }
      const allTxs = transactions[chainId] ?? {}
      allTxs[newHash] = {
        ...allTxs[oldHash],
        hash: newHash,
        transactionHash: newHash,
        addedTime: new Date().getTime(),
        replacementType: type
      }
      delete allTxs[oldHash]
    },

    updateSafeTransaction(
      transactions,
      {
        payload: { chainId, safeTransaction, blockNumber }
      }: PayloadAction<WithChainId & { safeTransaction: SafeMultisigTransactionResponse; blockNumber: number }>
    ) {
      const { safeTxHash, transactionHash } = safeTransaction
      const tx = transactions[chainId]?.[safeTxHash]
      if (!tx) {
        console.warn('[updateSafeTransaction] Unknown safe transaction', safeTxHash)
        return
      }

      // Update block number
      updateBlockNumber(tx, blockNumber)

      // Update tx hash (if present)
      tx.transactionHash = transactionHash

      // Update safe info
      tx.safeTransaction = safeTransaction
    }
  }
})

export const {
  addTransaction,
  clearAllTransactions,
  checkedTransaction,
  finalizeTransaction,
  replaceTransaction,
  updateSafeTransaction
} = transactionsSlice.actions
export const transactions = transactionsSlice.reducer
