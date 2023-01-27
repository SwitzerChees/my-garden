/**
 * plant controller
 */

import { Plant } from '@my-garden/common/definitions'
import { factories } from '@strapi/strapi'
import ical, { ICalAlarmType } from 'ical-generator'
import { getReminderSummary } from '../../../reminder/reminder'

interface Event {
  date: Date
  water: number
  fertitlize: number
}

export default factories.createCoreController('api::plant.plant', {
  async ical(ctx) {
    const cal = ical()
    const { token } = ctx.params

    const plantsFromUser: Plant[] = await strapi.entityService.findMany('api::plant.plant', {
      limit: -1,
      filters: {
        user: {
          icalToken: token,
        },
      },
      populate: ['history'],
    })

    const events: Event[] = []

    for (const plant of plantsFromUser) {
      const reminderSummary = getReminderSummary(plant)
      if (reminderSummary.water.days > 0) {
        const nextInDate = new Date()
        nextInDate.setDate(nextInDate.getDate() + reminderSummary.water.nextInDays)
        nextInDate.setHours(0, 0, 0, 0)
        let event = events.find((e: Event) => e.date.getTime() === nextInDate.getTime())
        if (!event) {
          event = { date: nextInDate, water: 0, fertitlize: 0 }
          events.push(event)
        }
        event.water += 1
      }
      if (reminderSummary.fertilize.days > 0) {
        const nextInDate = new Date()
        nextInDate.setDate(nextInDate.getDate() + reminderSummary.fertilize.nextInDays)
        nextInDate.setHours(0, 0, 0, 0)
        let event = events.find((e: Event) => e.date.getTime() === nextInDate.getTime())
        if (!event) {
          event = { date: nextInDate, water: 0, fertitlize: 0 }
          events.push(event)
        }
        event.fertitlize += 1
      }
    }

    for (const event of events) {
      const start = new Date(event.date)
      start.setHours(9, 0, 0, 0)
      const end = new Date(start)
      end.setHours(10, 0, 0, 0)
      let summary = '🪴 MyGarden:'
      if (event.water > 0) summary += ` ${event.water}💧`
      if (event.fertitlize > 0) summary += ` ${event.fertitlize}🧪`
      const id = `my-plant-event-${start.getTime()}`
      cal.createEvent({
        id,
        start,
        end,
        alarms: [{ type: ICalAlarmType.display, trigger: 1, description: 'Care for your Plants 🪴🤒' }],
        summary,
      })
    }
    ctx.set('Content-Type', 'text/calendar; charset=utf-8')
    ctx.send(cal.toString())
  },
})
