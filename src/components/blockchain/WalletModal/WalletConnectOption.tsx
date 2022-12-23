import { Connector } from '@web3-react/types'
import WALLET_CONNECT_ICON_URL from 'assets/images/walletConnectIcon.svg'
import { ConnectionType, walletConnectConnection } from 'blockchain/connectors'
import { getConnectionName } from 'blockchain/connectors/utils'

import Option from 'components/blockchain/WalletModal/Option'

const BASE_PROPS = {
  color: '#4196FC',
  icon: WALLET_CONNECT_ICON_URL,
  id: 'wallet-connect'
}

export function WalletConnectOption({ tryActivation }: { tryActivation: (connector: Connector) => void }) {
  const isActive = walletConnectConnection.hooks.useIsActive()
  return (
    <Option
      {...BASE_PROPS}
      isActive={isActive}
      onClick={() => tryActivation(walletConnectConnection.connector)}
      header={getConnectionName(ConnectionType.WALLET_CONNECT)}
    />
  )
}