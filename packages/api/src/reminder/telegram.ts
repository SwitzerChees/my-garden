import { Plant, TelegramConfig } from '@my-garden/common/definitions'
import { calculateNeedAttention, getPlantsToRemind } from '@my-garden/common'
import { Strapi } from '@strapi/strapi'
import axios from 'axios'

export const sendReminders = async (strapi: Strapi) => {
  try {
    const allPlants: Plant[] = await strapi.entityService.findMany('api::plant.plant', {
      limit: -1,
      filters: { status: 'active' },
      populate: ['history'],
    })
    const telegramConfig: TelegramConfig = await strapi.entityService.findOne('api::telegram-config.telegram-config', {})
    if (!telegramConfig) {
      strapi.log.warn('No telegram config found')
      return
    }
    const telegramBotUrl = `https://api.telegram.org/bot${telegramConfig.apiToken}/sendMessage`
    const plantsToRemind = getPlantsToRemind(allPlants)
    const { needWater = 0, needFertilizer = 0 } = calculateNeedAttention(plantsToRemind)
    if (needWater === 0 && needFertilizer === 0) return
    let message = 'Your 🪴 need your attention'
    if (needWater > 0) message += `\n${needWater} 💧`
    if (needFertilizer > 0) message += `\n${needFertilizer} 🧪`
    const { status } = await axios.get(telegramBotUrl, {
      params: {
        chat_id: telegramConfig.chatId,
        text: message,
      },
    })
    if (status !== 200) {
      strapi.log.error('Telegram request failed')
    }
  } catch (error) {
    strapi.log.error(error)
  }
}
