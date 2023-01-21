export interface Tag {
  id?: string
  name: string
}

export interface Plant {
  id: string
  name: string
  botanicalName: string
  tags: Tag[]
}
