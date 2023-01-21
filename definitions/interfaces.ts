export interface Photo {
  imageName: string
}

export interface Tag {
  id?: string
  name: string
}

export interface Plant {
  photo?: Photo
  id: string
  name: string
  botanicalName: string
  tags: Tag[]
}
