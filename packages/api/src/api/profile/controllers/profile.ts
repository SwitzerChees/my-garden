import { Strapi } from '@strapi/strapi'

export default ({ strapi }: { strapi: Strapi }) => ({
  async update(ctx) {
    if (!ctx?.state?.user) return ctx.unauthorized('Not logged in')
    const { id: userId } = ctx.state.user
    const toUpdate: { username?: string; password?: string } = {}
    if (ctx.request.body.username) toUpdate.username = ctx.request.body.username
    if (ctx.request.body.password) toUpdate.password = ctx.request.body.password
    await strapi.entityService.update('plugin::users-permissions.user', userId, { data: toUpdate })
    ctx.send()
  },
  createIcs(ctx) {
    // eslint-disable-next-line no-console
    console.log(ctx.body)
  },
  ics(ctx) {
    // eslint-disable-next-line no-console
    console.log(ctx.query)
  },
})
