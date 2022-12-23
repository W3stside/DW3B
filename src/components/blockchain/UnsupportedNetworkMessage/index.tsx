import { Trans } from '@lingui/macro'
import { ALL_SUPPORTED_CHAIN_IDS } from 'blockchain/constants'
import { getChainInfo } from 'blockchain/utils/supportedChainId'
import styled from 'styled-components/macro'

export const Styled = styled.span`
  max-width: 450px;
  margin: 0 auto;
  line-height: 1.4;
`

export default function UnsupportedNetworkMessage() {
  return (
    <Styled>
      <Trans>
        Please connect your wallet to one of our supported networks:{' '}
        {ALL_SUPPORTED_CHAIN_IDS.map(chainId => getChainInfo(chainId)?.label)
          .filter(Boolean)
          .join(', ')}
      </Trans>
    </Styled>
  )
}
