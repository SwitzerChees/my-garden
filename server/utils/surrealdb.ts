import Surreal from 'surrealdb.js'
export const db = new Surreal('http://localhost:8000/rpc')

await db.signin({
  user: 'root',
  pass: 'root',
})
await db.use('mygarden', 'mygarden')

