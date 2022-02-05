import { nanoid } from '@reduxjs/toolkit'
import FRONT_IMAGE from 'assets/apparel/leer/images/front.jpg'
import BACK_IMAGE from 'assets/apparel/leer/images/back.jpg'
import FRONT_VIDEO from 'assets/apparel/leer/webm/front.webm'
import BACK_VIDEO from 'assets/apparel/leer/webm/back.webm'
import { ApparelItem, HomeItem } from './types'

const ITEM_MEDIA_LIST: ApparelItem[] = [
  { image: FRONT_IMAGE, video: FRONT_VIDEO },
  { image: BACK_IMAGE, video: BACK_VIDEO }
]
const ITEM_SIZES_LIST = ['LARGE', 'MEDIUM', 'SMALL']

export default {
  itemColor: '#a2c2fa',
  itemHeader: 'L E E R',
  itemMediaList: ITEM_MEDIA_LIST,
  itemSizesList: ITEM_SIZES_LIST,
  key: nanoid()
} as HomeItem
