import { Web3Provider } from '@ethersproject/providers'
import { PortisConnector } from '@web3-react/portis-connector'
import { InjectedConnector } from '@web3-react/injected-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { WalletLinkConnector } from '@web3-react/walletlink-connector'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

import { FortmaticConnector } from './Fortmatic'
import { NetworkConnector } from './NetworkConnector'

const INFURA_KEY = process.env.REACT_APP_INFURA_KEY

if (typeof INFURA_KEY === 'undefined') {
  throw new Error(`REACT_APP_INFURA_KEY must be a defined environment variable`)
}

export const WALLET_CONNECT_BRIDGE = process.env.WALLET_CONNECT_BRIDGE || 'wss://safe-walletconnect.gnosis.io'

type RpcNetworks = { [chainId: number]: string }

export function getSupportedChainIds(): number[] {
  const supportedChainIdsEnv = process.env.REACT_APP_SUPPORTED_CHAIN_IDS

  if (!supportedChainIdsEnv) {
    throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`)
  }

  const chainIds = supportedChainIdsEnv.split(',').map(chainId => Number(chainId.trim()))

  return chainIds
}

function getRpcNetworks(): [RpcNetworks, number[]] {
  const defaultChainId = parseInt(process.env.REACT_APP_CHAIN_ID ?? '1')

  // Get list of supported chains
  const chainIds = getSupportedChainIds()
  if (chainIds.length === 0) {
    throw new Error(`At least one network should be supported. REACT_APP_CHAIN_ID`)
  }

  // Make sure the default chain is in the list of supported chains
  if (!chainIds.includes(defaultChainId)) {
    throw new Error(
      `The default chain id (${defaultChainId}) must be part of the list of supported networks: ${chainIds.join(', ')}`
    )
  }

  // Return rpc urls per network
  const rpcNetworks = chainIds.reduce<RpcNetworks>((acc, chainId) => {
    const url = process.env['REACT_APP_NETWORK_URL_' + chainId]

    if (!url) {
      throw new Error(
        `Network ${chainId} is supported, however 'REACT_APP_NETWORK_URL_${chainId} environment variable was not defined`
      )
    }

    acc[chainId] = url

    return acc
  }, {})

  // Get chainIds (excluding the NETWORK_CHAIN_ID)
  // Reason: By convention we will return NETWORK_CHAIN_ID as the first element in the supported networks
  const otherChainIds = Object.keys(rpcNetworks)
    .map(Number)
    .filter(networkId => networkId !== defaultChainId)
  const supportedChainIds = [defaultChainId, ...otherChainIds]

  return [rpcNetworks, supportedChainIds]
}

const [rpcNetworks, supportedChainIds] = getRpcNetworks()
export const NETWORK_CHAIN_ID = supportedChainIds[0]

export const network = new NetworkConnector({
  urls: rpcNetworks,
  defaultChainId: NETWORK_CHAIN_ID
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
}

export const injected = new InjectedConnector({ supportedChainIds })

// mainnet only
export const walletconnect = new WalletConnectConnector({
  rpc: rpcNetworks,
  bridge: WALLET_CONNECT_BRIDGE,
  qrcode: true
})

// mainnet only
export const fortmatic = new FortmaticConnector({
  apiKey: process.env.REACT_APP_FORTMATIC_KEY ?? '',
  chainId: NETWORK_CHAIN_ID
})

// mainnet only
export const portis = new PortisConnector({
  dAppId: process.env.REACT_APP_PORTIS_ID ?? '',
  // TODO: Allow to configure multiple networks in portis
  // networks: supportedChainIds
  networks: [NETWORK_CHAIN_ID]
})

// mainnet only
export const walletlink = new WalletLinkConnector({
  url: rpcNetworks[NETWORK_CHAIN_ID],
  appName: 'CowSwap',
  appLogoUrl: 'https://raw.githubusercontent.com/gnosis/gp-swap-ui/develop/public/favicon.png'
})

export enum WalletProvider {
  INJECTED = 'INJECTED',
  WALLET_CONNECT = 'WALLET_CONNECT',
  FORMATIC = 'FORMATIC',
  PORTIS = 'PORTIS',
  WALLET_LINK = 'WALLET_LINK'
}

export function getProviderType(connector: AbstractConnector | undefined): WalletProvider | undefined {
  if (!connector) {
    return undefined
  }

  switch (connector) {
    case injected:
      return WalletProvider.INJECTED

    case walletconnect:
      return WalletProvider.WALLET_CONNECT

    case fortmatic:
      return WalletProvider.FORMATIC

    case portis:
      return WalletProvider.PORTIS

    case walletlink:
      return WalletProvider.WALLET_LINK

    default:
      return undefined
  }
}
