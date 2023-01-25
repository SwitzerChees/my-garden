export interface MediaFormat {
  ext: string
  url: string
  hash: string
  mime: string
  name: string
  size: number
  width: number
  height: number
}

export interface Media extends MediaFormat {
  id: number
  name: string
  alternativeText?: string
  caption?: string
  width: number
  formats?: {
    large?: MediaFormat
    medium?: MediaFormat
    small?: MediaFormat
    thumbnail?: MediaFormat
  }
  height: number
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl?: string
  provider: string
  createdAt: Date
  updatedAt: Date
}
