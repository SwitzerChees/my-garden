import { parseBody } from '~~/server/utils'

export default defineEventHandler(async (event) => {
  const { fields, photos } = await parseBody(event.node.req)
  // eslint-disable-next-line no-console
  console.log(fields, photos)
  return 'TEST'
})
