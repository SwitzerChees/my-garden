import lfp from 'lodash/fp'
import { HistoryElement, Plant, Tag } from '@my-garden/common/definitions'
import { executeSafe } from './utils'
import { getPlant, getTags } from './queries'
import { db } from '.'
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
    const { result, error } = await executeSafe<Tag>(
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
  const dbAction = plant.id === undefined ? db.create('plant', plantPayload) : db.change(plant.id, plantPayload)
  const originalPlant = plant.id === undefined ? undefined : await getPlant(plant.id)
  const { result, error } = await executeSafe<Plant>(dbAction)
  if (error || !result) return
  const tags = await getOrAddTags(plant.tags)
  await executeSafe(db.query(`DELETE ${result.id}->assigned`))
  for (const tag of tags) {
    await executeSafe(db.query(`RELATE ${result.id}->assigned->${tag.id} UNIQUE`))
  }
  if (result.id === undefined) return
  if (plant.id === undefined) await addHistoryElement(result.id, { action: 'added', photo: plant.photo, createdAt: new Date() })
  else if (originalPlant) {
    await addHistoryElement(result.id, {
      action: 'updated',
      photo: originalPlant?.photo?.imageName !== plant.photo?.imageName ? plant.photo : undefined,
      createdAt: new Date(),
    })
  }
  return { ...result, tags, history: [] }
}

export const addHistoryElement = async (plantId: string, historyElement: HistoryElement) => {
  // const jesterday = new Date()
  // jesterday.setDate(jesterday.getDate() - 0)
  const { result, error } = await executeSafe<HistoryElement>(
    db.create('historyelement', {
      ...historyElement,
      createdAt: new Date(),
    })
  )
  if (error || !result) return
  await executeSafe(db.query(`RELATE ${plantId}->history->${result.id} UNIQUE`))
  return result
}
