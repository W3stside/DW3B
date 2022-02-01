import { useMemo, useEffect, useState, useCallback } from 'react'
import { useWeb3React as useWeb3ReactCore } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'
import { isMobile } from 'react-device-detect'
import { getProviderType, injected, walletconnect, WalletProvider } from 'blockchain/connectors'
import { NetworkContextName, STORAGE_KEY_LAST_PROVIDER } from 'blockchain/constants'

export function useActiveWeb3React() {
  const context = useWeb3ReactCore<Web3Provider>()
  const contextNetwork = useWeb3ReactCore<Web3Provider>(NetworkContextName)
  return context.active ? context : contextNetwork
}

/**
 * Provides a Web3Provider instance for active web3 connection, if any
 * Contrary to `getNetworkLibrary` that returns it for the default chainId
 */
export function useActiveWeb3Instance(): Web3Provider | undefined {
  const { library } = useActiveWeb3React()

  return useMemo(() => {
    if (!library?.provider) {
      return
    }
    return new Web3Provider(library.provider)
  }, [library])
}

export function useEagerConnect() {
  const { activate, active, connector } = useWeb3ReactCore()
  const [tried, setTried] = useState(false)

  // handle setting/removing wallet provider in local storage
  const handleBeforeUnload = useCallback(() => {
    const walletType = getProviderType(connector)

    if (!walletType || !active) {
      localStorage.removeItem(STORAGE_KEY_LAST_PROVIDER)
    } else {
      localStorage.setItem(STORAGE_KEY_LAST_PROVIDER, walletType)
    }
  }, [connector, active])

  const connectInjected = useCallback(() => {
    // check if the our application is authorized/connected with Metamask
    injected.isAuthorized().then(isAuthorized => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true)
        })
      } else {
        if (isMobile && window.ethereum) {
          activate(injected, undefined, true).catch(() => {
            setTried(true)
          })
        } else {
          setTried(true)
        }
      }
    })
  }, [activate, setTried])

  const connectWalletConnect = useCallback(() => {
    activate(walletconnect, undefined, true).catch(() => {
      setTried(true)
    })
  }, [activate, setTried])

  useEffect(() => {
    if (!active) {
      const latestProvider = localStorage.getItem(STORAGE_KEY_LAST_PROVIDER)

      // if there is no last saved provider set tried state to true
      if (!latestProvider) {
        // Try to auto-connect to the injected wallet
        connectInjected()
      } else if (latestProvider === WalletProvider.INJECTED) {
        // MM is last provider
        connectInjected()
      } else if (latestProvider === WalletProvider.WALLET_CONNECT) {
        // WC is last provider
        connectWalletConnect()
      }
    }
  }, [connectInjected, connectWalletConnect, active]) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true)
    }
  }, [active])

  useEffect(() => {
    // add beforeunload event listener on initial component mount
    window.addEventListener('beforeunload', handleBeforeUnload)

    // remove beforeunload event listener on component unmount
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload)
    }
  })

  return tried
}

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */
export function useInactiveListener(suppress = false) {
  const { active, error, activate } = useWeb3ReactCore() // specifically using useWeb3React because of what this hook does

  useEffect(() => {
    const { ethereum } = window

    if (ethereum && ethereum.on && !active && !error && !suppress) {
      const handleChainChanged = () => {
        // eat errors
        activate(injected, undefined, true).catch(error => {
          console.error('Failed to activate after chain changed', error)
        })
      }

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          // eat errors
          activate(injected, undefined, true).catch(error => {
            console.error('Failed to activate after accounts changed', error)
          })
        }
      }

      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
        }
      }
    }
    return undefined
  }, [active, error, suppress, activate])
}
