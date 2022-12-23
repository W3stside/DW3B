import { useCallback, useEffect, useState } from 'react'
import { ArrowLeft } from 'react-feather'
import { Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import { AutoColumn, AutoRow, LightCard } from 'components/Layout'
import { getConnection, getIsInjected, getIsMetaMask } from 'blockchain/connectors/utils'
import { useAppDispatch } from 'state'
import { updateSelectedWallet } from 'state/blockchain/base/reducer'
import styled from 'styled-components/macro'

import { ReactComponent as Close } from 'assets/images/x.svg'
import { useModalOpen, useWalletModalToggle } from 'state/modalsAndPopups/hooks'
import { ExternalLink, TYPE as ThemedText } from 'theme'
import AccountDetails from 'components/blockchain/AccountDetails'
import { InjectedOption, InstallMetaMaskOption, MetaMaskOption } from './InjectedOption'
import PendingView from './PendingView'
import { WalletConnectOption } from './WalletConnectOption'
import { ApplicationModal } from 'state/modalsAndPopups/reducer'
import { isMobile } from 'react-device-detect'
import Modal from 'components/Modal'
import { updateConnectionError } from 'state/blockchain/connection/reducer'
import { devDebug } from 'utils/logging'

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const CloseColor = styled(Close)`
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`

const Wrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  margin: 0;
  padding: 0;
  width: 100%;
`

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${props => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
`

const ContentWrapper = styled.div`
  background-color: ${({ theme }) => theme.bg1};
  padding: 0 1rem 1rem 1rem;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 0 1rem 1rem 1rem`};
`

const UpperSection = styled.div`
  position: relative;
  h5 {
    margin: 0;
    margin-bottom: 0.5rem;
    font-size: 1rem;
    font-weight: 400;
  }
  h5:last-child {
    margin-bottom: 0px;
  }
  h4 {
    margin-top: 0;
    font-weight: 500;
  }
`

const OptionGrid = styled.div`
  display: grid;
  grid-gap: 1rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  `};
`

const HoverText = styled.div`
  text-decoration: none;
  color: ${({ theme }) => theme.text1};
  display: flex;
  align-items: center;

  :hover {
    cursor: pointer;
  }
`

const WALLET_VIEWS = {
  OPTIONS: 'options',
  ACCOUNT: 'account',
  PENDING: 'pending'
}

export default function WalletModal({
  pendingTransactions,
  confirmedTransactions,
  ENSName
}: {
  pendingTransactions: string[] // hashes of pending
  confirmedTransactions: string[] // hashes of confirmed
  ENSName?: string
}) {
  const dispatch = useAppDispatch()
  const { account } = useWeb3React()

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)

  const [pendingConnector, setPendingConnector] = useState<Connector | undefined>()
  const pendingError = false /* useAppSelector(state =>
    pendingConnector ? state.connection.errorByConnectionType[getConnection(pendingConnector).type] : undefined
  ) */

  const walletModalOpen = useModalOpen(ApplicationModal.WALLET)
  const toggleWalletModal = useWalletModalToggle()

  const openOptions = useCallback(() => {
    setWalletView(WALLET_VIEWS.OPTIONS)
  }, [setWalletView])

  useEffect(() => {
    if (walletModalOpen) {
      setWalletView(account ? WALLET_VIEWS.ACCOUNT : WALLET_VIEWS.OPTIONS)
    }
  }, [walletModalOpen, setWalletView, account])

  useEffect(() => {
    if (pendingConnector && walletView !== WALLET_VIEWS.PENDING) {
      updateConnectionError({ connectionType: getConnection(pendingConnector).type, error: undefined })
      setPendingConnector(undefined)
    }
  }, [pendingConnector, walletView])

  const tryActivation = useCallback(
    async (connector: Connector) => {
      const connectionType = getConnection(connector).type

      try {
        setPendingConnector(connector)
        setWalletView(WALLET_VIEWS.PENDING)
        dispatch(updateConnectionError({ connectionType, error: undefined }))

        await connector.activate()

        dispatch(updateSelectedWallet({ wallet: connectionType }))
      } catch (error) {
        devDebug(`web3-react connection error: ${error}`)
        dispatch(updateConnectionError({ connectionType, error: error.message }))
      }
    },
    [dispatch]
  )

  function getOptions() {
    const isInjected = getIsInjected()
    const isMetaMask = getIsMetaMask()

    const isMetaMaskBrowser = isMobile && isMetaMask
    const isInjectedMobileBrowser = isMetaMaskBrowser

    let injectedOption
    if (!isInjected) {
      if (!isMobile) {
        injectedOption = <InstallMetaMaskOption />
      }
    } else {
      if (isMetaMask) {
        injectedOption = <MetaMaskOption tryActivation={tryActivation} />
      } else {
        injectedOption = <InjectedOption tryActivation={tryActivation} />
      }
    }

    const walletConnectionOption =
      (!isInjectedMobileBrowser && <WalletConnectOption tryActivation={tryActivation} />) ?? null

    return (
      <>
        {injectedOption}
        {walletConnectionOption}
      </>
    )
  }

  function getModalContent() {
    if (walletView === WALLET_VIEWS.ACCOUNT) {
      return (
        <AccountDetails
          toggleWalletModal={toggleWalletModal}
          pendingTransactions={pendingTransactions}
          confirmedTransactions={confirmedTransactions}
          ENSName={ENSName}
          openOptions={openOptions}
        />
      )
    }

    let headerRow
    if (walletView === WALLET_VIEWS.PENDING) {
      headerRow = null
    } else if (walletView === WALLET_VIEWS.ACCOUNT || !!account) {
      headerRow = (
        <HeaderRow color="blue">
          <HoverText onClick={() => setWalletView(account ? WALLET_VIEWS.ACCOUNT : WALLET_VIEWS.OPTIONS)}>
            <ArrowLeft />
          </HoverText>
        </HeaderRow>
      )
    } else {
      headerRow = (
        <HeaderRow>
          <HoverText>
            <Trans>Connect a wallet</Trans>
          </HoverText>
        </HeaderRow>
      )
    }

    return (
      <UpperSection>
        <CloseIcon onClick={toggleWalletModal}>
          <CloseColor />
        </CloseIcon>
        {headerRow}
        <ContentWrapper>
          <AutoColumn gap="16px">
            {walletView === WALLET_VIEWS.PENDING && pendingConnector && (
              <PendingView
                openOptions={openOptions}
                connector={pendingConnector}
                error={!!pendingError}
                tryActivation={tryActivation}
              />
            )}
            {walletView !== WALLET_VIEWS.PENDING && <OptionGrid data-testid="option-grid">{getOptions()}</OptionGrid>}
            {!pendingError && (
              <LightCard>
                <AutoRow style={{ flexWrap: 'nowrap' }}>
                  <ThemedText.body fontSize={12}>
                    <Trans>
                      By connecting a wallet, you agree to Uniswap Labs’{' '}
                      <ExternalLink
                        style={{ textDecoration: 'underline' }}
                        href="https://uniswap.org/terms-of-service/"
                      >
                        Terms of Service
                      </ExternalLink>{' '}
                      and acknowledge that you have read and understand the Uniswap{' '}
                      <ExternalLink style={{ textDecoration: 'underline' }} href="https://uniswap.org/disclaimer/">
                        Protocol Disclaimer
                      </ExternalLink>
                      .
                    </Trans>
                  </ThemedText.body>
                </AutoRow>
              </LightCard>
            )}
          </AutoColumn>
        </ContentWrapper>
      </UpperSection>
    )
  }

  return (
    <Modal isOpen={walletModalOpen} onDismiss={toggleWalletModal} minHeight={false} maxHeight={90}>
      <Wrapper>{getModalContent()}</Wrapper>
    </Modal>
  )
}
