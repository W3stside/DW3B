import { useCallback, useContext, useEffect } from 'react'
import { X } from 'react-feather'
import { useSpring } from 'react-spring'
import styled, { ThemeContext } from 'styled-components/macro'
import { animated } from 'react-spring'
import { PopupContent, TxPopupContent } from 'state/modalsAndPopups/reducer'
import { useRemovePopup } from 'state/modalsAndPopups/hooks'

export const StyledClose = styled(X)`
  position: absolute;
  right: 1rem;
  top: 1rem;

  :hover {
    cursor: pointer;
  }
`
export const Popup = styled.div`
  display: inline-block;
  width: 100%;
  padding: 1em;
  background-color: ${({ theme }) => theme.bg1};
  position: relative;
  border-radius: ${({ theme }) => theme.buttons.borderRadius};
  padding: 2rem;
  padding-right: 3.5rem;
  overflow: hidden;

  ${({ theme }) => theme.mediaWidth.upToSmall`
    min-width: 29rem;
    &:not(:last-of-type) {
      margin-right: 2rem;
    }
  `}
`
const Fader = styled.div`
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 0.2rem;
  background-color: ${({ theme }) => theme.bg3};
`

const AnimatedFader = animated(Fader)

export default function PopupItem({
  removeAfterMs,
  // content,
  popKey
}: {
  removeAfterMs: number | null
  content: PopupContent | TxPopupContent
  popKey: string
}) {
  const removePopup = useRemovePopup()
  const removeThisPopup = useCallback(() => removePopup(popKey), [popKey, removePopup])
  useEffect(() => {
    if (removeAfterMs === null) return undefined

    const timeout = setTimeout(() => {
      removeThisPopup()
    }, removeAfterMs)

    return () => {
      clearTimeout(timeout)
    }
  }, [removeAfterMs, removeThisPopup])

  const theme = useContext(ThemeContext)

  let popupContent

  const faderStyle = useSpring({
    from: { width: '100%' },
    to: { width: '0%' },
    config: { duration: removeAfterMs ?? undefined }
  })

  return (
    <Popup>
      <StyledClose color={theme.text2} onClick={removeThisPopup} />
      {popupContent}
      {removeAfterMs !== null ? <AnimatedFader style={faderStyle} /> : null}
    </Popup>
  )
}
