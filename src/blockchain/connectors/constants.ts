import { SupportedChainId } from '@uniswap/sdk-core'
import { ConnectionType } from './types'

enum PastelleSupportedChainId {
  MAINNET = SupportedChainId.MAINNET,
  RINKEBY = SupportedChainId.RINKEBY,
  GOERLI = SupportedChainId.GOERLI
}

/**
 * These are the network URLs used by the interface when there is not another available source of chain data
 */
export const RPC_URLS: { [key in PastelleSupportedChainId]: string } = {
  [SupportedChainId.MAINNET]: `https://mainnet.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
  [SupportedChainId.RINKEBY]: `https://rinkeby.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`,
  [SupportedChainId.GOERLI]: `https://goerli.infura.io/v3/${process.env.REACT_APP_INFURA_KEY}`
}
export const BACKFILLABLE_WALLETS = [ConnectionType.INJECTED, ConnectionType.WALLET_CONNECT]
