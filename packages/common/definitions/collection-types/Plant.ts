import { HistoryElement, Media, Reminder, StrapiObject, Tag, User } from '.'

export interface Plant extends StrapiObject {
  photo?: Media
  name: string
  botanicalName?: string
  tags: Tag[]
  history: HistoryElement[]
  reminder: Reminder
  createdBy: User
}
