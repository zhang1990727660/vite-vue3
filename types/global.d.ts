type Recordable<T = any> = Record<string, T>

declare interface ViteEnv {
  VITE_PUBLIC_PATH: string
  VITE_PORT: number
  VITE_PROXY: string
}

interface ImportMetaEnv extends ViteEnv {
  __: unknown
}
