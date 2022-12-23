import { initializeConnector } from '@web3-react/core'
import { GnosisSafe } from '@web3-react/gnosis-safe'
import { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import { WalletConnect } from '@web3-react/walletconnect'

import { RPC_URLS } from 'blockchain/connectors/constants'
import { devDebug } from 'utils/logging'
import { Connection, ConnectionType } from './types'

function onError(error: Error) {
  devDebug(`web3-react error: ${error}`)
}

const [web3Network, web3NetworkHooks] = initializeConnector<Network>(
  actions => new Network({ actions, urlMap: RPC_URLS, defaultChainId: 1 })
)
export const networkConnection: Connection = {
  connector: web3Network,
  hooks: web3NetworkHooks,
  type: ConnectionType.NETWORK
}

const [web3Injected, web3InjectedHooks] = initializeConnector<MetaMask>(actions => new MetaMask({ actions, onError }))
export const injectedConnection: Connection = {
  connector: web3Injected,
  hooks: web3InjectedHooks,
  type: ConnectionType.INJECTED
}

const [web3GnosisSafe, web3GnosisSafeHooks] = initializeConnector<GnosisSafe>(actions => new GnosisSafe({ actions }))
export const gnosisSafeConnection: Connection = {
  connector: web3GnosisSafe,
  hooks: web3GnosisSafeHooks,
  type: ConnectionType.GNOSIS_SAFE
}

const [web3WalletConnect, web3WalletConnectHooks] = initializeConnector<WalletConnect>(
  actions =>
    new WalletConnect({
      actions,
      options: {
        rpc: RPC_URLS,
        qrcode: true
      },
      onError
    })
)
export const walletConnectConnection: Connection = {
  connector: web3WalletConnect,
  hooks: web3WalletConnectHooks,
  type: ConnectionType.WALLET_CONNECT
}
