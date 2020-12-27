import React from 'react'
import styled from 'styled-components'
import { ButtonBaseProps, ButtonSizeVariations, ButtonVariations, ButtonBase } from '../Button'

const ThemeButtonToggleWrapper = styled.div<{ $mode: boolean; $margin?: string; $width?: string }>`
  display: inline-flex;
  width: ${({ $width = '6rem' }): string => $width};
  background-color: gainsboro;
  border-radius: 2rem;
  margin: ${({ $margin = '0' }): string => $margin};

  > button {
    width: 75%;
    margin-left: ${({ $mode }): string => ($mode ? 'auto' : '0')};

    display: flex;
    justify-content: center;
  }
`

export const ThemeToggle: React.FC<ButtonBaseProps & {
  mode: boolean
  margin?: string
  width?: string
}> = ({
  mode,
  margin,
  width,
  size = ButtonSizeVariations.SMALL,
  variant = ButtonVariations.THEME,
  children,
  ...rest
}) => {
  return (
    <ThemeButtonToggleWrapper $mode={mode} $margin={margin} $width={width}>
      <ButtonBase {...rest} size={size} variant={variant}>
        {children}
      </ButtonBase>
    </ThemeButtonToggleWrapper>
  )
}
