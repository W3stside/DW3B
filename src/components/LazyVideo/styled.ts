import styled from 'styled-components/macro'
import { Row } from 'components/Layout'
import { Z_INDEXES } from 'constants/config'
import { rotateKeyframe } from 'theme/styles/animation'

export const VideoPlayCTAOverlay = styled(Row).attrs(props => ({
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  ...props
}))<{
  bgColor?: string
  $width?: string | number
  $height?: string | number
}>`
    position: absolute;
    cursor: pointer;
    background: ${({ theme, bgColor }) =>
      `radial-gradient(76.02% 105.41% at 31.84% 0%,${bgColor} 0%,${theme.blackOpaque1} 100%)`};
    ${({ $width }) => $width && `width: ${$width};`}
    ${({ $height }) => $height && `height: ${$height};`}
    z-index: ${Z_INDEXES.PRODUCT_VIDEOS};
  
    > img {
      width: 20%;
      margin: auto 20% auto auto;
  
      animation: ${rotateKeyframe} 1s cubic-bezier(0.83, 0, 0.17, 1) infinite;
    }
  `
