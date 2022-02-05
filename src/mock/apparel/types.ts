import { ItemPageProps } from 'pages/SingleItem/AsideWithVideo'

export type ApparelItem = {
  image: string
  video: string
}
export type HomeItem = ItemPageProps & { key: string }
export type HomeItemsList = HomeItem[]
