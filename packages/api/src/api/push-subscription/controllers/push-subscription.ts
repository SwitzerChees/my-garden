/**
 * push-subscription controller
 */

import { factories } from '@strapi/strapi'

export default factories.createCoreController('api::push-subscription.push-subscription', {
  vapidToken(ctx) {
    const {
      webpush: { vapidPublickey },
    } = strapi.config
    ctx.send(vapidPublickey)
  },
})
