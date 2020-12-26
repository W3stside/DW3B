import React from 'react'
import ThemeProvider from '@src/theme'
import { ButtonBase, ThemeToggle, BSV, BV } from '../Button'
import { useThemeManager } from '@src/state/user/hooks'
import { DefaultTheme } from 'styled-components'
import { THEME_LIST } from '@src/theme/styled'

type PropsWithChildrenAndTheme<P> = P & { children?: React.ReactNode; theme?: DefaultTheme }

interface FunctionComponentWithTheme<P = {}> {
  (props: PropsWithChildrenAndTheme<P>, context?: any): React.ReactElement<any, any> | null
  propTypes?: React.WeakValidationMap<P>
  contextTypes?: React.ValidationMap<any>
  defaultProps?: Partial<P>
  displayName?: string
}

type TFC<P = {}> = FunctionComponentWithTheme<P>

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
      <ButtonBase variant={BV.PRIMARY}>Base Button Example</ButtonBase>
      <br />
      <br />
      {THEME_LIST.map(([key, name], index) => {
        const isActiveMode = theme.mode === name
        return (
          <ThemeToggle
            size={BSV.BIG}
            variant={isActiveMode ? BV.PRIMARY : BV.DISABLED}
            onClick={() => setTheme(name)}
            mode={isActiveMode}
            key={key + '_' + index}
          >
            {name}
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
