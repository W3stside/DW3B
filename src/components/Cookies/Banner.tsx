import styled from 'styled-components/macro'
import { Z_INDEXES } from 'constants/config'
import { animated, useSpring } from 'react-spring'
import { useGesture } from '@use-gesture/react'
import { useCallback, useRef, useState } from 'react'
import clamp from 'lodash.clamp'
import { Row } from 'components/Layout'
import { X } from 'react-feather'
import Button, { ButtonVariations } from 'components/Button'
import { fromMedium } from 'theme/utils'
import { SubDescription, Subheader } from 'components/Layout/Text'

const CheckboxRow = styled(Row)``
const CookieFullText = styled(SubDescription).attrs(props => ({
  backgroundColor: props.theme.purple1
}))``
const CookieCheckbox = styled.input.attrs(props => ({
  type: 'checkbox',
  ...props
}))`
  z-index: -1;
`
const CookiesText = styled(SubDescription).attrs({
  margin: 0,
  backgroundColor: 'transparent'
})`
  gap: 0.5rem;
  cursor: pointer;
`
const CookieContainer = styled(animated.div)`
  display: grid;
  grid-template-columns: auto;
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 2rem;
  background-color: ${({ theme }) => theme.blackOpaque1};
  z-index: ${Z_INDEXES.COOKIE_BANNER};
  touch-action: none;
  height: 80vh;

  overflow: auto;

  input[type='checkbox'] {
    width: 2rem;
    height: 2rem;
  }

  > * {
    padding: 1rem 0;
  }

  > ${CookieFullText} {
    padding: 1rem 0;
  }

  ${Subheader} {
    font-size: 2.8rem;
  }

  ${CookiesText}, ${SubDescription} {
    font-size: 2rem;
    text-align: center;
  }

  ${CheckboxRow} > ${CookiesText} {
    flex: 0 1 22rem;
    justify-content: space-between;

    &#checkbox_essential {
      pointer-events: none;
    }
  }

  ${fromMedium`
    height: 50vh;

    > ${CheckboxRow} {
      max-width: 55%;
      justify-self: center;
    }

    > ${CookieFullText} {
      font-size: 1.6vw;
    }

    ${Subheader} {
      font-size: 2.2vw;
    }

    ${CookiesText} {
      font-size: 1.2vw;
    }
  `}
`

export interface CookieProps {
  message: string
  onAcceptParameters?: () => void
  onAcceptStatistic?: () => void
  onAcceptMarketing?: () => void
}

const PASTELLE_COOKIE_SETTINGS = 'PASTELLE_COOKIE_SETTINGS'
// JSON.parse(localStorage.getItem(PASTELLE_COOKIE_POLICY_INTERACTED) || 'false') || false
export default function CookieBanner(props: CookieProps) {
  const storage = localStorage.getItem(PASTELLE_COOKIE_SETTINGS)
  const [isOpen, setBannerOpen] = useState(storage === null || !JSON.parse(storage).interacted)

  const [cookieState, setCookieState] = useState({
    interacted: false,
    statistical: false,
    marketing: false
  })

  const [spring, api] = useSpring(() => ({ y: 0, opacity: 1 }))
  const ref = useRef<HTMLElement | null>(null)

  const onDismiss = useCallback(() => {
    setBannerOpen(false)
  }, [])

  const onSubmit = useCallback(() => {
    setCookieState(state => {
      const next = { ...state, interacted: true }
      localStorage.setItem(PASTELLE_COOKIE_SETTINGS, JSON.stringify(next))
      return next
    })
    onDismiss()
  }, [onDismiss])

  useGesture(
    {
      onDrag: ({ movement: [, my], offset: [, oy], velocity: [, vy], cancel }) => {
        if (my) {
          if (Math.abs(my) > 150 || vy > 0.25) {
            cancel()
            onDismiss()
          }

          api.start({
            y: -oy,
            opacity: clamp(Math.abs((1 / my) * 50), 0, 1)
          })
        }
      }
    },
    { target: ref }
  )

  return isOpen ? (
    <CookieContainer style={spring} ref={ref as any}>
      <Row width="100%" justifyContent={'space-between'} margin="0" padding="0">
        <Subheader padding={0} margin={0} fontWeight={500}>
          {props.message}
        </Subheader>
        <X onClick={onDismiss} cursor="pointer" />
      </Row>
      <CookieFullText margin="0" padding="0" fontWeight={100} overflow="auto" alignItems="start">
        C-C-C-COOKIES? C-C-C-COOKIES? C-C-C-COOKIES? C-C-C-COOKIES? C-C-C-COOKIES? C-C-C-COOKIES? C-C-C-COOKIES?
        C-C-C-COOKIES? C-C-C-COOKIES? C-C-C-COOKIES? C-C-C-COOKIES? C-C-C-COOKIES? C-C-C-COOKIES? C-C-C-COOKIES?
        C-C-C-COOKIES? C-C-C-COOKIES? C-C-C-COOKIES? C-C-C-COOKIES? C-C-C-COOKIES? C-C-C-COOKIES? C-C-C-COOKIES?
        C-C-C-COOKIES? C-C-C-COOKIES? C-C-C-COOKIES? C-C-C-COOKIES? C-C-C-COOKIES? C-C-C-COOKIES? C-C-C-COOKIES?
      </CookieFullText>
      <CheckboxRow
        gap="1rem"
        flexWrap={'wrap'}
        alignItems="center"
        justifyContent={'space-evenly'}
        margin="0"
        padding="0"
      >
        <CookiesText id="checkbox_essential">
          ESSENTIALS
          <CookieCheckbox checked disabled />
        </CookiesText>
        <CookiesText onClick={() => setCookieState(state => ({ ...state, statistical: !state.statistical }))}>
          STATESTICAL
          <CookieCheckbox checked={cookieState.statistical} />
        </CookiesText>
        <CookiesText onClick={() => setCookieState(state => ({ ...state, marketing: !state.marketing }))}>
          MARKETING
          <CookieCheckbox checked={cookieState.marketing} />
        </CookiesText>
      </CheckboxRow>
      <Button variant={ButtonVariations.SECONDARY} onClick={onSubmit} margin="0" padding="0">
        <CookiesText justifyContent={'center'} padding="0.2rem">
          SAVE AND CLOSE
        </CookiesText>
      </Button>
    </CookieContainer>
  ) : null
}
