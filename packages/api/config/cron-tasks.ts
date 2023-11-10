import { Strapi } from '@strapi/strapi'
import { sendPushReminders } from '../src/reminder'

export default {
  // Every minute
  // '* * * * *': async ({ strapi }: { strapi: Strapi }) => await sendReminders(strapi),
  // Every day at 20:00 send reminders
  '0 18 * * *': async ({ strapi }: { strapi: Strapi }) => await sendPushReminders(strapi),
  // Every day at 09:00 send reminders
  '0 9 * * *': async ({ strapi }: { strapi: Strapi }) => await sendPushReminders(strapi),
}
