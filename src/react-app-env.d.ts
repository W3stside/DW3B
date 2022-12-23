/// <reference types="react-scripts" />

declare module '@metamask/jazzicon' {
  export default function(diameter: number, seed: number): HTMLElement
}

declare module 'fortmatic'
declare module 'lethargy'
declare module 'imagekitio-react'

interface Window {
  ethereum?: {
    isMetaMask?: true
    on?: (...args: any[]) => void
    removeListener?: (...args: any[]) => void
    autoRefreshOnNetworkChange?: boolean
  }
  web3?: Record<string, unknown>
}

declare module 'content-hash' {
  declare function decode(x: string): string
  declare function getCodec(x: string): string
}

declare module 'multihashes' {
  declare function decode(buff: Uint8Array): { code: number; name: string; length: number; digest: Uint8Array }
  declare function toB58String(hash: Uint8Array): string
}

declare module '*.mp4' {
  const src: string;
  export default src;
}

declare module '*.webm' {
  const src: string;
  export default src;
}

declare module '*.ttf' {
  const src: string;
  export default src;
}

declare namespace React {
  type PropsWithChildrenAndTheme<P> = P & { children?: React.ReactNode; theme?: DefaultTheme }
  
  interface FunctionComponentWithTheme<P = Record<any, any>> {
    (props: PropsWithChildrenAndTheme<P>, context?: any): React.ReactElement<any, any> | null
    propTypes?: React.WeakValidationMap<P>
    contextTypes?: React.ValidationMap<any>
    defaultProps?: Partial<P>
    displayName?: string
  }
  
  export type TFC<P = Record<any, any>> = FunctionComponentWithTheme<P>
  export type FCC<P = Record<any, any>> = (props: PropsWithChildren<P>, context?: any) => React.ReactElement<any, any> | null
}
