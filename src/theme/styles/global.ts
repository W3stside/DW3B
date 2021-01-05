import { createGlobalStyle } from 'styled-components'
import { transparentize } from 'polished'

import { getThemeColours } from '../utils'
import { Theme } from '../styled'

export const FixedGlobalStyle = createGlobalStyle`
  html,
  input,
  textarea,
  button {
    font-family: 'Inter', sans-serif;
    font-display: fallback;
  }
  @supports (font-variation-settings: normal) {
    html,
    input,
    textarea,
    button {
      font-family: 'Inter var', sans-serif;
    }
  }
  html,
  body {
    font-size: 10px;
    margin: 0;
    padding: 0;
  }
  a {
    color: ${getThemeColours(Theme.LIGHT).blue1};
  }
  * {
    box-sizing: border-box;
  }
  button {
    user-select: none;
  }
  html {
    font-variant: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-feature-settings: 'ss01' on, 'ss02' on, 'cv01' on, 'cv03' on;
  }
`

export const ThemedGlobalStyle = createGlobalStyle`
  html {
    color: ${({ theme }): string => theme.text1};
    background-color: ${({ theme }): string => theme.bg2};
  }
  body {
    min-height: 100vh;
    background-position: 0 -30vh;
    background-repeat: no-repeat;
    background-image: ${({ theme }): string =>
      `radial-gradient(50% 50% at 50% 50%, ${transparentize(0.9, theme.primary1)} 0%, ${transparentize(
        1,
        theme.bg1
      )} 100%)`};
  }
`
