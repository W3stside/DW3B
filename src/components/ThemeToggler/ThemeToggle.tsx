import styled from 'styled-components/macro'
import { ThemeModes } from 'theme/styled'
import Button, { ButtonProps, ButtonSizeVariations, ButtonVariations } from '../Button'

const ThemeButtonToggleWrapper = styled.div<{
  disabled: boolean
  $mode: boolean
  $margin?: string
  $width?: string
  $height?: string
}>`
  position: relative;
  display: inline-flex;
  align-items: center;
  width: ${({ $width = '12rem' }): string => $width};
  height: ${({ $height = '3.5rem' }): string => $height};
  background-color: ${({ theme }) => (theme.mode !== ThemeModes.DARK ? theme.purple3 : theme.purple)};
  border-radius: 0.8rem;
  margin: ${({ $margin = '0' }): string => $margin};

  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};

  > button {
    border-radius: 0.8rem;
    width: 60%;
    height: 110%;
    margin-left: ${({ $mode }): string => ($mode ? 'auto' : '0')};

    display: flex;
    justify-content: center;
    align-items: center;

    > img,
    > svg {
      max-height: 100%;
    }

    > #theme-toggle-label {
      position: absolute;
      color: ${({ theme }) => theme.offWhite};
      font-weight: 300;
      font-size: 1rem;
      max-width: 22%;
      ${({ $mode }) => ($mode ? 'left: 10%;' : 'right: 10%;')}
    }
  }
`

export interface ThemeToggleProps {
  margin?: string
  width?: string
  disabled?: boolean
  children?: React.ReactNode
}

export const ThemeToggle: React.FC<ThemeToggleProps & { mode: boolean; buttonProps: ButtonProps }> = ({
  mode,
  margin,
  width,
  disabled = false,
  buttonProps = { size: ButtonSizeVariations.SMALL, variant: ButtonVariations.THEME },
  children
}) => {
  return (
    <ThemeButtonToggleWrapper
      disabled={disabled}
      $mode={mode}
      $margin={margin}
      $width={width}
      title={`Tap/click to enable ${mode ? 'light' : 'dark'} mode`}
    >
      <Button {...buttonProps}>{children}</Button>
    </ThemeButtonToggleWrapper>
  )
}
