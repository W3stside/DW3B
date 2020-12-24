import { createAction } from '@reduxjs/toolkit'
import { Theme } from '@src/theme'

export const updateTheme = createAction<{ theme: Theme }>('user/updateTheme')
