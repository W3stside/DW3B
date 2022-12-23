import { useEffect, useRef } from 'react'

import styled from 'styled-components/macro'

import { useWeb3React } from '@web3-react/core'
import Jazzicon from '@metamask/jazzicon'

const StyledIdenticonContainer = styled.div<{ size?: number }>`
  height: ${({ size = '1rem' }) => size};
  width: ${({ size = '1rem' }) => size};
  border-radius: 1.125rem;
  background-color: ${({ theme }) => theme.bg4};
`

export default function Identicon({ size }: { size?: number }) {
  const ref = useRef<HTMLDivElement>()

  const { account } = useWeb3React()

  useEffect(() => {
    if (account && ref.current) {
      ref.current.innerHTML = ''
      ref.current.appendChild(Jazzicon(16, parseInt(account.slice(2, 10), 16)))
    }
  }, [account])

  // https://github.com/DefinitelyTyped/DefinitelyTyped/issues/30451
  return <StyledIdenticonContainer size={size} ref={ref as any} />
}
