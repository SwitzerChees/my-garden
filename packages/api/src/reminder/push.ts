import { Plant, User } from '@my-garden/common/definitions'
import { calculateNeedAttention, getPlantsToRemind } from '@my-garden/common'
import { Strapi } from '@strapi/strapi'
import webpush from 'web-push'

export const sendPushReminders = async (strapi: Strapi) => {
  try {
    const allPlants: Plant[] = await strapi.entityService.findMany('api::plant.plant', {
      limit: -1,
      filters: { status: 'active' },
      populate: ['history', 'user.pushSubscriptions'],
    })
    const plantsByUser = allPlants.reduce((acc, plant) => {
      if (!plant.user) return acc
      const userId = plant.user.id
      if (!acc[userId]) acc[userId] = { user: plant.user, plants: [] }
      acc[userId].plants.push(plant)
      return acc
    }, {} as Record<number, { user: User; plants: Plant[] }>)
    for (const userId in plantsByUser) {
      const { user, plants } = plantsByUser[userId]
      const plantsToRemind = getPlantsToRemind(plants)
      const { needWater = 0, needFertilizer = 0 } = calculateNeedAttention(plantsToRemind)
      if (needWater === 0 && needFertilizer === 0) continue
      const { pushSubscriptions } = user
      if (!pushSubscriptions || pushSubscriptions.length === 0) continue
      const title = 'Your 🪴 need your attention'
      let body = 'The following is TO-DO:'
      if (needWater > 0) body += `\n${needWater} 💧`
      if (needFertilizer > 0) body += `\n${needFertilizer} 🧪`
      const pushData = JSON.stringify({
        title,
        body,
        icon: 'https://mygarden.hackerman.ch/logo.png',
        data: {
          url: 'https://mygarden.hackerman.ch/my-plants',
        },
      })
      try {
        const {
          webpush: { vapidPublickey, vapidPrivatekey },
        } = strapi.config
        webpush.setVapidDetails('mailto:info@hackerman.ch', vapidPublickey, vapidPrivatekey)
        for (const { subscription } of pushSubscriptions) {
          await webpush.sendNotification(subscription, pushData)
        }
      } catch (error) {
        strapi.log.error(error)
      }
    }
  } catch (error) {
    strapi.log.error(error)
  }
}
