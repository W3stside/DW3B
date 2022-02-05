import styled from 'styled-components/macro'
import { transparentize } from 'polished'
import { Row } from 'components/Layout'

export const CarouselStep = styled(Row)<{ $calculatedWidth: string }>`
  position: relative;
  width: ${({ $calculatedWidth }) => $calculatedWidth};

  img {
    max-width: 98%;
    box-shadow: 3px 6px 8px 0px #686868ad;
  }

  transition: width 0.3s ease-out;
`

export const CarouselContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;

  // no shrink
  flex: 1 0 auto;
  width: 100%;
  height: 480px;
`
// #a1c3f9
export const CarouselButton = styled.div<{ buttonColor: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 20px;
  margin: 0 4px;
  background-color: ${({ buttonColor }) => transparentize(1, buttonColor)};

  cursor: pointer;

  &:hover {
    background-color: ${({ buttonColor }) => transparentize(0.2, buttonColor)};
  }

  transition: background-color 0.2s ease-in-out;
`

export const CarouselButtonContainer = styled.div`
  position: absolute;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`
