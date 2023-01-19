import lfp from 'lodash/fp'
const { first, get, pipe } = lfp

export default defineEventHandler(async (event) => {
  const queryResult = await event.context.db.query('SELECT * FROM type::table($tb)', {
    tb: 'plant',
  })
  return pipe(first, get('result'))(queryResult)
})
