import ThemeToggleBar from '../ThemeToggler'
import styled from 'styled-components/macro'
import { SectionFrame } from '../Layout/Section'

const FooterWrapper = styled(SectionFrame)`
  position: fixed;
  bottom: 0;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
`

const Footer = () => {
  return (
    <FooterWrapper>
      <ThemeToggleBar />
    </FooterWrapper>
  )
}

export default Footer
