import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, AppState } from 'state'
import { Theme } from 'theme/styled'
import { updateTheme } from './actions'

export const useAppColourTheme = (): Theme => useSelector<AppState, Theme>(({ user }) => user.theme)

export function useThemeManager(): [Theme, (newTheme: Theme) => void] {
  const dispatch = useDispatch<AppDispatch>()
  const theme = useAppColourTheme()

  const toggleSetTheme = useCallback(
    (newTheme: Theme) => {
      dispatch(updateTheme({ theme: newTheme }))
    },
    [dispatch]
  )

  return [theme, toggleSetTheme]
}
