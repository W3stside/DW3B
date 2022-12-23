import 'inter-ui'
import './i18n'

import { StrictMode } from 'react'

// PROVIDERS
import Web3ReactProvider from 'blockchain/providers/Web3Provider'
import { Provider } from 'react-redux'
import ThemeProvider from 'theme'

import { createRoot } from 'react-dom/client'
import { HashRouter } from 'react-router-dom'

import App from './pages/App'

import store from 'state'
// BC UPDATERS
import BlockchainUpdater from 'state/blockchain/updater'
import TransactionUpdater from 'state/blockchainTransactions/updater'

import { TopGlobalStyle, ThemedGlobalStyle, FontStyles } from 'theme/styles/global'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { nodeRemoveChildFix } from 'utils/node'
import reportWebVitals from 'reportWebVitals'

// Node removeChild hackaround
// based on: https://github.com/facebook/react/issues/11538#issuecomment-417504600
nodeRemoveChildFix()

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

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const container = document.getElementById('root')!
const root = createRoot(container)
root.render(
  <StrictMode>
    {/* Provides all top level CSS NOT dynamically adjustable by the ThemeProvider */}
    <FontStyles />
    <TopGlobalStyle />
    <ApolloProvider>
      <Provider store={store}>
        <HashRouter>
          <Web3ReactProvider>
            <PastelleStoreUpdaters />
            <BlockchainUpdaters />
            <ThemeProvider>
              {/* Provides all top level CSS dynamically adjustable by the ThemeProvider */}
              <ThemedGlobalStyle />
              <App />
            </ThemeProvider>
          </Web3ReactProvider>
        </HashRouter>
      </Provider>
    </ApolloProvider>
  </StrictMode>
)

// SERVICE WORKER (e.g USER OFFLINE USE)
// README: change to unregister to remove SW
serviceWorkerRegistration.register()

// WEB VITALS REPORTING
// README: change to unregister to remove web vitals reporting
reportWebVitals()
