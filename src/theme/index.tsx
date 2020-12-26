import React from 'react'
import { transparentize } from 'polished'
import styled, {
  ThemeProvider as StyledComponentsThemeProvider,
  createGlobalStyle,
  css,
  DefaultTheme,
  ThemedCssFunction,
  FlattenSimpleInterpolation,
  CSSObject
} from 'styled-components'

import { Text, TextProps } from 'rebass'
import { useAppColourTheme } from 'state/user/hooks'
import { Theme, Colors } from './styled'

export * from './components'

const MEDIA_WIDTHS = {
  upToExtraSmall: 500,
  upToSmall: 720,
  upToMedium: 960,
  upToLarge: 1280
}

type MediaWidthKeys = keyof typeof MEDIA_WIDTHS

type MediaWidth = {
  [key in MediaWidthKeys]: ThemedCssFunction<DefaultTheme>
}

const mediaWidthTemplates = Object.keys(MEDIA_WIDTHS).reduce<MediaWidth>((accumulator, size: unknown) => {
  ;(accumulator[size as MediaWidthKeys] as unknown) = (
    a: CSSObject,
    b: CSSObject,
    c: CSSObject
  ): ThemedCssFunction<DefaultTheme> | FlattenSimpleInterpolation => css`
    @media (max-width: ${MEDIA_WIDTHS[size as MediaWidthKeys]}px) {
      ${css(a, b, c)}
    }
  `
  return accumulator
}, {} as MediaWidth)

const white = '#FFFFFF'
const black = '#000000'

export function colors(colourTheme: Theme): Colors {
  const darkMode = colourTheme === Theme.DARK
  return {
    // base
    white,
    black,

    // text
    text1: darkMode ? '#FFFFFF' : '#000000',
    text2: darkMode ? '#C3C5CB' : '#565A69',
    text3: darkMode ? '#6C7284' : '#888D9B',
    text4: darkMode ? '#565A69' : '#C3C5CB',
    text5: darkMode ? '#2C2F36' : '#EDEEF2',

    // backgrounds / greys
    bg1: darkMode ? '#212429' : '#FFFFFF',
    bg2: darkMode ? '#2C2F36' : '#F7F8FA',
    bg3: darkMode ? '#40444F' : '#EDEEF2',
    bg4: darkMode ? '#565A69' : '#CED0D9',
    bg5: darkMode ? '#6C7284' : '#888D9B',

    //specialty colors
    modalBG: darkMode ? 'rgba(0,0,0,.425)' : 'rgba(0,0,0,0.3)',
    advancedBG: darkMode ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.6)',

    //primary colors
    primary1: darkMode ? '#2172E5' : '#ff007a',
    primary2: darkMode ? '#3680E7' : '#FF8CC3',
    primary3: darkMode ? '#4D8FEA' : '#FF99C9',
    primary4: darkMode ? '#376bad70' : '#F6DDE8',
    primary5: darkMode ? '#153d6f70' : '#FDEAF1',

    // color text
    primaryText1: darkMode ? '#6da8ff' : '#ff007a',

    // secondary colors
    secondary1: darkMode ? '#2172E5' : '#ff007a',
    secondary2: darkMode ? '#17000b26' : '#F6DDE8',
    secondary3: darkMode ? '#17000b26' : '#FDEAF1',

    // other
    red1: '#FF6871',
    red2: '#F82D3A',
    green1: '#27AE60',
    yellow1: '#FFE270',
    yellow2: '#F3841E',
    blue1: '#2172E5'

    // dont wanna forget these blue yet
    // blue4: darkMode ? '#153d6f70' : '#C4D9F8',
    // blue5: darkMode ? '#153d6f70' : '#EBF4FF',
  }
}

export function computeAppTheme(colourTheme: Theme): DefaultTheme {
  return {
    ...colors(colourTheme),

    theme: colourTheme,
    components: undefined,

    //shadows
    shadow1: colourTheme === Theme.DARK ? '#000' : '#2F80ED',
    // media queries
    mediaWidth: mediaWidthTemplates,
    // css snippets
    flexColumnNoWrap: css`
      display: flex;
      flex-flow: column nowrap;
    `,
    flexRowNoWrap: css`
      display: flex;
      flex-flow: row nowrap;
    `
  }
}

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }): string => (theme as never)[color]};
`

export const TYPE = {
  main(props: TextProps): React.ReactElement {
    return <TextWrapper fontWeight={500} color={'text2'} {...props} />
  },
  link(props: TextProps): React.ReactElement {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  black(props: TextProps): React.ReactElement {
    return <TextWrapper fontWeight={500} color={'text1'} {...props} />
  },
  white(props: TextProps): React.ReactElement {
    return <TextWrapper fontWeight={500} color={'white'} {...props} />
  },
  body(props: TextProps): React.ReactElement {
    return <TextWrapper fontWeight={400} fontSize={16} color={'text1'} {...props} />
  },
  largeHeader(props: TextProps): React.ReactElement {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  mediumHeader(props: TextProps): React.ReactElement {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />
  },
  subHeader(props: TextProps): React.ReactElement {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  small(props: TextProps): React.ReactElement {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />
  },
  blue(props: TextProps): React.ReactElement {
    return <TextWrapper fontWeight={500} color={'primary1'} {...props} />
  },
  yellow(props: TextProps): React.ReactElement {
    return <TextWrapper fontWeight={500} color={'yellow1'} {...props} />
  },
  darkGray(props: TextProps): React.ReactElement {
    return <TextWrapper fontWeight={500} color={'text3'} {...props} />
  },
  gray(props: TextProps): React.ReactElement {
    return <TextWrapper fontWeight={500} color={'bg3'} {...props} />
  },
  italic(props: TextProps): React.ReactElement {
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color={'text2'} {...props} />
  },
  error({ error, ...props }: { error: boolean } & TextProps): React.ReactElement {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
  }
}

const ThemeProvider: React.FC = ({ children }) => {
  const colourTheme = useAppColourTheme()

  const themeObject = React.useMemo(() => computeAppTheme(colourTheme), [colourTheme])

  return <StyledComponentsThemeProvider theme={themeObject}>{children}</StyledComponentsThemeProvider>
}

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
    margin: 0;
    padding: 0;
  }
  a {
    color: ${colors(Theme.LIGHT).blue1};
  }
  * {
    box-sizing: border-box;
  }
  button {
    user-select: none;
  }
  html {
    font-size: 16px;
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

export default ThemeProvider
