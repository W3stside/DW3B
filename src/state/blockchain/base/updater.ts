import { useCallback, useEffect, useRef, useState } from 'react'
import { CHAIN_INFO } from 'blockchain/constants/chains'
import useDebounce from 'hooks/useDebounce'
import useIsWindowVisible from 'hooks/useIsWindowVisible'
import { useWeb3React } from '@web3-react/core'
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
} from 'state/blockchain/base/hooks'
import { devError } from 'utils/logging'

const NETWORK_HEALTH_CHECK_MS = ms`15s`
const DEFAULT_MS_BEFORE_WARNING = ms`10m`

function useBlockWarningTimer() {
  const { chainId } = useWeb3React()
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
  const { account, chainId, provider } = useWeb3React()

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
    if (!provider || !chainId || !windowVisible) return undefined

    setState({ chainId, blockNumber: null })

    provider
      .getBlockNumber()
      .then(blockNumberCallback)
      .catch(error => devError(`Failed to get block number for chainId: ${chainId}`, error))

    provider.on('block', blockNumberCallback)
    return () => {
      provider.removeListener('block', blockNumberCallback)
    }
  }, [chainId, provider, blockNumberCallback, windowVisible])

  const debouncedState = useDebounce(state, 100)

  useEffect(() => {
    if (!debouncedState.chainId || !debouncedState.blockNumber || !windowVisible) return
    updateBlockNumber({ chainId: debouncedState.chainId, blockNumber: debouncedState.blockNumber })
  }, [windowVisible, debouncedState.blockNumber, debouncedState.chainId, updateBlockNumber])

  useEffect(() => {
    updateChainId(debouncedState.chainId ? supportedChainId(debouncedState.chainId) ?? null : null)
  }, [debouncedState.chainId, updateChainId])

  useEffect(() => {
    if (!account || !provider?.provider?.request || !provider?.provider?.isMetaMask) {
      return
    }
    switchToNetwork({ library: provider })
      .then(x => x ?? setImplements3085(true))
      .catch(() => setImplements3085(false))
  }, [account, chainId, provider, setImplements3085])

  return null
}
