import 'inter-ui'
import './i18n'

import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'

import { StrictMode } from 'react'
import { Provider } from 'react-redux'

import ReactDOM from 'react-dom'
import { HashRouter } from 'react-router-dom'

import { NetworkContextName } from 'blockchain/constants'
import getLibrary from 'blockchain/utils/getLibrary'

import App from './pages/App'

import store from 'state'
import BlockchainUpdater from 'state/blockchain/updater'
import TransactionUpdater from 'state/transactions/updater'
import UserUpdater from 'state/user/updater'

import ThemeProvider from 'theme'
import { TopGlobalStyle, ThemedGlobalStyle } from 'theme/styles/global'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { nodeRemoveChildFix } from 'utils/node'

// Node removeChild hackaround
// based on: https://github.com/facebook/react/issues/11538#issuecomment-417504600
nodeRemoveChildFix()

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false
}

function Updaters() {
  return (
    <>
      <UserUpdater />
      <BlockchainUpdater />
      <TransactionUpdater />
    </>
  )
}

ReactDOM.render(
  <StrictMode>
    {/* Provides all top level CSS NOT dynamically adjustable by the ThemeProvider */}
    <TopGlobalStyle />
    <Provider store={store}>
      <HashRouter>
        <Web3ReactProvider getLibrary={getLibrary}>
          <Web3ProviderNetwork getLibrary={getLibrary}>
            <Updaters />
            <ThemeProvider>
              {/* Provides all top level CSS dynamically adjustable by the ThemeProvider */}
              <ThemedGlobalStyle />
              <App />
            </ThemeProvider>
          </Web3ProviderNetwork>
        </Web3ReactProvider>
      </HashRouter>
    </Provider>
  </StrictMode>,
  document.getElementById('root')
)

async function deleteAllCaches() {
  const cacheNames = (await caches.keys()) || []

  cacheNames.map(cacheName => {
    console.log('[worker] Delete cache', cacheName)
    // Delete old caches
    // https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker#removing_outdated_caches
    return caches.delete(cacheName)
  })
}

async function unregisterAllWorkers() {
  navigator.serviceWorker.getRegistrations().then(function(registrations) {
    for (const registration of registrations) {
      registration.unregister()
    }
  })
}

if ('serviceWorker' in navigator) {
  console.log('[worker] Unregister worker...')
  serviceWorkerRegistration.unregister()

  console.log('[worker] Deleting all caches...')
  deleteAllCaches()
    .then(() => console.log('[worker] All caches have been deleted'))
    .catch(console.error)

  console.log('[worker] Unregistering all workers...')
  unregisterAllWorkers()
    .then(() => console.log('[worker] All workers have been unregistered'))
    .catch(console.error)
}
