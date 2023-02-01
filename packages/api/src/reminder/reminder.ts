import lfp from 'lodash/fp'
import { HistoryElement, Plant } from '@my-garden/common/definitions'
const { first, orderBy, pipe } = lfp

const waterActionTypes = ['watered']
const fertilizeActionTypes = ['fertilized']

interface ReminderSummaryEntry {
  days: number
  nextInDays: number
  doneToday: boolean
  date: Date
}
interface ReminderSummary {
  water: ReminderSummaryEntry
  fertilize: ReminderSummaryEntry
}

export const needReminderAttention = (reminderSummaryEntry: ReminderSummaryEntry) => {
  if (!reminderSummaryEntry) return false
  const { days, nextInDays, doneToday } = reminderSummaryEntry
  return days !== 0 && !doneToday && nextInDays <= 0
}

const daysBetweenDates = (date1: Date, date2: Date) => {
  date1.setHours(0, 0, 0, 0)
  date2.setHours(0, 0, 0, 0)
  const differenceInMilliseconds = date2.getTime() - date1.getTime()
  const differenceInDays = differenceInMilliseconds / dayInMilliseconds
  return Math.ceil(differenceInDays)
}

const dayInMilliseconds = 1000 * 3600 * 24

export const getReminderSummary = (plant: Plant): ReminderSummary => {
  const { water = 0, fertilize = 0 } = plant.reminder || {}
  const { history = [] } = plant
  const activeHistory = history.filter((h) => h.status === 'active')
  const today = new Date()
  const waterAction = mostRecentWaterAction(activeHistory)
  const fertilizeAction = mostRecentFertilizeAction(activeHistory)
  const waterNext = new Date(plant.createdAt || today)
  if (waterAction) {
    waterNext.setTime(new Date(waterAction.createdAt || today).getTime() + water * dayInMilliseconds)
  }
  const nextWaterInDays = daysBetweenDates(today, waterNext)
  const fertilizeNext = new Date(plant.createdAt || today)
  if (fertilizeAction) {
    fertilizeNext.setTime(new Date(fertilizeAction.createdAt || today).getTime() + fertilize * dayInMilliseconds)
  }
  const nextFertilizeInDays = daysBetweenDates(today, fertilizeNext)
  const waterDoneToday =
    water === 0 ? false : waterAction ? new Date(waterAction.createdAt || today).toISOString() === new Date().toISOString() : false
  const fertilizeDoneToday =
    fertilize === 0
      ? false
      : fertilizeAction
      ? new Date(fertilizeAction.createdAt || today).toISOString() === new Date().toISOString()
      : false
  return {
    water: {
      days: water,
      nextInDays: nextWaterInDays,
      doneToday: waterDoneToday,
      date: waterNext,
    },
    fertilize: {
      days: fertilize,
      nextInDays: nextFertilizeInDays,
      doneToday: fertilizeDoneToday,
      date: fertilizeNext,
    },
  }
}

export const getReminderDays = (days?: number) => {
  if (!days || days === 0) return 'No Reminder'
  return `every ${days} days`
}

export const getReminderInDays = (reminderSummaryEntry: ReminderSummaryEntry) => {
  if (!reminderSummaryEntry) return 'No Reminder'
  const { days, nextInDays, doneToday } = reminderSummaryEntry
  if (days === 0) return 'No Reminder'
  if (doneToday) return 'Done Today'
  if (nextInDays === 0) return 'Today'
  if (nextInDays === 1) return 'Tomorrow'
  if (nextInDays < 0) return `${nextInDays} ${nextInDays === -1 ? 'day' : 'days'} overdue`
  return `in ${nextInDays} days`
}

const mostRecentWaterAction = (history: HistoryElement[]) => {
  if (!history || history.length === 0) return
  const waterActions = history.filter((h) => waterActionTypes.includes(h.action)) as HistoryElement[]
  if (waterActions.length === 0) return
  return pipe(orderBy('createdAt', 'desc'), first)(waterActions) as HistoryElement
}

const mostRecentFertilizeAction = (history: HistoryElement[]) => {
  if (!history || history.length === 0) return
  const fertilizeActions = history.filter((h) => fertilizeActionTypes.includes(h.action)) as HistoryElement[]
  if (fertilizeActions.length === 0) return
  return pipe(orderBy('createdAt', 'desc'), first)(fertilizeActions) as HistoryElement
}
