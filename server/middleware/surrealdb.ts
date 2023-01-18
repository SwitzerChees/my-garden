import Surreal from 'surrealdb.js'
const db = new Surreal('http://localhost:8000/rpc')

export default defineEventHandler(async (event) => {
  await db.signin({
    user: 'root',
    pass: 'root',
  })
  await db.use('mygarden', 'mygarden')
  event.context.db = db
})
