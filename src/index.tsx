import { createWeb3ReactRoot, Web3ReactProvider } from '@web3-react/core'
import 'inter-ui'

import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import React, { StrictMode } from 'react'
import { HashRouter } from 'react-router-dom'

import { NetworkContextName } from 'constants/index'
import './i18n'

import App from './pages/App'

import store from 'state'

import ApplicationUpdater from './state/application/updater'
import TransactionUpdater from './state/transactions/updater'
import UserUpdater from './state/user/updater'

import getLibrary from 'utils/getLibrary'

import ThemeProvider from 'theme'
import { TopGlobalStyle, ThemedGlobalStyle } from './theme/styles/global'

const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

if ('ethereum' in window) {
  ;(window.ethereum as any).autoRefreshOnNetworkChange = false
}

function Updaters() {
  return (
    <>
      <UserUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
    </>
  )
}

ReactDOM.render(
  <StrictMode>
    {/* Provides all top level CSS NOT dynamically adjustable by the ThemeProvider */}
    <TopGlobalStyle />
    <Web3ReactProvider getLibrary={getLibrary}>
      <Web3ProviderNetwork getLibrary={getLibrary}>
        <Provider store={store}>
          <Updaters />
          <ThemeProvider>
            {/* Provides all top level CSS dynamically adjustable by the ThemeProvider */}
            <ThemedGlobalStyle />
            <HashRouter>
              <App />
            </HashRouter>
          </ThemeProvider>
        </Provider>
      </Web3ProviderNetwork>
    </Web3ReactProvider>
  </StrictMode>,
  document.getElementById('root')
)
