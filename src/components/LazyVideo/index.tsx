import { ForwardedRef, forwardRef, useEffect, useState } from 'react'
import styled from 'styled-components/macro'

import { Row, RowProps } from 'components/Layout'

import useDetectScrollIntoView from 'hooks/useDetectScrollIntoView'

import { BoxProps } from 'rebass'
import { getThemeColours, OFF_WHITE } from 'theme/utils'
import { Play } from 'react-feather'

import { ThemeModes } from 'theme/styled'
import { VideoPlayCTAOverlay } from './styled'
import { Subheader } from 'components/Layout/Text'
import { AnimatedLoader } from 'components/Loader'

type WithContainer = {
  container: HTMLElement | null | undefined
}

type AutoPlayOptions = {
  stopTime: number
}

export type LazyVideoProps = {
  sourcesProps: React.DetailedHTMLProps<React.SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement>[]
  videoProps?: React.DetailedHTMLProps<React.VideoHTMLAttributes<HTMLVideoElement>, HTMLVideoElement>
  loadInView?: boolean
  forceLoad?: boolean
  showTapToPlay?: boolean
  showError?: boolean
  videoDelay?: boolean
  autoPlayOptions?: AutoPlayOptions
} & WithContainer &
  BoxProps

const VideoContainer = styled(Row)`
  position: relative;
`

const BASE_VIDEO_PROPS: Partial<React.DetailedHTMLProps<
  React.VideoHTMLAttributes<HTMLVideoElement>,
  HTMLVideoElement
>> = {
  loop: true,
  muted: true,
  autoPlay: true,
  preload: 'none',
  playsInline: true
}
const BASE_INTERSECTION_OPTIONS = {
  threshold: 0.1,
  trackVisibility: true,
  delay: 300
}

export default forwardRef(function LazyVideo(
  {
    sourcesProps,
    videoProps = {},
    // useful for setting when setup is animated
    // e.g useSprings animating components
    // and we dont want to check if in view before animation ends
    loadInView = true,
    forceLoad = false,
    showTapToPlay = false,
    videoDelay = false,
    showError = false,
    container,
    ...boxProps
  }: LazyVideoProps,
  forwardRef: ForwardedRef<HTMLVideoElement>
) {
  const [sourceErrored, setSourceErrored] = useState(false)
  const [dataLoaded, setDataLoaded] = useState(false)
  const [metadataLoaded, setMetaDataLoaded] = useState(false)
  const loading = !metadataLoaded || !dataLoaded

  const [lastSourceElem, setLastSourceElem] = useState<HTMLSourceElement | null>(null)
  const [videoElement, setVideoElement] = useState<HTMLVideoElement | null>(null)

  // forwardedRef in use, we need to assign our internal ref to the external
  useEffect(() => {
    if (forwardRef && videoElement) {
      typeof forwardRef === 'function' && forwardRef(videoElement)
    }
  }, [forwardRef, videoElement])

  // capture LAST source error state
  useEffect(() => {
    const _handleSourceErrored = () => setSourceErrored(true)

    let source: HTMLSourceElement
    if (lastSourceElem) {
      source = lastSourceElem
      source.addEventListener('error', _handleSourceErrored)
    }

    return () => {
      source?.removeEventListener('error', _handleSourceErrored)
    }
  }, [lastSourceElem])

  // set VIDEO loading states for forwardRef
  useEffect(() => {
    const _handleDataLoad = () => {
      video?.removeEventListener('loadeddata', _handleDataLoad)
      setDataLoaded(true)
    }
    const _handleMetaDataLoad = () => {
      video?.removeEventListener('loadedmetadata', _handleMetaDataLoad)
      setMetaDataLoaded(true)
    }

    let video: HTMLVideoElement
    if (videoElement) {
      video = videoElement

      video.addEventListener('loadeddata', _handleDataLoad)
      video.addEventListener('loadedmetadata', _handleMetaDataLoad)
    }

    return () => {
      video?.removeEventListener('loadeddata', _handleDataLoad)
      video?.removeEventListener('loadedmetadata', _handleMetaDataLoad)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoElement])

  const isInView = useDetectScrollIntoView(
    loadInView ? videoElement : undefined,
    {
      ...BASE_INTERSECTION_OPTIONS,
      root: container
    },
    !loadInView
  )
  const combinedVideoProps = { ...BASE_VIDEO_PROPS, ...videoProps }
  const showDelayer = !showTapToPlay && (videoDelay || loading)
  return (
    <VideoContainer justifyContent="center" {...boxProps}>
      {/* 
      // TODO: reenable if in future loader/delayer should be different
      {loading ? <LoadingComponent /> : videoDelay ? <VideoDelayer /> : null} 
      */}
      {/* Show delayer comp whether delayed or is loading */}
      {showError || sourceErrored ? (
        <VideoOverlay>
          <h1>ERROR!</h1>
        </VideoOverlay>
      ) : showDelayer ? (
        <VideoOverlay>
          <AnimatedLoader loadingComponent={<h1>LOADING VIDEO...</h1>} />
        </VideoOverlay>
      ) : null}
      {showTapToPlay && (
        <VideoOverlay
          $width={videoElement?.clientWidth ? videoElement.clientWidth + 'px' : '100%'}
          left={-20}
          $height="100%"
          textAlign="center"
        >
          <Subheader color={OFF_WHITE} display="flex" alignItems="center" justifyContent="center">
            <Play size="1.8rem" style={{ marginRight: '0.5rem' }} /> TAP TO PLAY
          </Subheader>
        </VideoOverlay>
      )}
      <video {...combinedVideoProps} ref={setVideoElement}>
        {isInView || forceLoad
          ? sourcesProps.map(({ src, ...sourceProps }, index, arr) => {
              const isLast = index === arr.length - 1
              return <source key={src} src={src} ref={isLast ? setLastSourceElem : null} {...sourceProps} />
            })
          : null}
      </video>
    </VideoContainer>
  )
})

export function VideoOverlay({
  children,
  ...styleProps
}: {
  children?: React.ReactNode
  $width?: string
  $height?: string
  left?: number
} & RowProps) {
  return (
    <VideoPlayCTAOverlay {...styleProps} bgColor={getThemeColours(ThemeModes.DARK).red3}>
      {children}
    </VideoPlayCTAOverlay>
  )
}
