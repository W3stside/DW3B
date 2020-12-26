import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Theme } from 'theme/styled'
import { AppDispatch } from '../index'
import { updateTheme } from './actions'
import { useAppColourTheme } from './hooks'

export default function Updater(): null {
  const dispatch = useDispatch<AppDispatch>()
  const theme = useAppColourTheme()

  // keep dark mode in sync with the system
  useEffect(() => {
    const autoDarkHandler = (match: MediaQueryListEvent) => {
      console.log('🚀 ~ file: updater.tsx ~ line 15 ~ autoDarkHandler ~ match', match)
      const autoTheme = match.matches ? Theme.DARK : Theme.LIGHT
      dispatch(updateTheme({ theme: autoTheme }))
    }

    const match = window?.matchMedia('(prefers-color-scheme: dark)')

    // If system prefers dark mode and user theme isnt already explicitly set by user
    if (match.matches && theme === Theme.AUTO) {
      dispatch(updateTheme({ theme: Theme.DARK }))
    }

    if (match?.addEventListener) {
      match?.addEventListener('change', autoDarkHandler)
    }

    return () => {
      if (match?.removeEventListener) {
        match?.removeEventListener('change', autoDarkHandler)
      }
    }
  }, [dispatch, theme])

  return null
}
