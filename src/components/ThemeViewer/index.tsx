import React from 'react'
import ThemeProvider from '@src/theme'
import { ButtonBase, ThemeToggle, BSV, BV } from '../Button'
import { useThemeManager } from '@src/state/user/hooks'
import { DefaultTheme } from 'styled-components'
import { THEME_LIST, Theme } from '@src/theme/styled'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faSmileWink, faMoon, faLightbulb } from '@fortawesome/free-regular-svg-icons'
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'

type PropsWithChildrenAndTheme<P> = P & { children?: React.ReactNode; theme?: DefaultTheme }

interface FunctionComponentWithTheme<P = {}> {
  (props: PropsWithChildrenAndTheme<P>, context?: any): React.ReactElement<any, any> | null
  propTypes?: React.WeakValidationMap<P>
  contextTypes?: React.ValidationMap<any>
  defaultProps?: Partial<P>
  displayName?: string
}

type TFC<P = {}> = FunctionComponentWithTheme<P>

function getTogglerIcon(theme: Theme): IconDefinition {
  switch (theme) {
    case Theme.LIGHT:
      return faSun
    case Theme.DARK:
      return faMoon
    case Theme.GULF:
      return faLightbulb
    default:
      return faSmileWink
  }
}

const ThemeConsumer: TFC = ({ theme }) => {
  const [, setTheme] = useThemeManager()

  if (!theme) return <div>No active theme detected.</div>

  return (
    <div>
      <h1>Theme Manager</h1>
      <h4>
        Your current app theme is: <h2>{theme.mode}</h2>
      </h4>
      <p>{JSON.stringify(theme, null, 2)}</p>
      <br />
      <ButtonBase size={BSV.SMALL} variant={BV.PRIMARY}>
        Base Button Example
      </ButtonBase>
      <br />
      <br />
      {THEME_LIST.map(([key, name], index) => {
        const isActiveMode = theme.mode === name
        const icon = getTogglerIcon(name)
        return (
          <ThemeToggle
            mode={isActiveMode}
            size={BSV.BIG}
            variant={isActiveMode ? BV.PRIMARY : BV.DISABLED}
            margin="0.2rem"
            onClick={() => setTheme(name)}
            key={key + '_' + index}
          >
            {<FontAwesomeIcon icon={icon} size="lg" />}
          </ThemeToggle>
        )
      })}
    </div>
  )
}

const ThemeViewer: React.FC = () => {
  return (
    <ThemeProvider>
      <ThemeConsumer />
    </ThemeProvider>
  )
}

export default ThemeViewer
