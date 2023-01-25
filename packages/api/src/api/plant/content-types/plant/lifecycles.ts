import { Tag } from '@my-garden/common/definitions'
import lfp from 'lodash/fp'
const { find } = lfp

export default {
  beforeCreate: async (ctx) => {
    ctx.params.data.tags = await getOrAddTags(ctx.params.data.user, ctx.params.data.assignedTags)
  },
}

const getOrAddTags = async (user: number, newTags: Tag[]) => {
  const allTags = (await strapi.entityService.findMany('api::tag.tag', {
    fields: ['id', 'name'],
    filters: { user },
  })) as Tag[]
  const resultTags: Tag[] = []
  for (const tag of newTags) {
    const existingTag = find({ name: tag.name })(allTags)
    if (existingTag) {
      resultTags.push(existingTag)
      continue
    }
    const newTag = await strapi.entityService.create('api::tag.tag', {
      data: { name: tag.name, user },
    })
    if (!newTag) continue
    resultTags.push(newTag)
  }
  return resultTags
}
