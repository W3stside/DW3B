import { useEffect } from 'react'
import { ThemeModes } from 'theme/styled'
import { useThemeManager } from './hooks'

export default function Updater(): null {
  const { theme, setMode } = useThemeManager()

  // keep dark mode in sync with the system
  useEffect(() => {
    const autoDarkHandler = (match: MediaQueryListEvent) => {
      const autoTheme = match.matches ? ThemeModes.DARK : ThemeModes.LIGHT
      setMode(autoTheme)
    }

    const match = window?.matchMedia('(prefers-color-scheme: dark)')

    // If system prefers dark mode and user theme isnt already explicitly set by user
    if (match.matches && theme.autoDetect) {
      setMode(ThemeModes.DARK)
    }

    if (match?.addEventListener) {
      match?.addEventListener('change', autoDarkHandler)
    }

    return () => {
      if (match?.removeEventListener) {
        match?.removeEventListener('change', autoDarkHandler)
      }
    }
  }, [setMode, theme])

  return null
}
