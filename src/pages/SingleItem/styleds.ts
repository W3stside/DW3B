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
      filter: saturate(3.5);
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
    }
    3% {
      text-shadow: 55px 2px 8px ${({ itemColor }) => itemColor};
    }
    5% {
      text-shadow: -12px 2px 2px pink;
    }
    7% {
      text-shadow: 47px 2px 12px ${({ itemColor }) => itemColor};
    }
    47% {
      text-shadow: 10px 2px 2px ${({ itemColor }) => itemColor};
    }
    70% {
      text-shadow: 20px 2px 2px ${({ itemColor }) => itemColor};
    }
    73% {
      text-shadow: 55px 2px 8px ${({ itemColor }) => itemColor};
    }
    75% {
      text-shadow: -12px 2px 2px purple;
    }
    77% {
      text-shadow: 47px 2px 12px lightgreen;
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

export const ItemHeader = styled(TYPE.largeHeader)<{ itemColor: string }>`
  font-style: italic;
  letter-spacing: 10px;
  font-size: 55px;
  text-shadow: 10px 2px 2px ${({ itemColor }) => itemColor};

  ${textShadowAnimation}

  animation-name: textShadowAnimation;
  animation-duration: 10s;
  animation-iteration-count: 3;
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
    max-width: 380px;

    overflow: hidden;
    z-index: 2;

    background: ${({ theme }) => transparentize(0.4, theme.white)};
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
