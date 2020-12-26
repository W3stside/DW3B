import { createAction } from '@reduxjs/toolkit'
import { Theme } from 'theme/styled'

export const updateTheme = createAction<{ theme: Theme }>('user/updateTheme')
