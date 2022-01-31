import { createGlobalStyle } from 'styled-components/macro'
import { transparentize } from 'polished'

import { getThemeColours, setTextColour, setBgColour } from '../utils'
import { ThemeModes } from '../styled'

export const TopGlobalStyle = createGlobalStyle`
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

  * {
    box-sizing: border-box;
  }
  
  html {
    font-variant: none;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    font-feature-settings: 'ss01' on, 'ss02' on, 'cv01' on, 'cv03' on;
  }

  body {
    min-height: 100vh;
    background-position: 0 -30vh;
    background-repeat: no-repeat;
  }

  a {
    color: ${getThemeColours(ThemeModes.LIGHT).blue1};
  }
  
  button {
    user-select: none;
  }
`

export const ThemedGlobalStyle = createGlobalStyle`
  html {
    ${setTextColour('text1')}
    ${setBgColour('bg2')}
  }

  body {
    background-image: ${({ theme }): string => `
      radial-gradient(
        50% 50% at 50% 50%,
        ${transparentize(0.9, theme.primary1)} 0%,
        ${transparentize(1, theme.bg1)} 100%
      );`}

    transition: background-color, background-image, color 0.3s ease-in-out;
  }
`
