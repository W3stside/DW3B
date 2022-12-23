import { Connector } from '@web3-react/types'
import { gnosisSafeConnection, networkConnection } from 'blockchain/connectors'
import { getConnection } from 'blockchain/connectors/utils'
import { useEffect } from 'react'
import { BACKFILLABLE_WALLETS } from 'blockchain/connectors/constants'
import { useAppSelector } from 'state'
import { devDebug } from 'utils/logging'

async function connect(connector: Connector) {
  try {
    if (connector.connectEagerly) {
      await connector.connectEagerly()
    } else {
      await connector.activate()
    }
  } catch (error) {
    devDebug(`EAGER CONNECTION ERROR: ${error}`)
  }
}

export default function useEagerlyConnect() {
  const selectedWalletBackfilled = useAppSelector(state => state.blockchainBase.selectedWalletBackfilled)
  const selectedWallet = useAppSelector(state => state.blockchainBase.selectedWallet)

  useEffect(() => {
    connect(gnosisSafeConnection.connector)
    connect(networkConnection.connector)

    if (selectedWallet) {
      connect(getConnection(selectedWallet).connector)
    } else if (!selectedWalletBackfilled) {
      BACKFILLABLE_WALLETS.map(getConnection)
        .map(connection => connection.connector)
        .forEach(connect)
    }
    // The dependency list is empty so this is only run once on mount
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
}
