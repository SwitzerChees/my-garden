import lfp from 'lodash/fp'
import { executeSafe } from './utils'
import { getTags } from './queries'
import { db } from '.'
import { HistoryElement, Plant, Tag } from '~~/definitions'
const { find } = lfp

const getOrAddTags = async (newTags: Tag[]) => {
  const allTags = await getTags({})
  const resultTags: Tag[] = []
  for (const tag of newTags) {
    const existingTag = find({ name: tag.name })(allTags)
    if (existingTag) {
      resultTags.push(existingTag)
      continue
    }
    const { result, error } = await executeSafe(
      db.create('tag', {
        name: tag.name.trim(),
      })
    )
    if (error || !result) continue
    resultTags.push(result)
  }
  return resultTags
}

export const addOrUpdatePlant = async (plant: Plant): Promise<Plant | undefined> => {
  if (!plant) return
  const plantPayload = {
    photo: plant.photo,
    name: plant.name.trim(),
    botanicalName: plant.botanicalName.trim(),
    reminder: {
      water: plant.reminder.water || 0,
      fertilize: plant.reminder.fertilize || 0,
    },
    createdAt: new Date(),
  }
  const dbAction = plant.id === '' ? db.create('plant', plantPayload) : db.change(plant.id, plantPayload)
  const { result, error } = await executeSafe(dbAction)
  if (error || !result) return
  const tags = await getOrAddTags(plant.tags)
  await executeSafe(db.query(`DELETE ${result.id}->assigned`))
  for (const tag of tags) {
    await executeSafe(db.query(`RELATE ${result.id}->assigned->${tag.id} UNIQUE`))
  }
  if (plant.id === '') await addHistoryElement(result.id, { action: 'added', photo: plant.photo, createdAt: new Date() })
  return { ...result, tags, history: [] }
}

export const addHistoryElement = async (plantId: string, historyElement: HistoryElement) => {
  const { result, error } = await executeSafe(
    db.create('historyelement', {
      ...historyElement,
      createdAt: new Date(),
    })
  )
  if (error || !result) return
  await executeSafe(db.query(`RELATE ${plantId}->history->${result.id} UNIQUE`))
}
