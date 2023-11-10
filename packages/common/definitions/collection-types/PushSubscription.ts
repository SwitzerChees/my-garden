import type { StrapiObject, User } from '.'

interface PushSubscription extends StrapiObject {
  user: User
  subscription: {
    endpoint: string
    expirationTime: Date | null
    keys: {
      p256dh: string
      auth: string
    }
  }
}

export type { PushSubscription }
