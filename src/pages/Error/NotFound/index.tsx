import { useNavigate } from 'react-router-dom'
import styled from 'styled-components/macro'
import ButtonPrimary, { ButtonVariations } from 'components/Button'
import SmartImg from 'components/SmartImg'
import { Z_INDEXES } from 'constants/config'
import { transparentize } from 'polished'
import { TYPE } from 'theme'

const pastelle404IMG = 'https://ik.imagekit.io/pastelle/artists-mathieu_sgnA_QA83.jpeg'

const ContainerDiv = styled.div`
  position: relative;
  height: 100%;
  overflow: hidden;
  padding: 0rem 5rem 10rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;

  background-color: ${({ theme }) => transparentize(0.2, theme.black)};

  ${ButtonPrimary} {
    width: 80%;
    padding: 9px;
    margin: 2rem;
  }

  img {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    z-index: ${Z_INDEXES.BEHIND};
  }
  h2 {
    font-size: 1.6rem;
    text-align: center;
  }
`

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <article>
      <ContainerDiv>
        <TYPE.header letterSpacing={-5}>PAGE NOT FOUND!</TYPE.header>
        <SmartImg path={{ ikPath: pastelle404IMG }} transformation={[{ pr: true }]} />
        <TYPE.header letterSpacing={0} fontSize={'2.2rem'}>
          The page you are looking for does not exist{' '}
          <span style={{ fontSize: '3rem', fontStyle: 'normal' }}>ʕ ͡° ʖ̯ ͡°ʔ</span>
        </TYPE.header>
        <ButtonPrimary onClick={() => navigate('/')} variant={ButtonVariations.WARNING}>
          <TYPE.subHeader>Back to the collection</TYPE.subHeader>
        </ButtonPrimary>
      </ContainerDiv>
    </article>
  )
}
