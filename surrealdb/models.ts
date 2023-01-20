export interface Plant {
  id: string
  name: string
  botanicalName: string
  tags: Tag[]
}

export interface Tag {
  id?: string
  name: string
}
