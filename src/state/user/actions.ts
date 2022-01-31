import { createAction } from '@reduxjs/toolkit'
import { ThemeModes } from 'theme/styled'

export const updateThemeMode = createAction<ThemeModes>('user/updateThemeMode')
export const updateThemeAutoDetect = createAction<boolean>('user/updateThemeAutoDetect')
