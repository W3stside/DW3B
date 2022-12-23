import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { useBlockNumber } from 'state/blockchain/base/hooks'

import { useAddTxPopup, useFinalizeTransaction, useCheckedTransaction } from 'state/modalsAndPopups/hooks'
import { useAppSelector } from 'state'
import { devError } from 'utils/logging'

export function shouldCheck(
  lastBlockNumber: number,
  tx: { addedTime: number; receipt?: Record<any, any>; lastCheckedBlockNumber?: number }
): boolean {
  if (tx.receipt) return false
  if (!tx.lastCheckedBlockNumber) return true
  const blocksSinceCheck = lastBlockNumber - tx.lastCheckedBlockNumber
  if (blocksSinceCheck < 1) return false
  const minutesPending = (new Date().getTime() - tx.addedTime) / 1000 / 60
  if (minutesPending > 60) {
    // every 10 blocks if pending for longer than an hour
    return blocksSinceCheck > 9
  } else if (minutesPending > 5) {
    // every 3 blocks if pending more than 5 minutes
    return blocksSinceCheck > 2
  } else {
    // otherwise every block
    return true
  }
}

export default function Updater(): null {
  const { chainId, provider } = useWeb3React()

  const lastBlockNumber = useBlockNumber()
  const state = useAppSelector(state => state.blockchainTransactions)

  // show popup on confirm
  const addTxPopup = useAddTxPopup()
  const finalizeTransaction = useFinalizeTransaction()
  const checkedTransaction = useCheckedTransaction()

  useEffect(() => {
    if (!chainId || !provider || !lastBlockNumber) return

    const transactions = state[chainId] ?? {}

    Object.keys(transactions)
      .filter(hash => shouldCheck(lastBlockNumber, transactions[hash]))
      .forEach(hash => {
        provider
          .getTransactionReceipt(hash)
          .then(receipt => {
            if (receipt) {
              finalizeTransaction({
                chainId,
                hash,
                receipt: {
                  blockHash: receipt.blockHash,
                  blockNumber: receipt.blockNumber,
                  contractAddress: receipt.contractAddress,
                  from: receipt.from,
                  status: receipt.status,
                  to: receipt.to,
                  transactionHash: receipt.transactionHash,
                  transactionIndex: receipt.transactionIndex
                }
              })

              addTxPopup(
                {
                  txn: {
                    hash,
                    success: receipt.status === 1,
                    summary: transactions[hash]?.summary
                  }
                },
                hash
              )
            } else {
              checkedTransaction({ chainId, hash, blockNumber: lastBlockNumber })
            }
          })
          .catch(error => {
            devError(`failed to check transaction hash: ${hash}`, error)
          })
      })
  }, [chainId, provider, lastBlockNumber, addTxPopup, state, finalizeTransaction, checkedTransaction])

  return null
}
