import styled from 'styled-components/macro'
import { THEME_LIST, ThemeModes } from 'theme/styled'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faSun, faMoon, faSmileWink } from '@fortawesome/free-regular-svg-icons'

import { ThemeToggle } from './ThemeToggle'
import { BSV, BV } from '../Button'
import { useThemeManager } from 'state/user/hooks'

import gulfLogoBlack from 'assets/png/gulfBlackPng.png'
import gulfLogoColour from 'assets/png/gulfPng.png'
import { Row } from '../Layout'
import { useCallback } from 'react'

const LogoImg = styled.img`
  max-width: 100%;
`

function _getTogglerIcon(mode: ThemeModes): IconDefinition | null {
  switch (mode) {
    case ThemeModes.LIGHT:
      return faSun
    case ThemeModes.DARK:
      return faMoon
    case ThemeModes.GULF:
      return null
    default:
      return faSmileWink
  }
}

const ThemeToggleBar: React.FC = () => {
  const { theme, setMode, setAutoDetect } = useThemeManager()

  const handleModeSelect = useCallback(
    (mode: ThemeModes) => {
      if (theme.autoDetect) {
        setAutoDetect(false)
      }

      setMode(mode)
    },
    [setAutoDetect, setMode, theme.autoDetect]
  )

  return (
    <Row>
      <ThemeToggle
        mode={theme.autoDetect}
        size={BSV.BIG}
        variant={theme.autoDetect ? BV.PRIMARY : BV.DISABLED}
        margin="0.2rem"
        width="6rem"
        onClick={() => setAutoDetect(!theme.autoDetect)}
      >
        Auto
      </ThemeToggle>
      {THEME_LIST.map(([key, name], index) => {
        const isActiveMode = theme.mode === name
        const icon = _getTogglerIcon(name)

        return (
          <ThemeToggle
            mode={isActiveMode}
            size={isActiveMode ? BSV.BIG : BSV.BIG}
            variant={isActiveMode ? BV.PRIMARY : BV.DISABLED}
            margin="0.2rem"
            width="6rem"
            onClick={() => handleModeSelect(name)}
            key={key + '_' + index}
            disabled={isActiveMode}
          >
            {icon ? (
              <FontAwesomeIcon icon={icon} size="lg" />
            ) : (
              <LogoImg src={isActiveMode ? gulfLogoColour : gulfLogoBlack} />
            )}
          </ThemeToggle>
        )
      })}
    </Row>
  )
}

export default ThemeToggleBar
