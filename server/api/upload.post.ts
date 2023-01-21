import { parseBody } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const { photos } = await parseBody(event.node.req)
  return photos
})
