import { useWeb3React } from '@web3-react/core'
import { useCallback } from 'react'
import { AppState, useAppDispatch, useAppSelector } from 'state'
import { setChainConnectivityWarning, setImplements3085, updateBlockNumber, updateChainId } from './reducer'

// GETTERS
export function useBlockNumber(): number | undefined {
  const { chainId } = useWeb3React()

  return useAppSelector((state: AppState) => state.blockchainBase.blockNumber[chainId ?? -1])
}
export function useChainId() {
  return useAppSelector((state: AppState) => state.blockchainBase.chainId)
}
export function useChainConnectivityWarning() {
  return useAppSelector((state: AppState) => state.blockchainBase.chainConnectivityWarning)
}
export function useImplements3085() {
  return useAppSelector((state: AppState) => state.blockchainBase.implements3085)
}

// SETTERS
export function useSetChainConnectivityWarning() {
  const dispatch = useAppDispatch()
  return useCallback((payload: boolean) => dispatch(setChainConnectivityWarning(payload)), [dispatch])
}
export function useSetImplements3085() {
  const dispatch = useAppDispatch()
  return useCallback((payload: boolean) => dispatch(setImplements3085(payload)), [dispatch])
}
export function useUpdateBlockNumber() {
  const dispatch = useAppDispatch()
  return useCallback((payload: { chainId: number; blockNumber: number }) => dispatch(updateBlockNumber(payload)), [
    dispatch
  ])
}
export function useUpdateChainId() {
  const dispatch = useAppDispatch()
  return useCallback((payload: number | null) => dispatch(updateChainId(payload)), [dispatch])
}
