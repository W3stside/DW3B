import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Theme } from 'theme'

import { AppDispatch, AppState } from 'state'
import { updateTheme } from './actions'

export const useAppTheme = (): Theme => useSelector<AppState, Theme>(({ user }) => user.theme)

export function useThemeManager(): [Theme, (newTheme: Theme) => void] {
  const dispatch = useDispatch<AppDispatch>()
  const theme = useAppTheme()

  const toggleSetTheme = useCallback((newTheme: Theme) => {
    dispatch(updateTheme({ theme: newTheme }))
  }, [dispatch])

  return [theme, toggleSetTheme]
}
