import styled from 'styled-components/macro'

import { AlertTriangle, X } from 'react-feather'
import { isMobile } from 'react-device-detect'

const PhishAlert = styled.div<{ isActive: boolean }>`
  width: 100%;
  padding: 6px 6px;
  background-color: ${({ theme }): string => theme.blue1};
  color: white;
  font-size: 1.1rem;
  justify-content: space-between;
  align-items: center;
  display: ${({ isActive }): string => (isActive ? 'flex' : 'none')};
`

export const StyledClose = styled(X)`
  :hover {
    cursor: pointer;
  }
`

const APP_URL = 'this.app.org'

export default function URLWarning(): JSX.Element | null {
  return isMobile ? (
    <PhishAlert isActive>
      <div style={{ display: 'flex' }}>
        <AlertTriangle style={{ marginRight: 6 }} size={12} /> Make sure the URL is
        <code style={{ padding: '0 4px', display: 'inline', fontWeight: 'bold' }}>{APP_URL}</code>
      </div>
      <StyledClose size={12} onClick={console.log} />
    </PhishAlert>
  ) : window.location.hostname === 'app.uniswap.org' ? (
    <PhishAlert isActive>
      <div style={{ display: 'flex' }}>
        <AlertTriangle style={{ marginRight: 6 }} size={12} /> Always make sure the URL is
        <code style={{ padding: '0 4px', display: 'inline', fontWeight: 'bold' }}>{APP_URL}</code> - bookmark it to be
        safe.
      </div>
      <StyledClose size={12} onClick={console.log} />
    </PhishAlert>
  ) : null
}
