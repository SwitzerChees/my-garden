import { StrapiObject, User } from '.'

export interface Tag extends StrapiObject {
  name: string
  user?: User
}
