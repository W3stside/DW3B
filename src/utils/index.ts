import { UAParser } from 'ua-parser-js'

export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}

const parser = new UAParser(window.navigator.userAgent)
const { type } = parser.getDevice()

export const userAgent = parser.getResult()

export const isMobile = type === 'mobile' || type === 'tablet'

export const isTruthy = <T>(value: T | null | undefined | false): value is T => !!value

export const delay = <T = void>(ms = 100, result?: T): Promise<T> =>
  new Promise(resolve => setTimeout(resolve, ms, result))

export function withTimeout<T>(promise: Promise<T>, ms: number, context?: string): Promise<T> {
  const failOnTimeout = delay(ms).then(() => {
    const errorMessage = 'Timeout after ' + ms + ' ms'
    throw new Error(context ? `${context}. ${errorMessage}` : errorMessage)
  })

  return Promise.race([promise, failOnTimeout])
}

export function isPromiseFulfilled<T>(
  promiseResult: PromiseSettledResult<T>
): promiseResult is PromiseFulfilledResult<T> {
  return promiseResult.status === 'fulfilled'
}

// To properly handle PromiseSettleResult which returns and object
export function getPromiseFulfilledValue<T, E = undefined>(
  promiseResult: PromiseSettledResult<T>,
  nonFulfilledReturn: E
) {
  return isPromiseFulfilled(promiseResult) ? promiseResult.value : nonFulfilledReturn
}

export const registerOnWindow = (registerMapping: Record<string, any>) => {
  Object.entries(registerMapping).forEach(([key, value]) => {
    ;(window as any)[key] = value
  })
}

/**
 * Returns true if the string value is zero in hex
 * @param hexNumberString
 */
export function isZero(hexNumberString: string) {
  return /^0x0*$/.test(hexNumberString)
}
