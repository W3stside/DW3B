import { useMemo } from 'react'
import { Contract } from '@ethersproject/contracts'

import ARGENT_WALLET_DETECTOR_ABI from 'blockchain/abis/argent-wallet-detector.json'
import ENS_PUBLIC_RESOLVER_ABI from 'blockchain/abis/ens-public-resolver.json'
import ENS_ABI from 'blockchain/abis/ens-registrar.json'
import ERC20_BYTES32_ABI from 'blockchain/abis/erc20_bytes32.json'
import ERC20_ABI from 'blockchain/abis/erc20.json'
import WETH_ABI from 'blockchain/abis/weth.json'
// TODO: update from uni (no package right now)
import MulticallABI from 'blockchain/abis/UniswapInterfaceMulticall.json'

import {
  ArgentWalletDetector,
  EnsPublicResolver,
  EnsRegistrar,
  Erc20,
  UniswapInterfaceMulticall,
  Weth
} from 'blockchain/abis/types'

import { useWeb3React } from '@web3-react/core'
import { getContract } from 'blockchain/utils'
import {
  ARGENT_WALLET_DETECTOR_ADDRESS,
  ENS_REGISTRAR_ADDRESSES,
  MULTICALL_ADDRESS,
  WETH9_EXTENDED
} from 'blockchain/constants'
import { devError } from 'utils/logging'

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true
): T | null {
  const { provider, account, chainId } = useWeb3React()

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !provider || !chainId) return null
    let address: string | undefined
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap
    else address = addressOrAddressMap[chainId]
    if (!address) return null
    try {
      return getContract(address, ABI, provider, withSignerIfPossible && account ? account : undefined)
    } catch (error) {
      devError('Failed to get contract', error)
      return null
    }
  }, [addressOrAddressMap, ABI, provider, chainId, withSignerIfPossible, account]) as T
}

export function useTokenContract(tokenAddress?: string, withSignerIfPossible?: boolean) {
  return useContract<Erc20>(tokenAddress, ERC20_ABI, withSignerIfPossible)
}

export function useWETHContract(withSignerIfPossible?: boolean) {
  const { chainId } = useWeb3React()
  return useContract<Weth>(chainId ? WETH9_EXTENDED[chainId]?.address : undefined, WETH_ABI, withSignerIfPossible)
}

export function useArgentWalletDetectorContract() {
  return useContract<ArgentWalletDetector>(ARGENT_WALLET_DETECTOR_ADDRESS, ARGENT_WALLET_DETECTOR_ABI, false)
}

export function useENSRegistrarContract(withSignerIfPossible?: boolean) {
  return useContract<EnsRegistrar>(ENS_REGISTRAR_ADDRESSES, ENS_ABI, withSignerIfPossible)
}

export function useENSResolverContract(address: string | undefined, withSignerIfPossible?: boolean) {
  return useContract<EnsPublicResolver>(address, ENS_PUBLIC_RESOLVER_ABI, withSignerIfPossible)
}

export function useBytes32TokenContract(tokenAddress?: string, withSignerIfPossible?: boolean): Contract | null {
  return useContract(tokenAddress, ERC20_BYTES32_ABI, withSignerIfPossible)
}

export function useMulticall2Contract() {
  return useContract<UniswapInterfaceMulticall>(MULTICALL_ADDRESS, MulticallABI.abi, false) as UniswapInterfaceMulticall
}

export function useInterfaceMulticall() {
  return useContract<UniswapInterfaceMulticall>(MULTICALL_ADDRESS, MulticallABI.abi, false) as UniswapInterfaceMulticall
}
