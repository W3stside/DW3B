import styled, { css, FlattenInterpolation, ThemeProps, DefaultTheme } from 'styled-components/macro'
import { variants } from 'styled-theming'
import ThemeProvider from 'theme'

import { BASE_STYLES } from 'theme/styles'
import { darken } from 'polished'
import { THEME_LIST, ThemeModes } from 'theme/styled'

export type Writable<T> = {
  -readonly [K in keyof T]: T[K]
}

const { borderRadius, buttonBorder, fontSize } = BASE_STYLES

export interface ButtonBaseProps extends React.ButtonHTMLAttributes<Element> {
  variant?: ButtonVariations
  size?: ButtonSizeVariations
}

export enum ButtonVariations {
  DEFAULT = 'DEFAULT',
  PRIMARY = 'PRIMARY',
  SECONDARY = 'SECONDARY',
  DANGER = 'DANGER',
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  CANCEL = 'CANCEL',
  DISABLED = 'DISABLED',
  THEME = 'THEME'
}

export enum ButtonSizeVariations {
  DEFAULT = 'DEFAULT',
  SMALL = 'SMALL',
  BIG = 'BIG'
}

// Aliases
export const BV = ButtonVariations
export const BSV = ButtonSizeVariations

const BUTTON_VARIATION_LIST = Object.entries(ButtonVariations)

const DEFAULT_DARKEN_AMOUNT = 0.2

const PRIMARY_BUTTON_STYLES = css`
  color: ${({ theme }): string => theme.text1};
  background: ${({ theme }): string => theme.bg1};

  &:hover {
    background: ${({ theme }): string => darken(DEFAULT_DARKEN_AMOUNT, theme.bg1)};
  }
`

const SECONDARY_BUTTON_STYLES = css`
  color: ${({ theme }): string => theme.text1};
  background: ${({ theme }): string => theme.bg3};

  &:hover {
    background: ${({ theme }): string => darken(DEFAULT_DARKEN_AMOUNT, theme.bg3)};
  }
`

const DANGER_BUTTON_STYLES = css`
  color: ${({ theme }): string => theme.red1};
  background: ${({ theme }): string => theme.red2};

  &:hover {
    background: ${({ theme }): string => darken(DEFAULT_DARKEN_AMOUNT, theme.red2)};
    border-color: ${({ theme }): string => theme.red1};
  }
`

const SUCCESS_BUTTON_STYLES = css`
  color: ${({ theme }): string => theme.green1};
  background: ${({ theme }): string => theme.green2};

  &:hover {
    background: ${({ theme }): string => darken(DEFAULT_DARKEN_AMOUNT, theme.green2)};
    border-color: ${({ theme }): string => theme.green1};
  }
`

const WARNING_BUTTON_STYLES = css`
  color: ${({ theme }): string => theme.yellow1};
  background: ${({ theme }): string => theme.yellow2};

  &:hover {
    background: ${({ theme }): string => darken(DEFAULT_DARKEN_AMOUNT, theme.yellow2)};
    border-color: ${({ theme }): string => theme.yellow1};
  }
`

const CANCEL_BUTTON_STYLES = css`
  color: ${({ theme }): string => theme.text3};
  background: ${({ theme }): string => theme.bg1};

  &:hover {
    background: ${({ theme }): string => darken(DEFAULT_DARKEN_AMOUNT, theme.bg1)};
    border-color: ${({ theme }): string => theme.text3};
  }
`

const DISABLED_BUTTON_STYLES = css`
  color: ${({ theme }): string => theme.textDisabled};
  background: ${({ theme }): string => theme.bgDisabled};

  &:hover {
    background: ${({ theme }): string => darken(DEFAULT_DARKEN_AMOUNT, theme.bgDisabled)};
    border-color: ${({ theme }): string => theme.textDisabled};
  }
`

const THEME_BUTTON_STYLES = css`
  color: ${({ theme }): string => theme.text1};
  background: ${({ theme }): string => theme.bg1};

  &:hover {
    background: ${({ theme }): string => darken(DEFAULT_DARKEN_AMOUNT, theme.bg1)};
    border-color: ${({ theme }): string => theme.text1};
  }
`

type ButtonVariationInterpolationObject = {
  [key in keyof typeof ButtonVariations]: ThemeInterpolationObject
}

type ThemeInterpolationObject = { [key in keyof typeof ThemeModes]: FlattenInterpolation<ThemeProps<DefaultTheme>> }

const ButtonThemeMap = BUTTON_VARIATION_LIST.reduce((accum, [, buttonVariant]) => {
  // buttonStyle = 'secondary' or 'primary' etc style
  let buttonStyle: FlattenInterpolation<ThemeProps<DefaultTheme>>

  switch (buttonVariant) {
    case ButtonVariations.DEFAULT:
      buttonStyle = PRIMARY_BUTTON_STYLES
      break
    case ButtonVariations.PRIMARY:
      buttonStyle = PRIMARY_BUTTON_STYLES
      break
    case ButtonVariations.SECONDARY:
      buttonStyle = SECONDARY_BUTTON_STYLES
      break
    case ButtonVariations.DANGER:
      buttonStyle = DANGER_BUTTON_STYLES
      break
    case ButtonVariations.SUCCESS:
      buttonStyle = SUCCESS_BUTTON_STYLES
      break
    case ButtonVariations.WARNING:
      buttonStyle = WARNING_BUTTON_STYLES
      break
    case ButtonVariations.CANCEL:
      buttonStyle = CANCEL_BUTTON_STYLES
      break
    case ButtonVariations.DISABLED:
      buttonStyle = DISABLED_BUTTON_STYLES
      break
    case ButtonVariations.THEME:
      buttonStyle = THEME_BUTTON_STYLES
      break
  }

  accum[buttonVariant] = THEME_LIST.reduce<Writable<ThemeInterpolationObject>>((accum2, [, themeName]) => {
    // { 'LIGHT': css` ... `, 'DARK': css` ... `, ... }
    accum2[themeName] = buttonStyle
    return accum2
  }, {} as ThemeInterpolationObject)

  return accum
}, {} as Writable<ButtonVariationInterpolationObject>)

export const ButtonTheme = variants('mode', 'variant', ButtonThemeMap)

// Created a 'size' prop on buttons, default | small | big
const ButtonSizes = variants('component', 'size', {
  DEFAULT: {
    buttons: css`
      font-size: initial;
      padding: 0.5rem 1rem;
    `
  },
  SMALL: {
    buttons: css`
      font-size: smaller;
      padding: 0.3rem 1rem;
    `
  },
  BIG: {
    buttons: css`
      font-size: larger;
      padding: 0.65rem 1.2rem;
    `
  }
})

const ColouredButtonBase = styled.button`
  border: ${buttonBorder};
  /* Fold in theme css above */
  ${ButtonTheme}
`

const ColouredAndSizedButtonBase = styled(ColouredButtonBase)`
  font-size: ${fontSize};
  ${ButtonSizes}
`

// Wrap ColouredAndSizedButtonsBase in it's own ThemeProvider which takes the toplevel app theme
// ThemeProvider and interpolate over it's props
const ThemeWrappedButtonBase: React.FC<React.ButtonHTMLAttributes<Element>> = ({ children, ...restProps }) => (
  <ThemeProvider themeExtension={{ component: 'buttons' }}>
    <ColouredAndSizedButtonBase {...restProps}>{children}</ColouredAndSizedButtonBase>
  </ThemeProvider>
)

export const ButtonBase = styled(ThemeWrappedButtonBase).attrs<ButtonBaseProps>(({ size = BSV.DEFAULT }) => ({
  size
}))<ButtonBaseProps>`
  border-radius: ${borderRadius};
  cursor: pointer;
  font-weight: 600;
  outline: 0;

  transition-duration: DEFAULT_DARKEN_AMOUNTs;
  transition-timing-function: ease-in-out;
  transition-property: color, background, border-color, opacity, margin;

  &:disabled,
  &[disabled] {
    pointer-events: none;
  }
`
