import { ReactNode, useState } from 'react'
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
  itemDescription: ReactNode
}

const DEFAULT_MEDIA_START_INDEX = 0

// TODO: fix props, pass steps, sizes etc
export default function ItemPage({
  itemColor,
  itemHeader,
  itemMediaList,
  itemSizesList,
  itemDescription
}: ItemPageProps) {
  const [mediaStartIndex, setMediaStartIndex] = useState(DEFAULT_MEDIA_START_INDEX)
  const onCarouselChange = (index: number) => setMediaStartIndex(index)

  return (
    <ItemContainer>
      <ItemAsidePanel id="#shirt-aside-panel">
        <ItemHeader fontSize="65px" itemColor={itemColor} animation>
          {/* <Strikethrough /> */}
          {itemHeader}
        </ItemHeader>
        {/* Item carousel */}
        <Carousel
          buttonColor={itemColor}
          mediaList={itemMediaList}
          mediaStartIndex={mediaStartIndex}
          onCarouselChange={onCarouselChange}
        />
        {/* Size selector */}
        <br />
        <TYPE.black fontSize={16} padding={2} fontWeight={700}>
          Choose a size
        </TYPE.black>
        <br />
        <Row>
          <select>
            {itemSizesList.map((size, index) => (
              <option key={size + '_' + index}>{size}</option>
            ))}
          </select>
        </Row>
        <br />
        {/* Item description */}
        <TYPE.black fontSize={16} padding={2} fontWeight={700}>
          Description
        </TYPE.black>
        <br />
        <Row>
          <TYPE.black fontSize={16} padding={2} fontWeight={300}>
            {itemDescription}
          </TYPE.black>
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
