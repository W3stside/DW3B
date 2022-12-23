import styled from 'styled-components/macro'
import WalletModal from 'components/blockchain/WalletModal'
import { Web3StatusInner, Web3StatusConnected, Text } from './components'

import { useWalletInfo } from 'blockchain/hooks/useWalletInfo'
import { STORAGE_KEY_LAST_PROVIDER } from 'blockchain/constants/index'

export const Wrapper = styled.div`
  color: ${({ theme }) => theme.black};
  height: 40px;
  width: 100%;
  display: flex;
  padding: 0;
  margin: 0;
  justify-content: center;

  ${({ theme }) => theme.mediaWidth.upToMedium`
    width: auto;
    height: 100%;
    margin: 0 0 0 auto;
  `};

  button {
    height: auto;
    border-radius: 21px;
    padding: 6px 12px;
    width: max-content;
  }

  ${Web3StatusConnected} {
    border-radius: 21px;
    color: ${({ theme }) => theme.black};
    background: ${({ theme }) => theme.bg1};
    height: 100%;
    width: 100%;
    border: 0;
    box-shadow: none;
    padding: 6px 8px;
    transform: none;

    &:hover {
      border: 0;
    }

    > div > svg > path {
      stroke: ${({ theme }) => theme.black};
    }
  }

  ${Text} {
  }
`

export default function Web3Status() {
  const walletInfo = useWalletInfo()
  const latestProvider = localStorage.getItem(STORAGE_KEY_LAST_PROVIDER)

  const { active, ensName } = walletInfo
  if (!active && !latestProvider) {
    return null
  }

  return (
    <Wrapper>
      <Web3StatusInner />
      <WalletModal ENSName={ensName} pendingTransactions={[]} confirmedTransactions={[]} />
    </Wrapper>
  )
}
