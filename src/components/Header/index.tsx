import { useMemo, useState } from 'react'
import { useWeb3React } from '@web3-react/core'

import {
  AccountElement,
  BalanceText,
  HeaderControls,
  HeaderElement,
  HeaderFrame,
  HeaderRow,
  HideSmall,
  NetworkCard,
  Headercon,
  StyledThemeToggleBar,
  Title,
  HeaderDrawerButton
} from './styleds'
import Navigation from 'components/Navigation'
import Web3Status from 'components/blockchain/Web3Status'

import { useNativeCurrencyBalances } from 'blockchain/hooks/useCurrencyBalance'

import { NETWORK_LABELS } from 'blockchain/constants'

import { isWeb3Enabled } from 'blockchain/connectors'
import { useIsMediumWindowWidthSize } from 'state/window/hooks'
import { Subheader } from 'components/Layout/Text'

export default function Header() {
  const isEnabled = useMemo(() => isWeb3Enabled(), [])

  const isMediumOrBelow = useIsMediumWindowWidthSize()

  // only applicable for certain view sizes..
  const [open, setOpen] = useState(false)

  return (
    <HeaderFrame
      as="header"
      color={'white'}
      // SET LOGOSETS HERE
      logoSet={undefined}
      open={open}
    >
      <HeaderDrawerButton onClick={() => setOpen(state => !state)}>
        <Subheader padding="0" margin="0">
          TAP TO {open ? 'HIDE' : 'VIEW MENU'}
        </Subheader>
      </HeaderDrawerButton>
      <HeaderRow>
        {/* ICON and HOME BUTTON */}
        <Title to="/#">
          <Headercon />
        </Title>

        {/* WEB3 */}
        {isEnabled && <Web3StatusHeader />}
        {/* THEME TOGGLE - ONLY MEDIUM */}
        <StyledThemeToggleBar themeToggleProps={{ width: '90%' }} />
        {isMediumOrBelow && <Navigation navOrbProps={{ bgColor: 'transparent', menuSize: 30 }} />}
      </HeaderRow>
    </HeaderFrame>
  )
}

function Web3StatusHeader() {
  const { account, chainId } = useWeb3React()
  const userEthBalance = useNativeCurrencyBalances(account ? [account] : [])?.[account ?? '']

  return (
    <HeaderControls>
      <HeaderElement>
        <HideSmall>
          {chainId && NETWORK_LABELS[chainId] && (
            <NetworkCard title={NETWORK_LABELS[chainId]}>{NETWORK_LABELS[chainId]}</NetworkCard>
          )}
        </HideSmall>
        <AccountElement active={!!account} style={{ pointerEvents: 'auto' }}>
          {account && userEthBalance ? (
            <BalanceText style={{ flexShrink: 0 }} pl="0.75rem" pr="0.5rem" fontWeight={500}>
              {userEthBalance?.toSignificant(4)} ETH
            </BalanceText>
          ) : null}
          <Web3Status />
        </AccountElement>
      </HeaderElement>
    </HeaderControls>
  )
}
