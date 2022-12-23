import { useWeb3React } from '@web3-react/core'

import styled, { useTheme } from 'styled-components/macro'
import { AutoColumn, ColumnCenter, RowBetween } from 'components/Layout'
import { TYPE, CloseIcon, CustomLightSpinner } from 'theme'
import { ArrowUpCircle } from 'react-feather'

import Circle from 'assets/images/blue-loader.svg'
import { getEtherscanLink } from 'blockchain/utils'
import { ExternalLink } from 'theme'
import { ReactNode } from 'react'

const ConfirmOrLoadingWrapper = styled.div`
  width: 100%;
  padding: 24px;
`

const ConfirmedIcon = styled(ColumnCenter)`
  padding: 60px 0;
`

export function LoadingView({ children, onDismiss }: { children: ReactNode; onDismiss: () => void }) {
  return (
    <ConfirmOrLoadingWrapper>
      <RowBetween>
        <div />
        <CloseIcon onClick={onDismiss} />
      </RowBetween>
      <ConfirmedIcon>
        <CustomLightSpinner src={Circle} alt="loader" size={'90px'} />
      </ConfirmedIcon>
      <AutoColumn gap="100px" justify={'center'}>
        <>
          {children}
          <TYPE.subHeader>Confirm this transaction in your wallet</TYPE.subHeader>
        </>
      </AutoColumn>
    </ConfirmOrLoadingWrapper>
  )
}

export const SubmittedView: React.FC<{
  children?: ReactNode
  onDismiss: () => void
  hash: string | undefined
}> = ({ children, onDismiss, hash }) => {
  const theme = useTheme()
  const { chainId } = useWeb3React()

  return (
    <ConfirmOrLoadingWrapper>
      <RowBetween>
        <div />
        <CloseIcon onClick={onDismiss} />
      </RowBetween>
      <ConfirmedIcon>
        <ArrowUpCircle strokeWidth={0.5} size={90} color={theme.primary1} />
      </ConfirmedIcon>
      <AutoColumn gap="100px" justify={'center'}>
        <>
          {children}
          {chainId && hash && (
            <ExternalLink href={getEtherscanLink(chainId, hash, 'transaction')} style={{ marginLeft: '4px' }}>
              <TYPE.subHeader>View transaction on Etherscan</TYPE.subHeader>
            </ExternalLink>
          )}
        </>
      </AutoColumn>
    </ConfirmOrLoadingWrapper>
  )
}
