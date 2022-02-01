import { useCallback, useEffect, useRef, useState } from 'react'
import { CHAIN_INFO } from 'blockchain/constants/chains'
import useDebounce from 'hooks/useDebounce'
import useIsWindowVisible from 'hooks/useIsWindowVisible'
import { useActiveWeb3React } from 'blockchain/hooks'
import ms from 'ms.macro'
import { supportedChainId } from 'blockchain/utils/supportedChainId'
import { switchToNetwork } from 'blockchain/utils/switchToNetwork'

import {
  useBlockNumber,
  useChainConnectivityWarning,
  useSetChainConnectivityWarning,
  useSetImplements3085,
  useUpdateBlockNumber,
  useUpdateChainId
} from 'state/blockchain/hooks'

const NETWORK_HEALTH_CHECK_MS = ms`15s`
const DEFAULT_MS_BEFORE_WARNING = ms`10m`

function useBlockWarningTimer() {
  const { chainId } = useActiveWeb3React()
  const currentBlock = useBlockNumber()

  const chainConnectivityWarningActive = useChainConnectivityWarning()
  const setChainConnectivityWarning = useSetChainConnectivityWarning()

  const [msSinceLastBlock, setMsSinceLastBlock] = useState(0)

  const timeout = useRef<NodeJS.Timeout>()
  const isWindowVisible = useIsWindowVisible()

  useEffect(() => {
    setMsSinceLastBlock(0)
  }, [currentBlock])

  useEffect(() => {
    const waitMsBeforeWarning =
      (chainId ? CHAIN_INFO[chainId]?.blockWaitMsBeforeWarning : DEFAULT_MS_BEFORE_WARNING) ?? DEFAULT_MS_BEFORE_WARNING

    timeout.current = setTimeout(() => {
      setMsSinceLastBlock(NETWORK_HEALTH_CHECK_MS + msSinceLastBlock)
      if (msSinceLastBlock > waitMsBeforeWarning && isWindowVisible) {
        setChainConnectivityWarning(true)
      } else if (chainConnectivityWarningActive) {
        setChainConnectivityWarning(false)
      }
    }, NETWORK_HEALTH_CHECK_MS)

    return function cleanup() {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }
    }
  }, [
    chainId,
    chainConnectivityWarningActive,
    isWindowVisible,
    msSinceLastBlock,
    setMsSinceLastBlock,
    setChainConnectivityWarning
  ])
}

export default function Updater(): null {
  const { account, chainId, library } = useActiveWeb3React()

  const updateChainId = useUpdateChainId()
  const updateBlockNumber = useUpdateBlockNumber()
  const setImplements3085 = useSetImplements3085()

  const [state, setState] = useState<{ chainId: number | undefined; blockNumber: number | null }>({
    chainId,
    blockNumber: null
  })

  const windowVisible = useIsWindowVisible()

  useBlockWarningTimer()

  const blockNumberCallback = useCallback(
    (blockNumber: number) => {
      setState(state => {
        if (chainId === state.chainId) {
          if (typeof state.blockNumber !== 'number') return { chainId, blockNumber }
          return { chainId, blockNumber: Math.max(blockNumber, state.blockNumber) }
        }
        return state
      })
    },
    [chainId, setState]
  )

  // attach/detach listeners
  useEffect(() => {
    if (!library || !chainId || !windowVisible) return undefined

    setState({ chainId, blockNumber: null })

    library
      .getBlockNumber()
      .then(blockNumberCallback)
      .catch(error => console.error(`Failed to get block number for chainId: ${chainId}`, error))

    library.on('block', blockNumberCallback)
    return () => {
      library.removeListener('block', blockNumberCallback)
    }
  }, [chainId, library, blockNumberCallback, windowVisible])

  const debouncedState = useDebounce(state, 100)

  useEffect(() => {
    if (!debouncedState.chainId || !debouncedState.blockNumber || !windowVisible) return
    updateBlockNumber({ chainId: debouncedState.chainId, blockNumber: debouncedState.blockNumber })
  }, [windowVisible, debouncedState.blockNumber, debouncedState.chainId, updateBlockNumber])

  useEffect(() => {
    updateChainId(debouncedState.chainId ? supportedChainId(debouncedState.chainId) ?? null : null)
  }, [debouncedState.chainId, updateChainId])

  useEffect(() => {
    if (!account || !library?.provider?.request || !library?.provider?.isMetaMask) {
      return
    }
    switchToNetwork({ library })
      .then(x => x ?? setImplements3085(true))
      .catch(() => setImplements3085(false))
  }, [account, chainId, library, setImplements3085])

  return null
}
