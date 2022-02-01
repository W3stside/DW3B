import { useCallback, useMemo } from 'react'

import { useActiveWeb3React } from 'blockchain/hooks'
import { useAppDispatch, useAppSelector } from 'state'
import { addTransaction, AddTransactionParams, clearAllTransactions, HashType, TransactionDetails } from './reducer'
import { useWalletInfo } from 'blockchain/hooks/useWalletInfo'

export type AddTransactionHookParams = Omit<AddTransactionParams, 'chainId' | 'from' | 'hashType'> // The hook requires less params for convenience
export type TransactionAdder = (params: AddTransactionHookParams) => void

export function useAddTransaction() {
  const dispatch = useAppDispatch()

  return useCallback((payload: Parameters<typeof addTransaction>[0]) => dispatch(addTransaction(payload)), [dispatch])
}

export function useClearAllTransactions() {
  const dispatch = useAppDispatch()

  return useCallback((payload: Parameters<typeof clearAllTransactions>[0]) => dispatch(clearAllTransactions(payload)), [
    dispatch
  ])
}

// helper that can take a ethers library transaction response and add it to the list of transactions
export function useTransactionAdder(): TransactionAdder {
  const { chainId, account, gnosisSafeInfo } = useWalletInfo()
  const addTransaction = useAddTransaction()

  const isGnosisSafeWallet = !!gnosisSafeInfo

  return useCallback(
    (addTransactionParams: AddTransactionHookParams) => {
      if (!account || !chainId) return

      const { hash, summary, data, approval, presign, safeTransaction } = addTransactionParams
      const hashType = isGnosisSafeWallet ? HashType.GNOSIS_SAFE_TX : HashType.ETHEREUM_TX
      if (!hash) {
        throw Error('No transaction hash found')
      }

      addTransaction({
        hash,
        hashType,
        from: account,
        chainId,
        approval,
        summary,
        data,
        presign,
        safeTransaction
      })
    },
    [account, chainId, isGnosisSafeWallet, addTransaction]
  )
}

// returns all the transactions for the current chain
export function useAllTransactions(): { [txHash: string]: TransactionDetails } {
  const { chainId } = useActiveWeb3React()

  const state = useAppSelector(state => state.transactions)

  return chainId ? state[chainId] ?? {} : {}
}

export function useIsTransactionPending(transactionHash?: string): boolean {
  const transactions = useAllTransactions()

  if (!transactionHash || !transactions[transactionHash]) return false

  return !transactions[transactionHash].receipt
}

/**
 * Returns whether a transaction happened in the last day (86400 seconds * 1000 milliseconds / second)
 * @param tx to check for recency
 */
export function isTransactionRecent(tx: TransactionDetails): boolean {
  return new Date().getTime() - tx.addedTime < 86_400_000
}

// returns whether a token has a pending approval transaction
export function useHasPendingApproval(tokenAddress: string | undefined, spender: string | undefined): boolean {
  const allTransactions = useAllTransactions()
  return useMemo(
    () =>
      typeof tokenAddress === 'string' &&
      typeof spender === 'string' &&
      Object.keys(allTransactions).some(hash => {
        const tx = allTransactions[hash]
        if (!tx) return false
        if (tx.receipt) {
          return false
        } else {
          const approval = tx.approval
          if (!approval) return false
          return approval.spender === spender && approval.tokenAddress === tokenAddress && isTransactionRecent(tx)
        }
      }),
    [allTransactions, spender, tokenAddress]
  )
}
