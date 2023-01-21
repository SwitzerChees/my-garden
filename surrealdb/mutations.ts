import lfp from 'lodash/fp'
const { first, get, pipe, filter, find } = lfp
import { Plant, Tag } from './models'
import { db } from '.'
import { executeSafe } from './utils'
import { getTags } from './queries'

const getOrAddTags = async (newTags: Tag[]) => {
  const allTags = await getTags({})
  const resultTags: Tag[] = []
  for (const tag of newTags) {
    const existingTag = find({ name: tag.name })(allTags)
    if (existingTag) {
      resultTags.push(existingTag)
      continue
    }
    const { result, error } = await executeSafe(db.create('tag', tag as any))
    if (error) continue
    resultTags.push(result)
  }
  return resultTags
}

export const addPlant = async (newPlant: Plant): Promise<Plant | undefined> => {
  const { result, error } = await executeSafe(
    db.create('plant', {
      name: newPlant.name,
      botanicalName: newPlant.botanicalName,
    })
  )
  if (error || !result) return
  const tags = await getOrAddTags(newPlant.tags)
  for (const tag of tags) {
    await executeSafe(db.query(`RELATE ${result.id}->assigned->${tag.id}`))
  }
  return { ...result, tags }
}