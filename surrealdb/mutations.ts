import lfp from 'lodash/fp'
import { executeSafe } from './utils'
import { getTags } from './queries'
import { db } from '.'
import { Plant, Tag } from '~~/definitions'
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

export const addOrUpdatePlant = async (newPlant: Plant): Promise<Plant | undefined> => {
  const plantPayload = {
    photo: newPlant.photo,
    name: newPlant.name.trim(),
    botanicalName: newPlant.botanicalName.trim(),
    createdAt: new Date(),
  }
  const dbAction = newPlant.id === '' ? db.create('plant', plantPayload) : db.change(newPlant.id, plantPayload)
  const { result, error } = await executeSafe(dbAction)
  if (error || !result) return
  const tags = await getOrAddTags(newPlant.tags)
  for (const tag of tags) {
    await executeSafe(db.query(`RELATE ${result.id}->assigned->${tag.id} UNIQUE`))
  }
  return { ...result, tags, history: [] }
}
