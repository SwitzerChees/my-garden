import { Plant, TelegramConfig } from '@my-garden/common/definitions'
import { Strapi } from '@strapi/strapi'
import axios from 'axios'
import { getReminderSummary } from './reminder'

export const sendReminders = async (strapi: Strapi) => {
  try {
    const allPlants: Plant[] = await strapi.entityService.findMany('api::plant.plant', {
      limit: -1,
      populate: ['history'],
    })
    const telegramConfig: TelegramConfig = await strapi.entityService.findOne('api::telegram-config.telegram-config', 1)
    if (!telegramConfig) {
      strapi.log.warn('No telegram config found')
      return
    }
    const telegramBotUrl = `https://api.telegram.org/bot${telegramConfig.apiToken}/sendMessage`
    let { needWater = 0, needFertilizer = 0 } = {}
    for (const plant of allPlants) {
      const reminderSummary = getReminderSummary(plant)
      if (reminderSummary.water.days > 0 && !reminderSummary.water.doneToday && reminderSummary.water.nextInDays <= 0) {
        needWater += 1
      }
      if (reminderSummary.fertilize.days > 0 && !reminderSummary.fertilize.doneToday && reminderSummary.fertilize.nextInDays <= 0) {
        needFertilizer += 1
      }
    }
    if (needWater > 0 || needFertilizer > 0) {
      const message = `${needWater} 🪴 need water 💧 and ${needFertilizer} 🪴 need fertilizer 🌱`
      const { status } = await axios.get(telegramBotUrl, {
        params: {
          chat_id: telegramConfig.chatId,
          text: message,
        },
      })
      if (status !== 200) {
        strapi.log.error('Telegram request failed')
      }
    }
  } catch (error) {
    strapi.log.error(error)
  }
}

// let apiToken = 'my_bot_api_token'
// let chatId = '@my_channel_name'
// let text = 'Hello world!'

// let urlString =

// let request = new XMLHttpRequest()
// request.open('GET', urlString)
// request.send()

// let response = request.response
