/**
 * plant controller
 */

import { Plant } from '@my-garden/common/definitions'
import { factories } from '@strapi/strapi'
import ical, { ICalAlarmType, ICalCalendarMethod } from 'ical-generator'
import { getPlantsGroupedByReminder, getReminderSummary, isValidDate } from '@my-garden/common'

export default factories.createCoreController('api::plant.plant', {
  async ical(ctx) {
    const cal = ical({ method: ICalCalendarMethod.PUBLISH })
    const { token } = ctx.params

    const plantsFromUser: Plant[] = await strapi.entityService.findMany('api::plant.plant', {
      limit: -1,
      filters: {
        status: 'active',
        user: {
          icalToken: token,
        },
      },
      populate: ['history'],
    })

    const plantGroups = getPlantsGroupedByReminder(plantsFromUser, true)

    for (const plantGroup of plantGroups) {
      if (!isValidDate(plantGroup.key)) continue
      const start = new Date(plantGroup.key)
      start.setHours(12, 0, 0, 0)
      const end = new Date(start)
      end.setHours(13, 0, 0, 0)
      let { needWater = 0, needFertilizer = 0 } = {}
      const groupDate = new Date(plantGroup.key)
      for (const plant of plantGroup.plants) {
        const reminderSummary = getReminderSummary(plant)
        if (!reminderSummary.water.doneToday && reminderSummary.water.date.getTime() === groupDate.getTime()) {
          needWater += 1
        }
        if (!reminderSummary.fertilize.doneToday && reminderSummary.fertilize.date.getTime() === groupDate.getTime()) {
          needFertilizer += 1
        }
      }
      if (needWater === 0 && needFertilizer === 0) continue
      let summary = '🪴 MyGarden:'
      if (needWater > 0) summary += ` ${needWater}💧`
      if (needFertilizer > 0) summary += ` ${needFertilizer} 🧪`
      cal.createEvent({
        start,
        end,
        alarms: [{ type: ICalAlarmType.display, trigger: 900, description: 'Care for your Plants 🪴🤒' }],
        summary,
      })
    }
    ctx.set('Content-Type', 'text/calendar; charset=utf-8')
    ctx.send(cal.toString())
  },
})
