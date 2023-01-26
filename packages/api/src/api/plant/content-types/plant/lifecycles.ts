import { Tag } from '@my-garden/common/definitions'
import lfp from 'lodash/fp'
const { find } = lfp

export default {
  beforeCreate: async (ctx) => {
    ctx.params.data.tags = await getOrAddTags(ctx.params.data.user, ctx.params.data.assignedTags)
  },
  afterCreate: async (ctx) => {
    await strapi.entityService.create('api::history-element.history-element', {
      data: { action: 'added', photo: ctx.params.data.photo },
    })
  },
  beforeUpdate: async (ctx) => {
    ctx.params.originalPlant = await strapi.entityService.findOne('api::plant.plant', {
      id: ctx.params.data.id,
      fields: ['photo'],
    })
  },
  afterUpdate: async (ctx) => {
    if (!ctx.params.originalPlant) return
    const photo = ctx.params.originalPlant.photo.url !== ctx.params.data.photo.url ? ctx.params.data.photo : undefined
    await strapi.entityService.create('api::history-element.history-element', {
      data: { action: 'updated', photo },
    })
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
