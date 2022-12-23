export * from './tokens'
export * from './chains'
export * from './addresses'

// Block time here is slightly higher (~1s) than average in order to avoid ongoing proposals past the displayed time
export const AVERAGE_BLOCK_TIME_IN_SECS = 14

export const DEFAULT_DECIMALS = 18
export const DEFAULT_PRECISION = 6
export const DEFAULT_SMALL_LIMIT = '0.000001'
export const AMOUNT_PRECISION = 4
export const LONG_PRECISION = 10
export const FULL_PRICE_PRECISION = 20
export const FIAT_PRECISION = 2
export const PERCENTAGE_PRECISION = 2

// Smart contract wallets are filtered out by default, no need to add them to this list
export const UNSUPPORTED_WC_WALLETS = new Set(['DeFi Wallet', 'WallETH'])
export const STORAGE_KEY_LAST_PROVIDER = 'lastProvider'
