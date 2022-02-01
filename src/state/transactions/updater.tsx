import { useEffect } from 'react'
import { useActiveWeb3React } from 'blockchain/hooks'
import { useBlockNumber } from 'state/blockchain/hooks'

import { useAddPopup, useFinalizeTransaction, useCheckedTransaction } from 'state/application/hooks'
import { useAppSelector } from 'state'

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
  const { chainId, library } = useActiveWeb3React()

  const lastBlockNumber = useBlockNumber()

  const state = useAppSelector(state => state.transactions)

  // show popup on confirm
  const addPopup = useAddPopup()
  const finalizeTransaction = useFinalizeTransaction()
  const checkedTransaction = useCheckedTransaction()

  useEffect(() => {
    if (!chainId || !library || !lastBlockNumber) return

    const transactions = state[chainId] ?? {}

    Object.keys(transactions)
      .filter(hash => shouldCheck(lastBlockNumber, transactions[hash]))
      .forEach(hash => {
        library
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

              addPopup(
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
            console.error(`failed to check transaction hash: ${hash}`, error)
          })
      })
  }, [chainId, library, lastBlockNumber, addPopup, state, finalizeTransaction, checkedTransaction])

  return null
}
