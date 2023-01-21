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
  createdAt: Date
  action: 'added' | 'watered' | 'fertilized' | 'repotted' | 'pruned' | 'image'
  photo?: Photo
  note?: string
}

export interface Plant {
  photo?: Photo
  id: string
  name: string
  botanicalName: string
  tags: Tag[]
  history: HistoryElement[]
  reminder: Reminder
}
