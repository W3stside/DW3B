import { ReactElement, useMemo, Children, isValidElement, cloneElement, FCC } from 'react'
import styled, { ThemeProvider as StyledComponentsThemeProvider, css, DefaultTheme } from 'styled-components/macro'

import { Text, TextProps } from 'rebass'
import { useAppColourTheme } from 'state/user/hooks'
import { Colors } from './styled'
import { getThemeColours } from './utils'
import {
  mediaHeightTemplates as mediaHeight,
  mediaWidthTemplates as mediaWidth,
  fromMediaWidthTemplates as fromMediaWidth,
  betweenMediaWidthTemplates as betweenMediaWidth
} from './styles/mediaQueries'

export * from './components'

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }): string => (theme as never)[color]};
  font-size: 1.2rem;
`

export const TYPE = {
  main(props: TextProps): ReactElement {
    return <TextWrapper fontWeight={500} color="text2" {...props} />
  },
  link(props: TextProps): ReactElement {
    return <TextWrapper fontWeight={500} color="primary1" {...props} />
  },
  black(props: TextProps): ReactElement {
    return <TextWrapper fontWeight={500} color="black" {...props} />
  },
  white(props: TextProps): ReactElement {
    return <TextWrapper fontWeight={500} color="white" {...props} />
  },
  body(props: TextProps): ReactElement {
    return <TextWrapper fontWeight={400} fontSize={'1.6rem'} color="text1" {...props} />
  },
  productText(props: TextProps): ReactElement {
    return <TextWrapper color={'products.aside.textColor'} fontWeight={500} {...props} />
  },
  basic(props: TextProps): ReactElement {
    return <TextWrapper {...props} />
  },
  header(props: TextProps): ReactElement {
    return <TextWrapper fontSize={'10rem'} letterSpacing={7} fontWeight={500} fontStyle={'italic'} {...props} />
  },
  subHeader(props: TextProps): ReactElement {
    return (
      <TextWrapper fontSize={'1.8rem'} padding={2} margin={'2rem 0'} fontWeight={500} fontStyle={'italic'} {...props} />
    )
  },
  largeHeader(props: TextProps): ReactElement {
    return <TextWrapper fontWeight={600} fontSize={'2.4rem'} {...props} />
  },
  mediumHeader(props: TextProps): ReactElement {
    return <TextWrapper fontWeight={500} fontSize={'2rem'} {...props} />
  },
  small(props: TextProps): ReactElement {
    return <TextWrapper fontWeight={500} fontSize={'1.1rem'} {...props} />
  },
  blue(props: TextProps): ReactElement {
    return <TextWrapper fontWeight={500} color="primary1" {...props} />
  },
  yellow(props: TextProps): ReactElement {
    return <TextWrapper fontWeight={500} color="yellow1" {...props} />
  },
  darkGray(props: TextProps): ReactElement {
    return <TextWrapper fontWeight={500} color="text3" {...props} />
  },
  gray(props: TextProps): ReactElement {
    return <TextWrapper fontWeight={500} color="bg3" {...props} />
  },
  italic(props: TextProps): ReactElement {
    return <TextWrapper fontWeight={500} fontSize={'1.2rem'} fontStyle={'italic'} color="text2" {...props} />
  },
  error({ error, ...props }: { error: boolean } & TextProps): ReactElement {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
  }
}

const DEFAULT_THEME: Partial<DefaultTheme> = {
  buttons: {
    font: {
      size: {
        small: '1rem',
        normal: '1.2rem',
        large: '1.6rem'
      }
    },
    borderRadius: '1rem',
    border: '0.1rem solid transparent'
  },
  // gradients
  whiteGradient1: css`
    background-image: linear-gradient(to top, ghostwhite, #fff 53%);
  `,
  // media queries
  // height
  mediaHeight,
  // width
  mediaWidth,
  // from size queries
  fromMediaWidth,
  // between size queries
  betweenMediaWidth,
  // css snippets
  // can be used in components
  // like: ${({ theme }) => theme.flexColumnNoWrap}
  flexColumnNoWrap: css`
    display: flex;
    flex-flow: column nowrap;
  `,
  flexRowNoWrap: css`
    display: flex;
    flex-flow: row nowrap;
  `
}

// Extension/override of styled-components' ThemeProvider but with our own constructed theme object
const ThemeProvider: FCC<{ themeExtension?: any }> = ({ children, themeExtension }) => {
  const { mode } = useAppColourTheme()

  const themeObject = useMemo(() => {
    const themeColours = getThemeColours(mode)

    const computedTheme: DefaultTheme = {
      // Compute the app colour pallette using the passed in colourTheme
      ...themeColours,
      // pass in defaults
      ...DEFAULT_THEME,
      mode,
      //shadows
      shadow1: '#2F80ED',
      // unfold in any extensions
      // for example to make big/small buttons -> see src/components/Button ThemeWrappedButtonBase
      // to see it in action
      ...themeExtension
    }

    return computedTheme
  }, [mode, themeExtension])

  return (
    <StyledComponentsThemeProvider theme={themeObject}>
      {Children.map(
        children,
        childWithTheme =>
          // make sure child is a valid react element as children by default can be type string|null|number
          // @ts-ignore
          isValidElement(childWithTheme) && cloneElement(childWithTheme, { theme: themeObject })
      )}
    </StyledComponentsThemeProvider>
  )
}

export default ThemeProvider
