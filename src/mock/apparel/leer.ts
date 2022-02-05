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
const ITEM_DESCRIPTION = `
Virgil didnt make it through 7 layers of hell and write about it for you to not buy this shirt. 
Fuck you and your feelings. And learn to read italian because thats what the shirt is written in.

Big shout to Matheiu Houang in Bordeaux for the painting on the front.
@mathieuhouang
`

export default {
  itemColor: '#a2c2fa',
  itemHeader: 'L E E R',
  itemMediaList: ITEM_MEDIA_LIST,
  itemSizesList: ITEM_SIZES_LIST,
  itemDescription: ITEM_DESCRIPTION,
  key: nanoid()
} as HomeItem
