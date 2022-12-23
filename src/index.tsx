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
// REG UPDATERS
import WindowSizeUpdater from 'state/window/updater'

// BC UPDATERS
import BlockchainUpdater from 'state/blockchain/base/updater'
import TransactionUpdater from 'state/blockchain/transactions/updater'

import { TopGlobalStyle, ThemedGlobalStyle } from 'theme/styles/global'

import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { nodeRemoveChildFix } from 'utils/node'
import reportWebVitals from 'reportWebVitals'
import FontStyles from 'theme/styles/fonts'
import { isWeb3Enabled } from 'blockchain/connectors'

// Node removeChild hackaround
// based on: https://github.com/facebook/react/issues/11538#issuecomment-417504600
nodeRemoveChildFix()

if (!!window.ethereum) {
  window.ethereum.autoRefreshOnNetworkChange = false
}

function NormalUpdaters() {
  return (
    <>
      <WindowSizeUpdater />
    </>
  )
}

function BlockchainUpdaters() {
  const isEnabled = isWeb3Enabled()

  if (!isEnabled) return null
  return (
    <>
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
    <Provider store={store}>
      <HashRouter>
        <Web3ReactProvider>
          <NormalUpdaters />
          <BlockchainUpdaters />
          <ThemeProvider>
            {/* Provides all top level CSS dynamically adjustable by the ThemeProvider */}
            <ThemedGlobalStyle />
            <App />
          </ThemeProvider>
        </Web3ReactProvider>
      </HashRouter>
    </Provider>
  </StrictMode>
)

// SERVICE WORKER (e.g USER OFFLINE USE)
// DISABLED BY DEFAULT
// .register() enables
serviceWorkerRegistration.unregister()

// WEB VITALS REPORTING
// README: change to unregister to remove web vitals reporting
reportWebVitals()
