export default defineEventHandler(async (event) => {
  const { name, botanicalName } = await readBody(event)
  if (!name) return createError({ statusCode: 400, statusMessage: 'Missing name in body' })
  const newPlant = await event.context.db.create('plant', {
    name,
    botanicalName,
  })
  return newPlant
})
