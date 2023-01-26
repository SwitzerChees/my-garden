import { StrapiObject } from '.'

export interface TelegramConfig extends StrapiObject {
  apiToken: string
  chatId: string
}
