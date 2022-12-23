import { ReactNode } from 'react'
import { ThemeModes } from 'theme/styled'

import { ThemeToggle, ThemeToggleProps } from './ThemeToggle'
import { BSV, ButtonProps, BV } from '../Button'
import { useThemeManager } from 'state/user/hooks'
import pstlLogo from 'assets/svg/pastelle-circle-pink-yellow.svg'
import { Row } from 'components/Layout'
import { GenericImageSrcSet } from 'utils/types'

export const getBaseButtonProps = (isDarkMode: boolean, toggleDarkMode: () => void): ButtonProps => ({
  size: BSV.DEFAULT,
  variant: BV.DARK_MODE_TOGGLE,
  bgImage: { defaultUrl: pstlLogo } as GenericImageSrcSet,
  backgroundColor: isDarkMode ? 'darkslategrey' : 'blue',
  filter: 'invert(' + isDarkMode ? '1' : '0' + ') contrast(2) saturate(2)',
  bgBlendMode: 'lighten',
  bgAttributes: ['0px / 10% repeat', '0px / 100% no-repeat'],
  onClick: toggleDarkMode
})

export const ThemeToggleButton = ({
  children,
  isDarkMode,
  toggleDarkMode,
  themeToggleProps = {
    margin: 'auto',
    width: '10rem'
  },
  buttonProps = {}
}: {
  children?: ReactNode
  isDarkMode: boolean
  toggleDarkMode: () => void
  themeToggleProps?: ThemeToggleProps
  buttonProps?: ButtonProps
}) => (
  <ThemeToggle
    mode={isDarkMode}
    margin={themeToggleProps.margin}
    width={themeToggleProps.width}
    buttonProps={{ ...getBaseButtonProps(isDarkMode, toggleDarkMode), ...buttonProps }}
  >
    {children}
  </ThemeToggle>
)

const ThemeToggleBar = ({
  buttonProps = {},
  themeToggleProps = {},
  className
}: {
  className?: string
  themeToggleProps?: ThemeToggleProps
  buttonProps?: ButtonProps
}) => {
  const { theme, setMode } = useThemeManager()
  const isDarkMode = theme.mode === ThemeModes.DARK
  const toggleDarkMode = () => setMode(isDarkMode ? ThemeModes.LIGHT : ThemeModes.DARK)

  return (
    <Row className={className} justifyContent="center" width="100%">
      <ThemeToggleButton
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        themeToggleProps={themeToggleProps}
        buttonProps={buttonProps}
      >
        <span id="theme-toggle-label">{isDarkMode ? 'LIGHT MODE' : 'DARK MODE'}</span>
      </ThemeToggleButton>
    </Row>
  )
}

export default ThemeToggleBar
