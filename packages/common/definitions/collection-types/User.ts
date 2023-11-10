import { PushSubscription, StrapiObject } from '.'

export interface User extends StrapiObject {
  username: string
  email: string
  provider: string
  confirmed: boolean
  blocked: boolean
  pushSubscriptions: PushSubscription[]
}
