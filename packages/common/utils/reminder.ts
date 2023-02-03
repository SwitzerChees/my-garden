import lfp from 'lodash/fp'
import { dateToday, dayInMilliseconds, daysBetweenDates, isoDateWithoutTime, isValidDate, relativeDate } from '.'
import { HistoryElement, Plant, ReminderSummary, ReminderSummaryEntry } from '@my-garden/common/definitions'
const { first, orderBy, pipe, uniqBy, flatten, filter, map } = lfp

const waterActionTypes = ['watered']
const fertilizeActionTypes = ['fertilized']

export const needReminderAttention = (reminderSummaryEntry: ReminderSummaryEntry) => {
  if (!reminderSummaryEntry) return false
  const { days, nextInDays, doneToday } = reminderSummaryEntry
  return days !== 0 && !doneToday && nextInDays <= 0
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

type MostRecentActionFunctionType = typeof mostRecentWaterAction | typeof mostRecentFertilizeAction

const getReminderSummaryEntry = (plant: Plant, dayInterval: number, mostRecentActionFunction: MostRecentActionFunctionType) => {
  const today = dateToday()
  const history = plant.history || []
  const activeHistory = history.filter((h) => h.status === 'active')
  const mostRecentAction = mostRecentActionFunction(activeHistory)
  const dateNext = new Date(plant.createdAt || today)
  if (mostRecentAction) {
    dateNext.setTime(new Date(mostRecentAction.createdAt || today).getTime() + dayInterval * dayInMilliseconds)
  }
  const nextInDays = dayInterval > 0 ? daysBetweenDates(today, dateNext) : 0
  const doneToday =
    dayInterval === 0 ? false : mostRecentAction ? isoDateWithoutTime(mostRecentAction.createdAt) === today.toISOString() : false
  return {
    days: dayInterval,
    nextInDays,
    doneToday,
    date: dateNext,
  }
}

export const getReminderSummary = (plant: Plant): ReminderSummary => {
  const { water = 0, fertilize = 0 } = plant.reminder || {}
  const waterEntry = getReminderSummaryEntry(plant, water, mostRecentWaterAction)
  const fertilizeEntry = getReminderSummaryEntry(plant, fertilize, mostRecentFertilizeAction)
  return {
    water: waterEntry,
    fertilize: fertilizeEntry,
  }
}

export const getReminderDays = (days?: number) => {
  if (!days || days === 0) return 'No Reminder'
  return `every ${days} days`
}

interface PlantGroup {
  key: string
  plants: Plant[]
}
export const getPlantsGroupedByReminder = (plants: Plant[], asDate = false): PlantGroup[] => {
  const plantsGroupedByReminder = plants.reduce((plantGroup, plant) => {
    const reminderSummary = getReminderSummary(plant)
    const waterDateKey =
      reminderSummary.water.days === 0
        ? 'No Reminder'
        : reminderSummary.water.doneToday
        ? 'Done Today'
        : reminderSummary.water.date.toISOString()
    const fertilizeDateKey =
      reminderSummary.fertilize.days === 0
        ? 'No Reminder'
        : reminderSummary.fertilize.doneToday
        ? 'Done Today'
        : reminderSummary.fertilize.date.toISOString()
    if (!plantGroup[waterDateKey]) plantGroup[waterDateKey] = []
    if (!plantGroup[fertilizeDateKey]) plantGroup[fertilizeDateKey] = []
    plantGroup[waterDateKey].push(plant)
    plantGroup[fertilizeDateKey].push(plant)
    return plantGroup
  }, {} as { [key: string]: Plant[] })
  for (const key in plantsGroupedByReminder) {
    plantsGroupedByReminder[key] = uniqBy<Plant>('id')(plantsGroupedByReminder[key])
  }
  const plantGroupArray = orderBy<{ key: string; plants: Plant[] }>('key', ['asc'])(
    Object.keys(plantsGroupedByReminder).map((key) => ({
      key,
      plants: plantsGroupedByReminder[key],
    }))
  )
  const doneToday = plantGroupArray.find((p) => p.key === 'Done Today')
  if (doneToday) {
    plantGroupArray.splice(plantGroupArray.indexOf(doneToday), 1)
    plantGroupArray.unshift(doneToday)
  }
  const noReminder = plantGroupArray.find((p) => p.key === 'No Reminder')
  if (noReminder) {
    plantGroupArray.splice(plantGroupArray.indexOf(noReminder), 1)
    plantGroupArray.push(noReminder)
  }
  const today = dateToday()
  const todayKey = today.toISOString()
  const todayReminder = plantGroupArray.find((p) => p.key === todayKey)
  if (todayReminder && !asDate) {
    todayReminder.key = 'Today'
    plantGroupArray.splice(plantGroupArray.indexOf(todayReminder), 1)
    plantGroupArray.unshift(todayReminder)
  }
  return plantGroupArray.map((p) => ({ key: isValidDate(p.key) ? (asDate ? p.key : relativeDate(p.key)) : p.key, plants: p.plants }))
}

export const getPlantsToRemind = (plants: Plant[]) => {
  const today = dateToday()
  const plantGrouspByReminder = getPlantsGroupedByReminder(plants, true)
  return pipe(
    filter((p: PlantGroup) => new Date(isoDateWithoutTime(p.key)) <= today),
    map((p: PlantGroup) => p.plants),
    flatten
  )(plantGrouspByReminder)
}
