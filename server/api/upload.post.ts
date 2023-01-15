import _ from 'lodash'
import parseBody from '~~/utils/form-parsing'

export default defineEventHandler(async (event) => {
  const { fields, photos } = await parseBody(event.node.req)
  // console.log(fields, photos)
  return 'TEST'
})
