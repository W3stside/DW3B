import { Web3ReactHooks } from '@web3-react/core'
import { Connector } from '@web3-react/types'

export enum ConnectionType {
  INJECTED = 'INJECTED',
  WALLET_CONNECT = 'WALLET_CONNECT',
  NETWORK = 'NETWORK',
  GNOSIS_SAFE = 'GNOSIS_SAFE'
}

export interface Connection {
  connector: Connector
  hooks: Web3ReactHooks
  type: ConnectionType
}
