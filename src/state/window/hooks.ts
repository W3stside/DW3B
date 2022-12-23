import { useCallback } from 'react'
import { useAppDispatch, useAppSelector } from 'state'
import { WindowSize, updateWindowSize } from 'state/window/reducer'
import { MEDIA_WIDTHS } from 'theme/styles/mediaQueries'

export function useUpdateWindowSize() {
  const dispatch = useAppDispatch()

  return useCallback((params: WindowSize) => dispatch(updateWindowSize(params)), [dispatch])
}

export const useGetWindowSize = () => useAppSelector(({ window }) => window.sizes)

export const useIsMobileWindowWidthSize = () => {
  const sizes = useGetWindowSize()

  return Boolean(sizes?.width && sizes.width <= MEDIA_WIDTHS.upToSmall)
}

export const useIsMediumWindowWidthSize = () => {
  const sizes = useGetWindowSize()

  return Boolean(sizes?.width && sizes.width <= MEDIA_WIDTHS.upToMedium)
}
