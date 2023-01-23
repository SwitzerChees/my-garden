export interface Photo {
  imageName: string
}

export interface Tag {
  id?: string
  name: string
}

export interface Reminder {
  water: number
  fertilize: number
}

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
export interface HistoryElement {
  id?: string
  createdAt: Date
  action: HistoryElementType
  photo?: Photo
  note?: string
}

export interface Plant {
  id?: string
  photo?: Photo
  name: string
  botanicalName: string
  tags: Tag[]
  history: HistoryElement[]
  reminder: Reminder
}
