import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { AppDispatch, AppState } from 'state'
import { Theme, ThemeModes } from 'theme/styled'
import { updateThemeAutoDetect, updateThemeMode } from './actions'

export const useAppColourTheme = (): Theme => useSelector<AppState, Theme>(({ user }) => user.theme)

interface ThemeManager {
  theme: Theme
  setMode: (mode: ThemeModes) => void
  setAutoDetect: (autoDetect: boolean) => void
}

export function useThemeManager(): ThemeManager {
  const dispatch = useDispatch<AppDispatch>()
  const theme = useAppColourTheme()

  const setMode = useCallback(
    (mode: ThemeModes) => {
      dispatch(updateThemeMode(mode))
    },
    [dispatch]
  )

  const setAutoDetect = useCallback(
    (autoDetect: boolean) => {
      dispatch(updateThemeAutoDetect(autoDetect))
    },
    [dispatch]
  )

  return { theme, setMode, setAutoDetect }
}
