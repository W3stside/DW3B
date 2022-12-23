import styled from 'styled-components/macro'
import Button from 'components/Button'
import { MobileNavProps } from '.'
import { Z_INDEXES } from 'constants/config'
import { Column, Row } from 'components/Layout'
import { BLACK, setBackgroundWithDPI, setBestTextColour, upToMedium } from 'theme/utils'
import { GenericImageSrcSet } from 'utils/types'
import { setFlickerAnimation } from 'theme/styles/animation'

export const NavigationStepsWrapper = styled.nav<{
  isOpen?: boolean
  width?: string
  minWidth?: string
  currentMedia?: { navLogoSet?: GenericImageSrcSet; color?: string }
}>`
  position: relative;
  overflow: hidden;
  width: ${({ width = 'auto' }) => width};
  ${({ minWidth }) => minWidth && `min-width: ${minWidth};`}
  display: flex;
  flex-flow: column nowrap;
  justify-content: start;
  align-items: start;
  text-align: left;
  gap: 0px;

  ${({ theme, currentMedia }) =>
    currentMedia &&
    setBackgroundWithDPI(theme, currentMedia.navLogoSet, {
      preset: 'navbar',
      modeColours: [currentMedia.color || BLACK, BLACK]
    })}

  z-index: 1;

  > a {
    font-size: 1.6rem;
  }

  z-index: ${Z_INDEXES.NAV_MENU};

  ${setFlickerAnimation({ state: true, duration: 4, count: 2 })}

  ${({ isOpen }) => upToMedium`
    display: ${isOpen ? 'flex' : 'none'};
    position: fixed;
    top: 0; left: 0; bottom: 0;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    width: 100%;
    
    > div:last-child {
      width: 90%;
      padding: 2rem;
      background: linear-gradient(267deg, #000000c2 33%, transparent);
      border-radius: 0 1rem 1rem 0;
      > div {
        width: 13rem;
        margin: auto 0 0 auto;
      } 
    }

    // theme toggler
    // TODO: change when you don't want CSS BGs for logos (e.g use component)
    > ${InnerNavWrapper} {
      margin-top: auto;
    }
    
    width: ${isOpen ? '100%' : '0px'};
    opacity: ${isOpen ? '1' : '0'};
  `}
`

export const MobileNavOrb = styled(Button)<MobileNavProps & { mobileHide?: boolean }>`
  display: none;
  background: ${({ theme, bgColor = theme.red2 }) => bgColor};
  color: ${({ theme }) => theme.white};
  cursor: pointer;
  z-index: ${Z_INDEXES.NAV_MENU + 1};
  gap: 5px;

  padding-right: 0;
  // margin-right: -1rem;

  > div {
    display: flex;
    padding: 1rem;
    background: #000;

    border-radius: ${({ theme }) => theme.buttons.borderRadius};

    > svg {
      &:hover {
        transform: rotateZ(180deg);
      }
      transition: transform 0.5s ease-in-out;
    }
  }

  ${({ theme, mobileHide }) => theme.mediaWidth.upToMedium`
    display: ${mobileHide ? 'none' : 'flex'};
    position: relative;
    bottom: 0; right: 0;
    justify-content: center;
    align-items: center;
  `};
`

export const CollectionLabel = styled(Row)<{ isNavOpen: boolean; active: boolean; bgColor?: string }>`
  font-weight: ${({ active }) => (active ? 700 : 300)};
  padding: 0 1rem;
  gap: 1rem;

  ${({ active, bgColor = 'transparent' }) =>
    active &&
    `
      color: ${setBestTextColour(bgColor)};
      background-color: ${bgColor};
      text-decoration: line-through;
      text-decoration-thickness: from-font;
      width: 100%;
    `}

  ${({ isNavOpen, bgColor }) =>
    isNavOpen &&
    `
    color: ${setBestTextColour(bgColor)};
    background: linear-gradient(267deg,${bgColor} 33%,transparent);
  `}
`

export const SideEffectNavLink = styled.span`
  cursor: pointer;
`

// #1d1d1d
export const InnerNavWrapper = styled(Column)<{ bgColor?: string; $width: string }>`
  width: ${({ $width }) => $width};
  background-color: ${({ theme, bgColor = theme.blackOpaque2 }) => bgColor};
  padding: 1rem;

  > div {
    width: 100%;
    padding: 0;
  }
`
