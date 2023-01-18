export default defineEventHandler(async (event) => {
  const { id } = event.context.params
  if (!id?.startsWith('plant:')) return createError({ statusCode: 400, statusMessage: 'Id must start with prefix plant:' })
  try {
    return await event.context.db.select(id)
  } catch (error) {
    return createError({ statusCode: 404, statusMessage: `Plant with id ${id} not found` })
  }
})
