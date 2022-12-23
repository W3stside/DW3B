import { Connector } from '@web3-react/types'
import {
  gnosisSafeConnection,
  injectedConnection,
  networkConnection,
  walletConnectConnection
} from 'blockchain/connectors'
import { Connection, ConnectionType } from './types'

export function getIsInjected(): boolean {
  return Boolean(window.ethereum)
}

export function getIsMetaMask(): boolean {
  return window.ethereum?.isMetaMask ?? false
}

const CONNECTIONS: Connection[] = [gnosisSafeConnection, injectedConnection, walletConnectConnection, networkConnection]
export function getConnection(c: Connector | ConnectionType): Connection {
  if (c instanceof Connector) {
    const connection = CONNECTIONS.find(connection => connection.connector === c)
    if (!connection) {
      throw Error('unsupported connector')
    }
    return connection
  } else {
    switch (c) {
      case ConnectionType.INJECTED:
        return injectedConnection
      case ConnectionType.WALLET_CONNECT:
        return walletConnectConnection
      case ConnectionType.NETWORK:
        return networkConnection
      case ConnectionType.GNOSIS_SAFE:
        return gnosisSafeConnection
    }
  }
}

export function getConnectionName(connectionType: ConnectionType, isMetaMask?: boolean) {
  switch (connectionType) {
    case ConnectionType.INJECTED:
      return isMetaMask ? 'MetaMask' : 'Injected'
    case ConnectionType.WALLET_CONNECT:
      return 'WalletConnect'
    case ConnectionType.NETWORK:
      return 'Network'
    case ConnectionType.GNOSIS_SAFE:
      return 'Gnosis Safe'
  }
}

const WEB3_ENABLED_LOCAL_STORAGE_KEY = 'PASTELLE_ENABLE_BLOCKCHAIN'
export function isWeb3Enabled() {
  const preParse = localStorage.getItem(WEB3_ENABLED_LOCAL_STORAGE_KEY)
  const enableBc = Boolean(preParse && JSON.parse(preParse) === true)

  return enableBc
}
