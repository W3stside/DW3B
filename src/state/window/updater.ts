import { useEffect, useState } from 'react'
import useDebounce from 'hooks/useDebounce'
import { useUpdateWindowSize } from 'state/window/hooks'
import { WindowSize } from 'state/window/reducer'

const WINDOW_SIZE_UPDATE_DEBOUNCE_TIME = 500
export default function Updater(): null {
  const data = useWindowSize()
  const updateWindowSize = useUpdateWindowSize()
  const debouncedData = useDebounce<WindowSize>(data, WINDOW_SIZE_UPDATE_DEBOUNCE_TIME)

  useEffect(() => {
    updateWindowSize(debouncedData)
  }, [debouncedData, updateWindowSize])

  return null
}

const isClient = typeof window === 'object'
function getSize() {
  return {
    width: isClient ? window.innerWidth : undefined,
    height: isClient ? window.innerHeight : undefined,
    get ar() {
      if (!isClient || !this.width || !this.height) return undefined
      return this.width / this.height
    }
  }
}
// https://usehooks.com/useWindowSize/
function useWindowSize() {
  const [windowSize, setWindowSize] = useState(getSize)
  useEffect(() => {
    function handleCheckWindowSize() {
      setWindowSize(getSize())
    }
    // initial call
    handleCheckWindowSize()
    if (isClient) {
      window.addEventListener('resize', handleCheckWindowSize)
      return () => {
        window.removeEventListener('resize', handleCheckWindowSize)
      }
    }
    return undefined
  }, [])
  return windowSize
}
