// import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { isMobile } from 'react-device-detect'
import { Trans } from '@lingui/macro'

import { shortenAddress } from 'blockchain/utils'

import { useAppDispatch } from 'state'
import { updateSelectedWallet } from 'state/blockchain/base/reducer'

import { getConnection, getConnectionName, getIsMetaMask } from 'blockchain/connectors/utils'
import { WalletName, AccountControl, WalletAction, AddressLink } from './styled'
import { InfoCard, AccountGroupingRow } from './styled'
// import Button from 'components/Button'
// import Transaction from './Transaction'
// import { clearAllTransactions } from 'state/blockchainTransactions/reducer'
import styled from 'styled-components/macro'
import CopyHelper from './Copy'
import { ExternalLink } from 'react-feather'
import { ExplorerDataType, getExplorerLink } from 'blockchain/utils/getExplorerLink'
import StatusIcon from 'components/Identicon/StatusIcon'

const HeaderRow = styled.div`
  ${({ theme }) => theme.flexRowNoWrap};
  padding: 1rem 1rem;
  font-weight: 500;
  color: ${props => (props.color === 'blue' ? ({ theme }) => theme.primary1 : 'inherit')};
  ${({ theme }) => theme.mediaWidth.upToMedium`
    padding: 1rem;
  `};
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

const AccountSection = styled.div`
  padding: 0rem 1rem;
  ${({ theme }) => theme.mediaWidth.upToMedium`padding: 0rem 1rem 1.5rem 1rem;`};
`

const YourAccount = styled.div`
  h5 {
    margin: 0 0 1rem 0;
    font-weight: 400;
  }

  h4 {
    margin: 0;
    font-weight: 500;
  }
`

/* const LowerSection = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap}
  padding: 1.5rem;
  flex-grow: 1;
  overflow: auto;
  background-color: ${({ theme }) => theme.bg2};
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;

  h5 {
    margin: 0;
    font-weight: 400;
    color: ${({ theme }) => theme.text3};
  }
` */

const CloseIcon = styled.div`
  position: absolute;
  right: 1rem;
  top: 14px;
  &:hover {
    cursor: pointer;
    opacity: 0.6;
  }
`

const CloseColor = styled(CloseIcon)`
  path {
    stroke: ${({ theme }) => theme.text4};
  }
`

/* const TransactionListWrapper = styled.div`
  ${({ theme }) => theme.flexColumnNoWrap};
`

function renderTransactions(transactions: string[]) {
  return (
    <TransactionListWrapper>
      {transactions.map((hash, i) => {
        return <Transaction key={i} hash={hash} />
      })}
    </TransactionListWrapper>
  )
} */

interface AccountDetailsProps {
  toggleWalletModal: () => void
  pendingTransactions: string[]
  confirmedTransactions: string[]
  ENSName?: string
  openOptions: () => void
}

export default function AccountDetails({
  toggleWalletModal,
  // pendingTransactions,
  // confirmedTransactions,
  ENSName,
  openOptions
}: AccountDetailsProps) {
  const { chainId, account, connector } = useWeb3React()
  const connectionType = getConnection(connector).type

  // const theme = useTheme()
  const dispatch = useAppDispatch()

  const isMetaMask = getIsMetaMask()
  const isInjectedMobileBrowser = isMetaMask && isMobile

  function formatConnectorName() {
    return (
      <WalletName>
        <Trans>Connected with</Trans> {getConnectionName(connectionType, isMetaMask)}
      </WalletName>
    )
  }

  /* const clearAllTransactionsCallback = useCallback(() => {
    if (chainId) dispatch(clearAllTransactions(chainId))
  }, [dispatch, chainId]) */

  return (
    <>
      <UpperSection>
        <CloseIcon onClick={toggleWalletModal}>
          <CloseColor />
        </CloseIcon>
        <HeaderRow>
          <Trans>Account</Trans>
        </HeaderRow>
        <AccountSection>
          <YourAccount>
            <InfoCard>
              <AccountGroupingRow>
                {formatConnectorName()}
                <div>
                  {!isInjectedMobileBrowser && (
                    <>
                      <WalletAction
                        style={{ fontSize: '.825rem', fontWeight: 400, marginRight: '8px' }}
                        onClick={() => {
                          if (connector.deactivate) {
                            connector.deactivate()
                          } else {
                            connector.resetState()
                          }

                          dispatch(updateSelectedWallet({ wallet: undefined }))
                          openOptions()
                        }}
                      >
                        <Trans>Disconnect</Trans>
                      </WalletAction>
                      <WalletAction
                        style={{ fontSize: '.825rem', fontWeight: 400 }}
                        onClick={() => {
                          openOptions()
                        }}
                      >
                        <Trans>Change</Trans>
                      </WalletAction>
                    </>
                  )}
                </div>
              </AccountGroupingRow>
              <AccountGroupingRow data-testid="web3-account-identifier-row">
                <AccountControl>
                  <div>
                    <StatusIcon connectionType={connectionType} />
                    <p>{ENSName ? ENSName : account && shortenAddress(account)}</p>
                  </div>
                </AccountControl>
              </AccountGroupingRow>
              <AccountGroupingRow>
                {ENSName ? (
                  <>
                    <AccountControl>
                      <div>
                        {account && (
                          <CopyHelper toCopy={account} iconPosition="left">
                            <span style={{ marginLeft: '4px' }}>
                              <Trans>Copy Address</Trans>
                            </span>
                          </CopyHelper>
                        )}
                        {chainId && account && (
                          <AddressLink
                            hasENS={!!ENSName}
                            isENS={true}
                            href={getExplorerLink(chainId, ENSName, ExplorerDataType.ADDRESS)}
                          >
                            <ExternalLink size={16} />
                            <span style={{ marginLeft: '4px' }}>
                              <Trans>View on Explorer</Trans>
                            </span>
                          </AddressLink>
                        )}
                      </div>
                    </AccountControl>
                  </>
                ) : (
                  <>
                    <AccountControl>
                      <div>
                        {account && (
                          <CopyHelper toCopy={account} iconPosition="left">
                            <span style={{ marginLeft: '4px' }}>
                              <Trans>Copy Address</Trans>
                            </span>
                          </CopyHelper>
                        )}
                        {/* TODO: not active yet */}
                        {/* {chainId && account && (
                          <AddressLink
                            hasENS={!!ENSName}
                            isENS={false}
                            href={getExplorerLink(chainId, account, ExplorerDataType.ADDRESS)}
                          >
                            <ExternalLink size={16} />
                            <span style={{ marginLeft: '4px' }}>
                              <Trans>View on Explorer</Trans>
                            </span>
                          </AddressLink>
                        )} */}
                      </div>
                    </AccountControl>
                  </>
                )}
              </AccountGroupingRow>
            </InfoCard>
          </YourAccount>
        </AccountSection>
      </UpperSection>
      {/* TODO: not active yet */}
      {/* {!!pendingTransactions.length || !!confirmedTransactions.length ? (
        <LowerSection>
          <AutoRow mb={'1rem'} style={{ justifyContent: 'space-between' }}>
            <ThemedText.Body>
              <Trans>Recent Transactions</Trans>
            </ThemedText.Body>
            <LinkStyledButton onClick={clearAllTransactionsCallback}>
              <Trans>(clear all)</Trans>
            </LinkStyledButton>
          </AutoRow>
          {renderTransactions(pendingTransactions)}
          {renderTransactions(confirmedTransactions)}
        </LowerSection>
      ) : (
        <LowerSection>
          <ThemedText.Body color={theme.text1}>
            <Trans>Your transactions will appear here...</Trans>
          </ThemedText.Body>
        </LowerSection>
      )} */}
    </>
  )
}
