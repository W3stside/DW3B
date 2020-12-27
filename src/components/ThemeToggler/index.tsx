import React from 'react'
import styled from 'styled-components'
import { THEME_LIST, Theme } from 'theme/styled'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ThemeToggle } from './ThemeToggle'
import { BSV, BV } from '../Button'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { faSun, faMoon, faSmileWink } from '@fortawesome/free-regular-svg-icons'
import { useThemeManager } from '@src/state/user/hooks'

import gulfLogoBlack from 'assets/png/gulfBlackPng.png'
import gulfLogoColour from 'assets/png/gulfPng.png'

const LogoImg = styled.img`
  max-width: 100%;
`

function getTogglerIcon(theme: Theme): IconDefinition | null {
  switch (theme) {
    case Theme.LIGHT:
      return faSun
    case Theme.DARK:
      return faMoon
    case Theme.GULF:
      return null
    default:
      return faSmileWink
  }
}

const ThemeToggleBar: React.FC = () => {
  const [theme, setTheme] = useThemeManager()

  return (
    <div>
      {THEME_LIST.map(([key, name], index) => {
        const isActiveMode = theme === name
        const icon = getTogglerIcon(name)

        return (
          <ThemeToggle
            mode={isActiveMode}
            size={isActiveMode ? BSV.BIG : BSV.BIG}
            variant={isActiveMode ? BV.PRIMARY : BV.DISABLED}
            margin="0.2rem"
            width="6rem"
            onClick={() => setTheme(name)}
            key={key + '_' + index}
          >
            {icon ? (
              <FontAwesomeIcon icon={icon} size="lg" />
            ) : (
              <LogoImg src={isActiveMode ? gulfLogoColour : gulfLogoBlack} />
            )}
          </ThemeToggle>
        )
      })}
    </div>
  )
}

export default ThemeToggleBar
