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

export interface HistoryElement {
  id?: string
  createdAt: Date
  action: 'added' | 'updated' | 'watered' | 'fertilized' | 'repotted' | 'pruned' | 'image'
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
