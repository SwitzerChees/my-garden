import lfp from 'lodash/fp'
import { HistoryElement, Plant } from '~~/definitions'
const { first, orderBy, pipe } = lfp

const waterActionTypes = ['added', 'watered', 'repotted']
const fertilizeActionTypes = ['added', 'fertilized', 'repotted']

interface ReminderSummaryEntry {
  days: number
  nextInDays: number
  doneToday: boolean
}
interface ReminderSummary {
  water: ReminderSummaryEntry
  fertilize: ReminderSummaryEntry
}

export const getReminderSummary = (plant: Plant): ReminderSummary => {
  const { water = 0, fertilize = 0 } = plant.reminder
  const { history } = plant
  const today = new Date()
  const waterAction = mostRecentWaterAction(history)
  const fertilizeAction = mostRecentFertilizeAction(history)
  const waterNext = new Date()
  if (waterAction) {
    waterNext.setDate(new Date(waterAction.createdAt).getDate() + water)
  }
  const nextWaterInDays = Math.ceil((waterNext.getTime() - today.getTime()) / (1000 * 3600 * 24))
  const fertilizeNext = new Date()
  if (fertilizeAction) {
    fertilizeNext.setDate(new Date(fertilizeAction.createdAt).getDate() + fertilize)
  }
  const nextFertilizeInDays = Math.ceil((fertilizeNext.getTime() - today.getTime()) / (1000 * 3600 * 24))
  const waterDoneToday = water === 0 ? false : waterAction ? new Date(waterAction.createdAt).getDate() === new Date().getDate() : false
  const fertilizeDoneToday =
    fertilize === 0 ? false : fertilizeAction ? new Date(fertilizeAction.createdAt).getDate() === new Date().getDate() : false
  return {
    water: {
      days: water,
      nextInDays: nextWaterInDays,
      doneToday: waterDoneToday,
    },
    fertilize: {
      days: fertilize,
      nextInDays: nextFertilizeInDays,
      doneToday: fertilizeDoneToday,
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
