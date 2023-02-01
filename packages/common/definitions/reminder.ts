export interface ReminderSummaryEntry {
  days: number
  nextInDays: number
  doneToday: boolean
  date: Date
}
export interface ReminderSummary {
  water: ReminderSummaryEntry
  fertilize: ReminderSummaryEntry
}
