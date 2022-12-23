// eslint-disable-next-line no-restricted-imports
import { Trans } from '@lingui/macro'
import { useWeb3React } from '@web3-react/core'
import { darken, lighten } from 'polished'
import styled, { css } from 'styled-components/macro'

import { shortenAddress } from 'blockchain/utils'

import { Button } from 'theme/components'
import { useWalletModalToggle } from 'state/modalsAndPopups/hooks'

export const Web3StatusGeneric = styled(Button)`
  ${({ theme }) => theme.flexRowNoWrap}
  width: 100%;
  align-items: center;
  padding: 0.5rem;
  border-radius: ${({ theme }) => theme.buttons.borderRadius};
  cursor: pointer;
  user-select: none;
  height: 36px;
  margin-left: 0px;
  margin-right: 0px;
  :focus {
    outline: none;
  }
`

const Web3StatusConnect = styled(Web3StatusGeneric)<{ faded?: boolean }>`
  background-color: ${({ theme }) => theme.primary4};
  border: none;

  color: ${({ theme }) => theme.primaryText1};
  font-weight: 500;

  :hover,
  :focus {
    border: 1px solid ${({ theme }) => darken(0.05, theme.primary4)};
    color: ${({ theme }) => theme.primaryText1};
  }

  ${({ faded }) =>
    faded &&
    css`
      background-color: ${({ theme }) => theme.primary5};
      border: 1px solid ${({ theme }) => theme.primary5};
      color: ${({ theme }) => theme.primaryText1};

      :hover,
      :focus {
        border: 1px solid ${({ theme }) => darken(0.05, theme.primary4)};
        color: ${({ theme }) => darken(0.05, theme.primaryText1)};
      }
    `}
`

export const Web3StatusConnected = styled(Web3StatusGeneric)<{ pending?: boolean; clickDisabled?: boolean }>`
  background-color: ${({ pending, theme }) => (pending ? theme.primary1 : theme.bg2)};
  border: 1px solid ${({ pending, theme }) => (pending ? theme.primary1 : theme.bg3)};
  color: ${({ pending, theme }) => (pending ? theme.white : theme.text1)};
  font-weight: 500;

  ${({ clickDisabled }) =>
    clickDisabled &&
    css`
      cursor: not-allowed;
    `}

  ${({ clickDisabled, pending }) =>
    !clickDisabled &&
    css`
      :hover,
      :focus {
        background-color: ${({ theme }) => (pending ? darken(0.05, theme.primary1) : lighten(0.05, theme.bg2))};

        :focus {
          border: 1px solid ${({ theme }) => (pending ? darken(0.1, theme.primary1) : darken(0.1, theme.bg3))};
        }
      }
    `}
`

export const Text = styled.p`
  flex: 1 1 auto;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin: 0 0.5rem 0 0.25rem;
  font-size: 1rem;
  width: fit-content;
  font-weight: 500;
`

export function Web3StatusInner() {
  const { account, chainId, ENSName } = useWeb3React()

  const toggleWalletModal = useWalletModalToggle()

  if (!chainId) {
    return null
  } else if (account) {
    return (
      <Web3StatusConnected id="web3-status-connected">
        <Text>{ENSName || shortenAddress(account)}</Text>
      </Web3StatusConnected>
    )
  } else {
    return (
      <Web3StatusConnect id="connect-wallet" onClick={toggleWalletModal} faded={!account}>
        <Text>
          <Trans>Connect to a wallet</Trans>
        </Text>
      </Web3StatusConnect>
    )
  }
}
