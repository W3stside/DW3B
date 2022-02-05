import { useState } from 'react'
import { Row } from 'components/Layout'
import Carousel from 'components/Carousel'
import { ItemContainer, ItemAsidePanel, ItemHeader, /* Strikethrough, */ VideoContentWrapper } from './styleds'

import { TYPE } from 'theme'
import { ApparelItem } from 'mock/apparel/types'

// TODO: move to APPAREL TYPES or sth
type ItemSizes = 'XX-LARGE' | 'X-LARGE' | 'LARGE' | 'MEDIUM' | 'SMALL'

export interface ItemPageProps {
  itemColor: string
  itemHeader: string
  itemMediaList: ApparelItem[]
  itemSizesList: ItemSizes[]
}

const DEFAULT_MEDIA_START_INDEX = 0

// TODO: fix props, pass steps, sizes etc
export default function ItemPage({ itemColor, itemHeader, itemMediaList, itemSizesList }: ItemPageProps) {
  const [mediaStartIndex, setMediaStartIndex] = useState(DEFAULT_MEDIA_START_INDEX)
  const onCarouselChange = (index: number) => setMediaStartIndex(index)

  return (
    <ItemContainer>
      <ItemAsidePanel id="#shirt-aside-panel">
        <ItemHeader fontSize="65px" itemColor={itemColor}>
          {/* <Strikethrough /> */}
          {itemHeader}
        </ItemHeader>
        {/* Item carousel */}
        <Carousel mediaList={itemMediaList} mediaStartIndex={mediaStartIndex} onCarouselChange={onCarouselChange} />
        {/* Size selector */}
        <br />
        <TYPE.black fontSize="12px">Choose a size</TYPE.black>
        <br />
        <Row>
          <select>
            {itemSizesList.map((size, index) => (
              <option key={size + '_' + index}>{size}</option>
            ))}
          </select>
        </Row>
      </ItemAsidePanel>
      <VideoContentWrapper id="#video-content-wrapper">
        {itemMediaList.map(({ video }, index) => {
          const isSelected = index === mediaStartIndex
          if (!isSelected) return null

          return (
            <video loop muted autoPlay key={index}>
              <source src={video} type="video/webm" />
            </video>
          )
        })}
      </VideoContentWrapper>
    </ItemContainer>
  )
}
