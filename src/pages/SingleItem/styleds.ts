import styled, { css } from 'styled-components/macro'
import { transparentize } from 'polished'

import { Column, Row } from 'components/Layout'
import { TYPE } from 'theme'

const saturateAnimation = css`
  @keyframes saturate {
    0% {
      filter: saturate(0);
    }
    25% {
      filter: saturate(0.8);
    }
    50% {
      filter: saturate(2);
    }
    75% {
      filter: saturate(3.7);
    }
    100% {
      filter: saturate(5);
    }
  }
`

const textShadowAnimation = css<{ itemColor: string }>`
  @keyframes textShadowAnimation {
    0% {
      text-shadow: 20px 2px 2px ${({ itemColor }) => itemColor};
      letter-spacing: 20px;
    }
    3% {
      text-shadow: 55px 2px 8px ${({ itemColor }) => itemColor};
    }
    5% {
      text-shadow: -22px 2px 2px pink;
    }
    7% {
      text-shadow: 47px 2px 8px ${({ itemColor }) => itemColor};
    }
    10% {
      text-shadow: 17px 2px 8px ${({ itemColor }) => itemColor};
    }
    47% {
      text-shadow: 10px 2px 2px ${({ itemColor }) => itemColor};
      letter-spacing: 7px;
    }
    48% {
      text-shadow: -20px 2px 1px pink;
    }
    49% {
      text-shadow: 20px 2px 2px ${({ itemColor }) => itemColor};
    }
    53% {
      text-shadow: 55px 2px 8px ${({ itemColor }) => itemColor};
    }
    55% {
      text-shadow: -32px 2px 2px purple;
    }
    57% {
      text-shadow: 47px 2px 7px lightgreen;
    }
    58% {
      text-shadow: -47px 2px 1px ${({ itemColor }) => itemColor};
    }
    60% {
      text-shadow: 20px 2px 2px ${({ itemColor }) => itemColor};
    }
    65% {
      text-shadow: 20px 2px 5px purple;
    }
  }
`

export const VideoContentWrapper = styled(Row)`
  position: relative;
  z-index: 1;

  video {
    // lock the video to container size
    width: 100%;

    ${saturateAnimation}

    animation-name: saturate;
    animation-duration: 10.4s;
  }
`
export const Strikethrough = styled.div`
  width: 100%;
  background-color: ${({ theme }) => theme.white};
  height: 5px;
`
export type ItemHeaderProps = { animation?: boolean; itemColor: string }
export const ItemHeader = styled(TYPE.largeHeader)<ItemHeaderProps>`
  font-style: italic;
  letter-spacing: 7px;

  ${({ animation = false }) => animation && textShadowAnimation}
  ${({ animation = false, itemColor }) =>
    animation &&
    `
      text-shadow: 10px 2px 2px ${itemColor};
      animation-name: textShadowAnimation;
      animation-duration: 10s;
      animation-iteration-count: 3;
      animation-delay: 1s;
    `}
`

export const ItemAsidePanel = styled(Column)`
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  padding: 5px;
`

export const ItemContainer = styled(Row)`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: stretch;
  margin: auto;

  position: relative;

  > ${ItemAsidePanel} {
    position: relative;
    justify-content: flex-start;

    margin-right: auto;
    height: 100%;
    width: 100%;
    max-width: 500px;

    overflow-x: hidden;
    z-index: 2;

    background: ${({ theme }) => transparentize(0.1, theme.white)};
    // background: ${({ theme }) => transparentize(0.1, theme.red2)};
  }

  > ${VideoContentWrapper} {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  select {
    min-width: 15ch;
    max-width: 100%;
    border: 1px solid var(--select-border);
    border-radius: 0.25em;
    padding: 0.25em 0.5em;
    margin: 0 5px;
    font-size: 1.25rem;
    cursor: pointer;
    line-height: 1.1;
    background-color: #fff;
    background-image: linear-gradient(to top, #f9f9f9, #fff 33%);

    display: grid;
    grid-template-areas: 'select';
    align-items: center;

    &:after {
      content: '';
      width: 0.8em;
      height: 0.5em;
      background-color: #777;
      clip-path: polygon(100% 0%, 0 0%, 50% 100%);

      justify-self: end;
    }

    select,
    .select:after {
      grid-area: select;
    }
  }
`
