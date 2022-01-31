import { ReactElement, FC, useMemo, Children, isValidElement, cloneElement } from 'react'
import styled, { ThemeProvider as StyledComponentsThemeProvider, css } from 'styled-components/macro'

import { Text, TextProps } from 'rebass'
import { useAppColourTheme } from 'state/user/hooks'
import { ThemeModes, Colors } from './styled'
import { getThemeColours } from './utils'
import { mediaWidthTemplates as mediaWidth } from './styles/mediaQueries'

export * from './components'

const TextWrapper = styled(Text)<{ color: keyof Colors }>`
  color: ${({ color, theme }): string => (theme as never)[color]};
`

export const TYPE = {
  main(props: TextProps): ReactElement {
    return <TextWrapper fontWeight={500} color="text2" {...props} />
  },
  link(props: TextProps): ReactElement {
    return <TextWrapper fontWeight={500} color="primary1" {...props} />
  },
  black(props: TextProps): ReactElement {
    return <TextWrapper fontWeight={500} color="text1" {...props} />
  },
  white(props: TextProps): ReactElement {
    return <TextWrapper fontWeight={500} color="white" {...props} />
  },
  body(props: TextProps): ReactElement {
    return <TextWrapper fontWeight={400} fontSize={16} color="text1" {...props} />
  },
  largeHeader(props: TextProps): ReactElement {
    return <TextWrapper fontWeight={600} fontSize={24} {...props} />
  },
  mediumHeader(props: TextProps): ReactElement {
    return <TextWrapper fontWeight={500} fontSize={20} {...props} />
  },
  subHeader(props: TextProps): ReactElement {
    return <TextWrapper fontWeight={400} fontSize={14} {...props} />
  },
  small(props: TextProps): ReactElement {
    return <TextWrapper fontWeight={500} fontSize={11} {...props} />
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
    return <TextWrapper fontWeight={500} fontSize={12} fontStyle={'italic'} color="text2" {...props} />
  },
  error({ error, ...props }: { error: boolean } & TextProps): ReactElement {
    return <TextWrapper fontWeight={500} color={error ? 'red1' : 'text2'} {...props} />
  }
}

const DEFAULT_THEME = {
  components: undefined,

  // media queries
  mediaWidth,
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
const ThemeProvider: FC<{ themeExtension?: any }> = ({ children, themeExtension }) => {
  const { mode } = useAppColourTheme()

  const themeObject = useMemo(() => {
    const themeColours = getThemeColours(mode)

    const computedTheme = {
      // Compute the app colour pallette using the passed in colourTheme
      ...themeColours,
      // pass in defaults
      ...DEFAULT_THEME,
      mode,
      //shadows
      shadow1: mode === ThemeModes.DARK ? '#000' : '#2F80ED',
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
          isValidElement(childWithTheme) && cloneElement(childWithTheme, { theme: themeObject })
      )}
    </StyledComponentsThemeProvider>
  )
}

export default ThemeProvider
