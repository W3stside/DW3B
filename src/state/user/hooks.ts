import { useCallback } from 'react'

import { useAppDispatch, useAppSelector } from 'state'
import { Theme, ThemeModes } from 'theme/styled'
import { updateThemeAutoDetect, updateThemeMode } from './reducer'
import { initialState } from './reducer'

export const useAppColourTheme = () => useAppSelector(({ user }) => user.theme || initialState.theme)

interface ThemeManager {
  theme: Theme
  setMode: (mode: ThemeModes) => void
  setAutoDetect: (autoDetect: boolean) => void
}

export function useThemeManager(): ThemeManager {
  const dispatch = useAppDispatch()
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
