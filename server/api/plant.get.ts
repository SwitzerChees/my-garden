export default defineEventHandler(async (event) => {
  let created = await event.context.db.create('person', {
    title: 'Founder & CEO',
    name: {
      first: 'Tobie',
      last: 'Morgan Hitchcock',
    },
    marketing: true,
    identifier: Math.random().toString(36).substr(2, 10),
  })
  event.context.created = created
  return created
})
