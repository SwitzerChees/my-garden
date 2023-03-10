import { ReminderSummaryEntry } from '../definitions'

export const dayInMilliseconds = 1000 * 3600 * 24

export const isValidDate = (date?: string | Date): date is Date => {
  if (!date) return false
  if (isNaN(Date.parse(date.toString()))) return false
  return true
}
//
export const formatDate = (date?: string | Date) => {
  if (!isValidDate(date)) return ''
  return new Date(date).toLocaleString('de-CH', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  })
}

export const isoDateWithoutTime = (date?: string | Date) => {
  if (!isValidDate(date)) return ''
  const dateToFormat = new Date(date)
  dateToFormat.setHours(0, 0, 0, 0)
  return dateToFormat.toISOString()
}

export const dateToday = () => {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return today
}

export const addDays = (date: Date, days: number) => {
  const newDate = new Date(date)
  newDate.setTime(newDate.getTime() + days * dayInMilliseconds)
  return newDate
}

export const relativeDate = (date?: string | Date) => {
  if (!isValidDate(date)) return ''
  const now = new Date()
  now.setHours(0, 0, 0, 0)
  const dateToCompare = new Date(date)
  const diff = dateToCompare.getTime() - now.getTime()
  const diffDays = Math.ceil(diff / (1000 * 3600 * 24))
  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Tomorrow'
  if (diffDays === -1) return 'Yesterday'
  if (diffDays < 0) return `${diffDays * -1} ${diffDays === -1 ? 'day' : 'days'} overdue`
  return `in ${diffDays} ${diffDays === 1 ? 'day' : 'days'}`
}

export const getReminderInDays = (reminderSummaryEntry: ReminderSummaryEntry) => {
  if (!reminderSummaryEntry) return 'No Reminder'
  const { date, days, doneToday } = reminderSummaryEntry
  if (days === 0) return 'No Reminder'
  if (doneToday) return 'Done Today'
  return relativeDate(date)
}

export const daysBetweenDates = (date1: Date, date2: Date) => {
  date1.setHours(0, 0, 0, 0)
  date2.setHours(0, 0, 0, 0)
  const differenceInMilliseconds = date2.getTime() - date1.getTime()
  const differenceInDays = differenceInMilliseconds / dayInMilliseconds
  return Math.ceil(differenceInDays)
}
