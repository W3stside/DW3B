import { MediaWidths } from 'theme/styles/mediaQueries'

export type DDPXImageUrlMap = { '1x': string; '2x'?: string; '3x'?: string }
export type GenericImageSrcSet = { defaultUrl: string } & {
  [K in MediaWidths]: DDPXImageUrlMap
}
