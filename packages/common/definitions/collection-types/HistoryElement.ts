import { Media, StrapiObject } from '.'

export type HistoryElementType =
  | 'added'
  | 'updated'
  | 'watered'
  | 'fertilized'
  | 'repotted'
  | 'pruned'
  | 'image'
  | 'sterilized'
  | 'measured'
  | 'note'

export interface HistoryElement extends StrapiObject {
  action: HistoryElementType
  photo?: Media
  note?: string
  status: 'active' | 'archived'
}
