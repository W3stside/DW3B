import ThemeProvider from 'theme'
import { ButtonBase, BSV, BV } from '../Button'
import { DefaultTheme } from 'styled-components/macro'
import { LightCard } from '../Layout/Card'

type PropsWithChildrenAndTheme<P> = P & { children?: React.ReactNode; theme?: DefaultTheme }

interface FunctionComponentWithTheme<P = Record<any, any>> {
  (props: PropsWithChildrenAndTheme<P>, context?: any): React.ReactElement<any, any> | null
  propTypes?: React.WeakValidationMap<P>
  contextTypes?: React.ValidationMap<any>
  defaultProps?: Partial<P>
  displayName?: string
}

type TFC<P = Record<any, any>> = FunctionComponentWithTheme<P>

const ThemeConsumer: TFC = ({ theme }) => {
  if (!theme) return <div>No active theme detected.</div>

  return (
    <div>
      <h1>Theme Manager</h1>
      <h4>
        Your current app theme is: <h2>{theme.mode}</h2>
      </h4>
      <LightCard>{JSON.stringify(theme, null, 2)}</LightCard>
      <br />
      <ButtonBase variant={BV.PRIMARY}>Default Button Example</ButtonBase>
      <ButtonBase size={BSV.BIG} variant={BV.SECONDARY}>
        Big Button Example
      </ButtonBase>
      <ButtonBase size={BSV.SMALL} variant={BV.WARNING}>
        Small Button Example
      </ButtonBase>
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
